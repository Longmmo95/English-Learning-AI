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
# Cài thêm engine chấm phát âm thật (tùy chọn, tải các thư viện/mô hình lớn)
pip install -r requirements-pronunciation.txt
uvicorn app.main:app --reload
```

- Health check: http://127.0.0.1:8000/health
- Danh sách bài học: http://127.0.0.1:8000/api/v1/lessons
- Tài liệu API: http://127.0.0.1:8000/docs

## Chạy backend bằng Docker (khuyến nghị khi bật chấm phát âm)

Cần Docker Engine và Docker Compose. Tạo file `.env` ở thư mục gốc, ví dụ:

```dotenv
FRONTEND_ORIGINS=https://TEN-TAI-KHOAN.github.io
API_PORT=8000
```

Thay domain bằng đúng origin website frontend (chỉ phần scheme + hostname, không thêm đường dẫn). Sau đó chạy:

```bash
docker compose -f compose.pronunciation.yml up --build -d
docker compose -f compose.pronunciation.yml logs -f
```

API sẽ chạy tại `http://localhost:8000`. Khi triển khai trên máy chủ thật, đặt reverse proxy HTTPS (ví dụ Caddy/Nginx), chỉ mở cổng HTTPS ra Internet và đặt `FRONTEND_ORIGINS` thành origin frontend chính xác. Không dùng `*` cho CORS. Volume Docker `pronunciation-models` giữ cache mô hình giữa các lần khởi động; lần chấm đầu có thể tải khoảng 2,4 GB checkpoint và cần thời gian/đĩa trống tương ứng. Máy chủ CPU có thể chấm chậm; chưa cấu hình GPU.

Sau khi backend hoạt động, vào mục **Luyện nói**, nhập URL HTTPS của API vào ô **Địa chỉ backend (API)**, cấp quyền micro và thử đọc câu mẫu. Trình duyệt chỉ cho phép micro trên HTTPS hoặc localhost. Nếu trạng thái báo engine chưa sẵn sàng, kiểm tra log container và kết nối tải mô hình.

## Kiểm thử backend

Chạy trong thư mục `backend`:

```bash
python -m pytest -q
```

GitHub Actions tự chạy bộ kiểm thử này khi có thay đổi trong `backend/**` hoặc workflow. CI kiểm tra API và xác thực đầu vào; không tải checkpoint AI lớn và không thay thế kiểm thử chấm âm thanh thực tế.

## Trạng thái hiện tại

- [x] Dashboard responsive; đã kiểm tra luồng giao diện trên Chromium ở kích thước 1440×900 và 390×844.
- [x] Bốn bài học A1 mẫu: chào hỏi, gia đình, công việc hằng ngày, đồ ăn & thức uống.
- [x] 32 mục từ vựng và 19 mẫu câu; có nghe mẫu bằng Web Speech API (giọng đọc tùy trình duyệt/thiết bị).
- [x] Lộ trình học, từ vựng, luyện nghe-nói theo mẫu và bài ôn tập 6 câu.
- [x] Tiến độ hoàn thành được cộng dồn; nếu trình duyệt chặn localStorage, tiến độ chỉ được giữ trong phiên tab hiện tại.
- [x] FastAPI cung cấp health check, danh sách/chi tiết bài học và trạng thái tính năng phát âm.
- [ ] Nội dung hiện mới là bốn bài mẫu, chưa bao phủ đầy đủ phạm vi A1.
- [ ] Chưa có tài khoản hoặc đồng bộ tiến độ giữa các thiết bị.
- [x] Giao diện luyện nói có chọn câu, ghi âm bằng micro, gửi bản ghi lên FastAPI và hiển thị kết quả/âm vị lỗi khi backend có engine.
- [x] Backend có endpoint tải âm thanh có giới hạn dung lượng, kiểm tra định dạng và gọi OpenPronounce; nếu engine chưa cài thì trả HTTP 503, không tạo điểm giả.
- [ ] Engine OpenPronounce chưa được cài/chạy trong môi trường triển khai; cần cài `backend/requirements-pronunciation.txt`, tải checkpoint mô hình (khoảng 2,4 GB tổng) và kiểm thử trên giọng người Việt trước khi dùng thường xuyên.
- [x] Có Dockerfile CPU, Docker Compose với volume lưu cache mô hình và cấu hình CORS theo biến môi trường; có GitHub Actions chạy kiểm thử backend.
- [ ] Frontend tĩnh chưa có backend công khai. Trong mục Luyện nói, nhập URL máy chủ FastAPI đã cài engine vào ô “Địa chỉ backend (API)”; cần HTTPS để trình duyệt cho phép dùng micro.
- [ ] Chưa build/chạy Docker image, chưa tải checkpoint 2,4 GB và chưa kiểm thử chấm giọng thật trên máy chủ. Cần thực hiện các bước triển khai ở trên trước khi sử dụng thực tế.

## Nghiên cứu engine chấm phát âm (18/11/2026)

Engine đang pin [OpenPronounce 0.4.0](https://github.com/OpenPronounce/OpenPronounce) (bản MIT, Python 3.10+). Không tự nâng lên các phiên bản mới hơn khi chưa rà soát thay đổi API và giấy phép của upstream. Tài liệu dự án mô tả so sánh âm thanh với câu mẫu, nhận diện phoneme bằng Wav2Vec2, căn chỉnh chuỗi âm và trả về các từ có lỗi kèm IPA mong đợi/được nhận diện. Chạy được trên CPU, nhưng lần đầu cần tải hai checkpoint khoảng 1,2 GB mỗi checkpoint và cài FFmpeg cùng espeak-ng.

**Chưa tích hợp vào ứng dụng.** Tài liệu OpenPronounce nêu rõ chỉ tiếng Anh được hiệu chuẩn với đánh giá con người; mô hình có thể báo nhầm, đặc biệt với từ ngắn, giọng vùng miền và bản ghi nhiễu. Vì vậy chưa an toàn để đưa điểm số cho người học nếu chưa thử trên giọng người Việt và đối chiếu người chấm.

Ứng viên nghiên cứu thứ hai là [GOPT chính thức](https://github.com/YuanGongND/gopt), mô hình học thuật chấm nhiều cấp độ phoneme/từ/câu. Repo báo cáo PCC 0,549 ở cấp từ trên SpeechOcean762, nhưng quy trình cần đặc trưng GOP và pipeline dữ liệu/Kaldi; không phải thư viện cắm vào FastAPI là chạy ngay.

Đã tạo adapter tùy chọn trong FastAPI: `GET /api/v1/pronunciation/status` kiểm tra package và `POST /api/v1/pronunciation/assess` nhận `audio` cùng `expected_text`. Bản ghi được xử lý tạm thời rồi xóa; giới hạn tải lên 12 MB; không lưu audio vào cơ sở dữ liệu. Cài engine bằng `pip install -r backend/requirements-pronunciation.txt` từ thư mục gốc (hoặc trong thư mục backend với đường dẫn tương ứng). OpenPronounce dùng hai checkpoint Wav2Vec2 khoảng 1,2 GB mỗi checkpoint, có thể tải ở lần chấm đầu. Engine chỉ hiệu chuẩn tiếng Anh trên tập đánh giá có sẵn; điểm số là tham khảo, chưa được xác thực riêng cho người học Việt Nam. Cần kiểm thử trên bộ giọng người Việt và đối chiếu người chấm trước khi coi điểm là đáng tin cậy.

## Lưu ý bảo mật và triển khai

Backend hiện là nền tảng thử nghiệm. CORS mặc định chỉ cho phép localhost; khi triển khai phải cấu hình `FRONTEND_ORIGINS` bằng đúng origin frontend. Chưa triển khai công khai và chưa cấu hình dịch vụ lưu trữ/tài khoản. OpenPronounce 0.4.0 là mô hình tham khảo; cần đánh giá trên nhiều giọng người Việt trước khi dùng điểm số làm tiêu chí học tập.

Kiểm thử giao diện Chromium ở hai kích thước viewport là kiểm tra tự động trên trình duyệt desktop, không thay thế việc kiểm thử thực tế trên iPhone/Safari hoặc Android.
