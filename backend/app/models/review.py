# # """
# # app/models/review.py
# # Product review model.
# # """
# # from typing import Optional

# # from sqlalchemy import Boolean, ForeignKey, Integer, String, Text, UniqueConstraint
# # from sqlalchemy.orm import Mapped, mapped_column, relationship

# # from app.db.base import Base, TimestampMixin


# # class Review(Base, TimestampMixin):
# #     __tablename__ = "reviews"
# #     __table_args__ = (
# #         UniqueConstraint("user_id", "product_id", name="uq_user_product_review"),
# #     )

# #     id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
# #     user_id: Mapped[int] = mapped_column(
# #         ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
# #     )
# #     product_id: Mapped[int] = mapped_column(
# #         ForeignKey("products.id", ondelete="CASCADE"), nullable=False, index=True
# #     )
# #     rating: Mapped[int] = mapped_column(Integer, nullable=False)  # 1-5
# #     title: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
# #     body: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
# #     is_approved: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
# #     is_flagged: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

# #     # Relationships
# #     user: Mapped["User"] = relationship("User")  # type: ignore[name-defined]  # noqa: F821
# #     product: Mapped["Product"] = relationship("Product")  # type: ignore[name-defined]  # noqa: F821

# #     def __repr__(self) -> str:
# #         return f"<Review product_id={self.product_id} rating={self.rating}>"

# """
# app/models/review.py
# Product review model.
# """
# from datetime import datetime
# from typing import Optional

# from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String, Text, UniqueConstraint
# from sqlalchemy.orm import Mapped, mapped_column, relationship

# from app.db.base import Base, TimestampMixin


# class Review(Base, TimestampMixin):
#     __tablename__ = "reviews"
#     __table_args__ = (
#         UniqueConstraint("user_id", "product_id", name="uq_user_product_review"),
#     )

#     id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
#     user_id: Mapped[int] = mapped_column(
#         ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
#     )
#     product_id: Mapped[int] = mapped_column(
#         ForeignKey("products.id", ondelete="CASCADE"), nullable=False, index=True
#     )
#     rating: Mapped[int] = mapped_column(Integer, nullable=False)
#     title: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
#     body: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
#     is_approved: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
#     is_flagged: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
#     is_removed: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False, index=True)
#     removed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

#     user: Mapped["User"] = relationship("User")  # type: ignore[name-defined]  # noqa: F821
#     product: Mapped["Product"] = relationship("Product")  # type: ignore[name-defined]  # noqa: F821

#     def __repr__(self) -> str:
#         return f"<Review product_id={self.product_id} rating={self.rating}>"


"""
app/models/review.py
Product review model.

Removed reviews are represented without extra database columns:
- public review: is_approved=True and is_flagged=False
- flagged review: is_flagged=True
- removed review: is_approved=False and is_flagged=False
"""
from typing import Optional

from sqlalchemy import Boolean, ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin


class Review(Base, TimestampMixin):
    __tablename__ = "reviews"
    __table_args__ = (
        UniqueConstraint("user_id", "product_id", name="uq_user_product_review"),
    )

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )
    product_id: Mapped[int] = mapped_column(
        ForeignKey("products.id", ondelete="CASCADE"), nullable=False, index=True
    )
    rating: Mapped[int] = mapped_column(Integer, nullable=False)
    title: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    body: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    is_approved: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    is_flagged: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    user: Mapped["User"] = relationship("User")  # type: ignore[name-defined]  # noqa: F821
    product: Mapped["Product"] = relationship("Product")  # type: ignore[name-defined]  # noqa: F821

    def __repr__(self) -> str:
        return f"<Review product_id={self.product_id} rating={self.rating}>"
