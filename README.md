# English Learning AI

Website học tiếng Anh độc lập cho người Việt mới bắt đầu (A1), nằm trong repository riêng `Longmmo95/English-Learning-AI`.

## Bản xem trước
- Website: https://longmmo95.github.io/English-Learning-AI/
- Nhánh thử nghiệm: `feature/interactive-flashcards`
- Mọi thay đổi hiện được kiểm tra trên nhánh thử nghiệm; chưa tự động gộp vào `main`.

## Tính năng hiện có
- [x] Trang tổng quan và lộ trình 6 bài học A1: chào hỏi, gia đình, công việc hằng ngày, đồ ăn & thức uống, mua sắm, địa điểm & chỉ đường.
- [x] Từ vựng, phiên âm IPA, mẫu câu song ngữ và đọc mẫu bằng Web Speech API.
- [x] Thẻ ghi nhớ: lật thẻ, lọc từ chưa nhớ, xáo trộn, đặt lại tiến độ và lưu cục bộ.
- [x] Luyện nói bằng nhận diện giọng nói có sẵn của trình duyệt; đối chiếu văn bản theo từng từ.
- [x] Bài ôn tập từ vựng, tiến độ bài học, thời gian học và chuỗi ngày học được lưu trên thiết bị.
- [x] API FastAPI cho danh sách/chi tiết bài học và kiểm thử tự động.
- [x] Adapter API tùy chọn cho OpenPronounce: nhận tệp ghi âm, trả phân tích âm vị khi engine được cài.
- [ ] Cài model weights và triển khai backend HTTPS riêng để bật chấm âm thanh thực tế.

## Giới hạn cần biết
- Luyện nói trên trình duyệt vẫn là chế độ dự phòng. API chấm âm thanh dùng OpenPronounce khi cài optional engine; cần backend riêng, ffmpeg/espeak-ng và khoảng 2,4 GB model weights.
- API FastAPI chưa được triển khai lên máy chủ công khai; GitHub Pages hiện chỉ xuất bản frontend tĩnh.
- Dữ liệu tiến độ đang lưu trong trình duyệt hiện tại, chưa có tài khoản hoặc đồng bộ đa thiết bị.
- Cần HTTPS và quyền micro để dùng chức năng nhận diện giọng nói; hỗ trợ tùy trình duyệt.

## Chạy backend cục bộ
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Kiểm thử backend
```bash
cd backend
python -m pytest -q
```

## Nguyên tắc phát triển
- Không chỉnh sửa website cũ `https://sansalecunglong.github.io/hoc-tieng-anh/`.
- Không triển khai dịch vụ trả phí hoặc lưu bí mật truy cập trong mã nguồn.
- Không gộp nhánh thử nghiệm vào `main` nếu chưa có xác nhận rõ ràng.
