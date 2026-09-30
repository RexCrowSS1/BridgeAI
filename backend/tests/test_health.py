from fastapi.testclient import TestClient
from postgrest.exceptions import APIError

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


def test_missing_database_table_explains_required_migration():
    class MissingTableDatabase:
        def table(self, name):
            return self

        def select(self, columns):
            return self

        def limit(self, count):
            return self

        def execute(self):
            raise APIError({"code": "PGRST205", "message": "private error details"})

    app.dependency_overrides[get_supabase] = lambda: MissingTableDatabase()
    try:
        response = client.get("/api/health/database")
        assert response.status_code == 503
        assert "202609280001_app_health.sql" in response.json()["detail"]
        assert "private error details" not in response.text
    finally:
        app.dependency_overrides.clear()
