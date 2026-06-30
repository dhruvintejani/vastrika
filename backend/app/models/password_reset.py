# # # # # """
# # # # # app/models/password_reset.py
# # # # # Stores one active forgot-password OTP hash per customer.
# # # # # """
# # # # # from datetime import datetime

# # # # # from sqlalchemy import DateTime, ForeignKey, Integer, String
# # # # # from sqlalchemy.orm import Mapped, mapped_column, relationship

# # # # # from app.db.base import Base, TimestampMixin


# # # # # class PasswordResetOTP(Base, TimestampMixin):
# # # # #     __tablename__ = "password_reset_otps"

# # # # #     id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
# # # # #     user_id: Mapped[int] = mapped_column(
# # # # #         ForeignKey("users.id", ondelete="CASCADE"),
# # # # #         unique=True,
# # # # #         nullable=False,
# # # # #         index=True,
# # # # #     )
# # # # #     otp_hash: Mapped[str] = mapped_column(String(128), nullable=False)
# # # # #     attempts: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
# # # # #     requested_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
# # # # #     expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
# # # # #     verified_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

# # # # #     user: Mapped["User"] = relationship("User")  # type: ignore[name-defined]  # noqa: F821

# # # # #     def __repr__(self) -> str:
# # # # #         return f"<PasswordResetOTP user_id={self.user_id} attempts={self.attempts}>"


# # # # """
# # # # app/models/password_reset.py
# # # # Stores one active forgot-password OTP hash per customer.
# # # # """
# # # # from datetime import datetime

# # # # from sqlalchemy import DateTime, ForeignKey, Integer, String
# # # # from sqlalchemy.orm import Mapped, mapped_column, relationship

# # # # from app.db.base import Base, TimestampMixin


# # # # class PasswordResetOTP(Base, TimestampMixin):
# # # #     __tablename__ = "password_reset_otps"

# # # #     id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
# # # #     user_id: Mapped[int] = mapped_column(
# # # #         ForeignKey("users.id", ondelete="CASCADE"),
# # # #         unique=True,
# # # #         nullable=False,
# # # #         index=True,
# # # #     )
# # # #     otp_hash: Mapped[str] = mapped_column(String(128), nullable=False)
# # # #     attempts: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
# # # #     requested_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
# # # #     expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
# # # #     verified_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

# # # #     user: Mapped["User"] = relationship("User")  # type: ignore[name-defined]  # noqa: F821

# # # #     def __repr__(self) -> str:
# # # #         return f"<PasswordResetOTP user_id={self.user_id} attempts={self.attempts}>"


# # # """
# # # app/models/password_reset.py
# # # Stores one active forgot-password OTP hash per customer.
# # # """
# # # from datetime import datetime

# # # from sqlalchemy import DateTime, ForeignKey, Integer, String
# # # from sqlalchemy.orm import Mapped, mapped_column, relationship

# # # from app.db.base import Base, TimestampMixin


# # # class PasswordResetOTP(Base, TimestampMixin):
# # #     __tablename__ = "password_reset_otps"

# # #     id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
# # #     user_id: Mapped[int] = mapped_column(
# # #         ForeignKey("users.id", ondelete="CASCADE"),
# # #         unique=True,
# # #         nullable=False,
# # #         index=True,
# # #     )
# # #     otp_hash: Mapped[str] = mapped_column(String(128), nullable=False)
# # #     attempts: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
# # #     requested_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
# # #     expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
# # #     verified_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

# # #     user: Mapped["User"] = relationship("User")  # type: ignore[name-defined]  # noqa: F821

# # #     def __repr__(self) -> str:
# # #         return f"<PasswordResetOTP user_id={self.user_id} attempts={self.attempts}>"


# # """
# # app/models/password_reset.py
# # Stores one active forgot-password OTP hash per customer.
# # """
# # from datetime import datetime

# # from sqlalchemy import DateTime, ForeignKey, Integer, String
# # from sqlalchemy.orm import Mapped, mapped_column, relationship

# # from app.db.base import Base, TimestampMixin


# # class PasswordResetOTP(Base, TimestampMixin):
# #     __tablename__ = "password_reset_otps"

# #     id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
# #     user_id: Mapped[int] = mapped_column(
# #         ForeignKey("users.id", ondelete="CASCADE"),
# #         unique=True,
# #         nullable=False,
# #         index=True,
# #     )
# #     otp_hash: Mapped[str] = mapped_column(String(128), nullable=False)
# #     attempts: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
# #     requested_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
# #     expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
# #     verified_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

# #     user: Mapped["User"] = relationship("User")  # type: ignore[name-defined]  # noqa: F821

# #     def __repr__(self) -> str:
# #         return f"<PasswordResetOTP user_id={self.user_id} attempts={self.attempts}>"


# """
# app/models/password_reset.py
# Stores one active forgot-password OTP hash per customer.
# """
# from datetime import datetime

# from sqlalchemy import DateTime, ForeignKey, Integer, String
# from sqlalchemy.orm import Mapped, mapped_column, relationship

# from app.db.base import Base, TimestampMixin


# class PasswordResetOTP(Base, TimestampMixin):
#     __tablename__ = "password_reset_otps"

#     id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
#     user_id: Mapped[int] = mapped_column(
#         ForeignKey("users.id", ondelete="CASCADE"),
#         unique=True,
#         nullable=False,
#         index=True,
#     )
#     otp_hash: Mapped[str] = mapped_column(String(128), nullable=False)
#     attempts: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
#     requested_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
#     expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
#     verified_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

#     user: Mapped["User"] = relationship("User")  # type: ignore[name-defined]  # noqa: F821

#     def __repr__(self) -> str:
#         return f"<PasswordResetOTP user_id={self.user_id} attempts={self.attempts}>"


"""
app/models/password_reset.py
Stores one active forgot-password OTP hash per customer.
"""
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin


class PasswordResetOTP(Base, TimestampMixin):
    __tablename__ = "password_reset_otps"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
        index=True,
    )
    otp_hash: Mapped[str] = mapped_column(String(128), nullable=False)
    attempts: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    requested_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    verified_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    user: Mapped["User"] = relationship("User")  # type: ignore[name-defined]  # noqa: F821

    def __repr__(self) -> str:
        return f"<PasswordResetOTP user_id={self.user_id} attempts={self.attempts}>"
