# # # # # """
# # # # # app/services/order_service.py
# # # # # Business logic for order creation and management.
# # # # # All financial calculations happen server-side — never trust client totals.
# # # # # """
# # # # # from decimal import Decimal
# # # # # from typing import List, Optional, Tuple

# # # # # from sqlalchemy.ext.asyncio import AsyncSession

# # # # # from app.core.config import settings
# # # # # from app.core.exceptions import BusinessRuleError, NotFoundError, ForbiddenError
# # # # # from app.models.order import Order, OrderStatus
# # # # # from app.repositories.cart_repository import CartRepository
# # # # # from app.repositories.order_repository import OrderRepository
# # # # # from app.repositories.product_repository import ProductRepository
# # # # # from app.schemas.order import (
# # # # #     CreateOrderRequest,
# # # # #     OrderListResponse,
# # # # #     OrderResponse,
# # # # #     UpdateOrderStatusRequest,
# # # # # )


# # # # # class OrderService:
# # # # #     def __init__(self, db: AsyncSession):
# # # # #         self.db = db
# # # # #         self.order_repo = OrderRepository(db)
# # # # #         self.cart_repo = CartRepository(db)
# # # # #         self.product_repo = ProductRepository(db)

# # # # #     async def create_order(
# # # # #         self, user_id: int, request: CreateOrderRequest
# # # # #     ) -> Order:
# # # # #         """
# # # # #         Create an order from the user's current cart.
# # # # #         - Recalculates all prices server-side
# # # # #         - Decrements stock atomically
# # # # #         - Clears cart after successful order
# # # # #         """
# # # # #         cart = await self.cart_repo.get_or_create_cart(user_id)
# # # # #         if not cart.items:
# # # # #             raise BusinessRuleError("Your cart is empty")

# # # # #         # Build order items with current DB prices (never trust client)
# # # # #         items_data = []
# # # # #         subtotal = Decimal("0.00")

# # # # #         for cart_item in cart.items:
# # # # #             product = await self.product_repo.get_by_id(cart_item.product_id)
# # # # #             if not product:
# # # # #                 raise BusinessRuleError(
# # # # #                     f"Product '{cart_item.product_id}' is no longer available"
# # # # #                 )
# # # # #             if not product.is_active:
# # # # #                 raise BusinessRuleError(
# # # # #                     f"'{product.title}' is currently unavailable"
# # # # #                 )

# # # # #             # Find the specific variant and check stock
# # # # #             matching_variant = None
# # # # #             for v in product.variants:
# # # # #                 if (
# # # # #                     v.size == cart_item.selected_size
# # # # #                     and v.color == cart_item.selected_color
# # # # #                 ):
# # # # #                     matching_variant = v
# # # # #                     break

# # # # #             if matching_variant and matching_variant.stock < cart_item.quantity:
# # # # #                 raise BusinessRuleError(
# # # # #                     f"'{product.title}' ({cart_item.selected_size}, {cart_item.selected_color}) "
# # # # #                     f"has only {matching_variant.stock} units in stock"
# # # # #                 )

# # # # #             unit_price = product.price
# # # # #             if matching_variant:
# # # # #                 unit_price += matching_variant.additional_price

# # # # #             line_total = unit_price * cart_item.quantity
# # # # #             subtotal += line_total

# # # # #             image_url = product.images[0].url if product.images else ""
# # # # #             items_data.append(
# # # # #                 {
# # # # #                     "product_id": product.id,
# # # # #                     "product_title": product.title,
# # # # #                     "product_image": image_url,
# # # # #                     "selected_size": cart_item.selected_size,
# # # # #                     "selected_color": cart_item.selected_color,
# # # # #                     "quantity": cart_item.quantity,
# # # # #                     "unit_price": unit_price,
# # # # #                     "total_price": line_total,
# # # # #                     "_variant_id": matching_variant.id if matching_variant else None,
# # # # #                     "_quantity": cart_item.quantity,
# # # # #                 }
# # # # #             )

# # # # #         # Calculate shipping
# # # # #         shipping_charge = (
# # # # #             Decimal("0.00")
# # # # #             if subtotal >= settings.FREE_SHIPPING_THRESHOLD
# # # # #             else Decimal(str(settings.STANDARD_SHIPPING_CHARGE))
# # # # #         )
# # # # #         total_amount = subtotal + shipping_charge

# # # # #         # Build shipping address string
# # # # #         addr = request.shipping_address
# # # # #         address_str = (
# # # # #             f"{addr.address_line1}"
# # # # #             + (f", {addr.address_line2}" if addr.address_line2 else "")
# # # # #             + f", {addr.city}, {addr.state} - {addr.pincode}"
# # # # #         )

# # # # #         # Extract variant/quantity for stock decrement (then clean up)
# # # # #         stock_updates = [
# # # # #             (item.pop("_variant_id"), item.pop("_quantity"))
# # # # #             for item in items_data
# # # # #         ]

# # # # #         # Create order in DB
# # # # #         order = await self.order_repo.create(
# # # # #             user_id=user_id,
# # # # #             items_data=items_data,
# # # # #             subtotal=subtotal,
# # # # #             shipping_charge=shipping_charge,
# # # # #             total_amount=total_amount,
# # # # #             shipping_name=addr.full_name,
# # # # #             shipping_phone=addr.phone,
# # # # #             shipping_address=address_str,
# # # # #             payment_method=request.payment_method.value,
# # # # #             notes=request.notes,
# # # # #         )

# # # # #         # Decrement stock for each variant
# # # # #         for variant_id, qty in stock_updates:
# # # # #             if variant_id:
# # # # #                 await self.product_repo.decrement_variant_stock(variant_id, qty)

# # # # #         # Clear the cart
# # # # #         await self.cart_repo.clear_cart(cart.id)
# # # # #         await self.db.commit()

# # # # #         return order

# # # # #     async def get_order(self, order_id: int, user_id: int) -> Order:
# # # # #         order = await self.order_repo.get_by_id(order_id)
# # # # #         if not order:
# # # # #             raise NotFoundError("Order")
# # # # #         if order.user_id != user_id:
# # # # #             raise ForbiddenError("You do not have access to this order")
# # # # #         return order

# # # # #     async def get_user_orders(
# # # # #         self, user_id: int, page: int = 1, page_size: int = 20
# # # # #     ) -> Tuple[List[Order], int]:
# # # # #         skip = (page - 1) * page_size
# # # # #         return await self.order_repo.get_user_orders(user_id, skip, page_size)

# # # # #     async def cancel_order(self, order_id: int, user_id: int) -> Order:
# # # # #         order = await self.get_order(order_id, user_id)
# # # # #         if order.status not in (OrderStatus.PENDING, OrderStatus.CONFIRMED):
# # # # #             raise BusinessRuleError(
# # # # #                 "Only pending or confirmed orders can be cancelled"
# # # # #             )
# # # # #         updated = await self.order_repo.update_status(order_id, OrderStatus.CANCELLED.value)
# # # # #         await self.db.commit()
# # # # #         return updated  # type: ignore

# # # # #     # ── Admin operations ──────────────────────────────────────────────────────

# # # # #     async def admin_list_orders(
# # # # #         self,
# # # # #         status: Optional[OrderStatus] = None,
# # # # #         search: Optional[str] = None,
# # # # #         page: int = 1,
# # # # #         page_size: int = 20,
# # # # #     ) -> Tuple[List[Order], int]:
# # # # #         skip = (page - 1) * page_size
# # # # #         return await self.order_repo.list_all(status, search, skip, page_size)

# # # # #     async def admin_get_order(self, order_id: int) -> Order:
# # # # #         order = await self.order_repo.get_by_id(order_id)
# # # # #         if not order:
# # # # #             raise NotFoundError("Order")
# # # # #         return order

# # # # #     async def admin_update_status(
# # # # #         self, order_id: int, status: OrderStatus
# # # # #     ) -> Order:
# # # # #         order = await self.order_repo.get_by_id(order_id)
# # # # #         if not order:
# # # # #             raise NotFoundError("Order")
# # # # #         updated = await self.order_repo.update_status(order_id, status)
# # # # #         await self.db.commit()
# # # # #         return updated  # type: ignore

# # # # """
# # # # app/services/order_service.py
# # # # Business logic for order creation and management.
# # # # All financial calculations happen server-side — never trust client totals.
# # # # """
# # # # from decimal import Decimal
# # # # from typing import List, Optional, Tuple

# # # # from sqlalchemy.ext.asyncio import AsyncSession

# # # # from app.core.config import settings
# # # # from app.core.exceptions import BusinessRuleError, NotFoundError, ForbiddenError
# # # # from app.models.order import Order, OrderStatus
# # # # from app.repositories.cart_repository import CartRepository
# # # # from app.repositories.order_repository import OrderRepository
# # # # from app.repositories.product_repository import ProductRepository
# # # # from app.schemas.order import (
# # # #     CreateOrderRequest,
# # # #     OrderListResponse,
# # # #     OrderResponse,
# # # #     UpdateOrderStatusRequest,
# # # # )


# # # # class OrderService:
# # # #     def __init__(self, db: AsyncSession):
# # # #         self.db = db
# # # #         self.order_repo = OrderRepository(db)
# # # #         self.cart_repo = CartRepository(db)
# # # #         self.product_repo = ProductRepository(db)

# # # #     async def create_order(
# # # #         self, user_id: int, request: CreateOrderRequest
# # # #     ) -> Order:
# # # #         """
# # # #         Create an order from the user's current cart.
# # # #         - Recalculates all prices server-side
# # # #         - Decrements stock atomically
# # # #         - Clears cart after successful order
# # # #         """
# # # #         cart = await self.cart_repo.get_or_create_cart(user_id)
# # # #         if not cart.items:
# # # #             raise BusinessRuleError("Your cart is empty")

# # # #         items_data = []
# # # #         subtotal = Decimal("0.00")

# # # #         for cart_item in cart.items:
# # # #             product = await self.product_repo.get_by_id(cart_item.product_id)
# # # #             if not product:
# # # #                 raise BusinessRuleError(
# # # #                     f"Product '{cart_item.product_id}' is no longer available"
# # # #                 )
# # # #             if not product.is_active:
# # # #                 raise BusinessRuleError(
# # # #                     f"'{product.title}' is currently unavailable"
# # # #                 )

# # # #             matching_variant = None
# # # #             for v in product.variants:
# # # #                 if (
# # # #                     v.size == cart_item.selected_size
# # # #                     and v.color == cart_item.selected_color
# # # #                 ):
# # # #                     matching_variant = v
# # # #                     break

# # # #             if matching_variant and matching_variant.stock < cart_item.quantity:
# # # #                 raise BusinessRuleError(
# # # #                     f"'{product.title}' ({cart_item.selected_size}, {cart_item.selected_color}) "
# # # #                     f"has only {matching_variant.stock} units in stock"
# # # #                 )

# # # #             unit_price = product.price
# # # #             if matching_variant:
# # # #                 unit_price += matching_variant.additional_price

# # # #             line_total = unit_price * cart_item.quantity
# # # #             subtotal += line_total

# # # #             image_url = product.images[0].url if product.images else ""
# # # #             items_data.append(
# # # #                 {
# # # #                     "product_id": product.id,
# # # #                     "product_title": product.title,
# # # #                     "product_image": image_url,
# # # #                     "selected_size": cart_item.selected_size,
# # # #                     "selected_color": cart_item.selected_color,
# # # #                     "quantity": cart_item.quantity,
# # # #                     "unit_price": unit_price,
# # # #                     "total_price": line_total,
# # # #                     "_variant_id": matching_variant.id if matching_variant else None,
# # # #                     "_quantity": cart_item.quantity,
# # # #                 }
# # # #             )

# # # #         shipping_charge = (
# # # #             Decimal("0.00")
# # # #             if subtotal >= settings.FREE_SHIPPING_THRESHOLD
# # # #             else Decimal(str(settings.STANDARD_SHIPPING_CHARGE))
# # # #         )
# # # #         total_amount = subtotal + shipping_charge

# # # #         addr = request.shipping_address
# # # #         address_str = (
# # # #             f"{addr.address_line1}"
# # # #             + (f", {addr.address_line2}" if addr.address_line2 else "")
# # # #             + f", {addr.city}, {addr.state} - {addr.pincode}"
# # # #         )

# # # #         stock_updates = [
# # # #             (item.pop("_variant_id"), item.pop("_quantity"))
# # # #             for item in items_data
# # # #         ]

# # # #         order = await self.order_repo.create(
# # # #             user_id=user_id,
# # # #             items_data=items_data,
# # # #             subtotal=subtotal,
# # # #             shipping_charge=shipping_charge,
# # # #             total_amount=total_amount,
# # # #             shipping_name=addr.full_name,
# # # #             shipping_phone=addr.phone,
# # # #             shipping_address=address_str,
# # # #             payment_method=request.payment_method.value,
# # # #             notes=request.notes,
# # # #         )

# # # #         for variant_id, qty in stock_updates:
# # # #             if variant_id:
# # # #                 await self.product_repo.decrement_variant_stock(variant_id, qty)

# # # #         await self.cart_repo.clear_cart(cart.id)
# # # #         await self.db.commit()

# # # #         return order

# # # #     async def get_order(self, order_id: int, user_id: int) -> Order:
# # # #         order = await self.order_repo.get_by_id(order_id)
# # # #         if not order:
# # # #             raise NotFoundError("Order")
# # # #         if order.user_id != user_id:
# # # #             raise ForbiddenError("You do not have access to this order")
# # # #         return order

# # # #     async def get_user_orders(
# # # #         self, user_id: int, page: int = 1, page_size: int = 20
# # # #     ) -> Tuple[List[Order], int]:
# # # #         skip = (page - 1) * page_size
# # # #         return await self.order_repo.get_user_orders(user_id, skip, page_size)

# # # #     async def cancel_order(
# # # #         self, order_id: int, user_id: int, reason: Optional[str] = None
# # # #     ) -> Order:
# # # #         """
# # # #         Cancel an order and restore variant stock.

# # # #         Stock restoration: when an order is cancelled we add back the
# # # #         quantity for each item's variant so the inventory reflects reality.
# # # #         This mirrors the decrement done in create_order().
# # # #         """
# # # #         order = await self.get_order(order_id, user_id)
# # # #         if order.status not in (OrderStatus.PENDING, OrderStatus.CONFIRMED):
# # # #             raise BusinessRuleError(
# # # #                 "Only pending or confirmed orders can be cancelled"
# # # #             )

# # # #         # Restore stock for each order item
# # # #         for item in order.items:
# # # #             # Find the matching variant by size + color to get its ID
# # # #             product = await self.product_repo.get_by_id(item.product_id)
# # # #             if product:
# # # #                 for v in product.variants:
# # # #                     if v.size == item.selected_size and v.color == item.selected_color:
# # # #                         # Increment stock back (reverse of decrement_variant_stock)
# # # #                         from sqlalchemy import text
# # # #                         await self.db.execute(
# # # #                             text(
# # # #                                 "UPDATE product_variants SET stock = stock + :qty "
# # # #                                 "WHERE id = :vid"
# # # #                             ),
# # # #                             {"qty": item.quantity, "vid": v.id},
# # # #                         )
# # # #                         break

# # # #         updated = await self.order_repo.update_status(
# # # #             order_id,
# # # #             OrderStatus.CANCELLED.value,
# # # #             cancellation_reason=reason,
# # # #         )
# # # #         await self.db.commit()
# # # #         return updated  # type: ignore

# # # #     # ── Admin operations ──────────────────────────────────────────────────────

# # # #     async def admin_list_orders(
# # # #         self,
# # # #         status: Optional[OrderStatus] = None,
# # # #         search: Optional[str] = None,
# # # #         page: int = 1,
# # # #         page_size: int = 20,
# # # #     ) -> Tuple[List[Order], int]:
# # # #         skip = (page - 1) * page_size
# # # #         return await self.order_repo.list_all(status, search, skip, page_size)

# # # #     async def admin_get_order(self, order_id: int) -> Order:
# # # #         order = await self.order_repo.get_by_id(order_id)
# # # #         if not order:
# # # #             raise NotFoundError("Order")
# # # #         return order

# # # #     async def admin_update_status(
# # # #         self, order_id: int, status: OrderStatus
# # # #     ) -> Order:
# # # #         order = await self.order_repo.get_by_id(order_id)
# # # #         if not order:
# # # #             raise NotFoundError("Order")
# # # #         updated = await self.order_repo.update_status(order_id, status)
# # # #         await self.db.commit()
# # # #         return updated  # type: ignore


# # # """
# # # app/services/order_service.py
# # # Business logic for order creation and management.
# # # All financial calculations happen server-side.
# # # """

# # # from decimal import Decimal
# # # from typing import List, Optional, Tuple

# # # from sqlalchemy.ext.asyncio import AsyncSession

# # # from app.core.config import settings
# # # from app.core.exceptions import BusinessRuleError, NotFoundError, ForbiddenError
# # # from app.models.order import Order, OrderStatus
# # # from app.repositories.cart_repository import CartRepository
# # # from app.repositories.order_repository import OrderRepository
# # # from app.repositories.product_repository import ProductRepository
# # # from app.schemas.order import CreateOrderRequest


# # # class OrderService:
# # #     def __init__(self, db: AsyncSession):
# # #         self.db = db
# # #         self.order_repo = OrderRepository(db)
# # #         self.cart_repo = CartRepository(db)
# # #         self.product_repo = ProductRepository(db)

# # #     async def create_order(
# # #         self, user_id: int, request: CreateOrderRequest
# # #     ) -> Order:
# # #         cart = await self.cart_repo.get_or_create_cart(user_id)
# # #         if not cart.items:
# # #             raise BusinessRuleError("Your cart is empty")

# # #         items_data = []
# # #         subtotal = Decimal("0.00")

# # #         for cart_item in cart.items:
# # #             product = await self.product_repo.get_by_id(cart_item.product_id)
# # #             if not product:
# # #                 raise BusinessRuleError(
# # #                     f"Product '{cart_item.product_id}' is no longer available"
# # #                 )
# # #             if not product.is_active:
# # #                 raise BusinessRuleError(
# # #                     f"'{product.title}' is currently unavailable"
# # #                 )

# # #             matching_variant = None
# # #             for v in product.variants:
# # #                 if (
# # #                     v.size == cart_item.selected_size
# # #                     and v.color == cart_item.selected_color
# # #                 ):
# # #                     matching_variant = v
# # #                     break

# # #             if matching_variant and matching_variant.stock < cart_item.quantity:
# # #                 raise BusinessRuleError(
# # #                     f"'{product.title}' ({cart_item.selected_size}, {cart_item.selected_color}) "
# # #                     f"has only {matching_variant.stock} units in stock"
# # #                 )

# # #             unit_price = product.price
# # #             line_total = unit_price * cart_item.quantity
# # #             subtotal += line_total

# # #             image_url = product.images[0].url if product.images else ""
# # #             items_data.append(
# # #                 {
# # #                     "product_id": product.id,
# # #                     "product_title": product.title,
# # #                     "product_image": image_url,
# # #                     "selected_size": cart_item.selected_size,
# # #                     "selected_color": cart_item.selected_color,
# # #                     "quantity": cart_item.quantity,
# # #                     "unit_price": unit_price,
# # #                     "total_price": line_total,
# # #                     "_variant_id": matching_variant.id if matching_variant else None,
# # #                     "_quantity": cart_item.quantity,
# # #                 }
# # #             )

# # #         shipping_charge = (
# # #             Decimal("0.00")
# # #             if subtotal >= settings.FREE_SHIPPING_THRESHOLD
# # #             else Decimal(str(settings.STANDARD_SHIPPING_CHARGE))
# # #         )
# # #         total_amount = subtotal + shipping_charge

# # #         addr = request.shipping_address
# # #         address_str = (
# # #             f"{addr.address_line1}"
# # #             + (f", {addr.address_line2}" if addr.address_line2 else "")
# # #             + f", {addr.city}, {addr.state} - {addr.pincode}"
# # #         )

# # #         stock_updates = [
# # #             (item.pop("_variant_id"), item.pop("_quantity"))
# # #             for item in items_data
# # #         ]

# # #         order = await self.order_repo.create(
# # #             user_id=user_id,
# # #             items_data=items_data,
# # #             subtotal=subtotal,
# # #             shipping_charge=shipping_charge,
# # #             total_amount=total_amount,
# # #             shipping_name=addr.full_name,
# # #             shipping_phone=addr.phone,
# # #             shipping_address=address_str,
# # #             payment_method=request.payment_method.value,
# # #             notes=request.notes,
# # #         )

# # #         for variant_id, qty in stock_updates:
# # #             if variant_id:
# # #                 await self.product_repo.decrement_variant_stock(variant_id, qty)

# # #         await self.cart_repo.clear_cart(cart.id)
# # #         await self.db.commit()

# # #         return order

# # #     async def get_order(self, order_id: int, user_id: int) -> Order:
# # #         order = await self.order_repo.get_by_id(order_id)
# # #         if not order:
# # #             raise NotFoundError("Order")
# # #         if order.user_id != user_id:
# # #             raise ForbiddenError("You do not have access to this order")
# # #         return order

# # #     async def get_user_orders(
# # #         self, user_id: int, page: int = 1, page_size: int = 20
# # #     ) -> Tuple[List[Order], int]:
# # #         skip = (page - 1) * page_size
# # #         return await self.order_repo.get_user_orders(user_id, skip, page_size)

# # #     async def cancel_order(
# # #         self, order_id: int, user_id: int, reason: Optional[str] = None
# # #     ) -> Order:
# # #         order = await self.get_order(order_id, user_id)
# # #         if order.status not in (OrderStatus.PENDING, OrderStatus.CONFIRMED):
# # #             raise BusinessRuleError(
# # #                 "Only pending or confirmed orders can be cancelled"
# # #             )

# # #         for item in order.items:
# # #             product = await self.product_repo.get_by_id(item.product_id)
# # #             if product:
# # #                 for v in product.variants:
# # #                     if v.size == item.selected_size and v.color == item.selected_color:
# # #                         from sqlalchemy import text

# # #                         await self.db.execute(
# # #                             text(
# # #                                 "UPDATE product_variants SET stock = stock + :qty "
# # #                                 "WHERE id = :vid"
# # #                             ),
# # #                             {"qty": item.quantity, "vid": v.id},
# # #                         )
# # #                         break

# # #         updated = await self.order_repo.update_status(
# # #             order_id,
# # #             OrderStatus.CANCELLED.value,
# # #             cancellation_reason=reason,
# # #         )
# # #         await self.db.commit()
# # #         return updated  # type: ignore

# # #     async def admin_list_orders(
# # #         self,
# # #         status: Optional[OrderStatus] = None,
# # #         search: Optional[str] = None,
# # #         page: int = 1,
# # #         page_size: int = 20,
# # #     ) -> Tuple[List[Order], int]:
# # #         skip = (page - 1) * page_size
# # #         return await self.order_repo.list_all(status, search, skip, page_size)

# # #     async def admin_get_order(self, order_id: int) -> Order:
# # #         order = await self.order_repo.get_by_id(order_id)
# # #         if not order:
# # #             raise NotFoundError("Order")
# # #         return order

# # #     async def admin_update_status(
# # #         self, order_id: int, status: OrderStatus
# # #     ) -> Order:
# # #         order = await self.order_repo.get_by_id(order_id)
# # #         if not order:
# # #             raise NotFoundError("Order")
# # #         updated = await self.order_repo.update_status(order_id, status)
# # #         await self.db.commit()
# # #         return updated  # type: ignore


# # """
# # app/services/order_service.py
# # Business logic for order creation and management.
# # All financial calculations happen server-side; client totals are never trusted.
# # """
# # from decimal import Decimal
# # from typing import List, Optional, Tuple

# # from sqlalchemy import text
# # from sqlalchemy.ext.asyncio import AsyncSession

# # from app.core.config import settings
# # from app.core.exceptions import BusinessRuleError, NotFoundError, ForbiddenError
# # from app.models.order import Order, OrderStatus
# # from app.repositories.cart_repository import CartRepository
# # from app.repositories.order_repository import OrderRepository
# # from app.repositories.product_repository import ProductRepository
# # from app.schemas.order import CreateOrderRequest


# # class OrderService:
# #     def __init__(self, db: AsyncSession):
# #         self.db = db
# #         self.order_repo = OrderRepository(db)
# #         self.cart_repo = CartRepository(db)
# #         self.product_repo = ProductRepository(db)

# #     @staticmethod
# #     def _status_value(status: OrderStatus | str) -> str:
# #         return status.value if isinstance(status, OrderStatus) else status

# #     async def _restore_order_stock(self, order: Order) -> None:
# #         for item in order.items:
# #             product = await self.product_repo.get_by_id(item.product_id)
# #             if not product:
# #                 continue

# #             for variant in product.variants:
# #                 if (
# #                     variant.size == item.selected_size
# #                     and variant.color == item.selected_color
# #                 ):
# #                     await self.db.execute(
# #                         text(
# #                             "UPDATE product_variants SET stock = stock + :qty "
# #                             "WHERE id = :variant_id"
# #                         ),
# #                         {"qty": item.quantity, "variant_id": variant.id},
# #                     )
# #                     break

# #     async def create_order(
# #         self, user_id: int, request: CreateOrderRequest
# #     ) -> Order:
# #         cart = await self.cart_repo.get_or_create_cart(user_id)
# #         if not cart.items:
# #             raise BusinessRuleError("Your cart is empty")

# #         items_data = []
# #         subtotal = Decimal("0.00")

# #         for cart_item in cart.items:
# #             product = await self.product_repo.get_by_id(cart_item.product_id)
# #             if not product:
# #                 raise BusinessRuleError(
# #                     f"Product '{cart_item.product_id}' is no longer available"
# #                 )
# #             if not product.is_active:
# #                 raise BusinessRuleError(f"'{product.title}' is currently unavailable")

# #             matching_variant = None
# #             for variant in product.variants:
# #                 if (
# #                     variant.size == cart_item.selected_size
# #                     and variant.color == cart_item.selected_color
# #                 ):
# #                     matching_variant = variant
# #                     break

# #             if matching_variant and matching_variant.stock < cart_item.quantity:
# #                 raise BusinessRuleError(
# #                     f"'{product.title}' ({cart_item.selected_size}, {cart_item.selected_color}) "
# #                     f"has only {matching_variant.stock} units in stock"
# #                 )

# #             unit_price = product.price
# #             line_total = unit_price * cart_item.quantity
# #             subtotal += line_total

# #             image_url = product.images[0].url if product.images else ""
# #             items_data.append(
# #                 {
# #                     "product_id": product.id,
# #                     "product_title": product.title,
# #                     "product_image": image_url,
# #                     "selected_size": cart_item.selected_size,
# #                     "selected_color": cart_item.selected_color,
# #                     "quantity": cart_item.quantity,
# #                     "unit_price": unit_price,
# #                     "total_price": line_total,
# #                     "_variant_id": matching_variant.id if matching_variant else None,
# #                     "_quantity": cart_item.quantity,
# #                 }
# #             )

# #         shipping_charge = (
# #             Decimal("0.00")
# #             if subtotal >= settings.FREE_SHIPPING_THRESHOLD
# #             else Decimal(str(settings.STANDARD_SHIPPING_CHARGE))
# #         )
# #         total_amount = subtotal + shipping_charge

# #         addr = request.shipping_address
# #         address_str = (
# #             f"{addr.address_line1}"
# #             + (f", {addr.address_line2}" if addr.address_line2 else "")
# #             + f", {addr.city}, {addr.state} - {addr.pincode}"
# #         )

# #         stock_updates = [
# #             (item.pop("_variant_id"), item.pop("_quantity"))
# #             for item in items_data
# #         ]

# #         order = await self.order_repo.create(
# #             user_id=user_id,
# #             items_data=items_data,
# #             subtotal=subtotal,
# #             shipping_charge=shipping_charge,
# #             total_amount=total_amount,
# #             shipping_name=addr.full_name,
# #             shipping_phone=addr.phone,
# #             shipping_address=address_str,
# #             payment_method=request.payment_method.value,
# #             notes=request.notes,
# #         )

# #         for variant_id, quantity in stock_updates:
# #             if variant_id:
# #                 await self.product_repo.decrement_variant_stock(variant_id, quantity)

# #         await self.cart_repo.clear_cart(cart.id)
# #         await self.db.commit()

# #         return order

# #     async def get_order(self, order_id: int, user_id: int) -> Order:
# #         order = await self.order_repo.get_by_id(order_id)
# #         if not order:
# #             raise NotFoundError("Order")
# #         if order.user_id != user_id:
# #             raise ForbiddenError("You do not have access to this order")
# #         return order

# #     async def get_user_orders(
# #         self, user_id: int, page: int = 1, page_size: int = 20
# #     ) -> Tuple[List[Order], int]:
# #         skip = (page - 1) * page_size
# #         return await self.order_repo.get_user_orders(user_id, skip, page_size)

# #     async def cancel_order(
# #         self, order_id: int, user_id: int, reason: Optional[str] = None
# #     ) -> Order:
# #         order = await self.get_order(order_id, user_id)

# #         if self._status_value(order.status) != OrderStatus.PENDING.value:
# #             raise BusinessRuleError(
# #                 "Order can only be cancelled before admin confirms it"
# #             )

# #         await self._restore_order_stock(order)

# #         updated = await self.order_repo.update_status(
# #             order_id,
# #             OrderStatus.CANCELLED,
# #             cancellation_reason=reason,
# #         )
# #         await self.db.commit()
# #         return updated  # type: ignore[return-value]

# #     async def admin_list_orders(
# #         self,
# #         status: Optional[OrderStatus] = None,
# #         search: Optional[str] = None,
# #         page: int = 1,
# #         page_size: int = 20,
# #     ) -> Tuple[List[Order], int]:
# #         skip = (page - 1) * page_size
# #         return await self.order_repo.list_all(status, search, skip, page_size)

# #     async def admin_get_order(self, order_id: int) -> Order:
# #         order = await self.order_repo.get_by_id(order_id)
# #         if not order:
# #             raise NotFoundError("Order")
# #         return order

# #     async def admin_update_status(
# #         self, order_id: int, status: OrderStatus
# #     ) -> Order:
# #         order = await self.order_repo.get_by_id(order_id)
# #         if not order:
# #             raise NotFoundError("Order")

# #         current_status = self._status_value(order.status)
# #         next_status = self._status_value(status)

# #         if current_status == OrderStatus.CANCELLED.value:
# #             raise BusinessRuleError("Cancelled orders cannot be changed")

# #         if current_status == next_status:
# #             return order

# #         if next_status == OrderStatus.CANCELLED.value:
# #             await self._restore_order_stock(order)

# #         updated = await self.order_repo.update_status(order_id, status)
# #         await self.db.commit()
# #         return updated  # type: ignore[return-value]


# """
# app/services/order_service.py
# Business logic for order creation and management.
# All financial calculations happen server-side; client totals are never trusted.
# """
# from decimal import Decimal
# from typing import List, Optional, Tuple

# from sqlalchemy import text
# from sqlalchemy.ext.asyncio import AsyncSession

# from app.core.config import settings
# from app.core.exceptions import BusinessRuleError, NotFoundError, ForbiddenError
# from app.models.order import Order, OrderStatus
# from app.repositories.cart_repository import CartRepository
# from app.repositories.order_repository import OrderRepository
# from app.repositories.product_repository import ProductRepository
# from app.schemas.order import CreateOrderRequest


# class OrderService:
#     def __init__(self, db: AsyncSession):
#         self.db = db
#         self.order_repo = OrderRepository(db)
#         self.cart_repo = CartRepository(db)
#         self.product_repo = ProductRepository(db)

#     @staticmethod
#     def _status_value(status: OrderStatus | str) -> str:
#         return status.value if isinstance(status, OrderStatus) else status

#     async def _restore_order_stock(self, order: Order) -> None:
#         for item in order.items:
#             product = await self.product_repo.get_by_id(item.product_id)
#             if not product:
#                 continue

#             for variant in product.variants:
#                 if (
#                     variant.size == item.selected_size
#                     and variant.color == item.selected_color
#                 ):
#                     await self.db.execute(
#                         text(
#                             "UPDATE product_variants SET stock = stock + :qty "
#                             "WHERE id = :variant_id"
#                         ),
#                         {"qty": item.quantity, "variant_id": variant.id},
#                     )
#                     break

#     async def create_order(
#         self, user_id: int, request: CreateOrderRequest
#     ) -> Order:
#         cart = await self.cart_repo.get_or_create_cart(user_id)
#         if not cart.items:
#             raise BusinessRuleError("Your cart is empty")

#         items_data = []
#         subtotal = Decimal("0.00")

#         for cart_item in cart.items:
#             product = await self.product_repo.get_by_id(cart_item.product_id)
#             if not product:
#                 raise BusinessRuleError(
#                     f"Product '{cart_item.product_id}' is no longer available"
#                 )
#             if not product.is_active:
#                 raise BusinessRuleError(f"'{product.title}' is currently unavailable")

#             matching_variant = None
#             for variant in product.variants:
#                 if (
#                     variant.size == cart_item.selected_size
#                     and variant.color == cart_item.selected_color
#                 ):
#                     matching_variant = variant
#                     break

#             if matching_variant and matching_variant.stock < cart_item.quantity:
#                 raise BusinessRuleError(
#                     f"'{product.title}' ({cart_item.selected_size}, {cart_item.selected_color}) "
#                     f"has only {matching_variant.stock} units in stock"
#                 )

#             unit_price = product.price
#             line_total = unit_price * cart_item.quantity
#             subtotal += line_total

#             image_url = product.images[0].url if product.images else ""
#             items_data.append(
#                 {
#                     "product_id": product.id,
#                     "product_title": product.title,
#                     "product_image": image_url,
#                     "selected_size": cart_item.selected_size,
#                     "selected_color": cart_item.selected_color,
#                     "quantity": cart_item.quantity,
#                     "unit_price": unit_price,
#                     "total_price": line_total,
#                     "_variant_id": matching_variant.id if matching_variant else None,
#                     "_quantity": cart_item.quantity,
#                 }
#             )

#         shipping_charge = (
#             Decimal("0.00")
#             if subtotal >= settings.FREE_SHIPPING_THRESHOLD
#             else Decimal(str(settings.STANDARD_SHIPPING_CHARGE))
#         )
#         total_amount = subtotal + shipping_charge

#         addr = request.shipping_address
#         address_str = (
#             f"{addr.address_line1}"
#             + (f", {addr.address_line2}" if addr.address_line2 else "")
#             + f", {addr.city}, {addr.state} - {addr.pincode}"
#         )

#         stock_updates = [
#             (item.pop("_variant_id"), item.pop("_quantity"))
#             for item in items_data
#         ]

#         order = await self.order_repo.create(
#             user_id=user_id,
#             items_data=items_data,
#             subtotal=subtotal,
#             shipping_charge=shipping_charge,
#             total_amount=total_amount,
#             shipping_name=addr.full_name,
#             shipping_phone=addr.phone,
#             shipping_address=address_str,
#             payment_method=request.payment_method.value,
#             notes=request.notes,
#         )

#         for variant_id, quantity in stock_updates:
#             if variant_id:
#                 await self.product_repo.decrement_variant_stock(variant_id, quantity)

#         await self.cart_repo.clear_cart(cart.id)
#         await self.db.commit()

#         return order

#     async def get_order(self, order_id: int, user_id: int) -> Order:
#         order = await self.order_repo.get_by_id(order_id)
#         if not order:
#             raise NotFoundError("Order")
#         if order.user_id != user_id:
#             raise ForbiddenError("You do not have access to this order")
#         return order

#     async def get_user_orders(
#         self, user_id: int, page: int = 1, page_size: int = 20
#     ) -> Tuple[List[Order], int]:
#         skip = (page - 1) * page_size
#         return await self.order_repo.get_user_orders(user_id, skip, page_size)

#     async def cancel_order(
#         self, order_id: int, user_id: int, reason: Optional[str] = None
#     ) -> Order:
#         order = await self.get_order(order_id, user_id)

#         if self._status_value(order.status) != OrderStatus.PENDING.value:
#             raise BusinessRuleError(
#                 "Order can only be cancelled before admin confirms it"
#             )

#         await self._restore_order_stock(order)

#         updated = await self.order_repo.update_status(
#             order_id,
#             OrderStatus.CANCELLED,
#             cancellation_reason=reason,
#         )
#         await self.db.commit()
#         return updated  # type: ignore[return-value]

#     async def admin_list_orders(
#         self,
#         status: Optional[OrderStatus] = None,
#         search: Optional[str] = None,
#         page: int = 1,
#         page_size: int = 20,
#     ) -> Tuple[List[Order], int]:
#         skip = (page - 1) * page_size
#         return await self.order_repo.list_all(status, search, skip, page_size)

#     async def admin_get_order(self, order_id: int) -> Order:
#         order = await self.order_repo.get_by_id(order_id)
#         if not order:
#             raise NotFoundError("Order")
#         return order

#     async def admin_update_status(
#         self, order_id: int, status: OrderStatus
#     ) -> Order:
#         order = await self.order_repo.get_by_id(order_id)
#         if not order:
#             raise NotFoundError("Order")

#         current_status = self._status_value(order.status)
#         next_status = self._status_value(status)

#         if current_status == OrderStatus.CANCELLED.value:
#             raise BusinessRuleError("Cancelled orders cannot be changed")

#         if current_status == next_status:
#             return order

#         if next_status == OrderStatus.CANCELLED.value:
#             await self._restore_order_stock(order)

#         updated = await self.order_repo.update_status(order_id, status)
#         await self.db.commit()
#         return updated  # type: ignore[return-value]


"""
app/services/order_service.py
Business logic for order creation and management.
All financial calculations happen server-side; client totals are never trusted.
"""
from decimal import Decimal
from typing import List, Optional, Tuple

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.exceptions import BusinessRuleError, NotFoundError, ForbiddenError
from app.models.order import Order, OrderStatus
from app.repositories.cart_repository import CartRepository
from app.repositories.order_repository import OrderRepository
from app.repositories.product_repository import ProductRepository
from app.schemas.order import CreateOrderRequest


class OrderService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.order_repo = OrderRepository(db)
        self.cart_repo = CartRepository(db)
        self.product_repo = ProductRepository(db)

    @staticmethod
    def _status_value(status: OrderStatus | str) -> str:
        return status.value if isinstance(status, OrderStatus) else status

    async def _restore_order_stock(self, order: Order) -> None:
        for item in order.items:
            product = await self.product_repo.get_by_id(item.product_id)
            if not product:
                continue

            for variant in product.variants:
                if (
                    variant.size == item.selected_size
                    and variant.color == item.selected_color
                ):
                    await self.db.execute(
                        text(
                            "UPDATE product_variants SET stock = stock + :qty "
                            "WHERE id = :variant_id"
                        ),
                        {"qty": item.quantity, "variant_id": variant.id},
                    )
                    break

    async def create_order(
        self, user_id: int, request: CreateOrderRequest
    ) -> Order:
        cart = await self.cart_repo.get_or_create_cart(user_id)
        if not cart.items:
            raise BusinessRuleError("Your cart is empty")

        items_data = []
        subtotal = Decimal("0.00")

        for cart_item in cart.items:
            product = await self.product_repo.get_by_id(cart_item.product_id)
            if not product:
                raise BusinessRuleError(
                    f"Product '{cart_item.product_id}' is no longer available"
                )
            if not product.is_active:
                raise BusinessRuleError(f"'{product.title}' is currently unavailable")

            matching_variant = None
            for variant in product.variants:
                if (
                    variant.size == cart_item.selected_size
                    and variant.color == cart_item.selected_color
                ):
                    matching_variant = variant
                    break

            if matching_variant and matching_variant.stock < cart_item.quantity:
                raise BusinessRuleError(
                    f"'{product.title}' ({cart_item.selected_size}, {cart_item.selected_color}) "
                    f"has only {matching_variant.stock} units in stock"
                )

            unit_price = product.price
            line_total = unit_price * cart_item.quantity
            subtotal += line_total

            image_url = product.images[0].url if product.images else ""
            items_data.append(
                {
                    "product_id": product.id,
                    "product_title": product.title,
                    "product_image": image_url,
                    "selected_size": cart_item.selected_size,
                    "selected_color": cart_item.selected_color,
                    "quantity": cart_item.quantity,
                    "unit_price": unit_price,
                    "total_price": line_total,
                    "_variant_id": matching_variant.id if matching_variant else None,
                    "_quantity": cart_item.quantity,
                }
            )

        shipping_charge = (
            Decimal("0.00")
            if subtotal >= settings.FREE_SHIPPING_THRESHOLD
            else Decimal(str(settings.STANDARD_SHIPPING_CHARGE))
        )
        total_amount = subtotal + shipping_charge

        addr = request.shipping_address
        address_str = (
            f"{addr.address_line1}"
            + (f", {addr.address_line2}" if addr.address_line2 else "")
            + f", {addr.city}, {addr.state} - {addr.pincode}"
        )

        stock_updates = [
            (item.pop("_variant_id"), item.pop("_quantity"))
            for item in items_data
        ]

        order = await self.order_repo.create(
            user_id=user_id,
            items_data=items_data,
            subtotal=subtotal,
            shipping_charge=shipping_charge,
            total_amount=total_amount,
            shipping_name=addr.full_name,
            shipping_phone=addr.phone,
            shipping_address=address_str,
            payment_method=request.payment_method.value,
            notes=request.notes,
        )

        for variant_id, quantity in stock_updates:
            if variant_id:
                await self.product_repo.decrement_variant_stock(variant_id, quantity)

        await self.cart_repo.clear_cart(cart.id)
        await self.db.commit()

        return order

    async def get_order(self, order_id: int, user_id: int) -> Order:
        order = await self.order_repo.get_by_id(order_id)
        if not order:
            raise NotFoundError("Order")
        if order.user_id != user_id:
            raise ForbiddenError("You do not have access to this order")
        return order

    async def get_user_orders(
        self, user_id: int, page: int = 1, page_size: int = 20
    ) -> Tuple[List[Order], int]:
        skip = (page - 1) * page_size
        return await self.order_repo.get_user_orders(user_id, skip, page_size)

    async def cancel_order(
        self, order_id: int, user_id: int, reason: Optional[str] = None
    ) -> Order:
        order = await self.get_order(order_id, user_id)

        if self._status_value(order.status) != OrderStatus.PENDING.value:
            raise BusinessRuleError(
                "Order can only be cancelled before admin confirms it"
            )

        await self._restore_order_stock(order)

        updated = await self.order_repo.update_status(
            order_id,
            OrderStatus.CANCELLED,
            cancellation_reason=reason,
        )
        await self.db.commit()
        return updated  # type: ignore[return-value]

    async def admin_list_orders(
        self,
        status: Optional[OrderStatus] = None,
        search: Optional[str] = None,
        page: int = 1,
        page_size: int = 20,
    ) -> Tuple[List[Order], int]:
        skip = (page - 1) * page_size
        return await self.order_repo.list_all(status, search, skip, page_size)

    async def admin_get_order(self, order_id: int) -> Order:
        order = await self.order_repo.get_by_id(order_id)
        if not order:
            raise NotFoundError("Order")
        return order

    async def admin_update_status(
        self, order_id: int, status: OrderStatus
    ) -> Order:
        order = await self.order_repo.get_by_id(order_id)
        if not order:
            raise NotFoundError("Order")

        current_status = self._status_value(order.status)
        next_status = self._status_value(status)

        if current_status == OrderStatus.CANCELLED.value:
            raise BusinessRuleError("Cancelled orders cannot be changed")

        if current_status == next_status:
            return order

        if next_status == OrderStatus.CANCELLED.value:
            await self._restore_order_stock(order)

        updated = await self.order_repo.update_status(order_id, status)
        await self.db.commit()
        return updated  # type: ignore[return-value]
