from fastapi.testclient import TestClient

from app.db.supabase import get_supabase
from app.main import app

client = TestClient(app)


def test_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_database_failure_does_not_expose_details():
    class BrokenDatabase:
        def table(self, name):
            raise RuntimeError("sensitive connection details")

    app.dependency_overrides[get_supabase] = lambda: BrokenDatabase()
    try:
        response = client.get("/api/health/database")
        assert response.status_code == 503
        assert "sensitive" not in response.text
    finally:
        app.dependency_overrides.clear()
