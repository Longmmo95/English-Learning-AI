"""Optional Pronunciada 1.1.1 CPU pronunciation scoring adapter.

This adapter is intentionally separate from the legacy OpenPronounce endpoint.
It converts uploads to bounded 16 kHz mono PCM WAV and returns calibrated
sentence/word/phone probabilities without inventing scores.
"""
from __future__ import annotations

import importlib.util
import math
import os
import subprocess
import tempfile
from pathlib import Path
from threading import Lock
from typing import Any

from app.pronunciation import (
    ALLOWED_SUFFIXES,
    MAX_AUDIO_BYTES,
    MAX_EXPECTED_TEXT_LENGTH,
    PronunciationEngineUnavailable,
    probe_audio_duration,
)

SCORER_THREADS = max(1, min(4, int(os.getenv("PRONUNCIADA_THREADS", "2"))))
_scorer: Any = None
_scorer_lock = Lock()
_inference_lock = Lock()


def engine_status() -> dict:
    try:
        installed = importlib.util.find_spec("pronunciada") is not None
    except (ImportError, ValueError):
        installed = False
    return {
        "available": installed,
        "package_installed": installed,
        "engine": "Pronunciada 1.1.1" if installed else None,
        "inference_verified": False,
        "score_granularity": "sentence" if installed else "not_available",
        "word_level_scores": installed,
        "phoneme_level_scores": installed,
        "model": "ZIPA INT8 CPU (downloaded on first inference)" if installed else None,
        "message": (
            "Package detected. This status endpoint does not download model weights or verify "
            "inference; the first real analysis performs that check."
            if installed
            else "Pronunciada is not installed. Install backend/requirements-pronunciation.txt."
        ),
    }


def _get_scorer():
    global _scorer
    if _scorer is None:
        with _scorer_lock:
            if _scorer is None:
                try:
                    from pronunciada import Scorer
                except ImportError as exc:
                    raise PronunciationEngineUnavailable(
                        "Pronunciada chưa được cài trên máy chủ."
                    ) from exc
                try:
                    _scorer = Scorer("en", precision="int8", threads=SCORER_THREADS)
                except Exception as exc:
                    raise PronunciationEngineUnavailable(
                        "Không thể tải mô hình Pronunciada. Hãy kiểm tra kết nối lần đầu, "
                        "dung lượng ổ đĩa và RAM của máy chủ."
                    ) from exc
    return _scorer


def _probability(value: Any, label: str) -> float:
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise RuntimeError(f"Pronunciada returned an invalid {label} probability.")
    number = float(value)
    if not math.isfinite(number) or not 0.0 <= number <= 1.0:
        raise RuntimeError(f"Pronunciada returned an out-of-range {label} probability.")
    return number


def _optional_time(value: Any, label: str) -> float | None:
    if value is None:
        return None
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise RuntimeError(f"Pronunciada returned an invalid {label} timestamp.")
    number = float(value)
    if not math.isfinite(number) or number < 0:
        raise RuntimeError(f"Pronunciada returned an invalid {label} timestamp.")
    return round(number, 3)


def build_response(result: Any) -> dict:
    """Validate and convert Pronunciada's typed result to a stable JSON contract."""
    sentence_prob = _probability(getattr(result, "prob", None), "sentence")
    raw_words = getattr(result, "words", None)
    if not isinstance(raw_words, (list, tuple)) or not raw_words:
        raise RuntimeError("Pronunciada returned no aligned word scores.")

    words = []
    for index, word in enumerate(raw_words):
        text = getattr(word, "text", None)
        if not isinstance(text, str) or not text.strip():
            raise RuntimeError(f"Pronunciada returned an invalid word at index {index}.")
        phones = []
        for phone in (getattr(word, "phones", None) or []):
            ipa = getattr(phone, "ipa", None)
            if not isinstance(ipa, str):
                raise RuntimeError("Pronunciada returned an invalid phoneme label.")
            phones.append({
                "ipa": ipa,
                "probability": round(_probability(getattr(phone, "prob", None), "phoneme"), 4),
                "start": _optional_time(getattr(phone, "start", None), "phoneme start"),
                "end": _optional_time(getattr(phone, "end", None), "phoneme end"),
                "heard": getattr(phone, "heard", None),
            })
        words.append({
            "text": text,
            "probability": round(_probability(getattr(word, "prob", None), "word"), 4),
            "start": _optional_time(getattr(word, "start", None), "word start"),
            "end": _optional_time(getattr(word, "end", None), "word end"),
            "phones": phones,
        })

    coaching = []
    coach_method = getattr(result, "coaching", None)
    if callable(coach_method):
        try:
            for item in coach_method(max_items=30):
                if isinstance(item, dict):
                    coaching.append({
                        "kind": item.get("kind"),
                        "word": item.get("word"),
                        "expected": item.get("expected_ipa", item.get("expected")),
                        "heard": item.get("heard_ipa", item.get("heard")),
                        "confidence": item.get("confidence"),
                        "error_probability": item.get("error_prob"),
                        "start": item.get("start"),
                        "end": item.get("end"),
                    })
        except Exception:
            # A coaching failure must not invalidate otherwise valid acoustic scores.
            coaching = []

    audio = getattr(result, "audio", None)
    audio_quality = None
    if isinstance(audio, dict):
        audio_quality = {
            "issues": audio.get("issues", []),
            "retry_recommended": bool(audio.get("retry_recommended", False)),
        }

    return {
        "schema_version": 1,
        "engine": "Pronunciada 1.1.1",
        "text": getattr(result, "text", ""),
        "score": round(sentence_prob * 100, 1),
        "score_probability": round(sentence_prob, 4),
        "score_granularity": "sentence",
        "word_level_scores": True,
        "phoneme_level_scores": True,
        "words": words,
        "coaching": coaching,
        "audio_quality": audio_quality,
        "fluency_probability": (
            round(_probability(result.fluency, "fluency"), 4)
            if getattr(result, "fluency", None) is not None else None
        ),
        "completeness_probability": (
            round(_probability(result.completeness, "completeness"), 4)
            if getattr(result, "completeness", None) is not None else None
        ),
        "warnings": list(getattr(result, "warnings", []) or []),
        "timing_ms": dict(getattr(result, "timing_ms", {}) or {}),
    }


def analyze_recording(audio_bytes: bytes, filename: str, expected_text: str) -> dict:
    if not audio_bytes:
        raise ValueError("Bản ghi âm đang trống.")
    if len(audio_bytes) > MAX_AUDIO_BYTES:
        raise ValueError("Bản ghi âm vượt quá giới hạn 12 MB.")
    if not isinstance(expected_text, str) or not expected_text.strip():
        raise ValueError("Vui lòng chọn câu tiếng Anh cần luyện.")
    expected_text = expected_text.strip()
    if len(expected_text) > MAX_EXPECTED_TEXT_LENGTH:
        raise ValueError("Câu luyện tập quá dài (tối đa 300 ký tự).")
    suffix = Path(filename or "").suffix.lower()
    if suffix not in ALLOWED_SUFFIXES:
        raise ValueError("Định dạng âm thanh không được hỗ trợ.")

    with tempfile.TemporaryDirectory(prefix="ela-pronunciada-") as directory:
        source = Path(directory) / f"input{suffix}"
        normalized = Path(directory) / "normalized.wav"
        source.write_bytes(audio_bytes)
        probe_audio_duration(source)
        command = [
            "ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(source),
            "-ac", "1", "-ar", "16000", "-c:a", "pcm_s16le", str(normalized),
        ]
        try:
            subprocess.run(command, check=True, capture_output=True, timeout=20)
        except FileNotFoundError as exc:
            raise PronunciationEngineUnavailable(
                "Không tìm thấy ffmpeg trên máy chủ. Hãy cài ffmpeg trước khi chấm phát âm."
            ) from exc
        except subprocess.TimeoutExpired as exc:
            raise ValueError("Không thể chuẩn hóa âm thanh trong thời gian cho phép.") from exc
        except subprocess.CalledProcessError as exc:
            raise ValueError("Không thể giải mã bản ghi âm. Hãy thử ghi âm lại.") from exc
        if not normalized.is_file() or normalized.stat().st_size < 1000:
            raise ValueError("Bản ghi âm không có dữ liệu giọng nói hợp lệ.")

        # Load model only after the upload has passed format and duration checks.
        scorer = _get_scorer()
        # Scorer instances retain model state; serialize calls to avoid unsafe concurrent inference.
        try:
            with _inference_lock:
                result = scorer.score(str(normalized), expected_text)
        except Exception as exc:
            raise PronunciationEngineUnavailable(
                "Pronunciada không thể phân tích bản ghi này. Hãy kiểm tra model weights và thử lại."
            ) from exc
        return build_response(result)
