"""
app/services/dashboard_service.py
Admin dashboard aggregation service.
"""
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.order import Order
from app.models.product import Product
from app.models.user import User
from app.repositories.order_repository import OrderRepository
from app.schemas.dashboard import DashboardResponse, DashboardStats, RecentOrderItem


class DashboardService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.order_repo = OrderRepository(db)

    async def get_dashboard(self) -> DashboardResponse:
        # Order stats
        order_stats = await self.order_repo.get_dashboard_stats()

        # User count
        total_users = (
            await self.db.execute(select(func.count(User.id)))
        ).scalar_one()

        # Product count (active, not deleted)
        total_products = (
            await self.db.execute(
                select(func.count(Product.id)).where(
                    Product.is_deleted == False,  # noqa: E712
                    Product.is_active == True,  # noqa: E712
                )
            )
        ).scalar_one()

        stats = DashboardStats(
            total_users=total_users,
            total_orders=order_stats["total_orders"],
            total_revenue=order_stats["total_revenue"],
            total_products=total_products,
            pending_orders=order_stats["pending_orders"],
            orders_today=order_stats["orders_today"],
            revenue_today=order_stats["revenue_today"],
        )

        # Recent 10 orders with user info
        recent_orders_raw, _ = await self.order_repo.list_all(
            skip=0, limit=10
        )
        recent_orders = [
            RecentOrderItem(
                id=o.id,
                order_number=o.order_number,
                user_name=o.user.full_name,
                user_email=o.user.email,
                total_amount=o.total_amount,
                status=o.status.value,
                payment_method=o.payment_method.value,
                created_at=o.created_at.isoformat(),
            )
            for o in recent_orders_raw
        ]

        return DashboardResponse(stats=stats, recent_orders=recent_orders)