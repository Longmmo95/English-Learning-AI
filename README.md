# English Learning AI

[![Publish English Learning AI preview](https://github.com/Longmmo95/English-Learning-AI/actions/workflows/pages-preview.yml/badge.svg?branch=feature/interactive-flashcards)](https://github.com/Longmmo95/English-Learning-AI/actions/workflows/pages-preview.yml)

Nền tảng học tiếng Anh độc lập, ưu tiên người Việt mới bắt đầu (A1). Dự án này nằm trong repository riêng `Longmmo95/English-Learning-AI`.

## Phạm vi an toàn

- Không phụ thuộc và không chỉnh sửa website cũ: https://sansalecunglong.github.io/hoc-tieng-anh/
- Chỉ phát triển trong repository này.
- Không hiển thị điểm phát âm giả. Chấm phát âm theo từng từ chỉ được bật sau khi có mô hình nhận diện giọng nói và căn chỉnh âm thanh thực sự.

## Cấu trúc hiện tại

```text
.
├── index.html                 # Giao diện học tập
├── styles.css                 # Responsive styles
├── app.js                     # Điều hướng, bài học, nghe mẫu, ôn tập
└── backend/
    ├── requirements.txt
    ├── app/
    │   ├── __init__.py
    │   └── main.py             # FastAPI endpoints
    └── tests/
        └── test_api.py
```

## Chạy giao diện frontend

Có thể mở trực tiếp `index.html` trên trình duyệt. Để chạy qua máy chủ tĩnh trong thư mục gốc:

```bash
python -m http.server 8080
```

Sau đó mở http://localhost:8080.

## Chạy backend FastAPI

Yêu cầu Python 3.10 trở lên.

```bash
cd backend
python -m venv .venv
```

Kích hoạt môi trường ảo:

- Windows PowerShell: `.venv\\Scripts\\Activate.ps1`
- macOS/Linux: `source .venv/bin/activate`

Cài thư viện và chạy API:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

- Health check: http://127.0.0.1:8000/health
- Danh sách bài học: http://127.0.0.1:8000/api/v1/lessons
- Tài liệu API: http://127.0.0.1:8000/docs

## Chạy kiểm thử backend

Đứng trong thư mục `backend`, sau khi cài dependencies:

```bash
python -m pytest -q
```

## Trạng thái tính năng

- [x] Dashboard responsive cơ bản.
- [x] Bài học A1 mẫu, từ vựng và mẫu câu.
- [x] Nghe mẫu bằng Web Speech API của trình duyệt (giọng đọc phụ thuộc thiết bị/trình duyệt).
- [x] Ôn tập câu hỏi cơ bản và lưu trạng thái bài học trên thiết bị.
- [x] Thẻ ghi nhớ từ vựng: lật thẻ, đánh dấu đã nhớ/chưa nhớ và lưu tiến độ trên thiết bị.
- [x] API FastAPI cơ bản và kiểm thử endpoint.
- [ ] Tài khoản người học và đồng bộ tiến độ trên nhiều thiết bị.
- [ ] Ghi âm giọng nói và chấm phát âm AI.
- [ ] Nhận diện, căn chỉnh và phản hồi phát âm ở cấp độ từng từ.

## Lộ trình tiếp theo

1. Mở rộng nội dung A1 có hệ thống, bổ sung nghe hiểu và bài tập tương tác.
2. Kiểm tra giao diện thực tế trên điện thoại và máy tính.
3. Hoàn thiện lưu tiến độ và kết nối frontend với backend.
4. Đánh giá mô hình mã nguồn mở cho ASR/alignment; chỉ công bố điểm khi kết quả được kiểm chứng.

## Lưu ý triển khai

Backend hiện là nền tảng thử nghiệm. CORS đang mở cho phát triển; trước khi triển khai thật cần giới hạn `allow_origins` về đúng domain frontend, bổ sung cấu hình bảo mật, logging và giới hạn tải lên âm thanh.
