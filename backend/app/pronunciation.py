"""Optional OpenPronounce adapter; keeps the core API lightweight."""
from __future__ import annotations
import importlib.util
import math
import numbers
import os
import tempfile
from pathlib import Path

MAX_AUDIO_BYTES = 12 * 1024 * 1024
MAX_EXPECTED_TEXT_LENGTH = 300
MAX_AUDIO_SECONDS = 30
SAMPLE_RATE = 16000


def validate_audio_duration(waveform, sample_rate: int = SAMPLE_RATE) -> float:
    """Reject unexpectedly long recordings before expensive model inference."""
    if sample_rate <= 0 or waveform is None:
        raise ValueError("Không đọc được bản ghi âm.")
    duration = len(waveform) / sample_rate
    if duration <= 0:
        raise ValueError("Bản ghi âm đang trống.")
    if duration > MAX_AUDIO_SECONDS:
        raise ValueError(f"Bản ghi âm quá dài (tối đa {MAX_AUDIO_SECONDS} giây).")
    return duration
ALLOWED_SUFFIXES = {".webm", ".wav", ".ogg", ".mp3", ".m4a", ".flac"}


class PronunciationEngineUnavailable(RuntimeError):
    pass


def engine_status() -> dict:
    try:
        installed = importlib.util.find_spec("openpronounce") is not None
    except (ImportError, ValueError):
        installed = False
    return {
        # This flag means the Python package is importable, not that weights or
        # an actual inference run have been verified.
        "available": installed,
        "package_installed": installed,
        "engine": "OpenPronounce" if installed else None,
        "inference_verified": False,
        "score_granularity": "sentence" if installed else "not_available",
        "feedback_granularity": "word_and_phoneme" if installed else "not_available",
        "word_level_scores": False,
        "model_weights": (
            "download_on_first_analysis_unverified" if installed else "not_installed"
        ),
        "message": (
            "OpenPronounce package is installed, but this status check does not verify model "
            "weights or run inference. The engine returns a sentence-level score and word/phoneme "
            "feedback; it does not return calibrated per-word scores."
            if installed
            else "Optional engine is not installed. Install backend/requirements-pronunciation.txt "
                 "and ffmpeg + espeak-ng to enable real audio analysis."
        ),
    }


def validate_engine_result(result: object) -> dict:
    """Reject malformed model output so the API never publishes a bogus score."""
    if not isinstance(result, dict):
        raise RuntimeError("Engine trả về dữ liệu không đúng định dạng.")
    score = result.get("score")
    if isinstance(score, bool) or not isinstance(score, numbers.Real):
        raise RuntimeError("Engine không trả về điểm số dạng số.")
    score = float(score)
    if not math.isfinite(score) or not 0 <= score <= 100:
        raise RuntimeError("Engine trả về điểm số ngoài phạm vi 0–100.")
    differences = result.get("differences")
    if not isinstance(differences, dict) or not isinstance(differences.get("errors"), list):
        raise RuntimeError("Engine không trả về danh sách lỗi phát âm hợp lệ.")
    result["score"] = score
    return result

def analyze_recording(audio_bytes: bytes, filename: str, expected_text: str) -> dict:
    """Run real acoustic/phoneme analysis; never synthesize a fallback score."""
    if not audio_bytes:
        raise ValueError("Bản ghi âm đang trống.")
    if len(audio_bytes) > MAX_AUDIO_BYTES:
        raise ValueError("Bản ghi âm vượt quá giới hạn 12 MB.")
    if not expected_text or not expected_text.strip():
        raise ValueError("Vui lòng chọn câu tiếng Anh cần luyện.")
    expected_text = expected_text.strip()
    if len(expected_text) > MAX_EXPECTED_TEXT_LENGTH:
        raise ValueError("Câu luyện tập quá dài (tối đa 300 ký tự).")
    suffix = Path(filename or "").suffix.lower()
    if suffix not in ALLOWED_SUFFIXES:
        allowed = ", ".join(sorted(ALLOWED_SUFFIXES))
        raise ValueError(f"Định dạng âm thanh không được hỗ trợ. Hãy dùng: {allowed}.")
    try:
        from openpronounce import load_audio, compare_audio_with_text
    except ImportError as exc:
        raise PronunciationEngineUnavailable(
            "OpenPronounce chưa được cài trên máy chủ. Xem backend/PRONUNCIATION.md."
        ) from exc
    temp_path = None
    try:
        with tempfile.NamedTemporaryFile(prefix="ela-pronunciation-", suffix=suffix, delete=False) as audio_file:
            audio_file.write(audio_bytes)
            temp_path = audio_file.name
        waveform = load_audio(temp_path)
        validate_audio_duration(waveform)
        result = compare_audio_with_text(waveform, expected_text, lang="en")
        return validate_engine_result(result)
    finally:
        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)
