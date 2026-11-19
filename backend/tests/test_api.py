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
    assert payload["total"] == 4
    assert [item["id"] for item in payload["items"]] == [
        "greetings", "family", "daily-routine", "food-drinks"
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


def test_pronunciation_status_reports_optional_engine():
    result = client.get("/api/v1/pronunciation/status").json()
    assert "available" in result
    if result["available"]:
        assert result["engine"] == "OpenPronounce"
    else:
        assert "chưa cài engine" in result["message"].lower()


def test_pronunciation_rejects_unsupported_audio_format():
    response = client.post(
        "/api/v1/pronunciation/assess",
        data={"expected_text": "Hello"},
        files={"audio": ("recording.txt", b"not audio", "text/plain")},
    )
    assert response.status_code == 415


def test_food_and_drinks_lesson_has_eight_words_and_five_phrases():
    lesson = client.get("/api/v1/lessons/food-drinks").json()
    assert lesson["level"] == "A1"
    assert len(lesson["vocabulary"]) == 8
    assert len(lesson["phrases"]) == 5
    assert lesson["vocabulary"][0]["word"] == "water"



def test_cors_allows_local_frontend_origin():
    response = client.options(
        "/api/v1/pronunciation/status",
        headers={
            "Origin": "http://localhost:8080",
            "Access-Control-Request-Method": "GET",
        },
    )
    assert response.status_code == 200
    assert response.headers.get("access-control-allow-origin") == "http://localhost:8080"


def test_pronunciation_rejects_empty_expected_text_before_engine_check():
    response = client.post(
        "/api/v1/pronunciation/assess",
        data={"expected_text": "   "},
        files={"audio": ("recording.wav", b"not-empty", "audio/wav")},
    )
    assert response.status_code == 422
