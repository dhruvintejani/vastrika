# """
# app/repositories/admin_repository.py
# Database access layer for Admin and AdminSession models.
# """
# from datetime import datetime, timezone
# from typing import Optional

# from sqlalchemy import and_, func, select, update
# from sqlalchemy.ext.asyncio import AsyncSession

# from app.models.admin import Admin, AdminSession
# from app.core.config import settings


# class AdminRepository:
#     def __init__(self, db: AsyncSession):
#         self.db = db

#     # ── Admin CRUD ────────────────────────────────────────────────────────────

#     async def get_by_id(self, admin_id: int) -> Optional[Admin]:
#         result = await self.db.execute(select(Admin).where(Admin.id == admin_id))
#         return result.scalar_one_or_none()

#     async def get_by_email(self, email: str) -> Optional[Admin]:
#         result = await self.db.execute(
#             select(Admin).where(Admin.email == email.lower())
#         )
#         return result.scalar_one_or_none()

#     async def create(
#         self, email: str, hashed_password: str, full_name: str
#     ) -> Admin:
#         admin = Admin(
#             email=email.lower(),
#             hashed_password=hashed_password,
#             full_name=full_name,
#         )
#         self.db.add(admin)
#         await self.db.flush()
#         await self.db.refresh(admin)
#         return admin

#     # ── Session management ────────────────────────────────────────────────────

#     async def count_active_sessions(self, admin_id: int) -> int:
#         """Count currently active (non-expired) sessions for this admin."""
#         now = datetime.now(timezone.utc)
#         result = await self.db.execute(
#             select(func.count(AdminSession.id)).where(
#                 and_(
#                     AdminSession.admin_id == admin_id,
#                     AdminSession.is_active == True,  # noqa: E712
#                     AdminSession.expires_at > now,
#                 )
#             )
#         )
#         return result.scalar_one()

#     async def create_session(
#         self, admin_id: int, jti: str, expires_at: datetime
#     ) -> AdminSession:
#         session = AdminSession(
#             admin_id=admin_id,
#             token_jti=jti,
#             expires_at=expires_at,
#             is_active=True,
#             created_at=datetime.now(timezone.utc),
#         )
#         self.db.add(session)
#         await self.db.flush()
#         return session

#     async def get_active_session_by_jti(self, jti: str) -> Optional[AdminSession]:
#         """Return the session if it exists, is active, and has not expired."""
#         now = datetime.now(timezone.utc)
#         result = await self.db.execute(
#             select(AdminSession).where(
#                 and_(
#                     AdminSession.token_jti == jti,
#                     AdminSession.is_active == True,  # noqa: E712
#                     AdminSession.expires_at > now,
#                 )
#             )
#         )
#         return result.scalar_one_or_none()

#     async def revoke_session_by_jti(self, jti: str) -> None:
#         await self.db.execute(
#             update(AdminSession)
#             .where(AdminSession.token_jti == jti)
#             .values(is_active=False)
#         )
#         await self.db.flush()

#     async def expire_stale_sessions(self, admin_id: int) -> None:
#         """Mark expired sessions as inactive (housekeeping)."""
#         now = datetime.now(timezone.utc)
#         await self.db.execute(
#             update(AdminSession)
#             .where(
#                 and_(
#                     AdminSession.admin_id == admin_id,
#                     AdminSession.expires_at <= now,
#                     AdminSession.is_active == True,  # noqa: E712
#                 )
#             )
#             .values(is_active=False)
#         )
#         await self.db.flush()

"""
app/repositories/admin_repository.py
Database access layer for Admin and AdminSession models.
"""
from datetime import datetime, timezone
from typing import Optional

from sqlalchemy import and_, asc, func, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.admin import Admin, AdminSession
from app.core.config import settings


class AdminRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    # ── Admin CRUD ────────────────────────────────────────────────────────────

    async def get_by_id(self, admin_id: int) -> Optional[Admin]:
        result = await self.db.execute(select(Admin).where(Admin.id == admin_id))
        return result.scalar_one_or_none()

    async def get_by_email(self, email: str) -> Optional[Admin]:
        result = await self.db.execute(
            select(Admin).where(Admin.email == email.lower())
        )
        return result.scalar_one_or_none()

    async def create(
        self, email: str, hashed_password: str, full_name: str
    ) -> Admin:
        admin = Admin(
            email=email.lower(),
            hashed_password=hashed_password,
            full_name=full_name,
        )
        self.db.add(admin)
        await self.db.flush()
        await self.db.refresh(admin)
        return admin

    # ── Session management ────────────────────────────────────────────────────

    async def count_active_sessions(self, admin_id: int) -> int:
        """Count currently active (non-expired) sessions for this admin."""
        now = datetime.now(timezone.utc)
        result = await self.db.execute(
            select(func.count(AdminSession.id)).where(
                and_(
                    AdminSession.admin_id == admin_id,
                    AdminSession.is_active == True,  # noqa: E712
                    AdminSession.expires_at > now,
                )
            )
        )
        return result.scalar_one()

    async def create_session(
        self, admin_id: int, jti: str, expires_at: datetime
    ) -> AdminSession:
        session = AdminSession(
            admin_id=admin_id,
            token_jti=jti,
            expires_at=expires_at,
            is_active=True,
            created_at=datetime.now(timezone.utc),
        )
        self.db.add(session)
        await self.db.flush()
        return session

    async def get_active_session_by_jti(self, jti: str) -> Optional[AdminSession]:
        """Return the session if it exists, is active, and has not expired."""
        now = datetime.now(timezone.utc)
        result = await self.db.execute(
            select(AdminSession).where(
                and_(
                    AdminSession.token_jti == jti,
                    AdminSession.is_active == True,  # noqa: E712
                    AdminSession.expires_at > now,
                )
            )
        )
        return result.scalar_one_or_none()

    async def revoke_session_by_jti(self, jti: str) -> None:
        await self.db.execute(
            update(AdminSession)
            .where(AdminSession.token_jti == jti)
            .values(is_active=False)
        )
        await self.db.flush()

    async def expire_stale_sessions(self, admin_id: int) -> None:
        """
        Mark expired sessions as inactive (housekeeping).
        This cleans up ghost sessions left behind by hard server restarts
        (Ctrl+C during development) where the logout endpoint was never called.
        Previously these sessions stayed 'active' in the DB for up to 8 hours
        even though no real browser was using them, consuming slots in the
        session limit and blocking new logins.
        """
        now = datetime.now(timezone.utc)
        await self.db.execute(
            update(AdminSession)
            .where(
                and_(
                    AdminSession.admin_id == admin_id,
                    AdminSession.expires_at <= now,
                    AdminSession.is_active == True,  # noqa: E712
                )
            )
            .values(is_active=False)
        )
        await self.db.flush()

    async def evict_oldest_session(self, admin_id: int) -> None:
        """
        Revoke the oldest active session for this admin.
        Called when a new login would exceed MAX_ADMIN_SESSIONS (4).
        Instead of blocking the new login, we log out the device that has
        been inactive the longest — the one that logged in first.
        """
        now = datetime.now(timezone.utc)
        # Find the oldest active session (lowest created_at)
        result = await self.db.execute(
            select(AdminSession)
            .where(
                and_(
                    AdminSession.admin_id == admin_id,
                    AdminSession.is_active == True,  # noqa: E712
                    AdminSession.expires_at > now,
                )
            )
            .order_by(asc(AdminSession.created_at))
            .limit(1)
        )
        oldest = result.scalar_one_or_none()
        if oldest:
            oldest.is_active = False
            await self.db.flush()