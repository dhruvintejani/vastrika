# # # """
# # # app/api/v1/orders/routes.py
# # # Customer order endpoints.
# # # """
# # # from fastapi import APIRouter, Query

# # # from app.core.dependencies import CurrentUserID, DBSession
# # # from app.schemas.base import APIResponse, PaginatedResponse
# # # from app.schemas.order import CreateOrderRequest, OrderListResponse, OrderResponse
# # # from app.services.order_service import OrderService
# # # from app.utils.pagination import paginate

# # # router = APIRouter(prefix="/orders", tags=["Orders"])


# # # @router.post("", response_model=APIResponse[OrderResponse], status_code=201)
# # # async def create_order(
# # #     body: CreateOrderRequest, user_id: CurrentUserID, db: DBSession
# # # ):
# # #     """
# # #     Create an order from the current cart.
# # #     Prices are recalculated server-side — the cart total is never trusted from the client.
# # #     Stock is decremented atomically.
# # #     """
# # #     service = OrderService(db)
# # #     order = await service.create_order(user_id, body)
# # #     return APIResponse(
# # #         data=OrderResponse.model_validate(order),
# # #         message=f"Order {order.order_number} placed successfully",
# # #     )


# # # @router.get("", response_model=PaginatedResponse[OrderListResponse])
# # # async def list_orders(
# # #     user_id: CurrentUserID,
# # #     db: DBSession,
# # #     page: int = Query(default=1, ge=1),
# # #     page_size: int = Query(default=10, ge=1, le=50),
# # # ):
# # #     """Get the current user's order history."""
# # #     service = OrderService(db)
# # #     orders, total = await service.get_user_orders(user_id, page, page_size)
# # #     items = [
# # #         OrderListResponse(
# # #             id=o.id,
# # #             order_number=o.order_number,
# # #             status=o.status,
# # #             total_amount=o.total_amount,
# # #             payment_method=o.payment_method,
# # #             payment_status=o.payment_status,
# # #             item_count=len(o.items),
# # #             created_at=o.created_at,
# # #         )
# # #         for o in orders
# # #     ]
# # #     return paginate(items, total, page, page_size)


# # # @router.get("/{order_id}", response_model=APIResponse[OrderResponse])
# # # async def get_order(order_id: int, user_id: CurrentUserID, db: DBSession):
# # #     """Get full details for a specific order."""
# # #     service = OrderService(db)
# # #     order = await service.get_order(order_id, user_id)
# # #     return APIResponse(data=OrderResponse.model_validate(order))


# # # @router.post("/{order_id}/cancel", response_model=APIResponse[OrderResponse])
# # # async def cancel_order(order_id: int, user_id: CurrentUserID, db: DBSession):
# # #     """Cancel a pending or confirmed order."""
# # #     service = OrderService(db)
# # #     order = await service.cancel_order(order_id, user_id)
# # #     return APIResponse(
# # #         data=OrderResponse.model_validate(order),
# # #         message="Order cancelled successfully",
# # #     )


# # # # """
# # # # app/api/v1/orders/routes.py
# # # # Customer order endpoints.
# # # # """
# # # # from typing import Optional

# # # # from fastapi import APIRouter, Query
# # # # from pydantic import BaseModel

# # # # from app.core.dependencies import CurrentUserID, DBSession
# # # # from app.schemas.base import APIResponse, PaginatedResponse
# # # # from app.schemas.order import OrderListResponse, OrderResponse
# # # # from app.services.order_service import OrderService
# # # # from app.utils.pagination import paginate

# # # # router = APIRouter(prefix="/orders", tags=["Orders"])


# # # # class CancelOrderRequest(BaseModel):
# # # #     reason: Optional[str] = None


# # # # @router.post("", response_model=APIResponse[OrderResponse], status_code=201)
# # # # async def create_order(
# # # #     body: "CreateOrderRequest",  # noqa: F821 — imported below to avoid circular
# # # #     user_id: CurrentUserID,
# # # #     db: DBSession,
# # # # ):
# # # #     """Create a new order from the user's current cart."""
# # # #     from app.schemas.order import CreateOrderRequest as COR
# # # #     service = OrderService(db)
# # # #     order = await service.create_order(user_id, body)
# # # #     return APIResponse(
# # # #         data=OrderResponse.model_validate(order),
# # # #         message=f"Order {order.order_number} placed successfully",
# # # #     )


# # # # @router.get("", response_model=PaginatedResponse[OrderListResponse])
# # # # async def list_orders(
# # # #     user_id: CurrentUserID,
# # # #     db: DBSession,
# # # #     page: int = Query(default=1, ge=1),
# # # #     page_size: int = Query(default=10, ge=1, le=50),
# # # # ):
# # # #     """List the authenticated user's orders."""
# # # #     service = OrderService(db)
# # # #     orders, total = await service.get_user_orders(user_id, page, page_size)
# # # #     items = [OrderListResponse.model_validate(o) for o in orders]
# # # #     return paginate(items, total, page, page_size)


# # # # @router.get("/{order_id}", response_model=APIResponse[OrderResponse])
# # # # async def get_order(order_id: int, user_id: CurrentUserID, db: DBSession):
# # # #     """Get a specific order (must belong to the authenticated user)."""
# # # #     service = OrderService(db)
# # # #     order = await service.get_order(order_id, user_id)
# # # #     return APIResponse(data=OrderResponse.model_validate(order))


# # # # @router.post("/{order_id}/cancel", response_model=APIResponse[OrderResponse])
# # # # async def cancel_order(
# # # #     order_id: int,
# # # #     user_id: CurrentUserID,
# # # #     db: DBSession,
# # # #     body: CancelOrderRequest = CancelOrderRequest(),
# # # # ):
# # # #     """
# # # #     Cancel a pending or confirmed order.
# # # #     Accepts an optional cancellation reason in the request body.
# # # #     Restores variant stock on successful cancellation.
# # # #     """
# # # #     service = OrderService(db)
# # # #     order = await service.cancel_order(order_id, user_id, reason=body.reason)
# # # #     return APIResponse(
# # # #         data=OrderResponse.model_validate(order),
# # # #         message="Order cancelled successfully",
# # # #     )

# # """
# # app/api/v1/orders/routes.py
# # Customer order endpoints.
# # """
# # from typing import Optional

# # from fastapi import APIRouter, Query
# # from pydantic import BaseModel

# # from app.core.dependencies import CurrentUserID, DBSession
# # from app.schemas.base import APIResponse, PaginatedResponse
# # from app.schemas.order import CreateOrderRequest, OrderListResponse, OrderResponse
# # from app.services.order_service import OrderService
# # from app.utils.pagination import paginate

# # router = APIRouter(prefix="/orders", tags=["Orders"])


# # class CancelOrderRequest(BaseModel):
# #     reason: Optional[str] = None


# # @router.post("", response_model=APIResponse[OrderResponse], status_code=201)
# # async def create_order(
# #     body: CreateOrderRequest,
# #     user_id: CurrentUserID,
# #     db: DBSession,
# # ):
# #     """Create a new order from the user's current cart."""
# #     service = OrderService(db)
# #     order = await service.create_order(user_id, body)
# #     return APIResponse(
# #         data=OrderResponse.model_validate(order),
# #         message="Order placed successfully",
# #     )


# # @router.get("", response_model=PaginatedResponse[OrderListResponse])
# # async def list_orders(
# #     user_id: CurrentUserID,
# #     db: DBSession,
# #     page: int = Query(default=1, ge=1),
# #     page_size: int = Query(default=10, ge=1, le=50),
# # ):
# #     """List the authenticated user's orders."""
# #     service = OrderService(db)
# #     orders, total = await service.get_user_orders(user_id, page, page_size)
# #     items = [OrderListResponse.model_validate(o) for o in orders]
# #     return paginate(items, total, page, page_size)


# # @router.get("/{order_id}", response_model=APIResponse[OrderResponse])
# # async def get_order(order_id: int, user_id: CurrentUserID, db: DBSession):
# #     """Get a specific order (must belong to the authenticated user)."""
# #     service = OrderService(db)
# #     order = await service.get_order(order_id, user_id)
# #     return APIResponse(data=OrderResponse.model_validate(order))


# # @router.post("/{order_id}/cancel", response_model=APIResponse[OrderResponse])
# # async def cancel_order(
# #     order_id: int,
# #     user_id: CurrentUserID,
# #     db: DBSession,
# #     body: CancelOrderRequest = CancelOrderRequest(),
# # ):
# #     """
# #     Cancel a pending or confirmed order.
# #     Accepts optional cancellation reason. Restores variant stock.
# #     """
# #     service = OrderService(db)
# #     order = await service.cancel_order(order_id, user_id, reason=body.reason)
# #     return APIResponse(
# #         data=OrderResponse.model_validate(order),
# #         message="Order cancelled successfully",
# #     )

# """
# app/api/v1/orders/routes.py
# Customer order endpoints.
# """
# from typing import Optional

# from fastapi import APIRouter, Query
# from pydantic import BaseModel

# from app.core.dependencies import CurrentUserID, DBSession
# from app.schemas.base import APIResponse, PaginatedResponse
# from app.schemas.order import CreateOrderRequest, OrderListResponse, OrderResponse
# from app.services.order_service import OrderService
# from app.utils.pagination import paginate

# router = APIRouter(prefix="/orders", tags=["Orders"])


# class CancelOrderRequest(BaseModel):
#     reason: Optional[str] = None


# @router.post("", response_model=APIResponse[OrderResponse], status_code=201)
# async def create_order(
#     body: CreateOrderRequest,
#     user_id: CurrentUserID,
#     db: DBSession,
# ):
#     """Create a new order from the user's current cart."""
#     service = OrderService(db)
#     order = await service.create_order(user_id, body)
#     return APIResponse(
#         data=OrderResponse.model_validate(order),
#         message="Order placed successfully",
#     )


# @router.get("", response_model=PaginatedResponse[OrderListResponse])
# async def list_orders(
#     user_id: CurrentUserID,
#     db: DBSession,
#     page: int = Query(default=1, ge=1),
#     page_size: int = Query(default=10, ge=1, le=50),
# ):
#     """List the authenticated user's orders."""
#     service = OrderService(db)
#     orders, total = await service.get_user_orders(user_id, page, page_size)
#     items = [
#         OrderListResponse(
#             id=order.id,
#             order_number=order.order_number,
#             status=order.status,
#             total_amount=order.total_amount,
#             payment_method=order.payment_method,
#             payment_status=order.payment_status,
#             item_count=len(order.items),
#             created_at=order.created_at,
#         )
#         for order in orders
#     ]
#     return paginate(items, total, page, page_size)


# @router.get("/{order_id}", response_model=APIResponse[OrderResponse])
# async def get_order(order_id: int, user_id: CurrentUserID, db: DBSession):
#     """Get a specific order that belongs to the authenticated user."""
#     service = OrderService(db)
#     order = await service.get_order(order_id, user_id)
#     return APIResponse(data=OrderResponse.model_validate(order))


# @router.post("/{order_id}/cancel", response_model=APIResponse[OrderResponse])
# async def cancel_order(
#     order_id: int,
#     user_id: CurrentUserID,
#     db: DBSession,
#     body: CancelOrderRequest = CancelOrderRequest(),
# ):
#     """Cancel a pending order. Confirmed or later orders cannot be cancelled by user."""
#     service = OrderService(db)
#     order = await service.cancel_order(order_id, user_id, reason=body.reason)
#     return APIResponse(
#         data=OrderResponse.model_validate(order),
#         message="Order cancelled successfully",
#     )


"""
app/api/v1/orders/routes.py
Customer order endpoints.
"""
from typing import Optional

from fastapi import APIRouter, Query
from pydantic import BaseModel

from app.core.dependencies import CurrentUserID, DBSession
from app.schemas.base import APIResponse, PaginatedResponse
from app.schemas.order import CreateOrderRequest, OrderListResponse, OrderResponse
from app.services.order_service import OrderService
from app.utils.pagination import paginate

router = APIRouter(prefix="/orders", tags=["Orders"])


class CancelOrderRequest(BaseModel):
    reason: Optional[str] = None


@router.post("", response_model=APIResponse[OrderResponse], status_code=201)
async def create_order(
    body: CreateOrderRequest,
    user_id: CurrentUserID,
    db: DBSession,
):
    """Create a new order from the user's current cart."""
    service = OrderService(db)
    order = await service.create_order(user_id, body)
    return APIResponse(
        data=OrderResponse.model_validate(order),
        message="Order placed successfully",
    )


@router.get("", response_model=PaginatedResponse[OrderListResponse])
async def list_orders(
    user_id: CurrentUserID,
    db: DBSession,
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=10, ge=1, le=50),
):
    """List the authenticated user's orders."""
    service = OrderService(db)
    orders, total = await service.get_user_orders(user_id, page, page_size)
    items = [
        OrderListResponse(
            id=order.id,
            order_number=order.order_number,
            status=order.status,
            total_amount=order.total_amount,
            payment_method=order.payment_method,
            payment_status=order.payment_status,
            item_count=len(order.items),
            created_at=order.created_at,
        )
        for order in orders
    ]
    return paginate(items, total, page, page_size)


@router.get("/{order_id}", response_model=APIResponse[OrderResponse])
async def get_order(order_id: int, user_id: CurrentUserID, db: DBSession):
    """Get a specific order that belongs to the authenticated user."""
    service = OrderService(db)
    order = await service.get_order(order_id, user_id)
    return APIResponse(data=OrderResponse.model_validate(order))


@router.post("/{order_id}/cancel", response_model=APIResponse[OrderResponse])
async def cancel_order(
    order_id: int,
    user_id: CurrentUserID,
    db: DBSession,
    body: CancelOrderRequest = CancelOrderRequest(),
):
    """Cancel a pending order. Confirmed or later orders cannot be cancelled by user."""
    service = OrderService(db)
    order = await service.cancel_order(order_id, user_id, reason=body.reason)
    return APIResponse(
        data=OrderResponse.model_validate(order),
        message="Order cancelled successfully",
    )
