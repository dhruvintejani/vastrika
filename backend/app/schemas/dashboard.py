"""
app/schemas/dashboard.py
Admin dashboard response schemas.
"""
from decimal import Decimal
from typing import List

from pydantic import BaseModel


class DashboardStats(BaseModel):
    total_users: int
    total_orders: int
    total_revenue: Decimal
    total_products: int
    pending_orders: int
    orders_today: int
    revenue_today: Decimal


class RecentOrderItem(BaseModel):
    id: int
    order_number: str
    user_name: str
    user_email: str
    total_amount: Decimal
    status: str
    payment_method: str
    created_at: str


class DashboardResponse(BaseModel):
    stats: DashboardStats
    recent_orders: List[RecentOrderItem]