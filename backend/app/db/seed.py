"""
app/db/seed.py
Seeds the initial admin account on application startup if it doesn't exist.
Credentials are read from environment variables — never hardcoded here.
"""
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.logging import logger
from app.core.security import hash_password
from app.repositories.admin_repository import AdminRepository


async def seed_admin(db: AsyncSession) -> None:
    """
    Create the default admin account if it doesn't already exist.
    Called once during app startup.
    """
    if not settings.ADMIN_SEED_EMAIL or not settings.ADMIN_SEED_PASSWORD:
        logger.warning("admin_seed_skipped", reason="ADMIN_SEED_EMAIL or ADMIN_SEED_PASSWORD not set")
        return

    repo = AdminRepository(db)
    existing = await repo.get_by_email(settings.ADMIN_SEED_EMAIL)
    if existing:
        logger.info("admin_seed_skipped", reason="Admin already exists", email=settings.ADMIN_SEED_EMAIL)
        return

    hashed = hash_password(settings.ADMIN_SEED_PASSWORD)
    admin = await repo.create(
        email=settings.ADMIN_SEED_EMAIL,
        hashed_password=hashed,
        full_name=settings.ADMIN_SEED_FULL_NAME,
    )
    await db.commit()
    logger.info("admin_seeded", email=admin.email, id=admin.id)