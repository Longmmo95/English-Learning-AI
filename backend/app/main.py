from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="English Learning AI API", version="0.2.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict to the deployed frontend origin before production.
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
]


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
    return {
        "available": False,
        "granularity": "word",
        "message": (
            "Chưa tích hợp mô hình AI nhận diện và căn chỉnh phát âm. "
            "Không trả về điểm số giả. Bản web tĩnh có thể dùng nhận diện giọng nói "
            "của trình duyệt để đối chiếu văn bản, không phải chấm âm vị."
        ),
    }
