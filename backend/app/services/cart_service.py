# # # # """
# # # # app/services/cart_service.py
# # # # Business logic for cart and wishlist operations.
# # # # """
# # # # from decimal import Decimal
# # # # from typing import List

# # # # from sqlalchemy.ext.asyncio import AsyncSession

# # # # from app.core.exceptions import BusinessRuleError, NotFoundError
# # # # from app.repositories.cart_repository import CartRepository, WishlistRepository
# # # # from app.repositories.product_repository import ProductRepository
# # # # from app.models.cart import Cart, Wishlist
# # # # from app.schemas.cart import CartItemResponse, CartResponse, WishlistItemResponse


# # # # class CartService:
# # # #     def __init__(self, db: AsyncSession):
# # # #         self.db = db
# # # #         self.cart_repo = CartRepository(db)
# # # #         self.product_repo = ProductRepository(db)

# # # #     async def get_cart(self, user_id: int) -> CartResponse:
# # # #         cart = await self.cart_repo.get_or_create_cart(user_id)
# # # #         return self._build_cart_response(cart)

# # # #     async def add_item(
# # # #         self,
# # # #         user_id: int,
# # # #         product_id: int,
# # # #         selected_size: str,
# # # #         selected_color: str,
# # # #         quantity: int,
# # # #     ) -> CartResponse:
# # # #         product = await self.product_repo.get_by_id(product_id)
# # # #         if not product:
# # # #             raise NotFoundError("Product")

# # # #         # Find matching variant to track stock
# # # #         variant_id = None
# # # #         for v in product.variants:
# # # #             if v.size == selected_size and v.color == selected_color:
# # # #                 variant_id = v.id
# # # #                 if v.stock < quantity:
# # # #                     raise BusinessRuleError(
# # # #                         f"Only {v.stock} units available for this size/color"
# # # #                     )
# # # #                 break

# # # #         cart = await self.cart_repo.get_or_create_cart(user_id)
# # # #         await self.cart_repo.add_item(
# # # #             cart_id=cart.id,
# # # #             product_id=product_id,
# # # #             size=selected_size,
# # # #             color=selected_color,
# # # #             quantity=quantity,
# # # #             variant_id=variant_id,
# # # #         )
# # # #         await self.db.commit()
# # # #         return await self.get_cart(user_id)

# # # #     async def update_item(
# # # #         self, user_id: int, item_id: int, quantity: int
# # # #     ) -> CartResponse:
# # # #         cart = await self.cart_repo.get_or_create_cart(user_id)
# # # #         item = await self.cart_repo.get_item(cart.id, item_id)
# # # #         if not item:
# # # #             raise NotFoundError("Cart item")
# # # #         await self.cart_repo.update_quantity(item, quantity)
# # # #         await self.db.commit()
# # # #         return await self.get_cart(user_id)

# # # #     async def remove_item(self, user_id: int, item_id: int) -> CartResponse:
# # # #         cart = await self.cart_repo.get_or_create_cart(user_id)
# # # #         item = await self.cart_repo.get_item(cart.id, item_id)
# # # #         if not item:
# # # #             raise NotFoundError("Cart item")
# # # #         await self.cart_repo.remove_item(item)
# # # #         await self.db.commit()
# # # #         return await self.get_cart(user_id)

# # # #     async def clear_cart(self, user_id: int) -> None:
# # # #         cart = await self.cart_repo.get_or_create_cart(user_id)
# # # #         await self.cart_repo.clear_cart(cart.id)
# # # #         await self.db.commit()

# # # #     async def sync_cart(self, user_id: int, items: list) -> CartResponse:
# # # #         """
# # # #         Merge a guest's local cart with the server cart on login.
# # # #         For each item in the local cart, add it to the server cart
# # # #         (or increment quantity if already present).
# # # #         """
# # # #         for item in items:
# # # #             try:
# # # #                 await self.add_item(
# # # #                     user_id=user_id,
# # # #                     product_id=item.product_id,
# # # #                     selected_size=item.selected_size,
# # # #                     selected_color=item.selected_color,
# # # #                     quantity=item.quantity,
# # # #                 )
# # # #             except (NotFoundError, BusinessRuleError):
# # # #                 # Skip invalid/out-of-stock items during sync
# # # #                 pass
# # # #         return await self.get_cart(user_id)

# # # #     def _build_cart_response(self, cart: Cart) -> CartResponse:
# # # #         items = []
# # # #         subtotal = Decimal("0.00")
# # # #         for item in cart.items:
# # # #             p = item.product
# # # #             image_url = p.images[0].url if p.images else None
# # # #             unit_price = p.price
# # # #             subtotal += unit_price * item.quantity
# # # #             items.append(
# # # #                 CartItemResponse(
# # # #                     id=item.id,
# # # #                     product_id=p.id,
# # # #                     product_title=p.title,
# # # #                     product_image=image_url,
# # # #                     category_name=p.category.name,
# # # #                     price=unit_price,
# # # #                     old_price=p.old_price,
# # # #                     selected_size=item.selected_size,
# # # #                     selected_color=item.selected_color,
# # # #                     quantity=item.quantity,
# # # #                 )
# # # #             )
# # # #         return CartResponse(
# # # #             id=cart.id,
# # # #             items=items,
# # # #             subtotal=subtotal,
# # # #             item_count=len(items),
# # # #         )


# # # # class WishlistService:
# # # #     def __init__(self, db: AsyncSession):
# # # #         self.db = db
# # # #         self.wishlist_repo = WishlistRepository(db)
# # # #         self.product_repo = ProductRepository(db)

# # # #     async def get_wishlist(self, user_id: int) -> List[WishlistItemResponse]:
# # # #         items = await self.wishlist_repo.get_wishlist(user_id)
# # # #         return [self._build_item_response(item) for item in items]

# # # #     async def add_to_wishlist(self, user_id: int, product_id: int) -> None:
# # # #         product = await self.product_repo.get_by_id(product_id)
# # # #         if not product:
# # # #             raise NotFoundError("Product")
# # # #         existing = await self.wishlist_repo.find_item(user_id, product_id)
# # # #         if existing:
# # # #             return  # Already in wishlist — idempotent
# # # #         await self.wishlist_repo.add(user_id, product_id)
# # # #         await self.db.commit()

# # # #     async def remove_from_wishlist(self, user_id: int, product_id: int) -> None:
# # # #         await self.wishlist_repo.remove(user_id, product_id)
# # # #         await self.db.commit()

# # # #     def _build_item_response(self, item: Wishlist) -> WishlistItemResponse:
# # # #         p = item.product
# # # #         image_url = p.images[0].url if p.images else None
# # # #         return WishlistItemResponse(
# # # #             id=item.id,
# # # #             product_id=p.id,
# # # #             product_title=p.title,
# # # #             product_image=image_url,
# # # #             category_name=p.category.name,
# # # #             price=p.price,
# # # #             old_price=p.old_price,
# # # #             badge=p.badge,
# # # #         )

# # # """
# # # app/services/cart_service.py
# # # Business logic for cart and wishlist operations.
# # # """
# # # from decimal import Decimal
# # # from typing import List

# # # from sqlalchemy.ext.asyncio import AsyncSession

# # # from app.core.exceptions import BusinessRuleError, NotFoundError
# # # from app.repositories.cart_repository import CartRepository, WishlistRepository
# # # from app.repositories.product_repository import ProductRepository
# # # from app.models.cart import Cart, Wishlist
# # # from app.schemas.cart import CartItemResponse, CartResponse, WishlistItemResponse


# # # class CartService:
# # #     def __init__(self, db: AsyncSession):
# # #         self.db = db
# # #         self.cart_repo = CartRepository(db)
# # #         self.product_repo = ProductRepository(db)

# # #     async def get_cart(self, user_id: int) -> CartResponse:
# # #         cart = await self.cart_repo.get_or_create_cart(user_id)
# # #         return self._build_cart_response(cart)

# # #     async def add_item(
# # #         self,
# # #         user_id: int,
# # #         product_id: int,
# # #         selected_size: str,
# # #         selected_color: str,
# # #         quantity: int,
# # #     ) -> CartResponse:
# # #         product = await self.product_repo.get_by_id(product_id)
# # #         if not product:
# # #             raise NotFoundError("Product")

# # #         # Find matching variant to track stock
# # #         variant_id = None
# # #         for v in product.variants:
# # #             if v.size == selected_size and v.color == selected_color:
# # #                 variant_id = v.id
# # #                 if v.stock < quantity:
# # #                     raise BusinessRuleError(
# # #                         f"Only {v.stock} units available for this size/color"
# # #                     )
# # #                 break

# # #         cart = await self.cart_repo.get_or_create_cart(user_id)
# # #         await self.cart_repo.add_item(
# # #             cart_id=cart.id,
# # #             product_id=product_id,
# # #             size=selected_size,
# # #             color=selected_color,
# # #             quantity=quantity,
# # #             variant_id=variant_id,
# # #         )
# # #         await self.db.commit()
# # #         return await self.get_cart(user_id)

# # #     async def update_item(
# # #         self, user_id: int, item_id: int, quantity: int
# # #     ) -> CartResponse:
# # #         cart = await self.cart_repo.get_or_create_cart(user_id)
# # #         item = await self.cart_repo.get_item(cart.id, item_id)
# # #         if not item:
# # #             raise NotFoundError("Cart item")
# # #         await self.cart_repo.update_quantity(item, quantity)
# # #         await self.db.commit()
# # #         return await self.get_cart(user_id)

# # #     async def remove_item(self, user_id: int, item_id: int) -> CartResponse:
# # #         cart = await self.cart_repo.get_or_create_cart(user_id)
# # #         item = await self.cart_repo.get_item(cart.id, item_id)
# # #         if not item:
# # #             raise NotFoundError("Cart item")
# # #         await self.cart_repo.remove_item(item)
# # #         await self.db.commit()
# # #         return await self.get_cart(user_id)

# # #     async def clear_cart(self, user_id: int) -> None:
# # #         cart = await self.cart_repo.get_or_create_cart(user_id)
# # #         await self.cart_repo.clear_cart(cart.id)
# # #         await self.db.commit()

# # #     async def sync_cart(self, user_id: int, items: list) -> CartResponse:
# # #         """
# # #         Merge a guest's local cart with the server cart on login.
# # #         For each item in the local cart, add it to the server cart
# # #         (or increment quantity if already present).
# # #         """
# # #         for item in items:
# # #             try:
# # #                 await self.add_item(
# # #                     user_id=user_id,
# # #                     product_id=item.product_id,
# # #                     selected_size=item.selected_size,
# # #                     selected_color=item.selected_color,
# # #                     quantity=item.quantity,
# # #                 )
# # #             except (NotFoundError, BusinessRuleError):
# # #                 # Skip invalid/out-of-stock items during sync
# # #                 pass
# # #         return await self.get_cart(user_id)

# # #     def _build_cart_response(self, cart: Cart) -> CartResponse:
# # #         items = []
# # #         subtotal = Decimal("0.00")
# # #         for item in cart.items:
# # #             p = item.product
# # #             image_url = p.images[0].url if p.images else None

# # #             # IMPORTANT: match order_service.py exactly. The base product
# # #             # price alone is not the real price the customer pays — if the
# # #             # selected size/color variant carries an additional_price
# # #             # surcharge, that must be added here too. Without this, the
# # #             # cart/checkout total (built from this response) disagrees with
# # #             # the order total calculated in order_service.create_order(),
# # #             # which DOES include the variant surcharge. That mismatch is
# # #             # exactly what caused cart/checkout to show ₹4000 while the
# # #             # real order (and admin panel) showed ₹4005.
# # #             unit_price = p.price
# # #             for v in p.variants:
# # #                 if v.size == item.selected_size and v.color == item.selected_color:
# # #                     unit_price += v.additional_price
# # #                     break

# # #             subtotal += unit_price * item.quantity
# # #             items.append(
# # #                 CartItemResponse(
# # #                     id=item.id,
# # #                     product_id=p.id,
# # #                     product_title=p.title,
# # #                     product_image=image_url,
# # #                     category_name=p.category.name,
# # #                     price=unit_price,
# # #                     old_price=p.old_price,
# # #                     selected_size=item.selected_size,
# # #                     selected_color=item.selected_color,
# # #                     quantity=item.quantity,
# # #                 )
# # #             )
# # #         return CartResponse(
# # #             id=cart.id,
# # #             items=items,
# # #             subtotal=subtotal,
# # #             item_count=len(items),
# # #         )


# # # class WishlistService:
# # #     def __init__(self, db: AsyncSession):
# # #         self.db = db
# # #         self.wishlist_repo = WishlistRepository(db)
# # #         self.product_repo = ProductRepository(db)

# # #     async def get_wishlist(self, user_id: int) -> List[WishlistItemResponse]:
# # #         items = await self.wishlist_repo.get_wishlist(user_id)
# # #         return [self._build_item_response(item) for item in items]

# # #     async def add_to_wishlist(self, user_id: int, product_id: int) -> None:
# # #         product = await self.product_repo.get_by_id(product_id)
# # #         if not product:
# # #             raise NotFoundError("Product")
# # #         existing = await self.wishlist_repo.find_item(user_id, product_id)
# # #         if existing:
# # #             return  # Already in wishlist — idempotent
# # #         await self.wishlist_repo.add(user_id, product_id)
# # #         await self.db.commit()

# # #     async def remove_from_wishlist(self, user_id: int, product_id: int) -> None:
# # #         await self.wishlist_repo.remove(user_id, product_id)
# # #         await self.db.commit()

# # #     def _build_item_response(self, item: Wishlist) -> WishlistItemResponse:
# # #         p = item.product
# # #         image_url = p.images[0].url if p.images else None
# # #         return WishlistItemResponse(
# # #             id=item.id,
# # #             product_id=p.id,
# # #             product_title=p.title,
# # #             product_image=image_url,
# # #             category_name=p.category.name,
# # #             price=p.price,
# # #             old_price=p.old_price,
# # #             badge=p.badge,
# # #         )

# # """
# # app/services/cart_service.py
# # Business logic for cart and wishlist operations.
# # """

# # from decimal import Decimal
# # from typing import List

# # from sqlalchemy.ext.asyncio import AsyncSession

# # from app.core.exceptions import BusinessRuleError, NotFoundError
# # from app.repositories.cart_repository import CartRepository, WishlistRepository
# # from app.repositories.product_repository import ProductRepository
# # from app.models.cart import Cart, Wishlist
# # from app.schemas.cart import CartItemResponse, CartResponse, WishlistItemResponse


# # class CartService:
# #     def __init__(self, db: AsyncSession):
# #         self.db = db
# #         self.cart_repo = CartRepository(db)
# #         self.product_repo = ProductRepository(db)

# #     async def get_cart(self, user_id: int) -> CartResponse:
# #         cart = await self.cart_repo.get_or_create_cart(user_id)
# #         return self._build_cart_response(cart)

# #     async def add_item(
# #         self,
# #         user_id: int,
# #         product_id: int,
# #         selected_size: str,
# #         selected_color: str,
# #         quantity: int,
# #     ) -> CartResponse:
# #         product = await self.product_repo.get_by_id(product_id)
# #         if not product:
# #             raise NotFoundError("Product")

# #         variant_id = None
# #         for v in product.variants:
# #             if v.size == selected_size and v.color == selected_color:
# #                 variant_id = v.id
# #                 if v.stock < quantity:
# #                     raise BusinessRuleError(
# #                         f"Only {v.stock} units available for this size/color"
# #                     )
# #                 break

# #         cart = await self.cart_repo.get_or_create_cart(user_id)
# #         await self.cart_repo.add_item(
# #             cart_id=cart.id,
# #             product_id=product_id,
# #             size=selected_size,
# #             color=selected_color,
# #             quantity=quantity,
# #             variant_id=variant_id,
# #         )
# #         await self.db.commit()
# #         return await self.get_cart(user_id)

# #     async def update_item(
# #         self, user_id: int, item_id: int, quantity: int
# #     ) -> CartResponse:
# #         cart = await self.cart_repo.get_or_create_cart(user_id)
# #         item = await self.cart_repo.get_item(cart.id, item_id)
# #         if not item:
# #             raise NotFoundError("Cart item")
# #         await self.cart_repo.update_quantity(item, quantity)
# #         await self.db.commit()
# #         return await self.get_cart(user_id)

# #     async def remove_item(self, user_id: int, item_id: int) -> CartResponse:
# #         cart = await self.cart_repo.get_or_create_cart(user_id)
# #         item = await self.cart_repo.get_item(cart.id, item_id)
# #         if not item:
# #             raise NotFoundError("Cart item")
# #         await self.cart_repo.remove_item(item)
# #         await self.db.commit()
# #         return await self.get_cart(user_id)

# #     async def clear_cart(self, user_id: int) -> None:
# #         cart = await self.cart_repo.get_or_create_cart(user_id)
# #         await self.cart_repo.clear_cart(cart.id)
# #         await self.db.commit()

# #     async def sync_cart(self, user_id: int, items: list) -> CartResponse:
# #         for item in items:
# #             try:
# #                 await self.add_item(
# #                     user_id=user_id,
# #                     product_id=item.product_id,
# #                     selected_size=item.selected_size,
# #                     selected_color=item.selected_color,
# #                     quantity=item.quantity,
# #                 )
# #             except (NotFoundError, BusinessRuleError):
# #                 pass
# #         return await self.get_cart(user_id)

# #     def _build_cart_response(self, cart: Cart) -> CartResponse:
# #         items = []
# #         subtotal = Decimal("0.00")

# #         for item in cart.items:
# #             p = item.product
# #             image_url = p.images[0].url if p.images else None
# #             unit_price = p.price
# #             subtotal += unit_price * item.quantity

# #             items.append(
# #                 CartItemResponse(
# #                     id=item.id,
# #                     product_id=p.id,
# #                     product_title=p.title,
# #                     product_image=image_url,
# #                     category_name=p.category.name,
# #                     price=unit_price,
# #                     old_price=p.old_price,
# #                     selected_size=item.selected_size,
# #                     selected_color=item.selected_color,
# #                     quantity=item.quantity,
# #                 )
# #             )

# #         return CartResponse(
# #             id=cart.id,
# #             items=items,
# #             subtotal=subtotal,
# #             item_count=len(items),
# #         )


# # class WishlistService:
# #     def __init__(self, db: AsyncSession):
# #         self.db = db
# #         self.wishlist_repo = WishlistRepository(db)
# #         self.product_repo = ProductRepository(db)

# #     async def get_wishlist(self, user_id: int) -> List[WishlistItemResponse]:
# #         items = await self.wishlist_repo.get_wishlist(user_id)
# #         return [self._build_item_response(item) for item in items]

# #     async def add_to_wishlist(self, user_id: int, product_id: int) -> None:
# #         product = await self.product_repo.get_by_id(product_id)
# #         if not product:
# #             raise NotFoundError("Product")
# #         existing = await self.wishlist_repo.find_item(user_id, product_id)
# #         if existing:
# #             return
# #         await self.wishlist_repo.add(user_id, product_id)
# #         await self.db.commit()

# #     async def remove_from_wishlist(self, user_id: int, product_id: int) -> None:
# #         await self.wishlist_repo.remove(user_id, product_id)
# #         await self.db.commit()

# #     def _build_item_response(self, item: Wishlist) -> WishlistItemResponse:
# #         p = item.product
# #         image_url = p.images[0].url if p.images else None
# #         return WishlistItemResponse(
# #             id=item.id,
# #             product_id=p.id,
# #             product_title=p.title,
# #             product_image=image_url,
# #             category_name=p.category.name,
# #             price=p.price,
# #             old_price=p.old_price,
# #             badge=p.badge,
# #         )


# """
# app/services/cart_service.py
# Business logic for cart and wishlist operations.
# """

# from decimal import Decimal
# from typing import List

# from sqlalchemy.ext.asyncio import AsyncSession

# from app.core.exceptions import BusinessRuleError, NotFoundError
# from app.repositories.cart_repository import CartRepository, WishlistRepository
# from app.repositories.product_repository import ProductRepository
# from app.models.cart import Cart, Wishlist
# from app.schemas.cart import CartItemResponse, CartResponse, WishlistItemResponse


# class CartService:
#     def __init__(self, db: AsyncSession):
#         self.db = db
#         self.cart_repo = CartRepository(db)
#         self.product_repo = ProductRepository(db)

#     async def get_cart(self, user_id: int) -> CartResponse:
#         cart = await self.cart_repo.get_or_create_cart(user_id)
#         return self._build_cart_response(cart)

#     async def add_item(
#         self,
#         user_id: int,
#         product_id: int,
#         selected_size: str,
#         selected_color: str,
#         quantity: int,
#     ) -> CartResponse:
#         product = await self.product_repo.get_by_id(product_id)
#         if not product:
#             raise NotFoundError("Product")

#         cart = await self.cart_repo.get_or_create_cart(user_id)
#         existing_item = await self.cart_repo.find_item(
#             cart.id,
#             product_id,
#             selected_size,
#             selected_color,
#         )

#         variant_id = None
#         for v in product.variants:
#             if v.size == selected_size and v.color == selected_color:
#                 variant_id = v.id
#                 requested_quantity = quantity + (existing_item.quantity if existing_item else 0)
#                 if v.stock < requested_quantity:
#                     raise BusinessRuleError(
#                         f"Only {v.stock} units available for this size/color"
#                     )
#                 break

#         await self.cart_repo.add_item(
#             cart_id=cart.id,
#             product_id=product_id,
#             size=selected_size,
#             color=selected_color,
#             quantity=quantity,
#             variant_id=variant_id,
#         )
#         await self.db.commit()
#         return await self.get_cart(user_id)

#     async def update_item(
#         self, user_id: int, item_id: int, quantity: int
#     ) -> CartResponse:
#         cart = await self.cart_repo.get_or_create_cart(user_id)
#         item = await self.cart_repo.get_item(cart.id, item_id)
#         if not item:
#             raise NotFoundError("Cart item")

#         product = await self.product_repo.get_by_id(item.product_id)
#         if not product:
#             raise NotFoundError("Product")

#         for variant in product.variants:
#             if (
#                 variant.size == item.selected_size
#                 and variant.color == item.selected_color
#                 and variant.stock < quantity
#             ):
#                 raise BusinessRuleError(
#                     f"Only {variant.stock} units available for this size/color"
#                 )

#         await self.cart_repo.update_quantity(item, quantity)
#         await self.db.commit()
#         return await self.get_cart(user_id)

#     async def remove_item(self, user_id: int, item_id: int) -> CartResponse:
#         cart = await self.cart_repo.get_or_create_cart(user_id)
#         item = await self.cart_repo.get_item(cart.id, item_id)
#         if not item:
#             raise NotFoundError("Cart item")
#         await self.cart_repo.remove_item(item)
#         await self.db.commit()
#         return await self.get_cart(user_id)

#     async def clear_cart(self, user_id: int) -> None:
#         cart = await self.cart_repo.get_or_create_cart(user_id)
#         await self.cart_repo.clear_cart(cart.id)
#         await self.db.commit()

#     async def sync_cart(self, user_id: int, items: list) -> CartResponse:
#         for item in items:
#             try:
#                 await self.add_item(
#                     user_id=user_id,
#                     product_id=item.product_id,
#                     selected_size=item.selected_size,
#                     selected_color=item.selected_color,
#                     quantity=item.quantity,
#                 )
#             except (NotFoundError, BusinessRuleError):
#                 pass
#         return await self.get_cart(user_id)

#     def _build_cart_response(self, cart: Cart) -> CartResponse:
#         items = []
#         subtotal = Decimal("0.00")

#         for item in cart.items:
#             p = item.product
#             image_url = p.images[0].url if p.images else None
#             unit_price = p.price
#             subtotal += unit_price * item.quantity

#             items.append(
#                 CartItemResponse(
#                     id=item.id,
#                     product_id=p.id,
#                     product_title=p.title,
#                     product_image=image_url,
#                     category_name=p.category.name,
#                     price=unit_price,
#                     old_price=p.old_price,
#                     selected_size=item.selected_size,
#                     selected_color=item.selected_color,
#                     quantity=item.quantity,
#                 )
#             )

#         return CartResponse(
#             id=cart.id,
#             items=items,
#             subtotal=subtotal,
#             item_count=len(items),
#         )


# class WishlistService:
#     def __init__(self, db: AsyncSession):
#         self.db = db
#         self.wishlist_repo = WishlistRepository(db)
#         self.product_repo = ProductRepository(db)

#     async def get_wishlist(self, user_id: int) -> List[WishlistItemResponse]:
#         items = await self.wishlist_repo.get_wishlist(user_id)
#         return [self._build_item_response(item) for item in items]

#     async def add_to_wishlist(self, user_id: int, product_id: int) -> None:
#         product = await self.product_repo.get_by_id(product_id)
#         if not product:
#             raise NotFoundError("Product")
#         existing = await self.wishlist_repo.find_item(user_id, product_id)
#         if existing:
#             return
#         await self.wishlist_repo.add(user_id, product_id)
#         await self.db.commit()

#     async def remove_from_wishlist(self, user_id: int, product_id: int) -> None:
#         await self.wishlist_repo.remove(user_id, product_id)
#         await self.db.commit()

#     def _build_item_response(self, item: Wishlist) -> WishlistItemResponse:
#         p = item.product
#         image_url = p.images[0].url if p.images else None
#         return WishlistItemResponse(
#             id=item.id,
#             product_id=p.id,
#             product_title=p.title,
#             product_image=image_url,
#             category_name=p.category.name,
#             price=p.price,
#             old_price=p.old_price,
#             badge=p.badge,
#         )


"""
app/services/cart_service.py
Business logic for cart and wishlist operations.
"""

from decimal import Decimal
from typing import List

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import BusinessRuleError, NotFoundError
from app.repositories.cart_repository import CartRepository, WishlistRepository
from app.repositories.product_repository import ProductRepository
from app.models.cart import Cart, Wishlist
from app.schemas.cart import CartItemResponse, CartResponse, WishlistItemResponse


class CartService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.cart_repo = CartRepository(db)
        self.product_repo = ProductRepository(db)

    async def get_cart(self, user_id: int) -> CartResponse:
        cart = await self.cart_repo.get_or_create_cart(user_id)
        return self._build_cart_response(cart)

    async def add_item(
        self,
        user_id: int,
        product_id: int,
        selected_size: str,
        selected_color: str,
        quantity: int,
    ) -> CartResponse:
        product = await self.product_repo.get_by_id(product_id)
        if not product:
            raise NotFoundError("Product")

        cart = await self.cart_repo.get_or_create_cart(user_id)
        existing_item = await self.cart_repo.find_item(
            cart.id,
            product_id,
            selected_size,
            selected_color,
        )

        variant_id = None
        for v in product.variants:
            if v.size == selected_size and v.color == selected_color:
                variant_id = v.id
                requested_quantity = quantity + (existing_item.quantity if existing_item else 0)
                if v.stock < requested_quantity:
                    raise BusinessRuleError(
                        f"Only {v.stock} units available for this size/color"
                    )
                break

        await self.cart_repo.add_item(
            cart_id=cart.id,
            product_id=product_id,
            size=selected_size,
            color=selected_color,
            quantity=quantity,
            variant_id=variant_id,
        )
        await self.db.commit()
        return await self.get_cart(user_id)

    async def update_item(
        self, user_id: int, item_id: int, quantity: int
    ) -> CartResponse:
        cart = await self.cart_repo.get_or_create_cart(user_id)
        item = await self.cart_repo.get_item(cart.id, item_id)
        if not item:
            raise NotFoundError("Cart item")

        product = await self.product_repo.get_by_id(item.product_id)
        if not product:
            raise NotFoundError("Product")

        for variant in product.variants:
            if (
                variant.size == item.selected_size
                and variant.color == item.selected_color
                and variant.stock < quantity
            ):
                raise BusinessRuleError(
                    f"Only {variant.stock} units available for this size/color"
                )

        await self.cart_repo.update_quantity(item, quantity)
        await self.db.commit()
        return await self.get_cart(user_id)

    async def remove_item(self, user_id: int, item_id: int) -> CartResponse:
        cart = await self.cart_repo.get_or_create_cart(user_id)
        item = await self.cart_repo.get_item(cart.id, item_id)
        if not item:
            raise NotFoundError("Cart item")
        await self.cart_repo.remove_item(item)
        await self.db.commit()
        return await self.get_cart(user_id)

    async def clear_cart(self, user_id: int) -> None:
        cart = await self.cart_repo.get_or_create_cart(user_id)
        await self.cart_repo.clear_cart(cart.id)
        await self.db.commit()

    async def sync_cart(self, user_id: int, items: list) -> CartResponse:
        for item in items:
            try:
                await self.add_item(
                    user_id=user_id,
                    product_id=item.product_id,
                    selected_size=item.selected_size,
                    selected_color=item.selected_color,
                    quantity=item.quantity,
                )
            except (NotFoundError, BusinessRuleError):
                pass
        return await self.get_cart(user_id)

    def _build_cart_response(self, cart: Cart) -> CartResponse:
        items = []
        subtotal = Decimal("0.00")

        for item in cart.items:
            p = item.product
            image_url = p.images[0].url if p.images else None
            unit_price = p.price
            subtotal += unit_price * item.quantity

            items.append(
                CartItemResponse(
                    id=item.id,
                    product_id=p.id,
                    product_title=p.title,
                    product_image=image_url,
                    category_name=p.category.name,
                    price=unit_price,
                    old_price=p.old_price,
                    selected_size=item.selected_size,
                    selected_color=item.selected_color,
                    quantity=item.quantity,
                )
            )

        return CartResponse(
            id=cart.id,
            items=items,
            subtotal=subtotal,
            item_count=len(items),
        )


class WishlistService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.wishlist_repo = WishlistRepository(db)
        self.product_repo = ProductRepository(db)

    async def get_wishlist(self, user_id: int) -> List[WishlistItemResponse]:
        items = await self.wishlist_repo.get_wishlist(user_id)
        return [self._build_item_response(item) for item in items]

    async def add_to_wishlist(self, user_id: int, product_id: int) -> None:
        product = await self.product_repo.get_by_id(product_id)
        if not product:
            raise NotFoundError("Product")
        existing = await self.wishlist_repo.find_item(user_id, product_id)
        if existing:
            return
        await self.wishlist_repo.add(user_id, product_id)
        await self.db.commit()

    async def remove_from_wishlist(self, user_id: int, product_id: int) -> None:
        await self.wishlist_repo.remove(user_id, product_id)
        await self.db.commit()

    def _build_item_response(self, item: Wishlist) -> WishlistItemResponse:
        p = item.product
        image_url = p.images[0].url if p.images else None
        return WishlistItemResponse(
            id=item.id,
            product_id=p.id,
            product_title=p.title,
            product_image=image_url,
            category_name=p.category.name,
            price=p.price,
            old_price=p.old_price,
            badge=p.badge,
        )
