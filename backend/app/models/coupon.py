# """
# app/models/coupon.py
# Coupon / discount code model.
# """
# import enum
# from datetime import datetime
# from decimal import Decimal
# from typing import Optional

# from sqlalchemy import Boolean, DateTime, Enum, Integer, Numeric, String, Text
# from sqlalchemy.orm import Mapped, mapped_column

# from app.db.base import Base, TimestampMixin


# class DiscountType(str, enum.Enum):
#     PERCENTAGE = "percentage"
#     FIXED = "fixed"


# class Coupon(Base, TimestampMixin):
#     __tablename__ = "coupons"

#     id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
#     code: Mapped[str] = mapped_column(String(50), unique=True, nullable=False, index=True)
#     description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
#     discount_type: Mapped[DiscountType] = mapped_column(
#         Enum(DiscountType), default=DiscountType.PERCENTAGE, nullable=False
#     )
#     discount_value: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
#     min_order_amount: Mapped[Decimal] = mapped_column(
#         Numeric(10, 2), default=Decimal("0.00"), nullable=False
#     )
#     max_discount_amount: Mapped[Optional[Decimal]] = mapped_column(
#         Numeric(10, 2), nullable=True
#     )
#     usage_limit: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
#     used_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
#     is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
#     expires_at: Mapped[Optional[datetime]] = mapped_column(
#         DateTime(timezone=True), nullable=True
#     )

#     def __repr__(self) -> str:
#         return f"<Coupon code={self.code} type={self.discount_type}>"

"""
app/models/coupon.py
Coupon / discount code model.
"""
import enum
from datetime import datetime
from decimal import Decimal
from typing import Optional

from sqlalchemy import Boolean, DateTime, Enum, Integer, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, TimestampMixin


class DiscountType(str, enum.Enum):
    PERCENTAGE = "percentage"
    FIXED = "fixed"


class Coupon(Base, TimestampMixin):
    __tablename__ = "coupons"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    code: Mapped[str] = mapped_column(String(50), unique=True, nullable=False, index=True)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    discount_type: Mapped[DiscountType] = mapped_column(
        Enum(
            DiscountType,
            values_callable=lambda e: [m.value for m in e],
            name="discounttype",
            create_type=False,
        ),
        default=DiscountType.PERCENTAGE,
        nullable=False
    )
    discount_value: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    min_order_amount: Mapped[Decimal] = mapped_column(
        Numeric(10, 2), default=Decimal("0.00"), nullable=False
    )
    max_discount_amount: Mapped[Optional[Decimal]] = mapped_column(
        Numeric(10, 2), nullable=True
    )
    usage_limit: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    used_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    expires_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), nullable=True
    )

    def __repr__(self) -> str:
        return f"<Coupon code={self.code} type={self.discount_type}>"