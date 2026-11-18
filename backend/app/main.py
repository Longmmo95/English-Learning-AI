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
        "id": "greetings",
        "level": "A1",
        "title": "Chào hỏi & giới thiệu",
        "description": "Làm quen với những câu tiếng Anh đầu tiên.",
        "vocabulary": [
            {
                "word": "hello",
                "meaning_vi": "xin chào",
                "ipa": "/həˈloʊ/"
            },
            {
                "word": "good morning",
                "meaning_vi": "chào buổi sáng",
                "ipa": "/ɡʊd ˈmɔːrnɪŋ/"
            },
            {
                "word": "name",
                "meaning_vi": "tên",
                "ipa": "/neɪm/"
            },
            {
                "word": "meet",
                "meaning_vi": "gặp",
                "ipa": "/miːt/"
            },
            {
                "word": "nice",
                "meaning_vi": "vui, tốt",
                "ipa": "/naɪs/"
            },
            {
                "word": "thank you",
                "meaning_vi": "cảm ơn",
                "ipa": "/θæŋk juː/"
            }
        ],
        "phrases": [
            {
                "english": "Hello!",
                "meaning_vi": "Xin chào!"
            },
            {
                "english": "My name is Long.",
                "meaning_vi": "Tên tôi là Long."
            },
            {
                "english": "Nice to meet you.",
                "meaning_vi": "Rất vui được gặp bạn."
            },
            {
                "english": "How are you?",
                "meaning_vi": "Bạn khỏe không?"
            }
        ]
    },
    {
        "id": "family",
        "level": "A1",
        "title": "Gia đình của tôi",
        "description": "Gọi tên những người thân và giới thiệu gia đình.",
        "vocabulary": [
            {
                "word": "family",
                "meaning_vi": "gia đình",
                "ipa": "/ˈfæməli/"
            },
            {
                "word": "father",
                "meaning_vi": "bố",
                "ipa": "/ˈfɑːðər/"
            },
            {
                "word": "mother",
                "meaning_vi": "mẹ",
                "ipa": "/ˈmʌðər/"
            },
            {
                "word": "parents",
                "meaning_vi": "bố mẹ",
                "ipa": "/ˈperənts/"
            },
            {
                "word": "brother",
                "meaning_vi": "anh/em trai",
                "ipa": "/ˈbrʌðər/"
            },
            {
                "word": "sister",
                "meaning_vi": "chị/em gái",
                "ipa": "/ˈsɪstər/"
            },
            {
                "word": "son",
                "meaning_vi": "con trai",
                "ipa": "/sʌn/"
            },
            {
                "word": "daughter",
                "meaning_vi": "con gái",
                "ipa": "/ˈdɔːtər/"
            }
        ],
        "phrases": [
            {
                "english": "This is my family.",
                "meaning_vi": "Đây là gia đình tôi."
            },
            {
                "english": "My father is kind.",
                "meaning_vi": "Bố tôi rất tốt bụng."
            },
            {
                "english": "I have one brother.",
                "meaning_vi": "Tôi có một người anh/em trai."
            },
            {
                "english": "Her name is Anna.",
                "meaning_vi": "Tên cô ấy là Anna."
            },
            {
                "english": "We live together.",
                "meaning_vi": "Chúng tôi sống cùng nhau."
            }
        ]
    },
    {
        "id": "daily-routine",
        "level": "A1",
        "title": "Công việc hằng ngày",
        "description": "Nói về thời gian biểu và những hoạt động quen thuộc.",
        "vocabulary": [
            {
                "word": "wake up",
                "meaning_vi": "thức giấc",
                "ipa": "/weɪk ʌp/"
            },
            {
                "word": "get up",
                "meaning_vi": "ra khỏi giường",
                "ipa": "/ɡet ʌp/"
            },
            {
                "word": "brush my teeth",
                "meaning_vi": "đánh răng",
                "ipa": "/brʌʃ maɪ tiːθ/"
            },
            {
                "word": "take a shower",
                "meaning_vi": "tắm vòi sen",
                "ipa": "/teɪk ə ˈʃaʊər/"
            },
            {
                "word": "breakfast",
                "meaning_vi": "bữa sáng",
                "ipa": "/ˈbrekfəst/"
            },
            {
                "word": "go to work",
                "meaning_vi": "đi làm",
                "ipa": "/ɡoʊ tə wɜːrk/"
            },
            {
                "word": "study",
                "meaning_vi": "học",
                "ipa": "/ˈstʌdi/"
            },
            {
                "word": "lunch",
                "meaning_vi": "bữa trưa",
                "ipa": "/lʌntʃ/"
            },
            {
                "word": "dinner",
                "meaning_vi": "bữa tối",
                "ipa": "/ˈdɪnər/"
            },
            {
                "word": "go to bed",
                "meaning_vi": "đi ngủ",
                "ipa": "/ɡoʊ tə bed/"
            }
        ],
        "phrases": [
            {
                "english": "I wake up at six.",
                "meaning_vi": "Tôi thức dậy lúc sáu giờ."
            },
            {
                "english": "I have breakfast at seven.",
                "meaning_vi": "Tôi ăn sáng lúc bảy giờ."
            },
            {
                "english": "I go to work by bus.",
                "meaning_vi": "Tôi đi làm bằng xe buýt."
            },
            {
                "english": "I study English every day.",
                "meaning_vi": "Tôi học tiếng Anh mỗi ngày."
            },
            {
                "english": "I go to bed at ten.",
                "meaning_vi": "Tôi đi ngủ lúc mười giờ."
            }
        ]
    },
    {
        "id": "food-drinks",
        "level": "A1",
        "title": "Đồ ăn & thức uống",
        "description": "Gọi tên món ăn, đồ uống và nói về sở thích đơn giản.",
        "vocabulary": [
            {"word": "water", "meaning_vi": "nước", "ipa": "/ˈwɔːtər/"},
            {"word": "milk", "meaning_vi": "sữa", "ipa": "/mɪlk/"},
            {"word": "bread", "meaning_vi": "bánh mì", "ipa": "/bred/"},
            {"word": "rice", "meaning_vi": "cơm, gạo", "ipa": "/raɪs/"},
            {"word": "apple", "meaning_vi": "quả táo", "ipa": "/ˈæpəl/"},
            {"word": "banana", "meaning_vi": "quả chuối", "ipa": "/bəˈnænə/"},
            {"word": "chicken", "meaning_vi": "thịt gà", "ipa": "/ˈtʃɪkɪn/"},
            {"word": "fish", "meaning_vi": "cá", "ipa": "/fɪʃ/"}
        ],
        "phrases": [
            {"english": "I drink water.", "meaning_vi": "Tôi uống nước."},
            {"english": "I like apples.", "meaning_vi": "Tôi thích táo."},
            {"english": "I eat rice every day.", "meaning_vi": "Tôi ăn cơm mỗi ngày."},
            {"english": "Can I have some water?", "meaning_vi": "Tôi có thể xin một chút nước không?"},
            {"english": "The food is delicious.", "meaning_vi": "Món ăn rất ngon."}
        ]
    }
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
