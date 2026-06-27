"""
app/services/auth_service.py
Business logic for customer authentication.
"""
from datetime import datetime, timedelta, timezone

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.exceptions import ConflictError, UnauthorizedError, BusinessRuleError
from app.core.security import (
    create_access_token,
    create_refresh_token,
    hash_password,
    hash_refresh_token,
    verify_password,
)
from app.repositories.token_repository import TokenRepository
from app.repositories.user_repository import UserRepository
from app.schemas.auth import TokenResponse


class AuthService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.user_repo = UserRepository(db)
        self.token_repo = TokenRepository(db)

    async def register(
        self, email: str, password: str, full_name: str, phone: str | None = None
    ):
        """Register a new customer. Raises ConflictError if email taken."""
        existing = await self.user_repo.get_by_email(email)
        if existing:
            raise ConflictError("An account with this email already exists")

        hashed = hash_password(password)
        user = await self.user_repo.create(
            email=email,
            hashed_password=hashed,
            full_name=full_name,
            phone=phone,
        )
        await self.db.commit()
        return user

    async def login(self, email: str, password: str) -> TokenResponse:
        """Authenticate and return token pair. Raises UnauthorizedError on failure."""
        user = await self.user_repo.get_by_email(email)
        if not user or not verify_password(password, user.hashed_password):
            raise UnauthorizedError("Invalid email or password")
        if not user.is_active:
            raise UnauthorizedError("Account is inactive")
        if user.is_blocked:
            raise UnauthorizedError("Account has been blocked. Contact support.")

        access_token = create_access_token(user.id)
        raw_refresh, token_hash = create_refresh_token()

        expires_at = datetime.now(timezone.utc) + timedelta(
            days=settings.JWT_REFRESH_TOKEN_EXPIRE_DAYS
        )
        await self.token_repo.create(
            user_id=user.id,
            token_hash=token_hash,
            expires_at=expires_at,
        )
        await self.db.commit()

        return TokenResponse(
            access_token=access_token,
            refresh_token=raw_refresh,
        )

    async def refresh(self, raw_refresh_token: str) -> TokenResponse:
        """Issue a new token pair from a valid refresh token (rotation)."""
        token_hash = hash_refresh_token(raw_refresh_token)
        stored = await self.token_repo.get_valid_token(token_hash)
        if not stored:
            raise UnauthorizedError("Invalid or expired refresh token")

        user = await self.user_repo.get_by_id(stored.user_id)
        if not user or not user.is_active or user.is_blocked:
            raise UnauthorizedError("User account is inactive")

        # Revoke old token (rotation)
        await self.token_repo.revoke(token_hash)

        # Issue new pair
        access_token = create_access_token(user.id)
        new_raw, new_hash = create_refresh_token()
        expires_at = datetime.now(timezone.utc) + timedelta(
            days=settings.JWT_REFRESH_TOKEN_EXPIRE_DAYS
        )
        await self.token_repo.create(
            user_id=user.id,
            token_hash=new_hash,
            expires_at=expires_at,
        )
        await self.db.commit()

        return TokenResponse(
            access_token=access_token,
            refresh_token=new_raw,
        )

    async def logout(self, raw_refresh_token: str) -> None:
        """Revoke a refresh token."""
        token_hash = hash_refresh_token(raw_refresh_token)
        await self.token_repo.revoke(token_hash)
        await self.db.commit()

    async def change_password(
        self, user_id: int, current_password: str, new_password: str
    ) -> None:
        user = await self.user_repo.get_by_id(user_id)
        if not user:
            raise UnauthorizedError("User not found")
        if not verify_password(current_password, user.hashed_password):
            raise UnauthorizedError("Current password is incorrect")

        new_hashed = hash_password(new_password)
        await self.user_repo.update_password(user_id, new_hashed)
        # Revoke all existing refresh tokens to force re-login everywhere
        await self.token_repo.revoke_all_for_user(user_id)
        await self.db.commit()