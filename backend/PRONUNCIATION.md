# Bật máy chấm phát âm AI (OpenPronounce)

GitHub Pages chỉ chạy giao diện tĩnh. Máy chấm âm thanh phải chạy trên backend Python riêng có HTTPS.

## Engine và giới hạn

- Engine: https://github.com/Halleck45/OpenPronounce, giấy phép MIT.
- Phiên bản đang khóa: `openpronounce==0.4.0` (MIT; các bản phát hành đến 0.4 giữ giấy phép MIT). Bản 1.0.0 (18/11/2026) và 1.1.0 (19/11/2026) chuyển sang AGPL-3.0; API mới dùng `assess()` và có trường `reliable` để báo khi không nên hiển thị điểm. Bản 1.1.0 bổ sung tùy chọn mô hình phone Wav2Vec2-base đã chưng cất. Dự án chưa tự nâng cấp vì cần rà soát nghĩa vụ AGPL, chuyển đổi API và kiểm thử cả FastAPI lẫn Gradio adapter.
- Wav2Vec2 nhận diện âm vị; so sánh âm thanh người học với câu mẫu, trả về điểm tổng, danh sách từ có lỗi và IPA. Phiên bản 0.4.0 không cung cấp điểm số riêng đã hiệu chuẩn cho từng từ; trường `confidence` là độ tin cậy phát hiện lỗi, không phải điểm phát âm của từ. Bản upstream 1.1.0 cũng báo từ/âm vị cần luyện và độ tin cậy theo âm, không phải điểm số riêng đã hiệu chuẩn cho từng từ.
- GET `/api/v1/pronunciation/status` chỉ xác nhận package Python có cài hay không. `available=true` không có nghĩa model weights đã tải hoặc suy luận đã được kiểm chứng; xem `inference_verified=false`. API khai báo rõ `score_granularity=sentence`, `feedback_granularity=word_and_phoneme` và `word_level_scores=false`.
- Tiếng Anh là ngôn ngữ đã được hiệu chỉnh theo dữ liệu đánh giá. Đây là ước lượng hỗ trợ học tập, không phải chứng nhận năng lực.
- Tài liệu upstream hiện mô tả hai checkpoint Wav2Vec2 khoảng 1,2 GB mỗi checkpoint; chế độ `--fast` dùng một checkpoint. Bản 1.1.0 có thêm tùy chọn phone model chưng cất, nhưng chưa được kiểm tra kích thước/tài nguyên thực tế trong dự án này. Máy chủ cần dung lượng đĩa, RAM và CPU phù hợp; lần đầu có thể chờ lâu.
- Cần cài ffmpeg (bao gồm `ffprobe`) và espeak-ng. API dùng `ffprobe` với timeout 5 giây để kiểm tra metadata thời lượng trước khi giải mã, từ chối tệp dài hơn 30 giây; sau đó vẫn kiểm tra lại thời lượng waveform sau giải mã. Nếu thiếu `ffprobe`, API trả trạng thái engine chưa khả dụng thay vì bỏ qua giới hạn. Không chạy mô hình trong GitHub Pages hoặc CI thông thường.

## Cài trên Ubuntu/Linux

    sudo apt-get update
    sudo apt-get install -y ffmpeg espeak-ng
    python -m venv .venv
    source .venv/bin/activate
    python -m pip install --upgrade pip
    pip install torch --index-url https://download.pytorch.org/whl/cpu
    pip install -r backend/requirements.txt
    pip install -r backend/requirements-pronunciation.txt

Đặt chế độ CPU và bật máy chủ:

    export OPENPRONOUNCE_DEVICE=cpu
    # Có thể đặt HF_HOME vào ổ đĩa còn trống để lưu model weights.
    cd backend
    uvicorn app.main:app --host 0.0.0.0 --port 8000

## API

- GET /api/v1/pronunciation/status
- POST /api/v1/pronunciation/analyze với multipart fields file và expected_text.

Gradio Space trong `huggingface-space/` là bản demo độc lập, không phải FastAPI endpoint mà website gọi trực tiếp. Không nhập URL của Space Gradio vào ô backend của website; muốn nối cần có proxy FastAPI riêng và kiểm thử bảo mật/CORS.

## Kết nối giao diện

Trong trang Luyện nói, nhập URL HTTPS của backend và lưu. Sau đó ghi âm câu mẫu rồi gửi lên API. Trình duyệt yêu cầu HTTPS để dùng micro. API nhận `.wav`, `.mp3`, `.m4a`, `.webm`, `.ogg` và `.flac`; định dạng khác bị từ chối. Giới hạn tải lên 12 MB và tối đa 30 giây mỗi bản ghi.

## Riêng tư và chi phí

Bản ghi âm được gửi đến backend do bạn tự quản lý; endpoint xóa tệp tạm sau phân tích. Engine mặc định có thể dùng gTTS để tạo câu đọc mẫu và cần Internet ở lần đầu của mỗi câu. Nếu muốn TTS ngoại tuyến, hãy cấu hình Piper theo tài liệu OpenPronounce và kiểm tra giấy phép/giọng tải về trước khi phát hành. Không có API key trả phí bắt buộc.

## Lưu ý chất lượng

OpenPronounce công bố giới hạn nhận diện và khả năng báo nhầm; không nên xem điểm số là kết luận tuyệt đối. Chỉ chấm câu tiếng Anh ngắn (tối đa 30 giây), thu âm rõ, nói tự nhiên, không có tiếng ồn nền lớn.


## Phương án chấm điểm từng từ đang đánh giá (chưa tích hợp)

Ứng viên đang được đánh giá là **Pronunciada 1.1.1**, phát hành trên PyPI ngày 26/11/2026. Tài liệu upstream công bố API Python:

    from pronunciada import Scorer
    scorer = Scorer("en", precision="int8")
    result = scorer.score("clip.wav", "Good morning")

result.prob là xác suất tổng câu; result.words[].prob là xác suất hiệu chuẩn cho từng từ; từng từ còn có điểm âm vị và thông tin thời gian. Chế độ INT8 dùng model khoảng 71 MB, chạy CPU không cần GPU. Package tải từ PyPI khoảng 34,5 MB; model được tải ở lần dùng đầu tiên. Nguồn: https://pypi.org/project/pronunciada/1.1.1/.

### Kiểm chứng kỹ thuật trong CI

Workflow có job riêng pronunciada-cpu-smoke: cài chính xác pronunciada==1.1.1, tạo một câu tiếng Anh mẫu bằng eSpeak NG, tải model INT8 và chạy suy luận CPU thật qua scripts/pronunciada_smoke.py. Job xác nhận kết quả có xác suất câu và xác suất hợp lệ cho từng từ. Không dùng điểm giả hoặc mock model trong job này.

Đây chỉ là smoke test bằng giọng tổng hợp để xác minh package, model weights và đường suy luận. Nó **không** thay thế đánh giá độ chính xác trên giọng người học Việt Nam, không hiệu chuẩn ngưỡng đạt/trượt và không tự bật điểm từng từ trên website. Endpoint hiện tại vẫn dùng OpenPronounce 0.4.0, chỉ có điểm tổng câu; word_level_scores=false tiếp tục được giữ cho đến khi adapter mới được tích hợp và kiểm chứng với dữ liệu người học có quyền sử dụng.

### Giấy phép và điều kiện trước khi tích hợp

PyPI công bố SPDX expression của package là Apache-2.0 AND CC-BY-SA-4.0 AND BSD-2-Clause AND MIT. Model ZIPA tải riêng theo CC BY 4.0. Cần giữ NOTICE, ghi công model và kiểm tra giấy phép từng dữ liệu/từ điển trước khi phân phối. Không được mô tả toàn bộ package là Apache-2.0 thuần.

Trước khi đưa vào API/UI cần: smoke test CI thành công; kiểm tra cảnh báo audio im lặng/cắt/clipping/noise; thử trên giọng người học Việt Nam với sự đồng ý và giấy phép phù hợp; đo RAM/latency CPU trên máy chủ mục tiêu; kiểm tra output alignment và timestamps; thêm attribution/NOTICE. Chưa đạt các bước này thì không trả điểm riêng từng từ cho người học.

## Chạy bằng Docker

Từ thư mục gốc repository:

    docker build -f backend/Dockerfile.pronunciation -t english-learning-ai-api .
    docker run --rm -p 8000:8000 -v english-learning-models:/models english-learning-ai-api

Lệnh trên tạo một máy chủ CPU. Volume Docker giữ model weights giữa các lần chạy; image có thể lớn do PyTorch và OpenPronounce. Khi đưa lên Internet, cần HTTPS, giới hạn truy cập và giữ CORS theo mặc định chỉ cho https://longmmo95.github.io. Endpoint phân tích có giới hạn cơ bản 10 yêu cầu/phút theo IP trên mỗi tiến trình; khi chạy nhiều worker/instance, phải bổ sung rate limit dùng chung ở reverse proxy/API gateway. Không xem CORS là cơ chế xác thực. Nếu chạy giao diện ở localhost, đặt ELA_ALLOWED_ORIGINS=http://localhost:5500,http://127.0.0.1:5500 trước khi khởi động backend. Không dùng dấu * cho máy chủ công khai.
