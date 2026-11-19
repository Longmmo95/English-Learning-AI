import os
from collections import defaultdict, deque
from threading import Lock
from time import monotonic

from fastapi import FastAPI, File, Form, HTTPException, Request, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.pronunciation import (
    MAX_AUDIO_BYTES,
    PronunciationEngineUnavailable,
    analyze_recording,
    engine_status,
)

app = FastAPI(title="English Learning AI API", version="0.3.0")

# Basic per-process protection for the public audio endpoint. For multi-worker or
# multi-instance deployments, enforce an additional shared limit at the proxy.
PRONUNCIATION_REQUESTS_PER_MINUTE = 10
_RATE_WINDOW_SECONDS = 60
_request_times = defaultdict(deque)
_request_times_lock = Lock()


@app.middleware("http")
async def pronunciation_rate_limit(request: Request, call_next):
    if request.method == "POST" and request.url.path == "/api/v1/pronunciation/analyze":
        client_ip = request.client.host if request.client else "unknown"
        now = monotonic()
        with _request_times_lock:
            recent = _request_times[client_ip]
            while recent and now - recent[0] >= _RATE_WINDOW_SECONDS:
                recent.popleft()
            if len(recent) >= PRONUNCIATION_REQUESTS_PER_MINUTE:
                retry_after = max(1, int(_RATE_WINDOW_SECONDS - (now - recent[0])))
                return JSONResponse(
                    status_code=429,
                    content={"detail": "Bạn gửi yêu cầu quá nhanh. Vui lòng chờ một phút rồi thử lại."},
                    headers={"Retry-After": str(retry_after)},
                )
            recent.append(now)
            if len(_request_times) > 5000:
                for ip in list(_request_times):
                    if not _request_times[ip] or now - _request_times[ip][-1] >= _RATE_WINDOW_SECONDS:
                        _request_times.pop(ip, None)
    return await call_next(request)
# Never expose the upload API to every website by default. Add local development
# origins explicitly through ELA_ALLOWED_ORIGINS when needed.
ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.getenv("ELA_ALLOWED_ORIGINS", "https://longmmo95.github.io").split(",")
    if origin.strip()
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

LESSONS = [
    {
        "id": "greetings", "level": "A1", "title": "Chào hỏi & giới thiệu",
        "description": "Làm quen với những câu tiếng Anh đầu tiên.",
        "vocabulary": [
            {"word": "hello", "meaning_vi": "xin chào"},
            {"word": "good morning", "meaning_vi": "chào buổi sáng"},
            {"word": "name", "meaning_vi": "tên"},
            {"word": "meet", "meaning_vi": "gặp"},
            {"word": "nice", "meaning_vi": "vui, tốt"},
            {"word": "thank you", "meaning_vi": "cảm ơn"},
        ],
        "phrases": [
            {"english": "Hello!", "vietnamese": "Xin chào!"},
            {"english": "My name is Long.", "vietnamese": "Tên tôi là Long."},
            {"english": "Nice to meet you.", "vietnamese": "Rất vui được gặp bạn."},
            {"english": "How are you?", "vietnamese": "Bạn khỏe không?"},
            {"english": "I am fine, thank you.", "vietnamese": "Tôi khỏe, cảm ơn bạn."},
        ],
    },
    {
        "id": "family", "level": "A1", "title": "Gia đình của tôi",
        "description": "Gọi tên người thân và giới thiệu gia đình.",
        "vocabulary": [
            {"word": "family", "meaning_vi": "gia đình"},
            {"word": "father", "meaning_vi": "bố"},
            {"word": "mother", "meaning_vi": "mẹ"},
            {"word": "brother", "meaning_vi": "anh/em trai"},
            {"word": "sister", "meaning_vi": "chị/em gái"},
            {"word": "parents", "meaning_vi": "bố mẹ"},
            {"word": "son", "meaning_vi": "con trai"},
            {"word": "daughter", "meaning_vi": "con gái"},
        ],
        "phrases": [
            {"english": "This is my family.", "vietnamese": "Đây là gia đình tôi."},
            {"english": "I love my mother.", "vietnamese": "Tôi yêu mẹ tôi."},
            {"english": "He is my father.", "vietnamese": "Ông ấy là bố tôi."},
            {"english": "I have one brother.", "vietnamese": "Tôi có một anh/em trai."},
            {"english": "We are a happy family.", "vietnamese": "Chúng tôi là một gia đình hạnh phúc."},
        ],
    },
    {
        "id": "daily-routine", "level": "A1", "title": "Công việc hằng ngày",
        "description": "Nói về giờ giấc và những hoạt động quen thuộc mỗi ngày.",
        "vocabulary": [
            {"word": "wake up", "meaning_vi": "thức dậy"},
            {"word": "breakfast", "meaning_vi": "bữa sáng"},
            {"word": "work", "meaning_vi": "làm việc"},
            {"word": "go", "meaning_vi": "đi"},
            {"word": "home", "meaning_vi": "nhà"},
            {"word": "morning", "meaning_vi": "buổi sáng"},
            {"word": "evening", "meaning_vi": "buổi tối"},
            {"word": "sleep", "meaning_vi": "ngủ"},
            {"word": "lunch", "meaning_vi": "bữa trưa"},
            {"word": "usually", "meaning_vi": "thường xuyên"},
        ],
        "phrases": [
            {"english": "I wake up at six.", "vietnamese": "Tôi thức dậy lúc sáu giờ."},
            {"english": "I have breakfast at home.", "vietnamese": "Tôi ăn sáng ở nhà."},
            {"english": "I go to work at eight.", "vietnamese": "Tôi đi làm lúc tám giờ."},
            {"english": "I have lunch at noon.", "vietnamese": "Tôi ăn trưa vào buổi trưa."},
            {"english": "I go to bed at ten.", "vietnamese": "Tôi đi ngủ lúc mười giờ."},
        ],
    },
    {
        "id": "food-drinks", "level": "A1", "title": "Đồ ăn & thức uống",
        "description": "Gọi tên món ăn, đồ uống và nói về sở thích đơn giản.",
        "vocabulary": [
            {"word": "food", "meaning_vi": "đồ ăn"}, {"word": "water", "meaning_vi": "nước"},
            {"word": "rice", "meaning_vi": "cơm, gạo"}, {"word": "bread", "meaning_vi": "bánh mì"},
            {"word": "chicken", "meaning_vi": "thịt gà"}, {"word": "fish", "meaning_vi": "cá"},
            {"word": "apple", "meaning_vi": "quả táo"}, {"word": "coffee", "meaning_vi": "cà phê"},
            {"word": "milk", "meaning_vi": "sữa"}, {"word": "hungry", "meaning_vi": "đói"}
        ],
        "phrases": [
            {"english": "I am hungry.", "vietnamese": "Tôi đang đói."},
            {"english": "I would like some water.", "vietnamese": "Tôi muốn uống một chút nước."},
            {"english": "I eat rice every day.", "vietnamese": "Tôi ăn cơm mỗi ngày."},
            {"english": "This is an apple.", "vietnamese": "Đây là một quả táo."},
            {"english": "I like chicken.", "vietnamese": "Tôi thích thịt gà."}
        ]
    },
    {
        "id": "shopping", "level": "A1", "title": "Mua sắm",
        "description": "Hỏi giá, chọn đồ và nói về kích cỡ khi mua sắm.",
        "vocabulary": [
            {"word": "shop", "meaning_vi": "cửa hàng"}, {"word": "price", "meaning_vi": "giá"},
            {"word": "money", "meaning_vi": "tiền"}, {"word": "buy", "meaning_vi": "mua"},
            {"word": "sell", "meaning_vi": "bán"}, {"word": "cheap", "meaning_vi": "rẻ"},
            {"word": "expensive", "meaning_vi": "đắt"}, {"word": "size", "meaning_vi": "kích cỡ"},
            {"word": "small", "meaning_vi": "nhỏ"}, {"word": "large", "meaning_vi": "lớn"}
        ],
        "phrases": [
            {"english": "How much is this?", "vietnamese": "Cái này giá bao nhiêu?"},
            {"english": "It is too expensive.", "vietnamese": "Nó đắt quá."},
            {"english": "I want to buy this.", "vietnamese": "Tôi muốn mua cái này."},
            {"english": "Do you have a smaller size?", "vietnamese": "Bạn có cỡ nhỏ hơn không?"},
            {"english": "Can I pay by card?", "vietnamese": "Tôi có thể thanh toán bằng thẻ không?"}
        ]
    },
    {
        "id": "places-directions", "level": "A1", "title": "Địa điểm & chỉ đường",
        "description": "Hỏi vị trí các địa điểm quen thuộc và hiểu chỉ dẫn cơ bản.",
        "vocabulary": [
            {"word": "station", "meaning_vi": "nhà ga"}, {"word": "hospital", "meaning_vi": "bệnh viện"},
            {"word": "bank", "meaning_vi": "ngân hàng"}, {"word": "school", "meaning_vi": "trường học"},
            {"word": "street", "meaning_vi": "đường phố"}, {"word": "left", "meaning_vi": "bên trái"},
            {"word": "right", "meaning_vi": "bên phải"}, {"word": "near", "meaning_vi": "gần"},
            {"word": "far", "meaning_vi": "xa"}, {"word": "where", "meaning_vi": "ở đâu"}
        ],
        "phrases": [
            {"english": "Where is the bank?", "vietnamese": "Ngân hàng ở đâu?"},
            {"english": "Go straight ahead.", "vietnamese": "Đi thẳng về phía trước."},
            {"english": "Turn left at the corner.", "vietnamese": "Rẽ trái ở góc đường."},
            {"english": "The hospital is near here.", "vietnamese": "Bệnh viện ở gần đây."},
            {"english": "Is it far from here?", "vietnamese": "Nó có xa đây không?"}
        ]
    }
]

GRAMMAR_LESSONS = {
    "greetings": {"title": "Động từ to be: am / is / are", "explanation_vi": "Dùng am với I, is với he/she/it và are với you/we/they.", "example": "I am Long. You are my friend.", "question_vi": "Chọn từ đúng: I ___ Long.", "options": ["am", "is", "are"], "answer": "am", "feedback_vi": "Với chủ ngữ I, dùng am."},
    "family": {"title": "Tính từ sở hữu: my / his / her", "explanation_vi": "Đặt my, his hoặc her trước danh từ để nói người/vật thuộc về ai.", "example": "This is my mother. Her name is Lan.", "question_vi": "This is ___ mother.", "options": ["I", "my", "me"], "answer": "my", "feedback_vi": "My đứng trước danh từ mother; I là chủ ngữ, me là tân ngữ."},
    "daily-routine": {"title": "Hiện tại đơn với I / you / we / they", "explanation_vi": "Khi nói về thói quen, với I, you, we và they ta dùng động từ nguyên mẫu.", "example": "I wake up at six. We go to work at eight.", "question_vi": "I ___ up at six.", "options": ["wake", "wakes", "waking"], "answer": "wake", "feedback_vi": "Sau chủ ngữ I, dùng động từ nguyên mẫu wake."},
    "food-drinks": {"title": "A / an / some", "explanation_vi": "Dùng a/an với danh từ đếm được số ít; dùng some với danh từ không đếm được hoặc danh từ số nhiều.", "example": "an apple · a sandwich · some water", "question_vi": "I would like ___ water.", "options": ["a", "an", "some"], "answer": "some", "feedback_vi": "Water là danh từ không đếm được nên dùng some."},
    "shopping": {"title": "Hỏi giá với How much", "explanation_vi": "Dùng How much is this? để hỏi giá một món hàng hoặc hỏi lượng không đếm được.", "example": "How much is this? It is ten dollars.", "question_vi": "How ___ is this?", "options": ["many", "much", "old"], "answer": "much", "feedback_vi": "How much dùng để hỏi giá; How many dùng với danh từ đếm được số nhiều."},
    "places-directions": {"title": "Câu mệnh lệnh khi chỉ đường", "explanation_vi": "Dùng động từ nguyên mẫu ở đầu câu để đưa ra chỉ dẫn; không thêm -s hoặc -ing.", "example": "Go straight. Turn left at the corner.", "question_vi": "___ left at the corner.", "options": ["Turn", "Turns", "Turning"], "answer": "Turn", "feedback_vi": "Câu mệnh lệnh bắt đầu bằng động từ nguyên mẫu Turn."},
}

for lesson in LESSONS:
    lesson["grammar"] = GRAMMAR_LESSONS[lesson["id"]]



@app.get("/health")
def health():
    return {"status": "ok", "service": "english-learning-ai-api"}


@app.get("/api/v1/lessons")
def list_lessons():
    return {"items": LESSONS, "total": len(LESSONS)}


@app.get("/api/v1/lessons/{lesson_id}")
def get_lesson(lesson_id: str):
    for lesson in LESSONS:
        if lesson["id"] == lesson_id:
            return lesson
    raise HTTPException(status_code=404, detail="Không tìm thấy bài học")


@app.get("/api/v1/pronunciation/status")
def pronunciation_status():
    return engine_status()


@app.post("/api/v1/pronunciation/analyze")
def pronunciation_analyze(
    file: UploadFile = File(...),
    expected_text: str = Form(...),
):
    audio_bytes = file.file.read(MAX_AUDIO_BYTES + 1)
    if len(audio_bytes) > MAX_AUDIO_BYTES:
        raise HTTPException(status_code=413, detail="Bản ghi âm vượt quá giới hạn 12 MB.")
    try:
        return analyze_recording(audio_bytes, file.filename or "recording.webm", expected_text)
    except PronunciationEngineUnavailable as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail="Không thể phân tích bản ghi âm. Hãy thử lại với câu ngắn và âm thanh rõ hơn.",
        ) from exc
