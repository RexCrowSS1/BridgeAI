from fastapi import APIRouter, Depends
from supabase import Client

from app.core.config import get_settings
from app.db.supabase import get_supabase
from app.schemas.health import HealthResponse
from app.services.health import check_database

router = APIRouter()


@router.get("", response_model=HealthResponse)
def health():
    return HealthResponse(service=get_settings().app_name)


@router.get("/database", response_model=HealthResponse)
def database_health(client: Client = Depends(get_supabase)):
    check_database(client)
    return HealthResponse(service="Supabase")
