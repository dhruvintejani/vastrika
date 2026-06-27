"""
app/repositories/user_repository.py
Database access layer for User model.
"""
from typing import Optional

from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User


class UserRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, user_id: int) -> Optional[User]:
        result = await self.db.execute(select(User).where(User.id == user_id))
        return result.scalar_one_or_none()

    async def get_by_email(self, email: str) -> Optional[User]:
        result = await self.db.execute(
            select(User).where(User.email == email.lower())
        )
        return result.scalar_one_or_none()

    async def create(
        self,
        email: str,
        hashed_password: str,
        full_name: str,
        phone: Optional[str] = None,
    ) -> User:
        user = User(
            email=email.lower(),
            hashed_password=hashed_password,
            full_name=full_name,
            phone=phone,
        )
        self.db.add(user)
        await self.db.flush()
        await self.db.refresh(user)
        return user

    async def update_profile(self, user_id: int, data: dict) -> Optional[User]:
        # Filter out None values
        update_data = {k: v for k, v in data.items() if v is not None}
        if not update_data:
            return await self.get_by_id(user_id)
        await self.db.execute(
            update(User).where(User.id == user_id).values(**update_data)
        )
        await self.db.flush()
        return await self.get_by_id(user_id)

    async def update_password(self, user_id: int, hashed_password: str) -> None:
        await self.db.execute(
            update(User).where(User.id == user_id).values(hashed_password=hashed_password)
        )
        await self.db.flush()

    async def set_blocked(self, user_id: int, blocked: bool) -> Optional[User]:
        await self.db.execute(
            update(User).where(User.id == user_id).values(is_blocked=blocked)
        )
        await self.db.flush()
        return await self.get_by_id(user_id)

    async def list_all(self, skip: int = 0, limit: int = 50) -> tuple[list[User], int]:
        from sqlalchemy import func
        count_result = await self.db.execute(select(func.count(User.id)))
        total = count_result.scalar_one()
        result = await self.db.execute(
            select(User).order_by(User.created_at.desc()).offset(skip).limit(limit)
        )
        return list(result.scalars().all()), total