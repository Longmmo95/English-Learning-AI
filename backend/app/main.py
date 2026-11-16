from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="English Learning AI API", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict to the deployed frontend origin before production.
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

LESSONS = [
    {"id": "greetings", "level": "A1", "title": "Chào hỏi & giới thiệu",
     "description": "Làm quen với những câu tiếng Anh đầu tiên.",
     "vocabulary": [{"word": "hello", "meaning_vi": "xin chào"},
                    {"word": "good morning", "meaning_vi": "chào buổi sáng"},
                    {"word": "name", "meaning_vi": "tên"},
                    {"word": "meet", "meaning_vi": "gặp"},
                    {"word": "nice", "meaning_vi": "vui, tốt"},
                    {"word": "thank you", "meaning_vi": "cảm ơn"}]},
    {"id": "family", "level": "A1", "title": "Gia đình của tôi",
     "description": "Gọi tên những người thân trong gia đình.",
     "vocabulary": [{"word": "family", "meaning_vi": "gia đình"},
                    {"word": "father", "meaning_vi": "bố"},
                    {"word": "mother", "meaning_vi": "mẹ"},
                    {"word": "brother", "meaning_vi": "anh/em trai"}]},
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
    return {"available": False, "granularity": "word",
            "message": "Chưa tích hợp mô hình nhận diện và căn chỉnh phát âm. Không trả về điểm số giả."}
