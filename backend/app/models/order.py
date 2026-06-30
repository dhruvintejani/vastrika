# # """
# # app/models/order.py
# # Order and OrderItem models.
# # Prices and product details are snapshotted at order creation time
# # so historical records are never affected by future catalogue changes.
# # """
# # import enum
# # from decimal import Decimal
# # from typing import List

# # from sqlalchemy import Enum, ForeignKey, Integer, Numeric, String, Text
# # from sqlalchemy.orm import Mapped, mapped_column, relationship

# # from app.db.base import Base, TimestampMixin


# # class OrderStatus(str, enum.Enum):
# #     PENDING = "pending"
# #     CONFIRMED = "confirmed"
# #     PROCESSING = "processing"
# #     SHIPPED = "shipped"
# #     DELIVERED = "delivered"
# #     CANCELLED = "cancelled"


# # class PaymentMethod(str, enum.Enum):
# #     UPI = "upi"
# #     CARD = "card"
# #     COD = "cod"
# #     NETBANKING = "netbanking"


# # class PaymentStatus(str, enum.Enum):
# #     PENDING = "pending"
# #     PAID = "paid"
# #     FAILED = "failed"
# #     REFUNDED = "refunded"


# # class Order(Base, TimestampMixin):
# #     __tablename__ = "orders"

# #     id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
# #     order_number: Mapped[str] = mapped_column(String(50), unique=True, nullable=False, index=True)
# #     user_id: Mapped[int] = mapped_column(
# #         ForeignKey("users.id", ondelete="RESTRICT"), nullable=False, index=True
# #     )

# #     status: Mapped[OrderStatus] = mapped_column(
# #         Enum(OrderStatus), default=OrderStatus.PENDING, nullable=False, index=True
# #     )
# #     subtotal: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
# #     shipping_charge: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
# #     discount_amount: Mapped[Decimal] = mapped_column(
# #         Numeric(10, 2), default=Decimal("0.00"), nullable=False
# #     )
# #     total_amount: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)

# #     # Shipping address snapshot (so changes to user profile don't affect history)
# #     shipping_name: Mapped[str] = mapped_column(String(255), nullable=False)
# #     shipping_phone: Mapped[str] = mapped_column(String(20), nullable=False)
# #     shipping_address: Mapped[str] = mapped_column(Text, nullable=False)

# #     payment_method: Mapped[PaymentMethod] = mapped_column(
# #         Enum(PaymentMethod), default=PaymentMethod.COD, nullable=False
# #     )
# #     payment_status: Mapped[PaymentStatus] = mapped_column(
# #         Enum(PaymentStatus), default=PaymentStatus.PENDING, nullable=False
# #     )
# #     notes: Mapped[str | None] = mapped_column(Text, nullable=True)

# #     # Relationships
# #     user: Mapped["User"] = relationship("User", back_populates="orders")  # type: ignore[name-defined]  # noqa: F821
# #     items: Mapped[List["OrderItem"]] = relationship(
# #         "OrderItem", back_populates="order", cascade="all, delete-orphan"
# #     )

# #     def __repr__(self) -> str:
# #         return f"<Order id={self.id} number={self.order_number} status={self.status}>"


# # class OrderItem(Base):
# #     __tablename__ = "order_items"

# #     id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
# #     order_id: Mapped[int] = mapped_column(
# #         ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, index=True
# #     )
# #     product_id: Mapped[int] = mapped_column(
# #         ForeignKey("products.id", ondelete="RESTRICT"), nullable=False
# #     )

# #     # Snapshots — preserved even if product is later edited/deleted
# #     product_title: Mapped[str] = mapped_column(String(500), nullable=False)
# #     product_image: Mapped[str] = mapped_column(String(1000), nullable=False)
# #     selected_size: Mapped[str] = mapped_column(String(50), nullable=False)
# #     selected_color: Mapped[str] = mapped_column(String(100), nullable=False)
# #     quantity: Mapped[int] = mapped_column(Integer, nullable=False)
# #     unit_price: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
# #     total_price: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)

# #     # Relationships
# #     order: Mapped["Order"] = relationship("Order", back_populates="items")
# #     product: Mapped["Product"] = relationship("Product", back_populates="order_items")  # type: ignore[name-defined]  # noqa: F821

# #     def __repr__(self) -> str:
# #         return f"<OrderItem order_id={self.order_id} product_id={self.product_id}>"

# """
# app/models/order.py
# Order and OrderItem models.

# FIX: SQLAlchemy's Enum(PythonEnum) sends .name (e.g. "CANCELLED") to
# PostgreSQL by default, but our DB enum type uses lowercase values
# ("cancelled"). values_callable=lambda e: [m.value for m in e] forces
# SQLAlchemy to use .value instead of .name on every read/write.
# """
# import enum
# from decimal import Decimal
# from typing import List

# from sqlalchemy import Enum, ForeignKey, Integer, Numeric, String, Text
# from sqlalchemy.orm import Mapped, mapped_column, relationship

# from app.db.base import Base, TimestampMixin


# class OrderStatus(str, enum.Enum):
#     PENDING    = "pending"
#     CONFIRMED  = "confirmed"
#     PROCESSING = "processing"
#     SHIPPED    = "shipped"
#     DELIVERED  = "delivered"
#     CANCELLED  = "cancelled"


# class PaymentMethod(str, enum.Enum):
#     UPI        = "upi"
#     CARD       = "card"
#     COD        = "cod"
#     NETBANKING = "netbanking"


# class PaymentStatus(str, enum.Enum):
#     PENDING  = "pending"
#     PAID     = "paid"
#     FAILED   = "failed"
#     REFUNDED = "refunded"


# # Reusable factory — tells SQLAlchemy to use .value ("cancelled")
# # not .name ("CANCELLED") when reading/writing to PostgreSQL
# def _enum_values(enum_cls):
#     """Return the list of .value strings for a Python enum class."""
#     return [m.value for m in enum_cls]


# class Order(Base, TimestampMixin):
#     __tablename__ = "orders"

#     id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
#     order_number: Mapped[str] = mapped_column(
#         String(50), unique=True, nullable=False, index=True
#     )
#     user_id: Mapped[int] = mapped_column(
#         ForeignKey("users.id", ondelete="RESTRICT"), nullable=False, index=True
#     )

#     status: Mapped[OrderStatus] = mapped_column(
#         Enum(
#             OrderStatus,
#             values_callable=_enum_values,
#             name="orderstatus",
#             create_type=False,   # type already exists in DB from migration
#         ),
#         default=OrderStatus.PENDING,
#         nullable=False,
#         index=True,
#     )
#     subtotal: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
#     shipping_charge: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
#     discount_amount: Mapped[Decimal] = mapped_column(
#         Numeric(10, 2), default=Decimal("0.00"), nullable=False
#     )
#     total_amount: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)

#     shipping_name: Mapped[str] = mapped_column(String(255), nullable=False)
#     shipping_phone: Mapped[str] = mapped_column(String(20), nullable=False)
#     shipping_address: Mapped[str] = mapped_column(Text, nullable=False)

#     payment_method: Mapped[PaymentMethod] = mapped_column(
#         Enum(
#             PaymentMethod,
#             values_callable=_enum_values,
#             name="paymentmethod",
#             create_type=False,
#         ),
#         default=PaymentMethod.COD,
#         nullable=False,
#     )
#     payment_status: Mapped[PaymentStatus] = mapped_column(
#         Enum(
#             PaymentStatus,
#             values_callable=_enum_values,
#             name="paymentstatus",
#             create_type=False,
#         ),
#         default=PaymentStatus.PENDING,
#         nullable=False,
#     )
#     notes: Mapped[str | None] = mapped_column(Text, nullable=True)

#     # Relationships
#     user: Mapped["User"] = relationship("User", back_populates="orders")  # type: ignore[name-defined]  # noqa: F821
#     items: Mapped[List["OrderItem"]] = relationship(
#         "OrderItem", back_populates="order", cascade="all, delete-orphan"
#     )

#     def __repr__(self) -> str:
#         return f"<Order id={self.id} number={self.order_number} status={self.status}>"


# class OrderItem(Base):
#     __tablename__ = "order_items"

#     id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
#     order_id: Mapped[int] = mapped_column(
#         ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, index=True
#     )
#     product_id: Mapped[int] = mapped_column(
#         ForeignKey("products.id", ondelete="RESTRICT"), nullable=False
#     )

#     product_title: Mapped[str] = mapped_column(String(500), nullable=False)
#     product_image: Mapped[str] = mapped_column(String(1000), nullable=False)
#     selected_size: Mapped[str] = mapped_column(String(50), nullable=False)
#     selected_color: Mapped[str] = mapped_column(String(100), nullable=False)
#     quantity: Mapped[int] = mapped_column(Integer, nullable=False)
#     unit_price: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
#     total_price: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)

#     # Relationships
#     order: Mapped["Order"] = relationship("Order", back_populates="items")
#     product: Mapped["Product"] = relationship("Product", back_populates="order_items")  # type: ignore[name-defined]  # noqa: F821

#     def __repr__(self) -> str:
#         return f"<OrderItem order_id={self.order_id} product_id={self.product_id}>"

"""
app/models/order.py
Order and OrderItem models.

SQLAlchemy enum fields are configured to store lowercase enum values such as
"pending" and "cancelled", matching the existing PostgreSQL enum values.
"""
import enum
from decimal import Decimal
from typing import List

from sqlalchemy import Enum, ForeignKey, Integer, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin


class OrderStatus(str, enum.Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    PROCESSING = "processing"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"


class PaymentMethod(str, enum.Enum):
    UPI = "upi"
    CARD = "card"
    COD = "cod"
    NETBANKING = "netbanking"


class PaymentStatus(str, enum.Enum):
    PENDING = "pending"
    PAID = "paid"
    FAILED = "failed"
    REFUNDED = "refunded"


def _enum_values(enum_cls):
    return [member.value for member in enum_cls]


class Order(Base, TimestampMixin):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    order_number: Mapped[str] = mapped_column(
        String(50), unique=True, nullable=False, index=True
    )
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="RESTRICT"), nullable=False, index=True
    )

    status: Mapped[OrderStatus] = mapped_column(
        Enum(
            OrderStatus,
            values_callable=_enum_values,
            name="orderstatus",
            create_type=False,
        ),
        default=OrderStatus.PENDING,
        nullable=False,
        index=True,
    )
    subtotal: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    shipping_charge: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    discount_amount: Mapped[Decimal] = mapped_column(
        Numeric(10, 2), default=Decimal("0.00"), nullable=False
    )
    total_amount: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)

    shipping_name: Mapped[str] = mapped_column(String(255), nullable=False)
    shipping_phone: Mapped[str] = mapped_column(String(20), nullable=False)
    shipping_address: Mapped[str] = mapped_column(Text, nullable=False)

    payment_method: Mapped[PaymentMethod] = mapped_column(
        Enum(
            PaymentMethod,
            values_callable=_enum_values,
            name="paymentmethod",
            create_type=False,
        ),
        default=PaymentMethod.COD,
        nullable=False,
    )
    payment_status: Mapped[PaymentStatus] = mapped_column(
        Enum(
            PaymentStatus,
            values_callable=_enum_values,
            name="paymentstatus",
            create_type=False,
        ),
        default=PaymentStatus.PENDING,
        nullable=False,
    )
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    cancellation_reason: Mapped[str | None] = mapped_column(Text, nullable=True)

    user: Mapped["User"] = relationship("User", back_populates="orders")  # type: ignore[name-defined]  # noqa: F821
    items: Mapped[List["OrderItem"]] = relationship(
        "OrderItem", back_populates="order", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"<Order id={self.id} number={self.order_number} status={self.status}>"


class OrderItem(Base):
    __tablename__ = "order_items"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    order_id: Mapped[int] = mapped_column(
        ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, index=True
    )
    product_id: Mapped[int] = mapped_column(
        ForeignKey("products.id", ondelete="RESTRICT"), nullable=False
    )

    product_title: Mapped[str] = mapped_column(String(500), nullable=False)
    product_image: Mapped[str] = mapped_column(String(1000), nullable=False)
    selected_size: Mapped[str] = mapped_column(String(50), nullable=False)
    selected_color: Mapped[str] = mapped_column(String(100), nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    unit_price: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    total_price: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)

    order: Mapped["Order"] = relationship("Order", back_populates="items")
    product: Mapped["Product"] = relationship("Product", back_populates="order_items")  # type: ignore[name-defined]  # noqa: F821

    def __repr__(self) -> str:
        return f"<OrderItem order_id={self.order_id} product_id={self.product_id}>"
