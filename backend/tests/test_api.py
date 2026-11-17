from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_list_lessons_contains_six_a1_lessons():
    response = client.get("/api/v1/lessons")
    assert response.status_code == 200
    payload = response.json()
    assert payload["total"] == 6
    assert {item["id"] for item in payload["items"]} == {
        "greetings", "family", "daily-routine", "food-drinks", "shopping", "places-directions"
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


def test_pronunciation_status_reports_engine_honestly():
    result = client.get("/api/v1/pronunciation/status").json()
    assert "available" in result
    assert result["granularity"] in {"phoneme_and_word", "not_available"}
    assert result["engine"] in {"OpenPronounce", None}



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



def test_pronunciation_adapter_rejects_empty_audio_without_model():
    from app.pronunciation import analyze_recording

    try:
        analyze_recording(b"", "empty.webm", "Hello")
    except ValueError as exc:
        assert "trống" in str(exc)
    else:
        raise AssertionError("Empty audio must be rejected")


def test_pronunciation_adapter_rejects_long_text_without_model():
    from app.pronunciation import analyze_recording

    try:
        analyze_recording(b"audio", "voice.webm", "a" * 301)
    except ValueError as exc:
        assert "300 ký tự" in str(exc)
    else:
        raise AssertionError("Long text must be rejected")



def test_cors_allows_the_published_frontend():
    response = client.options(
        "/api/v1/pronunciation/status",
        headers={
            "Origin": "https://longmmo95.github.io",
            "Access-Control-Request-Method": "GET",
        },
    )
    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == "https://longmmo95.github.io"


def test_cors_rejects_unlisted_origins():
    response = client.options(
        "/api/v1/pronunciation/status",
        headers={
            "Origin": "https://untrusted.example",
            "Access-Control-Request-Method": "GET",
        },
    )
    assert "access-control-allow-origin" not in response.headers


def test_additional_a1_lessons_have_ten_words_and_five_phrases():
    for lesson_id in ("food-drinks", "shopping", "places-directions"):
        response = client.get(f"/api/v1/lessons/{lesson_id}")
        assert response.status_code == 200
        lesson = response.json()
        assert lesson["level"] == "A1"
        assert len(lesson["vocabulary"]) == 10
        assert len(lesson["phrases"]) == 5
