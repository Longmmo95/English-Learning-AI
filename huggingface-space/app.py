"""Gradio entry point for the optional Hugging Face ZeroGPU deployment.

This is a separate deployment adapter. The GitHub Pages frontend and FastAPI
backend remain unchanged.
"""
from __future__ import annotations

import os
from pathlib import Path

# ZeroGPU provides CUDA emulation while the app is starting. OpenPronounce
# therefore selects CUDA before its model modules are imported.
os.environ.setdefault("OPENPRONOUNCE_DEVICE", "cuda")
os.environ.setdefault("OPENPRONOUNCE_TTS", "gtts")

import spaces
import gradio as gr

from openpronounce import audio
from openpronounce.phones import _load_model as load_phone_model
from openpronounce.speech import _load_models as load_word_model

MAX_AUDIO_BYTES = 12 * 1024 * 1024
MAX_AUDIO_SECONDS = 30
SAMPLE_RATE = 16000
MAX_TEXT_LENGTH = 300

# ZeroGPU's documented pattern is to place models on CUDA at module startup,
# then wrap inference in @spaces.GPU so real GPU time is allocated on demand.
load_word_model()
load_phone_model()


@spaces.GPU
def assess_pronunciation(audio_path: str | None, expected_text: str):
    """Return real OpenPronounce acoustic/phoneme analysis; never fake a score."""
    if not audio_path:
        raise gr.Error("Bạn hãy ghi âm hoặc tải lên một tệp âm thanh.")
    if not expected_text or not expected_text.strip():
        raise gr.Error("Hãy nhập câu tiếng Anh bạn muốn luyện.")
    expected_text = expected_text.strip()
    if len(expected_text) > MAX_TEXT_LENGTH:
        raise gr.Error("Câu luyện tập tối đa 300 ký tự.")

    path = Path(audio_path)
    if not path.is_file():
        raise gr.Error("Không tìm thấy tệp ghi âm. Hãy ghi âm lại.")
    if path.stat().st_size > MAX_AUDIO_BYTES:
        raise gr.Error("Tệp âm thanh vượt quá 12 MB.")

    try:
        waveform = audio.load(str(path))
        duration = len(waveform) / SAMPLE_RATE
        if duration <= 0 or duration > MAX_AUDIO_SECONDS:
            raise ValueError(f"Bản ghi âm phải dài từ 0 đến {MAX_AUDIO_SECONDS} giây.")
        result = __import__(
            "openpronounce", fromlist=["compare_audio_with_text"]
        ).compare_audio_with_text(waveform, expected_text, lang="en")
        if not isinstance(result, dict) or "score" not in result:
            raise RuntimeError("Engine không trả về kết quả chấm hợp lệ.")
        return result
    except gr.Error:
        raise
    except Exception as exc:
        raise gr.Error(
            "Chưa thể phân tích âm thanh. Hãy thử ghi âm câu ngắn hơn, "
            "nói rõ trong môi trường yên tĩnh rồi thử lại."
        ) from exc


with gr.Blocks(title="English Learning AI – Luyện phát âm") as demo:
    gr.Markdown(
        """
        # English Learning AI – Luyện phát âm
        Ghi âm câu tiếng Anh, nhận phản hồi theo từ và âm vị IPA.
        
        **Lưu ý:** Đây là công cụ hỗ trợ luyện tập, không phải chứng chỉ
        đánh giá phát âm. Kết quả có thể sai với giọng vùng miền, tiếng ồn
        hoặc câu quá ngắn.
        """
    )
    sentence = gr.Textbox(
        label="Câu tiếng Anh cần luyện",
        placeholder="Ví dụ: Hello, my name is Long.",
        lines=2,
        max_lines=3,
    )
    recording = gr.Audio(
        label="Ghi âm hoặc tải tệp âm thanh",
        sources=["microphone", "upload"],
        type="filepath",
    )
    submit = gr.Button("Phân tích phát âm", variant="primary")
    result = gr.JSON(label="Kết quả phân tích âm thanh và âm vị")
    submit.click(
        fn=assess_pronunciation,
        inputs=[recording, sentence],
        outputs=result,
    )
    gr.Markdown(
        "Âm thanh được xử lý trên máy chủ Space. Không nhập thông tin cá nhân "
        "hoặc nội dung nhạy cảm vào bài ghi âm."
    )

if __name__ == "__main__":
    demo.launch()
