import logging

from fastapi import HTTPException
from supabase import Client

logger = logging.getLogger(__name__)


def check_database(client: Client) -> None:
    try:
        client.table("app_health").select("id").limit(1).execute()
    except Exception as exc:
        logger.warning("Supabase health check failed: %s", type(exc).__name__)
        raise HTTPException(
            503, "Koneksi Supabase gagal. Periksa environment dan jalankan migrasi SQL."
        ) from exc
