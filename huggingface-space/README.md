---
title: English Learning AI - Pronunciation
emoji: 🗣️
colorFrom: blue
colorTo: indigo
sdk: gradio
python_version: "3.12"
app_file: app.py
pinned: false
---

# English Learning AI – Luyện phát âm

Gradio adapter dành cho Hugging Face Spaces ZeroGPU. Đây là thư mục triển khai
riêng, không thay thế frontend GitHub Pages và không sửa backend FastAPI.

## Triển khai

1. Tạo một Space mới trên tài khoản Hugging Face của chủ dự án.
2. Chọn SDK **Gradio** và phần cứng **ZeroGPU** nếu tài khoản được cấp quyền.
3. Đưa toàn bộ nội dung thư mục này vào thư mục gốc của Space.
4. Chờ Space cài dependencies và tải hai checkpoint Wav2Vec2 lần đầu.
5. Mở ứng dụng, ghi âm một câu tiếng Anh ngắn để kiểm tra.

Không chọn CPU Basic/Docker trả phí và không bật phần cứng tính phí. Nếu giao diện Hugging Face yêu cầu nâng cấp hoặc thanh toán, dừng lại; không xác nhận mua gói.

## Yêu cầu và giới hạn

- Tài khoản ZeroGPU miễn phí phải đủ điều kiện theo chính sách hiện hành của Hugging Face.
- ZeroGPU chỉ hỗ trợ SDK Gradio; Space này không chạy FastAPI.
- OpenPronounce tải hai model Wav2Vec2, tổng dung lượng khoảng 2,4 GB, ở lần khởi tạo đầu tiên.
- ZeroGPU có hạn mức GPU miễn phí theo tài khoản và có thể phải chờ hàng đợi.
- Chỉ tiếng Anh được hiệu chuẩn. Điểm số là ước lượng hỗ trợ học tập, không phải đánh giá tuyệt đối.
- Mỗi bản ghi tối đa 12 MB và 30 giây để hạn chế thời gian xử lý và tải GPU.
- Bản ghi âm được gửi tới máy chủ Space để phân tích. Không ghi âm nội dung riêng tư.
- Ứng dụng không chứa API key hoặc token.

## Công nghệ

- Gradio + Hugging Face ZeroGPU
- OpenPronounce 0.4.0 (MIT)
- Wav2Vec2 word recognition và phoneme recognition
