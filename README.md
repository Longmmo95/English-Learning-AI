# English Learning AI

Nền tảng học tiếng Anh độc lập, ưu tiên người Việt mới bắt đầu (A1), phát triển trong repository `Longmmo95/English-Learning-AI`.

## Phạm vi an toàn

- Chỉ chỉnh sửa repository này.
- Website cũ https://sansalecunglong.github.io/hoc-tieng-anh/ nằm ngoài phạm vi và không được sửa đổi.
- Không hiển thị điểm phát âm giả. Chấm phát âm từng từ chỉ được bật sau khi tích hợp và kiểm chứng engine nhận diện/căn chỉnh âm thanh thực sự.

## Cấu trúc

```text
.
├── index.html
├── styles.css
├── app.js
└── backend/
    ├── requirements.txt
    ├── app/
    │   ├── __init__.py
    │   └── main.py
    └── tests/
        └── test_api.py
```

## Chạy frontend

Mở trực tiếp `index.html`, hoặc chạy máy chủ tĩnh từ thư mục gốc:

```bash
python -m http.server 8080
```

Mở http://localhost:8080.

## Chạy backend FastAPI

Yêu cầu Python 3.10 trở lên:

```bash
cd backend
python -m venv .venv
```

Kích hoạt môi trường ảo:

- Windows PowerShell: `.venv\\Scripts\\Activate.ps1`
- macOS/Linux: `source .venv/bin/activate`

Cài đặt và khởi chạy:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

- Health check: http://127.0.0.1:8000/health
- Danh sách bài học: http://127.0.0.1:8000/api/v1/lessons
- Tài liệu API: http://127.0.0.1:8000/docs

## Kiểm thử backend

Chạy trong thư mục `backend`:

```bash
python -m pytest -q
```

## Trạng thái hiện tại

- [x] Dashboard responsive; đã kiểm tra luồng giao diện trên Chromium ở kích thước 1440×900 và 390×844.
- [x] Bốn bài học A1 mẫu: chào hỏi, gia đình, công việc hằng ngày, đồ ăn & thức uống.
- [x] 32 mục từ vựng và 19 mẫu câu; có nghe mẫu bằng Web Speech API (giọng đọc tùy trình duyệt/thiết bị).
- [x] Lộ trình học, từ vựng, luyện nghe-nói theo mẫu và bài ôn tập 6 câu.
- [x] Tiến độ hoàn thành được cộng dồn; nếu trình duyệt chặn localStorage, tiến độ chỉ được giữ trong phiên tab hiện tại.
- [x] FastAPI cung cấp health check, danh sách/chi tiết bài học và trạng thái tính năng phát âm.
- [ ] Nội dung hiện mới là ba bài mẫu, chưa bao phủ đầy đủ phạm vi A1.
- [ ] Chưa có tài khoản hoặc đồng bộ tiến độ giữa các thiết bị.
- [ ] Chưa ghi âm, nhận diện, căn chỉnh hoặc chấm phát âm từng từ. Endpoint trạng thái luôn báo chưa khả dụng cho đến khi có engine thật.

## Nghiên cứu engine chấm phát âm (18/11/2026)

Ứng viên ưu tiên để thử nghiệm riêng là [OpenPronounce](https://github.com/OpenPronounce/OpenPronounce) (MIT, Python 3.10+). Tài liệu dự án mô tả so sánh âm thanh với câu mẫu, nhận diện phoneme bằng Wav2Vec2, căn chỉnh chuỗi âm và trả về các từ có lỗi kèm IPA mong đợi/được nhận diện. Chạy được trên CPU, nhưng lần đầu cần tải hai checkpoint khoảng 1,2 GB mỗi checkpoint và cài FFmpeg cùng espeak-ng.

**Chưa tích hợp vào ứng dụng.** Tài liệu OpenPronounce nêu rõ chỉ tiếng Anh được hiệu chuẩn với đánh giá con người; mô hình có thể báo nhầm, đặc biệt với từ ngắn, giọng vùng miền và bản ghi nhiễu. Vì vậy chưa an toàn để đưa điểm số cho người học nếu chưa thử trên giọng người Việt và đối chiếu người chấm.

Ứng viên nghiên cứu thứ hai là [GOPT chính thức](https://github.com/YuanGongND/gopt), mô hình học thuật chấm nhiều cấp độ phoneme/từ/câu. Repo báo cáo PCC 0,549 ở cấp từ trên SpeechOcean762, nhưng quy trình cần đặc trưng GOP và pipeline dữ liệu/Kaldi; không phải thư viện cắm vào FastAPI là chạy ngay.

Bước tích hợp dự kiến: tách engine thành dịch vụ tùy chọn; giới hạn dung lượng và thời lượng âm thanh; không lưu bản ghi mặc định; kiểm thử bằng bộ mẫu có nhiều giọng/độ nhiễu và nhãn người chấm; chỉ bật endpoint chấm điểm sau khi đánh giá độ chính xác và tỷ lệ báo nhầm đạt ngưỡng.

## Lưu ý bảo mật và triển khai

Backend hiện là nền tảng thử nghiệm. CORS đang mở (`allow_origins=["*"]`) cho phát triển; phải giới hạn về domain frontend được phép trước khi triển khai thật. Chưa triển khai công khai và chưa cấu hình dịch vụ lưu trữ/tài khoản.

Kiểm thử giao diện Chromium ở hai kích thước viewport là kiểm tra tự động trên trình duyệt desktop, không thay thế việc kiểm thử thực tế trên iPhone/Safari hoặc Android.
