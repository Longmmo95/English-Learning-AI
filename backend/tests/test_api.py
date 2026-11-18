from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_list_lessons_contains_three_a1_topics():
    response = client.get("/api/v1/lessons")
    assert response.status_code == 200
    payload = response.json()
    assert payload["total"] == 3
    assert [item["id"] for item in payload["items"]] == [
        "greetings", "family", "daily-routine"
    ]
    assert all(item["level"] == "A1" for item in payload["items"])


def test_get_lesson_includes_vocabulary_and_phrases():
    response = client.get("/api/v1/lessons/family")
    assert response.status_code == 200
    lesson = response.json()
    assert lesson["level"] == "A1"
    assert len(lesson["vocabulary"]) == 8
    assert len(lesson["phrases"]) == 5


def test_daily_routine_has_ten_words_and_five_phrases():
    lesson = client.get("/api/v1/lessons/daily-routine").json()
    assert len(lesson["vocabulary"]) == 10
    assert len(lesson["phrases"]) == 5


def test_unknown_lesson_returns_404():
    assert client.get("/api/v1/lessons/not-real").status_code == 404


def test_pronunciation_is_not_faked():
    result = client.get("/api/v1/pronunciation/status").json()
    assert result["available"] is False
    assert result["granularity"] == "word"
    assert "Không trả về điểm số giả" in result["message"]
