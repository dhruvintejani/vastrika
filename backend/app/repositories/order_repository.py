# """
# app/repositories/order_repository.py
# Database access for Order and OrderItem models.
# """
# import uuid
# from datetime import datetime, timezone
# from decimal import Decimal
# from typing import List, Optional, Tuple

# from sqlalchemy import and_, func, select, update
# from sqlalchemy.ext.asyncio import AsyncSession
# from sqlalchemy.orm import selectinload

# from app.models.order import Order, OrderItem, OrderStatus


# class OrderRepository:
#     def __init__(self, db: AsyncSession):
#         self.db = db

#     def _with_relations(self):
#         return [selectinload(Order.items)]

#     @staticmethod
#     def _generate_order_number() -> str:
#         """Generate a human-readable unique order number."""
#         now = datetime.now(timezone.utc)
#         short_uuid = str(uuid.uuid4()).replace("-", "")[:6].upper()
#         return f"VAS-{now.year}-{short_uuid}"

#     async def create(
#         self,
#         user_id: int,
#         items_data: List[dict],
#         subtotal: Decimal,
#         shipping_charge: Decimal,
#         total_amount: Decimal,
#         shipping_name: str,
#         shipping_phone: str,
#         shipping_address: str,
#         payment_method: str,
#         notes: Optional[str] = None,
#     ) -> Order:
#         order = Order(
#             order_number=self._generate_order_number(),
#             user_id=user_id,
#             subtotal=subtotal,
#             shipping_charge=shipping_charge,
#             discount_amount=Decimal("0.00"),
#             total_amount=total_amount,
#             shipping_name=shipping_name,
#             shipping_phone=shipping_phone,
#             shipping_address=shipping_address,
#             payment_method=payment_method,
#             notes=notes,
#         )
#         self.db.add(order)
#         await self.db.flush()  # get order.id

#         for item_data in items_data:
#             order_item = OrderItem(order_id=order.id, **item_data)
#             self.db.add(order_item)

#         await self.db.flush()
#         return await self.get_by_id(order.id)  # type: ignore

#     async def get_by_id(self, order_id: int) -> Optional[Order]:
#         result = await self.db.execute(
#             select(Order)
#             .options(*self._with_relations())
#             .where(Order.id == order_id)
#         )
#         return result.scalar_one_or_none()

#     async def get_user_orders(
#         self, user_id: int, skip: int = 0, limit: int = 20
#     ) -> Tuple[List[Order], int]:
#         count_result = await self.db.execute(
#             select(func.count(Order.id)).where(Order.user_id == user_id)
#         )
#         total = count_result.scalar_one()

#         result = await self.db.execute(
#             select(Order)
#             .options(*self._with_relations())
#             .where(Order.user_id == user_id)
#             .order_by(Order.created_at.desc())
#             .offset(skip)
#             .limit(limit)
#         )
#         return list(result.scalars().all()), total

#     async def list_all(
#         self,
#         status: Optional[OrderStatus] = None,
#         search: Optional[str] = None,
#         skip: int = 0,
#         limit: int = 20,
#     ) -> Tuple[List[Order], int]:
#         from app.models.user import User
#         base_q = (
#             select(Order)
#             .options(*self._with_relations(), selectinload(Order.user))
#             .join(Order.user)
#         )
#         if status:
#             base_q = base_q.where(Order.status == status)
#         if search:
#             base_q = base_q.where(
#                 and_(
#                     Order.order_number.ilike(f"%{search}%")
#                     | User.email.ilike(f"%{search}%")
#                     | User.full_name.ilike(f"%{search}%")
#                 )
#             )

#         count_q = select(func.count()).select_from(base_q.subquery())
#         total = (await self.db.execute(count_q)).scalar_one()

#         result = await self.db.execute(
#             base_q.order_by(Order.created_at.desc()).offset(skip).limit(limit)
#         )
#         return list(result.scalars().all()), total

#     async def update_status(self, order_id: int, status: OrderStatus) -> Optional[Order]:
#         await self.db.execute(
#             update(Order).where(Order.id == order_id).values(status=status)
#         )
#         await self.db.flush()
#         return await self.get_by_id(order_id)

#     async def get_dashboard_stats(self) -> dict:
#         print("DEBUG STATUS:", OrderStatus.CANCELLED.value)
#         print("DEBUG ENUM VALUE:", OrderStatus.CANCELLED.value)
#         """Aggregate stats for admin dashboard."""
#         from datetime import date
#         today_start = datetime.combine(date.today(), datetime.min.time()).replace(
#             tzinfo=timezone.utc
#         )

#         total_orders = (await self.db.execute(select(func.count(Order.id)))).scalar_one()
#         total_revenue = (
#             await self.db.execute(
#                 select(func.coalesce(func.sum(Order.total_amount), 0)).where(
#                     Order.status != OrderStatus.CANCELLED.value
#                 )
#             )
#         ).scalar_one()
#         pending_orders = (
#             await self.db.execute(
#                 select(func.count(Order.id)).where(Order.status == OrderStatus.PENDING)
#             )
#         ).scalar_one()
#         orders_today = (
#             await self.db.execute(
#                 select(func.count(Order.id)).where(Order.created_at >= today_start)
#             )
#         ).scalar_one()
#         revenue_today = (
#             await self.db.execute(
#                 select(
#                     func.coalesce(func.sum(Order.total_amount), 0)
#                 ).where(
#                     and_(
#                         Order.created_at >= today_start,
#                         Order.status != OrderStatus.CANCELLED.value,
#                     )
#                 )
#             )
#         ).scalar_one()

#         return {
#             "total_orders": total_orders,
#             "total_revenue": Decimal(str(total_revenue)),
#             "pending_orders": pending_orders,
#             "orders_today": orders_today,
#             "revenue_today": Decimal(str(revenue_today)),
#         }

"""
app/repositories/order_repository.py
Database access for Order and OrderItem models.
"""
import uuid
from datetime import datetime, timezone
from decimal import Decimal
from typing import List, Optional, Tuple

from sqlalchemy import and_, func, select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.order import Order, OrderItem, OrderStatus


class OrderRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    def _with_relations(self):
        # Always eager-load items AND user so AdminOrderResponse can read
        # user_email / user_name without a lazy-load crash
        return [
            selectinload(Order.items),
            selectinload(Order.user),
        ]

    @staticmethod
    def _generate_order_number() -> str:
        now = datetime.now(timezone.utc)
        short_uuid = str(uuid.uuid4()).replace("-", "")[:6].upper()
        return f"VAS-{now.year}-{short_uuid}"

    async def create(
        self,
        user_id: int,
        items_data: List[dict],
        subtotal: Decimal,
        shipping_charge: Decimal,
        total_amount: Decimal,
        shipping_name: str,
        shipping_phone: str,
        shipping_address: str,
        payment_method: str,
        notes: Optional[str] = None,
    ) -> Order:
        order = Order(
            order_number=self._generate_order_number(),
            user_id=user_id,
            subtotal=subtotal,
            shipping_charge=shipping_charge,
            discount_amount=Decimal("0.00"),
            total_amount=total_amount,
            shipping_name=shipping_name,
            shipping_phone=shipping_phone,
            shipping_address=shipping_address,
            payment_method=payment_method,
            notes=notes,
        )
        self.db.add(order)
        await self.db.flush()

        for item_data in items_data:
            order_item = OrderItem(order_id=order.id, **item_data)
            self.db.add(order_item)

        await self.db.flush()
        return await self.get_by_id(order.id)  # type: ignore

    async def get_by_id(self, order_id: int) -> Optional[Order]:
        result = await self.db.execute(
            select(Order)
            .options(*self._with_relations())
            .where(Order.id == order_id)
        )
        return result.scalar_one_or_none()

    async def get_user_orders(
        self, user_id: int, skip: int = 0, limit: int = 20
    ) -> Tuple[List[Order], int]:
        count_result = await self.db.execute(
            select(func.count(Order.id)).where(Order.user_id == user_id)
        )
        total = count_result.scalar_one()

        result = await self.db.execute(
            select(Order)
            .options(*self._with_relations())
            .where(Order.user_id == user_id)
            .order_by(Order.created_at.desc())
            .offset(skip)
            .limit(limit)
        )
        return list(result.scalars().all()), total

    async def list_all(
        self,
        status: Optional[OrderStatus] = None,
        search: Optional[str] = None,
        skip: int = 0,
        limit: int = 20,
    ) -> Tuple[List[Order], int]:
        from app.models.user import User
        base_q = (
            select(Order)
            .options(*self._with_relations())
            .join(Order.user)
        )
        if status:
            base_q = base_q.where(Order.status == status)
        if search:
            base_q = base_q.where(
                and_(
                    Order.order_number.ilike(f"%{search}%")
                    | User.email.ilike(f"%{search}%")
                    | User.full_name.ilike(f"%{search}%")
                )
            )

        count_q = select(func.count()).select_from(base_q.subquery())
        total = (await self.db.execute(count_q)).scalar_one()

        result = await self.db.execute(
            base_q.order_by(Order.created_at.desc()).offset(skip).limit(limit)
        )
        return list(result.scalars().all()), total

    async def update_status(
        self,
        order_id: int,
        status: OrderStatus,
        cancellation_reason: Optional[str] = None,
    ) -> Optional[Order]:
        values: dict = {"status": status}
        if cancellation_reason is not None:
            values["cancellation_reason"] = cancellation_reason
        await self.db.execute(
            update(Order).where(Order.id == order_id).values(**values)
        )
        await self.db.flush()
        return await self.get_by_id(order_id)

    async def get_dashboard_stats(self) -> dict:
        from datetime import date
        today_start = datetime.combine(date.today(), datetime.min.time()).replace(
            tzinfo=timezone.utc
        )

        total_orders = (await self.db.execute(select(func.count(Order.id)))).scalar_one()
        total_revenue = (
            await self.db.execute(
                select(func.coalesce(func.sum(Order.total_amount), 0)).where(
                    Order.status != OrderStatus.CANCELLED.value
                )
            )
        ).scalar_one()
        pending_orders = (
            await self.db.execute(
                select(func.count(Order.id)).where(Order.status == OrderStatus.PENDING)
            )
        ).scalar_one()
        orders_today = (
            await self.db.execute(
                select(func.count(Order.id)).where(Order.created_at >= today_start)
            )
        ).scalar_one()
        revenue_today = (
            await self.db.execute(
                select(func.coalesce(func.sum(Order.total_amount), 0)).where(
                    and_(
                        Order.created_at >= today_start,
                        Order.status != OrderStatus.CANCELLED.value,
                    )
                )
            )
        ).scalar_one()

        return {
            "total_orders": total_orders,
            "total_revenue": Decimal(str(total_revenue)),
            "pending_orders": pending_orders,
            "orders_today": orders_today,
            "revenue_today": Decimal(str(revenue_today)),
        }