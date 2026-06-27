"""
app/models/admin.py
Admin user and admin session models.
"""
from datetime import datetime
from typing import List, Optional

from sqlalchemy import Boolean, DateTime, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin


class Admin(Base, TimestampMixin):
    __tablename__ = "admins"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    # Relationships
    sessions: Mapped[List["AdminSession"]] = relationship(
        "AdminSession", back_populates="admin", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"<Admin id={self.id} email={self.email}>"


class AdminSession(Base):
    """
    Tracks active admin JWT sessions.
    Used to enforce MAX_ADMIN_SESSIONS concurrent login limit.
    jti = JWT ID claim; stored to allow per-session revocation.
    """
    __tablename__ = "admin_sessions"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    admin_id: Mapped[int] = mapped_column(
        ForeignKey("admins.id", ondelete="CASCADE"), nullable=False, index=True
    )
    token_jti: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False
    )

    # Relationship
    admin: Mapped["Admin"] = relationship("Admin", back_populates="sessions")

    def __repr__(self) -> str:
        return f"<AdminSession admin_id={self.admin_id} jti={self.token_jti[:8]}...>"