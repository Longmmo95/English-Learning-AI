from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_list_lessons_contains_three_a1_lessons():
    response = client.get("/api/v1/lessons")
    assert response.status_code == 200
    payload = response.json()
    assert payload["total"] == 3
    assert {item["id"] for item in payload["items"]} == {
        "greetings", "family", "daily-routine"
    }


def test_get_greetings_lesson():
    response = client.get("/api/v1/lessons/greetings")
    assert response.status_code == 200
    lesson = response.json()
    assert lesson["level"] == "A1"
    assert len(lesson["vocabulary"]) == 6
    assert len(lesson["phrases"]) == 5


def test_family_lesson_has_eight_words_and_five_phrases():
    lesson = client.get("/api/v1/lessons/family").json()
    assert len(lesson["vocabulary"]) == 8
    assert len(lesson["phrases"]) == 5


def test_daily_routine_lesson():
    lesson = client.get("/api/v1/lessons/daily-routine").json()
    assert lesson["level"] == "A1"
    assert len(lesson["vocabulary"]) == 10
    assert len(lesson["phrases"]) == 5


def test_unknown_lesson():
    assert client.get("/api/v1/lessons/not-real").status_code == 404


def test_pronunciation_is_not_faked():
    result = client.get("/api/v1/pronunciation/status").json()
    assert result["available"] is False
    assert result["granularity"] == "word"
    assert "điểm số giả" in result["message"]



def test_pronunciation_status_reports_optional_engine_state():
    result = client.get("/api/v1/pronunciation/status")
    assert result.status_code == 200
    payload = result.json()
    assert "available" in payload
    assert payload["granularity"] in {"phoneme_and_word", "not_available"}


def test_pronunciation_upload_returns_service_unavailable_without_engine(monkeypatch):
    import app.main as main_module
    from app.pronunciation import PronunciationEngineUnavailable

    def unavailable(*args, **kwargs):
        raise PronunciationEngineUnavailable("Engine missing")

    monkeypatch.setattr(main_module, "analyze_recording", unavailable)
    response = client.post(
        "/api/v1/pronunciation/analyze",
        files={"file": ("voice.webm", b"fake-audio", "audio/webm")},
        data={"expected_text": "Hello"},
    )
    assert response.status_code == 503
    assert "Engine missing" in response.json()["detail"]


def test_pronunciation_upload_validates_bad_input(monkeypatch):
    import app.main as main_module

    def invalid(*args, **kwargs):
        raise ValueError("Vui lòng chọn câu tiếng Anh cần luyện.")

    monkeypatch.setattr(main_module, "analyze_recording", invalid)
    response = client.post(
        "/api/v1/pronunciation/analyze",
        files={"file": ("voice.webm", b"fake-audio", "audio/webm")},
        data={"expected_text": " "},
    )
    assert response.status_code == 422
