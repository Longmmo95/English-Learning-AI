# English Learning AI

Website học tiếng Anh độc lập cho người Việt mới bắt đầu (A1), nằm trong repository riêng `Longmmo95/English-Learning-AI`.

## URL GitHub Pages hiện có (công khai)
- Website: https://longmmo95.github.io/English-Learning-AI/
- Nhánh thử nghiệm: `feature/interactive-flashcards`
- Mọi thay đổi hiện được kiểm tra trên nhánh thử nghiệm; chưa tự động gộp vào `main`.

## Trạng thái xuất bản và an toàn

- URL GitHub Pages ở trên là địa chỉ công khai, không phải bản xem riêng tư. GitHub Actions run #27 đã báo triển khai thành công từ nhánh feature ngày 18/11/2026.
- Để tránh tự động xuất bản thay đổi chưa được anh duyệt, workflow Pages hiện chỉ cho phép chạy thủ công và yêu cầu xác nhận rõ ràng trước khi deploy công khai.
- Lần cập nhật này không chạy deploy. URL công khai hiện tại giữ nguyên bản đã xuất bản trước đó cho đến khi chủ repository chủ động xác nhận một lần xuất bản mới.
- Workflow mới đóng gói thêm manifest, icon và service worker; bản Pages cũ có thể chưa có đủ các tệp này.
- GitHub chỉ cho chạy `workflow_dispatch` khi file workflow đã có trên nhánh mặc định. Workflow hiện chỉ nằm trên `feature/interactive-flashcards`, nên nút chạy thủ công chỉ xuất hiện sau khi chủ repository duyệt đưa workflow lên `main`; PR chưa được merge và automation không tự làm việc đó.

## Tính năng hiện có
- [x] Trang tổng quan và lộ trình 12 bài học A1, gồm 114 từ vựng, 60 mẫu câu song ngữ và 12 câu hỏi ngữ pháp: chào hỏi, gia đình, công việc hằng ngày, đồ ăn & thức uống, mua sắm, địa điểm & chỉ đường, số đếm & thời gian, nhà cửa, phương tiện, thời tiết & quần áo, sở thích và sức khỏe.
- [x] Từ vựng, phiên âm IPA, mẫu câu song ngữ và đọc mẫu bằng Web Speech API.
- [x] Luyện nghe hiểu A1: nghe câu bằng giọng đọc của trình duyệt, chọn nghĩa tiếng Việt, xem câu sai và luyện lại riêng các câu sai; không nhầm với chấm phát âm.
- [x] Thẻ ghi nhớ: lật thẻ, lọc từ chưa nhớ, xáo trộn, đặt lại tiến độ và lưu cục bộ.
- [x] Luyện nói bằng nhận diện giọng nói có sẵn của trình duyệt; đối chiếu văn bản theo từng từ.
- [x] Bài ôn tập từ vựng; tiến độ bài học, thời gian học và chuỗi ngày học được lưu cục bộ trên thiết bị.
- [x] Sao lưu tiến độ bằng tệp JSON và gộp tiến độ từ thiết bị khác; không cần tài khoản hoặc dịch vụ đồng bộ đám mây.
- [x] Service worker ưu tiên tải HTML/CSS/JavaScript mới từ mạng và cập nhật cache; khi mất mạng hoặc máy chủ tạm lỗi, dùng bản cache gần nhất. API không được đưa vào cache.
- [x] Mỗi bài học có một mục ngữ pháp A1, ví dụ và câu hỏi trắc nghiệm tương tác; API trả cùng dữ liệu ngữ pháp.
- [x] API FastAPI cho danh sách/chi tiết bài học và kiểm thử tự động.
- [x] Adapter API tùy chọn cho OpenPronounce 0.4.0: giữ endpoint tương thích, trả điểm tổng câu và phản hồi lỗi theo từ/âm vị.
- [x] Adapter API riêng cho Pronunciada 1.1.1: endpoint `/api/v1/pronunciation/analyze-precise` trả xác suất tổng câu, từng từ và từng âm vị; chuyển âm thanh về WAV mono 16 kHz, giới hạn file/thời lượng và không tạo điểm giả khi inference lỗi.
- [x] CI có smoke test inference CPU INT8 thật với âm thanh eSpeak tổng hợp. Test xác nhận mô hình tải và trả điểm từng từ, không thay thế kiểm định với giọng người học Việt Nam.
- [x] Giới hạn 10 yêu cầu phân tích/phút/IP trên mỗi tiến trình backend; từ chối quá giới hạn bằng HTTP 429.
- [x] Kiểm tra thời lượng media bằng `ffprobe` trước khi giải mã (timeout 5 giây, tối đa 30 giây) và kiểm tra lại waveform sau giải mã để hạn chế tệp nén dài gây tiêu thụ RAM/CPU.
- [x] Docker chạy bằng tài khoản không phải root, có health check và được build/smoke-test trong CI.
- [ ] Triển khai backend HTTPS riêng có cài Pronunciada và model weights để website công khai có thể gửi âm thanh chấm điểm.

## Giới hạn cần biết
- Luyện nói trên trình duyệt vẫn là chế độ dự phòng. API chấm âm thanh dùng OpenPronounce khi cài optional engine; cần backend riêng, ffmpeg/espeak-ng và khoảng 2,4 GB model weights. Engine 0.4.0 trả điểm tổng câu và danh sách lỗi/IPA theo từ, không trả điểm số đã hiệu chuẩn riêng cho từng từ; confidence chỉ là độ tin cậy phát hiện lỗi.
- API FastAPI chưa được triển khai lên máy chủ công khai; GitHub Pages hiện chỉ xuất bản frontend tĩnh. Có thể chạy backend miễn phí trên máy cá nhân để thử nghiệm; không giả định có dịch vụ public luôn bật miễn phí.
- Giữ `openpronounce==0.4.0` (MIT) có chủ đích. PyPI phát hành 1.0.0 ngày 18/11/2026 với giấy phép AGPL-3.0 và API Python `assess()` mới; không tự nâng cấp trước khi rà soát giấy phép và chuyển đổi/kiểm thử adapter.
- Pronunciada 1.1.1 đã được nối vào API riêng, dùng `Scorer("en", precision="int8")` trên CPU. Model khoảng 71 MB được tải ở lần phân tích đầu tiên. Endpoint status chỉ báo package hiện diện; inference chỉ được xác nhận khi phân tích âm thanh thật thành công. CI smoke test dùng giọng eSpeak tổng hợp, không chứng minh độ chính xác trên người học Việt Nam.
- Giấy phép Pronunciada: mã nguồn Apache-2.0; gói có dữ liệu/lexicon theo các giấy phép bổ sung (CC-BY-SA-4.0, BSD-2-Clause, MIT); model ZIPA tải riêng theo CC BY 4.0. Phải giữ NOTICE/ghi công và tuân thủ giấy phép dữ liệu từ điển trước khi phân phối.
- Hugging Face ZeroGPU là tùy chọn Gradio; chỉ dùng nếu tài khoản cá nhân miễn phí đủ điều kiện và còn quota. Theo tài liệu Hugging Face hiện tại (18/11/2026), tài khoản cá nhân ở trạng thái tốt, đã xác minh email và có tuổi tài khoản trên 30 ngày có thể host tối đa 2 ZeroGPU Spaces; quota Free là 5 phút GPU/ngày. ZeroGPU chỉ hỗ trợ Gradio. Không nâng cấp PRO, không mua/nạp credits và không bật phần cứng trả phí; nếu hết quota hoặc không đủ điều kiện thì dừng, không phát sinh chi phí.
- CI kiểm tra cú pháp/tích hợp frontend, API tests, cấu hình Gradio và build/smoke-test Docker. Test backend cài thêm `httpx2` trong `requirements-dev.txt` để tránh đường tương thích cũ của Starlette TestClient.
- Rate limit trong bộ nhớ chỉ bảo vệ từng tiến trình; triển khai nhiều worker/instance cần thêm giới hạn dùng chung tại reverse proxy/API gateway. CORS không thay thế xác thực.
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
pip install -r requirements-dev.txt
python -m pytest -q
```

## Nguyên tắc phát triển
- Không chỉnh sửa website cũ `https://sansalecunglong.github.io/hoc-tieng-anh/`.
- Không triển khai dịch vụ trả phí hoặc lưu bí mật truy cập trong mã nguồn.
- Không gộp nhánh thử nghiệm vào `main` nếu chưa có xác nhận rõ ràng.
