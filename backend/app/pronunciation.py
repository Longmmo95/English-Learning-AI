"""Optional OpenPronounce adapter; keeps the core API lightweight."""
from __future__ import annotations
import importlib.util
import os
import tempfile
from pathlib import Path

MAX_AUDIO_BYTES = 12 * 1024 * 1024
MAX_EXPECTED_TEXT_LENGTH = 300
ALLOWED_SUFFIXES = {".webm", ".wav", ".ogg", ".mp3", ".m4a", ".flac"}


class PronunciationEngineUnavailable(RuntimeError):
    pass


def engine_status() -> dict:
    try:
        installed = importlib.util.find_spec("openpronounce") is not None
    except (ImportError, ValueError):
        installed = False
    return {
        "available": installed,
        "engine": "OpenPronounce" if installed else None,
        "granularity": "phoneme_and_word" if installed else "not_available",
        "model_weights": "download_on_first_analysis" if installed else "not_installed",
        "message": (
            "Engine package installed. Model weights are downloaded on first analysis."
            if installed
            else "Optional engine is not installed. Install backend/requirements-pronunciation.txt "
                 "and ffmpeg + espeak-ng to enable real audio analysis."
        ),
    }


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
        suffix = ".webm"
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
        result = compare_audio_with_text(waveform, expected_text, lang="en")
        if not isinstance(result, dict) or "score" not in result or "differences" not in result:
            raise RuntimeError("Engine trả về dữ liệu không đúng định dạng.")
        return result
    finally:
        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)
