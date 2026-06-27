# """
# app/repositories/cart_repository.py
# Database access for Cart, CartItem, Wishlist.
# """
# from typing import List, Optional

# from sqlalchemy import and_, delete, select
# from sqlalchemy.ext.asyncio import AsyncSession
# from sqlalchemy.orm import selectinload

# from app.models.cart import Cart, CartItem, Wishlist
# from app.models.product import Product


# class CartRepository:
#     def __init__(self, db: AsyncSession):
#         self.db = db

#     async def get_cart(self, user_id: int) -> Optional[Cart]:
#         result = await self.db.execute(
#             select(Cart)
#             .options(
#                 selectinload(Cart.items).selectinload(CartItem.product).selectinload(
#                     Product.images
#                 ),
#                 selectinload(Cart.items).selectinload(CartItem.product).selectinload(
#                     Product.category
#                 ),
#             )
#             .where(Cart.user_id == user_id)
#         )
#         return result.scalar_one_or_none()

#     async def get_or_create_cart(self, user_id: int) -> Cart:
#         cart = await self.get_cart(user_id)
#         if cart is None:
#             cart = Cart(user_id=user_id)
#             self.db.add(cart)
#             await self.db.flush()
#             await self.db.refresh(cart)
#             # Reload with relations
#             cart = await self.get_cart(user_id)  # type: ignore
#         return cart  # type: ignore

#     async def get_item(self, cart_id: int, item_id: int) -> Optional[CartItem]:
#         result = await self.db.execute(
#             select(CartItem).where(
#                 and_(CartItem.id == item_id, CartItem.cart_id == cart_id)
#             )
#         )
#         return result.scalar_one_or_none()

#     async def find_item(
#         self, cart_id: int, product_id: int, size: str, color: str
#     ) -> Optional[CartItem]:
#         result = await self.db.execute(
#             select(CartItem).where(
#                 and_(
#                     CartItem.cart_id == cart_id,
#                     CartItem.product_id == product_id,
#                     CartItem.selected_size == size,
#                     CartItem.selected_color == color,
#                 )
#             )
#         )
#         return result.scalar_one_or_none()

#     async def add_item(
#         self,
#         cart_id: int,
#         product_id: int,
#         size: str,
#         color: str,
#         quantity: int,
#         variant_id: Optional[int] = None,
#     ) -> CartItem:
#         # Check if exact variant already in cart → increment
#         existing = await self.find_item(cart_id, product_id, size, color)
#         if existing:
#             existing.quantity += quantity
#             await self.db.flush()
#             return existing

#         item = CartItem(
#             cart_id=cart_id,
#             product_id=product_id,
#             selected_size=size,
#             selected_color=color,
#             quantity=quantity,
#             variant_id=variant_id,
#         )
#         self.db.add(item)
#         await self.db.flush()
#         await self.db.refresh(item)
#         return item

#     async def update_quantity(self, item: CartItem, quantity: int) -> CartItem:
#         item.quantity = quantity
#         await self.db.flush()
#         return item

#     async def remove_item(self, item: CartItem) -> None:
#         await self.db.delete(item)
#         await self.db.flush()

#     async def clear_cart(self, cart_id: int) -> None:
#         await self.db.execute(
#             delete(CartItem).where(CartItem.cart_id == cart_id)
#         )
#         await self.db.flush()


# class WishlistRepository:
#     def __init__(self, db: AsyncSession):
#         self.db = db

#     async def get_wishlist(self, user_id: int) -> List[Wishlist]:
#         result = await self.db.execute(
#             select(Wishlist)
#             .options(
#                 selectinload(Wishlist.product).selectinload(Product.images),
#                 selectinload(Wishlist.product).selectinload(Product.category),
#             )
#             .where(Wishlist.user_id == user_id)
#             .order_by(Wishlist.added_at.desc())
#         )
#         return list(result.scalars().all())

#     async def find_item(self, user_id: int, product_id: int) -> Optional[Wishlist]:
#         result = await self.db.execute(
#             select(Wishlist).where(
#                 and_(Wishlist.user_id == user_id, Wishlist.product_id == product_id)
#             )
#         )
#         return result.scalar_one_or_none()

#     async def add(self, user_id: int, product_id: int) -> Wishlist:
#         item = Wishlist(user_id=user_id, product_id=product_id)
#         self.db.add(item)
#         await self.db.flush()
#         await self.db.refresh(item)
#         return item

#     async def remove(self, user_id: int, product_id: int) -> None:
#         result = await self.db.execute(
#             select(Wishlist).where(
#                 and_(Wishlist.user_id == user_id, Wishlist.product_id == product_id)
#             )
#         )
#         item = result.scalar_one_or_none()
#         if item:
#             await self.db.delete(item)
#             await self.db.flush()

"""
app/repositories/cart_repository.py
Database access for Cart, CartItem, Wishlist.
"""
from typing import List, Optional

from sqlalchemy import and_, delete, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.cart import Cart, CartItem, Wishlist
from app.models.product import Product


class CartRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_cart(self, user_id: int) -> Optional[Cart]:
        result = await self.db.execute(
            select(Cart)
            .options(
                selectinload(Cart.items).selectinload(CartItem.product).selectinload(
                    Product.images
                ),
                selectinload(Cart.items).selectinload(CartItem.product).selectinload(
                    Product.category
                ),
                # REQUIRED: cart_service._build_cart_response() loops over
                # p.variants to find the additional_price for the selected
                # size/color, so it can match order_service.py's pricing
                # exactly. Without eager-loading this here, accessing
                # p.variants outside the session triggers a lazy-load
                # crash (the same MissingGreenlet issue we hit on the
                # products endpoints earlier).
                selectinload(Cart.items).selectinload(CartItem.product).selectinload(
                    Product.variants
                ),
            )
            .where(Cart.user_id == user_id)
        )
        return result.scalar_one_or_none()

    async def get_or_create_cart(self, user_id: int) -> Cart:
        cart = await self.get_cart(user_id)
        if cart is None:
            cart = Cart(user_id=user_id)
            self.db.add(cart)
            await self.db.flush()
            await self.db.refresh(cart)
            # Reload with relations
            cart = await self.get_cart(user_id)  # type: ignore
        return cart  # type: ignore

    async def get_item(self, cart_id: int, item_id: int) -> Optional[CartItem]:
        result = await self.db.execute(
            select(CartItem).where(
                and_(CartItem.id == item_id, CartItem.cart_id == cart_id)
            )
        )
        return result.scalar_one_or_none()

    async def find_item(
        self, cart_id: int, product_id: int, size: str, color: str
    ) -> Optional[CartItem]:
        result = await self.db.execute(
            select(CartItem).where(
                and_(
                    CartItem.cart_id == cart_id,
                    CartItem.product_id == product_id,
                    CartItem.selected_size == size,
                    CartItem.selected_color == color,
                )
            )
        )
        return result.scalar_one_or_none()

    async def add_item(
        self,
        cart_id: int,
        product_id: int,
        size: str,
        color: str,
        quantity: int,
        variant_id: Optional[int] = None,
    ) -> CartItem:
        # Check if exact variant already in cart → increment
        existing = await self.find_item(cart_id, product_id, size, color)
        if existing:
            existing.quantity += quantity
            await self.db.flush()
            return existing

        item = CartItem(
            cart_id=cart_id,
            product_id=product_id,
            selected_size=size,
            selected_color=color,
            quantity=quantity,
            variant_id=variant_id,
        )
        self.db.add(item)
        await self.db.flush()
        await self.db.refresh(item)
        return item

    async def update_quantity(self, item: CartItem, quantity: int) -> CartItem:
        item.quantity = quantity
        await self.db.flush()
        return item

    async def remove_item(self, item: CartItem) -> None:
        await self.db.delete(item)
        await self.db.flush()

    async def clear_cart(self, cart_id: int) -> None:
        await self.db.execute(
            delete(CartItem).where(CartItem.cart_id == cart_id)
        )
        await self.db.flush()


class WishlistRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_wishlist(self, user_id: int) -> List[Wishlist]:
        result = await self.db.execute(
            select(Wishlist)
            .options(
                selectinload(Wishlist.product).selectinload(Product.images),
                selectinload(Wishlist.product).selectinload(Product.category),
            )
            .where(Wishlist.user_id == user_id)
            .order_by(Wishlist.added_at.desc())
        )
        return list(result.scalars().all())

    async def find_item(self, user_id: int, product_id: int) -> Optional[Wishlist]:
        result = await self.db.execute(
            select(Wishlist).where(
                and_(Wishlist.user_id == user_id, Wishlist.product_id == product_id)
            )
        )
        return result.scalar_one_or_none()

    async def add(self, user_id: int, product_id: int) -> Wishlist:
        item = Wishlist(user_id=user_id, product_id=product_id)
        self.db.add(item)
        await self.db.flush()
        await self.db.refresh(item)
        return item

    async def remove(self, user_id: int, product_id: int) -> None:
        result = await self.db.execute(
            select(Wishlist).where(
                and_(Wishlist.user_id == user_id, Wishlist.product_id == product_id)
            )
        )
        item = result.scalar_one_or_none()
        if item:
            await self.db.delete(item)
            await self.db.flush()