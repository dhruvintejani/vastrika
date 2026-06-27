"""
app/api/v1/admin/coupons/routes.py
Coupon / discount management — admin + public coupon validation.
"""
from datetime import datetime, timezone
from decimal import Decimal
from typing import List, Optional

from fastapi import APIRouter, Query
from sqlalchemy import and_, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import CurrentAdminID, CurrentUserID, DBSession
from app.core.exceptions import ConflictError, NotFoundError, BusinessRuleError
from app.models.coupon import Coupon, DiscountType
from app.schemas.base import APIResponse, PaginatedResponse
from app.schemas.extras import (
    CouponCreateRequest,
    CouponResponse,
    CouponUpdateRequest,
    ValidateCouponRequest,
    ValidateCouponResponse,
)
from app.utils.pagination import paginate

router = APIRouter(tags=["Admin — Coupons"])


# ── Helpers ───────────────────────────────────────────────────────────────────

async def _get_coupon_by_id(db: AsyncSession, coupon_id: int) -> Coupon:
    result = await db.execute(select(Coupon).where(Coupon.id == coupon_id))
    coupon = result.scalar_one_or_none()
    if not coupon:
        raise NotFoundError("Coupon")
    return coupon


async def _get_coupon_by_code(db: AsyncSession, code: str) -> Optional[Coupon]:
    result = await db.execute(
        select(Coupon).where(Coupon.code == code.upper())
    )
    return result.scalar_one_or_none()


# ── Admin CRUD ────────────────────────────────────────────────────────────────

@router.get("/admin/coupons", response_model=PaginatedResponse[CouponResponse])
async def list_coupons(
    admin_id: CurrentAdminID,
    db: DBSession,
    active_only: bool = Query(default=False),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
):
    from sqlalchemy import func
    q = select(Coupon)
    if active_only:
        q = q.where(Coupon.is_active == True)  # noqa: E712
    total = (await db.execute(select(func.count(Coupon.id)))).scalar_one()
    coupons = (
        await db.execute(q.order_by(Coupon.created_at.desc()).offset((page - 1) * page_size).limit(page_size))
    ).scalars().all()
    return paginate([CouponResponse.model_validate(c) for c in coupons], total, page, page_size)


@router.post("/admin/coupons", response_model=APIResponse[CouponResponse], status_code=201)
async def create_coupon(body: CouponCreateRequest, admin_id: CurrentAdminID, db: DBSession):
    existing = await _get_coupon_by_code(db, body.code)
    if existing:
        raise ConflictError(f"Coupon code '{body.code.upper()}' already exists")
    coupon = Coupon(**{**body.model_dump(), "code": body.code.upper()})
    db.add(coupon)
    await db.commit()
    await db.refresh(coupon)
    return APIResponse(data=CouponResponse.model_validate(coupon), message="Coupon created")


@router.get("/admin/coupons/{coupon_id}", response_model=APIResponse[CouponResponse])
async def get_coupon(coupon_id: int, admin_id: CurrentAdminID, db: DBSession):
    coupon = await _get_coupon_by_id(db, coupon_id)
    return APIResponse(data=CouponResponse.model_validate(coupon))


@router.put("/admin/coupons/{coupon_id}", response_model=APIResponse[CouponResponse])
async def update_coupon(
    coupon_id: int, body: CouponUpdateRequest, admin_id: CurrentAdminID, db: DBSession
):
    coupon = await _get_coupon_by_id(db, coupon_id)
    update_data = {k: v for k, v in body.model_dump().items() if v is not None}
    await db.execute(update(Coupon).where(Coupon.id == coupon_id).values(**update_data))
    await db.commit()
    await db.refresh(coupon)
    return APIResponse(data=CouponResponse.model_validate(coupon))


@router.delete("/admin/coupons/{coupon_id}", response_model=APIResponse[None])
async def delete_coupon(coupon_id: int, admin_id: CurrentAdminID, db: DBSession):
    coupon = await _get_coupon_by_id(db, coupon_id)
    await db.delete(coupon)
    await db.commit()
    return APIResponse(message="Coupon deleted")


# ── Public: validate coupon (authenticated customer) ─────────────────────────

@router.post("/coupons/validate", response_model=APIResponse[ValidateCouponResponse])
async def validate_coupon(body: ValidateCouponRequest, user_id: CurrentUserID, db: DBSession):
    """Validate a coupon code and return the discount amount."""
    coupon = await _get_coupon_by_code(db, body.code)
    now = datetime.now(timezone.utc)

    if not coupon or not coupon.is_active:
        return APIResponse(data=ValidateCouponResponse(valid=False, discount_amount=Decimal("0"), message="Invalid coupon code"))

    if coupon.expires_at and coupon.expires_at < now:
        return APIResponse(data=ValidateCouponResponse(valid=False, discount_amount=Decimal("0"), message="This coupon has expired"))

    if coupon.usage_limit and coupon.used_count >= coupon.usage_limit:
        return APIResponse(data=ValidateCouponResponse(valid=False, discount_amount=Decimal("0"), message="This coupon has reached its usage limit"))

    if body.order_total < coupon.min_order_amount:
        return APIResponse(data=ValidateCouponResponse(
            valid=False, discount_amount=Decimal("0"),
            message=f"Minimum order amount of ₹{coupon.min_order_amount} required"
        ))

    # Calculate discount
    if coupon.discount_type == DiscountType.PERCENTAGE:
        discount = (body.order_total * coupon.discount_value) / Decimal("100")
        if coupon.max_discount_amount:
            discount = min(discount, coupon.max_discount_amount)
    else:
        discount = min(coupon.discount_value, body.order_total)

    return APIResponse(data=ValidateCouponResponse(
        valid=True, discount_amount=discount,
        message=f"Coupon applied! You save ₹{discount:.0f}",
        coupon=CouponResponse.model_validate(coupon),
    ))