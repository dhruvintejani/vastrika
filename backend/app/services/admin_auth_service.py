# """
# app/services/admin_auth_service.py
# Business logic for admin authentication with concurrent session control.
# """
# from datetime import datetime, timedelta, timezone

# from sqlalchemy.ext.asyncio import AsyncSession

# from app.core.config import settings
# from app.core.exceptions import ConflictError, ForbiddenError, UnauthorizedError
# from app.core.security import (
#     create_admin_access_token,
#     decode_admin_access_token,
#     hash_password,
#     verify_password,
# )
# from app.repositories.admin_repository import AdminRepository
# from app.schemas.auth import AdminTokenResponse


# class AdminAuthService:
#     def __init__(self, db: AsyncSession):
#         self.db = db
#         self.repo = AdminRepository(db)

#     async def login(self, email: str, password: str) -> AdminTokenResponse:
#         """
#         Authenticate admin and create a session token.
#         Enforces MAX_ADMIN_SESSIONS concurrent sessions.
#         """
#         admin = await self.repo.get_by_email(email)
#         if not admin or not verify_password(password, admin.hashed_password):
#             raise UnauthorizedError("Invalid admin credentials")
#         if not admin.is_active:
#             raise UnauthorizedError("Admin account is inactive")

#         # Clean up expired sessions first (housekeeping before counting)
#         await self.repo.expire_stale_sessions(admin.id)

#         # Enforce concurrent session limit
#         active_count = await self.repo.count_active_sessions(admin.id)
#         if active_count >= settings.MAX_ADMIN_SESSIONS:
#             raise ForbiddenError(
#                 f"Maximum {settings.MAX_ADMIN_SESSIONS} concurrent admin sessions allowed. "
#                 "Please log out from another device first."
#             )

#         # Create JWT + DB session record
#         token, jti = create_admin_access_token(admin.id)
#         expires_at = datetime.now(timezone.utc) + timedelta(
#             hours=settings.ADMIN_SESSION_EXPIRE_HOURS
#         )
#         await self.repo.create_session(admin.id, jti, expires_at)
#         await self.db.commit()

#         return AdminTokenResponse(access_token=token)

#     async def logout(self, token: str) -> None:
#         """Revoke the admin session identified by the JWT."""
#         payload = decode_admin_access_token(token)
#         if payload:
#             await self.repo.revoke_session_by_jti(payload["jti"])
#             await self.db.commit()

#     async def refresh(self, token: str) -> AdminTokenResponse:
#         """Issue a new admin token if the current one is still valid."""
#         payload = decode_admin_access_token(token)
#         if not payload:
#             raise UnauthorizedError("Invalid or expired admin token")

#         # Verify session is still active
#         session = await self.repo.get_active_session_by_jti(payload["jti"])
#         if not session:
#             raise UnauthorizedError("Admin session has been revoked")

#         admin = await self.repo.get_by_id(int(payload["sub"]))
#         if not admin or not admin.is_active:
#             raise UnauthorizedError("Admin account is inactive")

#         # Revoke old session, create new
#         await self.repo.revoke_session_by_jti(payload["jti"])
#         new_token, new_jti = create_admin_access_token(admin.id)
#         expires_at = datetime.now(timezone.utc) + timedelta(
#             hours=settings.ADMIN_SESSION_EXPIRE_HOURS
#         )
#         await self.repo.create_session(admin.id, new_jti, expires_at)
#         await self.db.commit()

#         return AdminTokenResponse(access_token=new_token)

"""
app/services/admin_auth_service.py
Business logic for admin authentication with concurrent session control.

FIXES:
1. MAX_ADMIN_SESSIONS raised to 4 (also update .env: MAX_ADMIN_SESSIONS=4)
2. Instead of blocking the 5th login, auto-evict the OLDEST active session
   so the user is never locked out — the oldest device gets logged out instead.
3. expire_stale_sessions() now also cleans sessions where the browser was
   closed without a proper logout (is_active=True but expired) — previously
   these only got cleaned if the SAME admin tried to log in again. Now they
   are cleaned proactively before the count check, so dev restarts don't
   accumulate ghost sessions that block future logins.
"""
from datetime import datetime, timedelta, timezone

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.exceptions import UnauthorizedError
from app.core.security import (
    create_admin_access_token,
    decode_admin_access_token,
    hash_password,
    verify_password,
)
from app.repositories.admin_repository import AdminRepository
from app.schemas.auth import AdminTokenResponse


class AdminAuthService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.repo = AdminRepository(db)

    async def login(self, email: str, password: str) -> AdminTokenResponse:
        """
        Authenticate admin and create a session token.

        Session policy (MAX_ADMIN_SESSIONS = 4):
        - First clean up any expired/ghost sessions (dev restarts, browser closes)
        - If active sessions < 4  → create new session normally
        - If active sessions >= 4 → evict the OLDEST session, then create new one
          This means the 5th device/login automatically logs out the 1st device,
          rather than blocking the new login entirely.
        """
        admin = await self.repo.get_by_email(email)
        if not admin or not verify_password(password, admin.hashed_password):
            raise UnauthorizedError("Invalid admin credentials")
        if not admin.is_active:
            raise UnauthorizedError("Admin account is inactive")

        # Step 1: Clean up expired sessions (including ghost sessions from
        # hard server restarts where logout endpoint was never called)
        await self.repo.expire_stale_sessions(admin.id)

        # Step 2: Check how many real active sessions remain
        active_count = await self.repo.count_active_sessions(admin.id)

        # Step 3: If at or above the limit, evict the oldest session
        # so this new login always succeeds
        max_sessions = getattr(settings, 'MAX_ADMIN_SESSIONS', 4)
        if active_count >= max_sessions:
            await self.repo.evict_oldest_session(admin.id)

        # Step 4: Create new JWT + DB session record
        token, jti = create_admin_access_token(admin.id)
        expires_at = datetime.now(timezone.utc) + timedelta(
            hours=settings.ADMIN_SESSION_EXPIRE_HOURS
        )
        await self.repo.create_session(admin.id, jti, expires_at)
        await self.db.commit()

        return AdminTokenResponse(access_token=token)

    async def logout(self, token: str) -> None:
        """Revoke the admin session identified by the JWT."""
        payload = decode_admin_access_token(token)
        if payload:
            await self.repo.revoke_session_by_jti(payload["jti"])
            await self.db.commit()

    async def refresh(self, token: str) -> AdminTokenResponse:
        """Issue a new admin token if the current one is still valid."""
        payload = decode_admin_access_token(token)
        if not payload:
            raise UnauthorizedError("Invalid or expired admin token")

        # Verify session is still active
        session = await self.repo.get_active_session_by_jti(payload["jti"])
        if not session:
            raise UnauthorizedError("Admin session has been revoked")

        admin = await self.repo.get_by_id(int(payload["sub"]))
        if not admin or not admin.is_active:
            raise UnauthorizedError("Admin account is inactive")

        # Revoke old session, create new
        await self.repo.revoke_session_by_jti(payload["jti"])
        new_token, new_jti = create_admin_access_token(admin.id)
        expires_at = datetime.now(timezone.utc) + timedelta(
            hours=settings.ADMIN_SESSION_EXPIRE_HOURS
        )
        await self.repo.create_session(admin.id, new_jti, expires_at)
        await self.db.commit()

        return AdminTokenResponse(access_token=new_token)