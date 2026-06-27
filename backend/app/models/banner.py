"""
app/models/banner.py
Homepage / promotional banner model.
"""
from typing import Optional

from sqlalchemy import Boolean, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, TimestampMixin


class Banner(Base, TimestampMixin):
    __tablename__ = "banners"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    subtitle: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    cta_text: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    cta_link: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    image_url: Mapped[str] = mapped_column(String(1000), nullable=False)
    cloudinary_public_id: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    target: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)  # e.g. "homepage", "shop"

    def __repr__(self) -> str:
        return f"<Banner id={self.id} title={self.title}>"