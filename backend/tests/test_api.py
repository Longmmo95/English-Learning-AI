from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

def test_list_lessons():
    response = client.get("/api/v1/lessons")
    assert response.status_code == 200
    assert response.json()["total"] >= 1

def test_get_lesson():
    response = client.get("/api/v1/lessons/greetings")
    assert response.status_code == 200
    assert response.json()["level"] == "A1"

def test_unknown_lesson():
    assert client.get("/api/v1/lessons/not-real").status_code == 404

def test_pronunciation_is_not_faked():
    result = client.get("/api/v1/pronunciation/status").json()
    assert result["available"] is False
    assert result["granularity"] == "word"
