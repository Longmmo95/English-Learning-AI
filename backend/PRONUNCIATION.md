# Bật máy chấm phát âm AI (OpenPronounce)

GitHub Pages chỉ chạy giao diện tĩnh. Máy chấm âm thanh phải chạy trên backend Python riêng có HTTPS.

## Engine và giới hạn

- Engine: https://github.com/Halleck45/OpenPronounce, giấy phép MIT.
- Wav2Vec2 nhận diện âm vị; so sánh âm thanh người học với câu mẫu, trả về điểm tổng, từ có lỗi và IPA.
- Tiếng Anh là ngôn ngữ đã được hiệu chỉnh theo dữ liệu đánh giá. Đây là ước lượng hỗ trợ học tập, không phải chứng nhận năng lực.
- Hai checkpoint tải về khoảng 2,4 GB trong lần phân tích đầu tiên. Máy chủ cần dung lượng đĩa, RAM và CPU phù hợp; lần đầu có thể chờ lâu.
- Cần cài ffmpeg và espeak-ng. Không chạy mô hình trong GitHub Pages hoặc CI thông thường.

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

## Kết nối giao diện

Trong trang Luyện nói, nhập URL HTTPS của backend và lưu. Sau đó ghi âm câu mẫu rồi gửi lên API. Trình duyệt yêu cầu HTTPS để dùng micro. Giới hạn tải lên 12 MB và tối đa 30 giây mỗi bản ghi.

## Riêng tư và chi phí

Bản ghi âm được gửi đến backend do bạn tự quản lý; endpoint xóa tệp tạm sau phân tích. Engine mặc định có thể dùng gTTS để tạo câu đọc mẫu và cần Internet ở lần đầu của mỗi câu. Nếu muốn TTS ngoại tuyến, hãy cấu hình Piper theo tài liệu OpenPronounce và kiểm tra giấy phép/giọng tải về trước khi phát hành. Không có API key trả phí bắt buộc.

## Lưu ý chất lượng

OpenPronounce công bố giới hạn nhận diện và khả năng báo nhầm; không nên xem điểm số là kết luận tuyệt đối. Chỉ chấm câu tiếng Anh ngắn (tối đa 30 giây), thu âm rõ, nói tự nhiên, không có tiếng ồn nền lớn.


## Chạy bằng Docker

Từ thư mục gốc repository:

    docker build -f backend/Dockerfile.pronunciation -t english-learning-ai-api .
    docker run --rm -p 8000:8000 -v english-learning-models:/models english-learning-ai-api

Lệnh trên tạo một máy chủ CPU. Volume Docker giữ model weights giữa các lần chạy; image có thể lớn do PyTorch và OpenPronounce. Khi đưa lên Internet, cần HTTPS, giới hạn truy cập và giữ CORS theo mặc định chỉ cho https://longmmo95.github.io. Endpoint phân tích có giới hạn cơ bản 10 yêu cầu/phút theo IP trên mỗi tiến trình; khi chạy nhiều worker/instance, phải bổ sung rate limit dùng chung ở reverse proxy/API gateway. Không xem CORS là cơ chế xác thực. Nếu chạy giao diện ở localhost, đặt ELA_ALLOWED_ORIGINS=http://localhost:5500,http://127.0.0.1:5500 trước khi khởi động backend. Không dùng dấu * cho máy chủ công khai.
