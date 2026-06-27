"""
app/core/dependencies.py
FastAPI dependency injection: DB sessions, current user/admin extraction.
"""
from typing import Annotated, AsyncGenerator

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.security import decode_access_token, decode_admin_access_token
from app.db.session import AsyncSessionLocal

bearer_scheme = HTTPBearer(auto_error=False)


# ── Database session ──────────────────────────────────────────────────────────

async def get_db() -> AsyncGenerator:
    """Yield an async DB session, always closing it after the request."""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


DBSession = Annotated[any, Depends(get_db)]


# ── Customer auth ─────────────────────────────────────────────────────────────

async def get_current_user_id(
    credentials: Annotated[
        HTTPAuthorizationCredentials | None, Depends(bearer_scheme)
    ],
    db: DBSession,
) -> int:
    """
    Extract and validate the customer JWT.
    Returns the user_id (int) from the token payload.
    Raises 401 if missing or invalid.
    """
    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )

    payload = decode_access_token(credentials.credentials)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Verify user still exists and is active
    from app.repositories.user_repository import UserRepository
    repo = UserRepository(db)
    user = await repo.get_by_id(int(payload["sub"]))
    if user is None or not user.is_active or user.is_blocked:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User account is inactive or blocked",
        )

    return user.id


CurrentUserID = Annotated[int, Depends(get_current_user_id)]


async def get_optional_user_id(
    credentials: Annotated[
        HTTPAuthorizationCredentials | None, Depends(bearer_scheme)
    ],
) -> int | None:
    """Like get_current_user_id but returns None instead of raising for unauthenticated requests."""
    if credentials is None:
        return None
    payload = decode_access_token(credentials.credentials)
    if payload is None:
        return None
    return int(payload["sub"])


OptionalUserID = Annotated[int | None, Depends(get_optional_user_id)]


# ── Admin auth ────────────────────────────────────────────────────────────────

async def get_current_admin_id(
    credentials: Annotated[
        HTTPAuthorizationCredentials | None, Depends(bearer_scheme)
    ],
    db: DBSession,
) -> int:
    """
    Extract and validate the admin JWT.
    Also verifies the session (jti) is still active in admin_sessions.
    Raises 401 if anything is wrong.
    """
    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Admin authentication required",
            headers={"WWW-Authenticate": "Bearer"},
        )

    payload = decode_admin_access_token(credentials.credentials)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired admin token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Verify the session (jti) is still active in DB
    from app.repositories.admin_repository import AdminRepository
    repo = AdminRepository(db)
    session = await repo.get_active_session_by_jti(payload["jti"])
    if session is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Admin session has been revoked or expired",
        )

    admin = await repo.get_by_id(int(payload["sub"]))
    if admin is None or not admin.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Admin account is inactive",
        )

    return admin.id


CurrentAdminID = Annotated[int, Depends(get_current_admin_id)]