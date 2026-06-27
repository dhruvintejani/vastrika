"""
app/schemas/cart.py
Pydantic schemas for cart, cart items, and wishlist.
"""
from decimal import Decimal
from typing import List, Optional

from pydantic import BaseModel, Field

from app.schemas.product import ProductImageResponse


class AddToCartRequest(BaseModel):
    product_id: int
    selected_size: str = Field(min_length=1, max_length=50)
    selected_color: str = Field(min_length=1, max_length=100)
    quantity: int = Field(ge=1, le=20, default=1)


class UpdateCartItemRequest(BaseModel):
    quantity: int = Field(ge=1, le=20)


class SyncCartRequest(BaseModel):
    """Used to merge a guest's local cart on login."""
    items: List[AddToCartRequest]


class CartItemResponse(BaseModel):
    id: int
    product_id: int
    product_title: str
    product_image: Optional[str]
    category_name: str
    price: Decimal
    old_price: Decimal
    selected_size: str
    selected_color: str
    quantity: int

    model_config = {"from_attributes": True}


class CartResponse(BaseModel):
    id: int
    items: List[CartItemResponse]
    subtotal: Decimal
    item_count: int

    model_config = {"from_attributes": True}


class WishlistItemResponse(BaseModel):
    id: int
    product_id: int
    product_title: str
    product_image: Optional[str]
    category_name: str
    price: Decimal
    old_price: Decimal
    badge: Optional[str]

    model_config = {"from_attributes": True}