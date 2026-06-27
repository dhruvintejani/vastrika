"""
app/api/v1/admin/dashboard/routes.py
Admin dashboard statistics endpoints.
"""
from fastapi import APIRouter

from app.core.dependencies import CurrentAdminID, DBSession
from app.schemas.base import APIResponse
from app.schemas.dashboard import DashboardResponse
from app.services.dashboard_service import DashboardService

router = APIRouter(prefix="/admin/dashboard", tags=["Admin — Dashboard"])


@router.get("", response_model=APIResponse[DashboardResponse])
async def get_dashboard(admin_id: CurrentAdminID, db: DBSession):
    """
    Get aggregated dashboard statistics:
    - Total users, orders, revenue, products
    - Today's orders and revenue
    - Pending orders count
    - Last 10 recent orders
    """
    service = DashboardService(db)
    data = await service.get_dashboard()
    return APIResponse(data=data)