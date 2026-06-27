"""
app/api/v1/admin/reviews/routes.py
Reviews — customer submission + admin moderation.
"""
from typing import Optional

from fastapi import APIRouter, Query
from sqlalchemy import and_, func, select, update
from sqlalchemy.orm import selectinload

from app.core.dependencies import CurrentAdminID, CurrentUserID, DBSession
from app.core.exceptions import ConflictError, NotFoundError
from app.models.product import Product
from app.models.review import Review
from app.models.user import User
from app.schemas.base import APIResponse, PaginatedResponse
from app.schemas.extras import ReviewCreateRequest, ReviewResponse
from app.utils.pagination import paginate

router = APIRouter(tags=["Reviews"])


def _build_review_response(r: Review) -> ReviewResponse:
    return ReviewResponse(
        id=r.id,
        product_id=r.product_id,
        product_title=r.product.title if r.product else "",
        user_id=r.user_id,
        user_name=r.user.full_name if r.user else "",
        rating=r.rating,
        title=r.title,
        body=r.body,
        is_approved=r.is_approved,
        is_flagged=r.is_flagged,
        created_at=r.created_at,
    )


# ── Public: get approved reviews for a product ───────────────────────────────

@router.get("/products/{product_id}/reviews", response_model=APIResponse[list[ReviewResponse]])
async def get_product_reviews(product_id: int, db: DBSession):
    result = await db.execute(
        select(Review)
        .options(selectinload(Review.user), selectinload(Review.product))
        .where(and_(Review.product_id == product_id, Review.is_approved == True))  # noqa: E712
        .order_by(Review.created_at.desc())
    )
    reviews = result.scalars().all()
    return APIResponse(data=[_build_review_response(r) for r in reviews])


# ── Customer: submit a review ─────────────────────────────────────────────────

@router.post("/reviews", response_model=APIResponse[ReviewResponse], status_code=201)
async def submit_review(body: ReviewCreateRequest, user_id: CurrentUserID, db: DBSession):
    """Submit a review for a purchased product."""
    # Check product exists
    product = (await db.execute(select(Product).where(Product.id == body.product_id))).scalar_one_or_none()
    if not product:
        raise NotFoundError("Product")

    # Check for duplicate
    existing = (await db.execute(
        select(Review).where(and_(Review.user_id == user_id, Review.product_id == body.product_id))
    )).scalar_one_or_none()
    if existing:
        raise ConflictError("You have already reviewed this product")

    review = Review(user_id=user_id, **body.model_dump())
    db.add(review)
    await db.commit()
    await db.refresh(review)

    # Reload with relations
    result = await db.execute(
        select(Review).options(selectinload(Review.user), selectinload(Review.product))
        .where(Review.id == review.id)
    )
    review = result.scalar_one()
    return APIResponse(data=_build_review_response(review), message="Review submitted for moderation")


# ── Admin: list all reviews ───────────────────────────────────────────────────

@router.get("/admin/reviews", response_model=PaginatedResponse[ReviewResponse])
async def admin_list_reviews(
    admin_id: CurrentAdminID,
    db: DBSession,
    approved: Optional[bool] = Query(default=None),
    flagged: Optional[bool] = Query(default=None),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
):
    q = select(Review).options(selectinload(Review.user), selectinload(Review.product))
    if approved is not None:
        q = q.where(Review.is_approved == approved)
    if flagged is not None:
        q = q.where(Review.is_flagged == flagged)

    total = (await db.execute(select(func.count(Review.id)))).scalar_one()
    reviews = (
        await db.execute(q.order_by(Review.created_at.desc()).offset((page - 1) * page_size).limit(page_size))
    ).scalars().all()
    return paginate([_build_review_response(r) for r in reviews], total, page, page_size)


@router.patch("/admin/reviews/{review_id}/approve", response_model=APIResponse[ReviewResponse])
async def approve_review(review_id: int, admin_id: CurrentAdminID, db: DBSession):
    """Approve a review so it appears publicly."""
    await db.execute(update(Review).where(Review.id == review_id).values(is_approved=True, is_flagged=False))
    await db.commit()
    result = await db.execute(
        select(Review).options(selectinload(Review.user), selectinload(Review.product))
        .where(Review.id == review_id)
    )
    review = result.scalar_one_or_none()
    if not review:
        raise NotFoundError("Review")
    # Update product rating
    await _recalculate_rating(db, review.product_id)
    return APIResponse(data=_build_review_response(review), message="Review approved")


@router.patch("/admin/reviews/{review_id}/reject", response_model=APIResponse[None])
async def reject_review(review_id: int, admin_id: CurrentAdminID, db: DBSession):
    """Reject (delete) a review."""
    result = await db.execute(select(Review).where(Review.id == review_id))
    review = result.scalar_one_or_none()
    if not review:
        raise NotFoundError("Review")
    product_id = review.product_id
    await db.delete(review)
    await db.commit()
    await _recalculate_rating(db, product_id)
    return APIResponse(message="Review rejected and deleted")


@router.patch("/admin/reviews/{review_id}/flag", response_model=APIResponse[ReviewResponse])
async def flag_review(review_id: int, admin_id: CurrentAdminID, db: DBSession):
    """Flag a review for manual inspection."""
    await db.execute(update(Review).where(Review.id == review_id).values(is_flagged=True))
    await db.commit()
    result = await db.execute(
        select(Review).options(selectinload(Review.user), selectinload(Review.product))
        .where(Review.id == review_id)
    )
    review = result.scalar_one_or_none()
    if not review:
        raise NotFoundError("Review")
    return APIResponse(data=_build_review_response(review))


async def _recalculate_rating(db, product_id: int) -> None:
    """Recompute product.rating and review_count from approved reviews."""
    from app.models.product import Product as ProductModel
    stats = (
        await db.execute(
            select(func.avg(Review.rating), func.count(Review.id))
            .where(and_(Review.product_id == product_id, Review.is_approved == True))  # noqa: E712
        )
    ).one()
    avg_rating = float(stats[0] or 0)
    count = stats[1] or 0
    await db.execute(
        update(ProductModel)
        .where(ProductModel.id == product_id)
        .values(rating=round(avg_rating, 2), review_count=count)
    )
    await db.commit()