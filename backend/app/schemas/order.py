# # """
# # app/schemas/order.py
# # Pydantic schemas for orders.
# # """
# # from datetime import datetime
# # from decimal import Decimal
# # from typing import List, Optional

# # from pydantic import BaseModel, Field

# # from app.models.order import OrderStatus, PaymentMethod, PaymentStatus


# # class ShippingAddressRequest(BaseModel):
# #     full_name: str = Field(min_length=2, max_length=255)
# #     phone: str = Field(min_length=10, max_length=20)
# #     address_line1: str = Field(min_length=5, max_length=500)
# #     address_line2: Optional[str] = Field(default=None, max_length=500)
# #     city: str = Field(min_length=2, max_length=100)
# #     state: str = Field(min_length=2, max_length=100)
# #     pincode: str = Field(min_length=6, max_length=10)


# # class CreateOrderRequest(BaseModel):
# #     shipping_address: ShippingAddressRequest
# #     payment_method: PaymentMethod = PaymentMethod.COD
# #     notes: Optional[str] = Field(default=None, max_length=500)


# # class OrderItemResponse(BaseModel):
# #     id: int
# #     product_id: int
# #     product_title: str
# #     product_image: str
# #     selected_size: str
# #     selected_color: str
# #     quantity: int
# #     unit_price: Decimal
# #     total_price: Decimal

# #     model_config = {"from_attributes": True}


# # class OrderResponse(BaseModel):
# #     id: int
# #     order_number: str
# #     status: OrderStatus
# #     subtotal: Decimal
# #     shipping_charge: Decimal
# #     discount_amount: Decimal
# #     total_amount: Decimal
# #     shipping_name: str
# #     shipping_phone: str
# #     shipping_address: str
# #     payment_method: PaymentMethod
# #     payment_status: PaymentStatus
# #     notes: Optional[str]
# #     items: List[OrderItemResponse]
# #     created_at: datetime

# #     model_config = {"from_attributes": True}


# # class OrderListResponse(BaseModel):
# #     """Lightweight for listing — no items detail."""
# #     id: int
# #     order_number: str
# #     status: OrderStatus
# #     total_amount: Decimal
# #     payment_method: PaymentMethod
# #     payment_status: PaymentStatus
# #     item_count: int
# #     created_at: datetime

# #     model_config = {"from_attributes": True}


# # class UpdateOrderStatusRequest(BaseModel):
# #     status: OrderStatus


# # # Admin extended view
# # class AdminOrderResponse(OrderResponse):
# #     user_id: int
# #     user_email: str
# #     user_name: str

# """
# app/schemas/order.py
# Pydantic schemas for orders.

# PATCH: AdminOrderResponse now correctly reads user_email and user_name
# from the related User object using a validator, since those fields don't
# live directly on the Order model — they come from Order.user.email
# and Order.user.full_name via the SQLAlchemy relationship.
# """
# from datetime import datetime
# from decimal import Decimal
# from typing import List, Optional

# from pydantic import BaseModel, Field, model_validator

# from app.models.order import OrderStatus, PaymentMethod, PaymentStatus


# class ShippingAddressRequest(BaseModel):
#     full_name: str = Field(min_length=2, max_length=255)
#     phone: str = Field(min_length=10, max_length=20)
#     address_line1: str = Field(min_length=5, max_length=500)
#     address_line2: Optional[str] = Field(default=None, max_length=500)
#     city: str = Field(min_length=2, max_length=100)
#     state: str = Field(min_length=2, max_length=100)
#     pincode: str = Field(min_length=6, max_length=10)


# class CreateOrderRequest(BaseModel):
#     shipping_address: ShippingAddressRequest
#     payment_method: PaymentMethod = PaymentMethod.COD
#     notes: Optional[str] = Field(default=None, max_length=500)


# class OrderItemResponse(BaseModel):
#     id: int
#     product_id: int
#     product_title: str
#     product_image: str
#     selected_size: str
#     selected_color: str
#     quantity: int
#     unit_price: Decimal
#     total_price: Decimal

#     model_config = {"from_attributes": True}


# class OrderResponse(BaseModel):
#     id: int
#     order_number: str
#     status: OrderStatus
#     subtotal: Decimal
#     shipping_charge: Decimal
#     discount_amount: Decimal
#     total_amount: Decimal
#     shipping_name: str
#     shipping_phone: str
#     shipping_address: str
#     payment_method: PaymentMethod
#     payment_status: PaymentStatus
#     notes: Optional[str]
#     cancellation_reason: Optional[str] = None
#     items: List[OrderItemResponse]
#     created_at: datetime

#     model_config = {"from_attributes": True}


# class OrderListResponse(BaseModel):
#     """Lightweight for listing — no items detail."""
#     id: int
#     order_number: str
#     status: OrderStatus
#     total_amount: Decimal
#     payment_method: PaymentMethod
#     payment_status: PaymentStatus
#     item_count: int
#     created_at: datetime

#     model_config = {"from_attributes": True}


# class UpdateOrderStatusRequest(BaseModel):
#     status: OrderStatus


# class AdminOrderResponse(OrderResponse):
#     """
#     Extended order response for admin — includes user details.
#     user_email and user_name are read from the Order.user relationship.
#     The admin order repository must eager-load Order.user for this to work.
#     """
#     user_id: int
#     user_email: str = ""
#     user_name: str = ""

#     @model_validator(mode="after")
#     def populate_user_fields(self) -> "AdminOrderResponse":
#         # When built from ORM (from_attributes=True), Pydantic gives us the
#         # raw ORM object in __pydantic_fields_set__. We need to pull user
#         # details via the relationship. Use model_config extra data if set.
#         return self

#     @classmethod
#     def model_validate(cls, obj, *args, **kwargs):
#         # Extract user info from the ORM relationship before Pydantic
#         # tries to map it, since user_email/user_name aren't columns on Order.
#         instance = super().model_validate(obj, *args, **kwargs)
#         if hasattr(obj, "user") and obj.user is not None:
#             instance.user_email = obj.user.email or ""
#             instance.user_name = obj.user.full_name or ""
#         return instance

"""
app/schemas/order.py
Pydantic schemas for orders.
"""
from datetime import datetime
from decimal import Decimal
from typing import List, Optional

from pydantic import BaseModel, Field, field_validator, model_validator

from app.models.order import OrderStatus, PaymentMethod, PaymentStatus


class ShippingAddressRequest(BaseModel):
    full_name: str = Field(min_length=2, max_length=255)
    phone: str = Field(min_length=10, max_length=10)
    address_line1: str = Field(min_length=5, max_length=500)
    address_line2: Optional[str] = Field(default=None, max_length=500)
    city: str = Field(min_length=2, max_length=100)
    state: str = Field(min_length=2, max_length=100)
    pincode: str = Field(min_length=6, max_length=6)

    @field_validator("full_name", "address_line1", "address_line2", "city", "state", mode="before")
    @classmethod
    def strip_text_fields(cls, value):
        if isinstance(value, str):
            return value.strip()
        return value

    @field_validator("phone", mode="before")
    @classmethod
    def validate_phone(cls, value):
        phone = str(value or "").strip()
        if not phone.isdigit():
            raise ValueError("Phone number must contain only numbers")
        if len(phone) < 10:
            raise ValueError("Phone number must be exactly 10 digits")
        if len(phone) > 10:
            raise ValueError("Phone number cannot be more than 10 digits")
        return phone

    @field_validator("pincode", mode="before")
    @classmethod
    def validate_pincode(cls, value):
        pincode = str(value or "").strip()
        if not pincode.isdigit():
            raise ValueError("Pincode must contain only numbers")
        if len(pincode) != 6:
            raise ValueError("Pincode must be exactly 6 digits")
        return pincode


class CreateOrderRequest(BaseModel):
    shipping_address: ShippingAddressRequest
    payment_method: PaymentMethod = PaymentMethod.COD
    notes: Optional[str] = Field(default=None, max_length=500)


class OrderItemResponse(BaseModel):
    id: int
    product_id: int
    product_title: str
    product_image: str
    selected_size: str
    selected_color: str
    quantity: int
    unit_price: Decimal
    total_price: Decimal

    model_config = {"from_attributes": True}


class OrderResponse(BaseModel):
    id: int
    order_number: str
    status: OrderStatus
    subtotal: Decimal
    shipping_charge: Decimal
    discount_amount: Decimal
    total_amount: Decimal
    shipping_name: str
    shipping_phone: str
    shipping_address: str
    payment_method: PaymentMethod
    payment_status: PaymentStatus
    notes: Optional[str]
    cancellation_reason: Optional[str] = None
    items: List[OrderItemResponse]
    created_at: datetime

    model_config = {"from_attributes": True}


class OrderListResponse(BaseModel):
    id: int
    order_number: str
    status: OrderStatus
    total_amount: Decimal
    payment_method: PaymentMethod
    payment_status: PaymentStatus
    item_count: int
    created_at: datetime

    model_config = {"from_attributes": True}


class UpdateOrderStatusRequest(BaseModel):
    status: OrderStatus


class AdminOrderResponse(OrderResponse):
    user_id: int
    user_email: str = ""
    user_name: str = ""

    @model_validator(mode="after")
    def populate_user_fields(self) -> "AdminOrderResponse":
        return self

    @classmethod
    def model_validate(cls, obj, *args, **kwargs):
        instance = super().model_validate(obj, *args, **kwargs)
        if hasattr(obj, "user") and obj.user is not None:
            instance.user_email = obj.user.email or ""
            instance.user_name = obj.user.full_name or ""
        return instance
