"""
app/api/v1/cart/routes.py
Cart management endpoints (authenticated).
"""
from fastapi import APIRouter

from app.core.dependencies import CurrentUserID, DBSession
from app.schemas.base import APIResponse
from app.schemas.cart import (
    AddToCartRequest,
    CartResponse,
    SyncCartRequest,
    UpdateCartItemRequest,
)
from app.services.cart_service import CartService

router = APIRouter(prefix="/cart", tags=["Cart"])


@router.get("", response_model=APIResponse[CartResponse])
async def get_cart(user_id: CurrentUserID, db: DBSession):
    """Get the current user's cart."""
    service = CartService(db)
    cart = await service.get_cart(user_id)
    return APIResponse(data=cart)


@router.post("/items", response_model=APIResponse[CartResponse], status_code=201)
async def add_to_cart(
    body: AddToCartRequest, user_id: CurrentUserID, db: DBSession
):
    """Add a product to cart. If the same variant already exists, increments quantity."""
    service = CartService(db)
    cart = await service.add_item(
        user_id=user_id,
        product_id=body.product_id,
        selected_size=body.selected_size,
        selected_color=body.selected_color,
        quantity=body.quantity,
    )
    return APIResponse(data=cart, message="Added to cart")


@router.put("/items/{item_id}", response_model=APIResponse[CartResponse])
async def update_cart_item(
    item_id: int,
    body: UpdateCartItemRequest,
    user_id: CurrentUserID,
    db: DBSession,
):
    """Update quantity of a cart item."""
    service = CartService(db)
    cart = await service.update_item(user_id, item_id, body.quantity)
    return APIResponse(data=cart)


@router.delete("/items/{item_id}", response_model=APIResponse[CartResponse])
async def remove_cart_item(
    item_id: int, user_id: CurrentUserID, db: DBSession
):
    """Remove a specific item from cart."""
    service = CartService(db)
    cart = await service.remove_item(user_id, item_id)
    return APIResponse(data=cart, message="Item removed")


@router.delete("", response_model=APIResponse[None])
async def clear_cart(user_id: CurrentUserID, db: DBSession):
    """Clear all items from the cart."""
    service = CartService(db)
    await service.clear_cart(user_id)
    return APIResponse(message="Cart cleared")


@router.post("/sync", response_model=APIResponse[CartResponse])
async def sync_cart(
    body: SyncCartRequest, user_id: CurrentUserID, db: DBSession
):
    """
    Sync a guest's local cart with the server cart after login.
    Call this immediately after a successful login if the user had
    items in their local (Zustand) cart.
    """
    service = CartService(db)
    cart = await service.sync_cart(user_id, body.items)
    return APIResponse(data=cart, message="Cart synced")