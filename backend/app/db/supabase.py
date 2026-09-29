from functools import lru_cache

from fastapi import HTTPException
from supabase import Client, create_client

from app.core.config import get_settings


@lru_cache
def get_supabase() -> Client:
    settings = get_settings()
    if not settings.supabase_url or not settings.supabase_key:
        raise HTTPException(503, "Supabase belum dikonfigurasi di backend/.env.")
    return create_client(settings.supabase_url, settings.supabase_key)
