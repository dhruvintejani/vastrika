"""
app/api/v1/wishlist/routes.py
Wishlist endpoints (authenticated).
"""
from fastapi import APIRouter

from app.core.dependencies import CurrentUserID, DBSession
from app.schemas.base import APIResponse
from app.schemas.cart import WishlistItemResponse
from app.services.cart_service import WishlistService

router = APIRouter(prefix="/wishlist", tags=["Wishlist"])


@router.get("", response_model=APIResponse[list[WishlistItemResponse]])
async def get_wishlist(user_id: CurrentUserID, db: DBSession):
    """Get the current user's wishlist."""
    service = WishlistService(db)
    items = await service.get_wishlist(user_id)
    return APIResponse(data=items)


@router.post("/{product_id}", response_model=APIResponse[None], status_code=201)
async def add_to_wishlist(product_id: int, user_id: CurrentUserID, db: DBSession):
    """Add a product to wishlist (idempotent — safe to call if already present)."""
    service = WishlistService(db)
    await service.add_to_wishlist(user_id, product_id)
    return APIResponse(message="Added to wishlist")


@router.delete("/{product_id}", response_model=APIResponse[None])
async def remove_from_wishlist(
    product_id: int, user_id: CurrentUserID, db: DBSession
):
    """Remove a product from wishlist."""
    service = WishlistService(db)
    await service.remove_from_wishlist(user_id, product_id)
    return APIResponse(message="Removed from wishlist")