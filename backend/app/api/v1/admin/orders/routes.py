# """
# app/api/v1/admin/orders/routes.py
# Admin order management endpoints.
# """
# from typing import Optional

# from fastapi import APIRouter, Query

# from app.core.dependencies import CurrentAdminID, DBSession
# from app.models.order import OrderStatus
# from app.schemas.base import APIResponse, PaginatedResponse
# from app.schemas.order import OrderResponse, UpdateOrderStatusRequest
# from app.services.order_service import OrderService
# from app.utils.pagination import paginate

# router = APIRouter(prefix="/admin/orders", tags=["Admin — Orders"])


# @router.get("", response_model=PaginatedResponse[OrderResponse])
# async def list_all_orders(
#     admin_id: CurrentAdminID,
#     db: DBSession,
#     status: Optional[OrderStatus] = Query(default=None),
#     search: Optional[str] = Query(default=None, description="Search by order number, email, or name"),
#     page: int = Query(default=1, ge=1),
#     page_size: int = Query(default=20, ge=1, le=100),
# ):
#     """List all orders across all customers with filtering and pagination."""
#     service = OrderService(db)
#     orders, total = await service.admin_list_orders(status, search, page, page_size)
#     items = [OrderResponse.model_validate(o) for o in orders]
#     return paginate(items, total, page, page_size)


# @router.get("/{order_id}", response_model=APIResponse[OrderResponse])
# async def get_order(order_id: int, admin_id: CurrentAdminID, db: DBSession):
#     """Get full order details."""
#     service = OrderService(db)
#     order = await service.admin_get_order(order_id)
#     return APIResponse(data=OrderResponse.model_validate(order))


# @router.patch("/{order_id}/status", response_model=APIResponse[OrderResponse])
# async def update_order_status(
#     order_id: int,
#     body: UpdateOrderStatusRequest,
#     admin_id: CurrentAdminID,
#     db: DBSession,
# ):
#     """Update the status of an order (confirmed, shipped, delivered, cancelled, etc.)."""
#     service = OrderService(db)
#     order = await service.admin_update_status(order_id, body.status)
#     return APIResponse(
#         data=OrderResponse.model_validate(order),
#         message=f"Order status updated to '{body.status.value}'",
#     )

"""
app/api/v1/admin/orders/routes.py
Admin order management endpoints.
"""
from typing import Optional

from fastapi import APIRouter, Query

from app.core.dependencies import CurrentAdminID, DBSession
from app.models.order import OrderStatus
from app.schemas.base import APIResponse, PaginatedResponse
from app.schemas.order import AdminOrderResponse, UpdateOrderStatusRequest
from app.services.order_service import OrderService
from app.utils.pagination import paginate

router = APIRouter(prefix="/admin/orders", tags=["Admin — Orders"])


@router.get("", response_model=PaginatedResponse[AdminOrderResponse])
async def list_all_orders(
    admin_id: CurrentAdminID,
    db: DBSession,
    status: Optional[OrderStatus] = Query(default=None),
    search: Optional[str] = Query(default=None),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
):
    service = OrderService(db)
    orders, total = await service.admin_list_orders(status, search, page, page_size)
    items = [AdminOrderResponse.model_validate(o) for o in orders]
    return paginate(items, total, page, page_size)


@router.get("/{order_id}", response_model=APIResponse[AdminOrderResponse])
async def get_order(order_id: int, admin_id: CurrentAdminID, db: DBSession):
    service = OrderService(db)
    order = await service.admin_get_order(order_id)
    return APIResponse(data=AdminOrderResponse.model_validate(order))


@router.patch("/{order_id}/status", response_model=APIResponse[AdminOrderResponse])
async def update_order_status(
    order_id: int,
    body: UpdateOrderStatusRequest,
    admin_id: CurrentAdminID,
    db: DBSession,
):
    service = OrderService(db)
    order = await service.admin_update_status(order_id, body.status)
    return APIResponse(
        data=AdminOrderResponse.model_validate(order),
        message=f"Order status updated to '{body.status.value}'",
    )