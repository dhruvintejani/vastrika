"""
app/api/v1/admin/inventory/routes.py
Inventory management + revenue chart data.
"""
from decimal import Decimal
from typing import Optional

from fastapi import APIRouter, Query
from sqlalchemy import and_, func, select
from sqlalchemy.orm import selectinload

from app.core.dependencies import CurrentAdminID, DBSession
from app.models.order import Order, OrderStatus
from app.models.product import Product, ProductVariant
from app.schemas.base import APIResponse
from app.schemas.extras import InventoryResponse, LowStockItem, RevenueChartResponse, RevenueDataPoint

router = APIRouter(tags=["Admin — Inventory & Analytics"])

DEFAULT_LOW_STOCK_THRESHOLD = 5


@router.get("/admin/inventory", response_model=APIResponse[InventoryResponse])
async def get_inventory(
    admin_id: CurrentAdminID,
    db: DBSession,
    threshold: int = Query(default=DEFAULT_LOW_STOCK_THRESHOLD, ge=1),
):
    """Get all low-stock and out-of-stock product variants."""
    result = await db.execute(
        select(ProductVariant)
        .options(
            selectinload(ProductVariant.product).selectinload(Product.category)
        )
        .where(ProductVariant.stock <= threshold)
        .order_by(ProductVariant.stock.asc())
    )
    variants = result.scalars().all()

    low_stock_items = [
        LowStockItem(
            product_id=v.product_id,
            product_title=v.product.title,
            variant_id=v.id,
            size=v.size,
            color=v.color,
            stock=v.stock,
            category=v.product.category.name,
        )
        for v in variants
        if not v.product.is_deleted
    ]

    out_of_stock_count = sum(1 for item in low_stock_items if item.stock == 0)
    low_stock_count = sum(1 for item in low_stock_items if 0 < item.stock <= threshold)

    return APIResponse(
        data=InventoryResponse(
            low_stock_items=low_stock_items,
            out_of_stock_count=out_of_stock_count,
            low_stock_count=low_stock_count,
            threshold=threshold,
        )
    )


@router.get("/admin/analytics/revenue", response_model=APIResponse[RevenueChartResponse])
async def get_revenue_chart(
    admin_id: CurrentAdminID,
    db: DBSession,
    period: str = Query(default="30d", pattern="^(7d|30d|12m)$"),
):
    """
    Revenue chart data for the admin dashboard.
    period: "7d" = last 7 days, "30d" = last 30 days, "12m" = last 12 months
    """
    from datetime import datetime, timedelta, timezone, date
    import calendar

    now = datetime.now(timezone.utc)
    data: list[RevenueDataPoint] = []

    if period in ("7d", "30d"):
        days = 7 if period == "7d" else 30
        for i in range(days - 1, -1, -1):
            day = now.date() - timedelta(days=i)
            day_start = datetime(day.year, day.month, day.day, tzinfo=timezone.utc)
            day_end = day_start + timedelta(days=1)

            stats = (
                await db.execute(
                    select(
                        func.coalesce(func.sum(Order.total_amount), 0),
                        func.count(Order.id),
                    ).where(
                        and_(
                            Order.created_at >= day_start,
                            Order.created_at < day_end,
                            Order.status != OrderStatus.CANCELLED.value,
                        )
                    )
                )
            ).one()

            data.append(
                RevenueDataPoint(
                    label=day.strftime("%d %b"),
                    revenue=Decimal(str(stats[0])),
                    orders=stats[1],
                )
            )

    else:  # 12m
        for i in range(11, -1, -1):
            # Go back i months from current month
            month_date = now.date().replace(day=1)
            for _ in range(i):
                month_date = (month_date - timedelta(days=1)).replace(day=1)

            month_start = datetime(month_date.year, month_date.month, 1, tzinfo=timezone.utc)
            last_day = calendar.monthrange(month_date.year, month_date.month)[1]
            month_end = datetime(month_date.year, month_date.month, last_day, 23, 59, 59, tzinfo=timezone.utc)

            stats = (
                await db.execute(
                    select(
                        func.coalesce(func.sum(Order.total_amount), 0),
                        func.count(Order.id),
                    ).where(
                        and_(
                            Order.created_at >= month_start,
                            Order.created_at <= month_end,
                            Order.status != OrderStatus.CANCELLED.value,
                        )
                    )
                )
            ).one()

            data.append(
                RevenueDataPoint(
                    label=month_date.strftime("%b %Y"),
                    revenue=Decimal(str(stats[0])),
                    orders=stats[1],
                )
            )

    return APIResponse(data=RevenueChartResponse(data=data, period=period))