"""
app/repositories/token_repository.py
Database access for RefreshToken model.
"""
from datetime import datetime, timezone
from typing import Optional

from sqlalchemy import and_, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.token import RefreshToken


class TokenRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(
        self, user_id: int, token_hash: str, expires_at: datetime
    ) -> RefreshToken:
        token = RefreshToken(
            user_id=user_id,
            token_hash=token_hash,
            expires_at=expires_at,
            is_revoked=False,
            created_at=datetime.now(timezone.utc),
        )
        self.db.add(token)
        await self.db.flush()
        return token

    async def get_valid_token(self, token_hash: str) -> Optional[RefreshToken]:
        """Return token if it exists, is not revoked, and has not expired."""
        now = datetime.now(timezone.utc)
        result = await self.db.execute(
            select(RefreshToken).where(
                and_(
                    RefreshToken.token_hash == token_hash,
                    RefreshToken.is_revoked == False,  # noqa: E712
                    RefreshToken.expires_at > now,
                )
            )
        )
        return result.scalar_one_or_none()

    async def revoke(self, token_hash: str) -> None:
        await self.db.execute(
            update(RefreshToken)
            .where(RefreshToken.token_hash == token_hash)
            .values(is_revoked=True)
        )
        await self.db.flush()

    async def revoke_all_for_user(self, user_id: int) -> None:
        """Revoke all tokens for a user (e.g., on password change)."""
        await self.db.execute(
            update(RefreshToken)
            .where(RefreshToken.user_id == user_id)
            .values(is_revoked=True)
        )
        await self.db.flush()