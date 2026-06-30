# # # # """
# # # # app/api/v1/admin/reviews/routes.py
# # # # Reviews — customer submission + admin moderation.
# # # # """
# # # # from typing import Optional

# # # # from fastapi import APIRouter, Query
# # # # from sqlalchemy import and_, func, select, update
# # # # from sqlalchemy.orm import selectinload

# # # # from app.core.dependencies import CurrentAdminID, CurrentUserID, DBSession
# # # # from app.core.exceptions import ConflictError, NotFoundError
# # # # from app.models.product import Product
# # # # from app.models.review import Review
# # # # from app.models.user import User
# # # # from app.schemas.base import APIResponse, PaginatedResponse
# # # # from app.schemas.extras import ReviewCreateRequest, ReviewResponse
# # # # from app.utils.pagination import paginate

# # # # router = APIRouter(tags=["Reviews"])


# # # # def _build_review_response(r: Review) -> ReviewResponse:
# # # #     return ReviewResponse(
# # # #         id=r.id,
# # # #         product_id=r.product_id,
# # # #         product_title=r.product.title if r.product else "",
# # # #         user_id=r.user_id,
# # # #         user_name=r.user.full_name if r.user else "",
# # # #         rating=r.rating,
# # # #         title=r.title,
# # # #         body=r.body,
# # # #         is_approved=r.is_approved,
# # # #         is_flagged=r.is_flagged,
# # # #         created_at=r.created_at,
# # # #     )


# # # # # ── Public: get approved reviews for a product ───────────────────────────────

# # # # @router.get("/products/{product_id}/reviews", response_model=APIResponse[list[ReviewResponse]])
# # # # async def get_product_reviews(product_id: int, db: DBSession):
# # # #     result = await db.execute(
# # # #         select(Review)
# # # #         .options(selectinload(Review.user), selectinload(Review.product))
# # # #         .where(and_(Review.product_id == product_id, Review.is_approved == True))  # noqa: E712
# # # #         .order_by(Review.created_at.desc())
# # # #     )
# # # #     reviews = result.scalars().all()
# # # #     return APIResponse(data=[_build_review_response(r) for r in reviews])


# # # # # ── Customer: submit a review ─────────────────────────────────────────────────

# # # # @router.post("/reviews", response_model=APIResponse[ReviewResponse], status_code=201)
# # # # async def submit_review(body: ReviewCreateRequest, user_id: CurrentUserID, db: DBSession):
# # # #     """Submit a review for a purchased product."""
# # # #     # Check product exists
# # # #     product = (await db.execute(select(Product).where(Product.id == body.product_id))).scalar_one_or_none()
# # # #     if not product:
# # # #         raise NotFoundError("Product")

# # # #     # Check for duplicate
# # # #     existing = (await db.execute(
# # # #         select(Review).where(and_(Review.user_id == user_id, Review.product_id == body.product_id))
# # # #     )).scalar_one_or_none()
# # # #     if existing:
# # # #         raise ConflictError("You have already reviewed this product")

# # # #     review = Review(user_id=user_id, **body.model_dump())
# # # #     db.add(review)
# # # #     await db.commit()
# # # #     await db.refresh(review)

# # # #     # Reload with relations
# # # #     result = await db.execute(
# # # #         select(Review).options(selectinload(Review.user), selectinload(Review.product))
# # # #         .where(Review.id == review.id)
# # # #     )
# # # #     review = result.scalar_one()
# # # #     return APIResponse(data=_build_review_response(review), message="Review submitted for moderation")


# # # # # ── Admin: list all reviews ───────────────────────────────────────────────────

# # # # @router.get("/admin/reviews", response_model=PaginatedResponse[ReviewResponse])
# # # # async def admin_list_reviews(
# # # #     admin_id: CurrentAdminID,
# # # #     db: DBSession,
# # # #     approved: Optional[bool] = Query(default=None),
# # # #     flagged: Optional[bool] = Query(default=None),
# # # #     page: int = Query(default=1, ge=1),
# # # #     page_size: int = Query(default=20, ge=1, le=100),
# # # # ):
# # # #     q = select(Review).options(selectinload(Review.user), selectinload(Review.product))
# # # #     if approved is not None:
# # # #         q = q.where(Review.is_approved == approved)
# # # #     if flagged is not None:
# # # #         q = q.where(Review.is_flagged == flagged)

# # # #     total = (await db.execute(select(func.count(Review.id)))).scalar_one()
# # # #     reviews = (
# # # #         await db.execute(q.order_by(Review.created_at.desc()).offset((page - 1) * page_size).limit(page_size))
# # # #     ).scalars().all()
# # # #     return paginate([_build_review_response(r) for r in reviews], total, page, page_size)


# # # # @router.patch("/admin/reviews/{review_id}/approve", response_model=APIResponse[ReviewResponse])
# # # # async def approve_review(review_id: int, admin_id: CurrentAdminID, db: DBSession):
# # # #     """Approve a review so it appears publicly."""
# # # #     await db.execute(update(Review).where(Review.id == review_id).values(is_approved=True, is_flagged=False))
# # # #     await db.commit()
# # # #     result = await db.execute(
# # # #         select(Review).options(selectinload(Review.user), selectinload(Review.product))
# # # #         .where(Review.id == review_id)
# # # #     )
# # # #     review = result.scalar_one_or_none()
# # # #     if not review:
# # # #         raise NotFoundError("Review")
# # # #     # Update product rating
# # # #     await _recalculate_rating(db, review.product_id)
# # # #     return APIResponse(data=_build_review_response(review), message="Review approved")


# # # # @router.patch("/admin/reviews/{review_id}/reject", response_model=APIResponse[None])
# # # # async def reject_review(review_id: int, admin_id: CurrentAdminID, db: DBSession):
# # # #     """Reject (delete) a review."""
# # # #     result = await db.execute(select(Review).where(Review.id == review_id))
# # # #     review = result.scalar_one_or_none()
# # # #     if not review:
# # # #         raise NotFoundError("Review")
# # # #     product_id = review.product_id
# # # #     await db.delete(review)
# # # #     await db.commit()
# # # #     await _recalculate_rating(db, product_id)
# # # #     return APIResponse(message="Review rejected and deleted")


# # # # @router.patch("/admin/reviews/{review_id}/flag", response_model=APIResponse[ReviewResponse])
# # # # async def flag_review(review_id: int, admin_id: CurrentAdminID, db: DBSession):
# # # #     """Flag a review for manual inspection."""
# # # #     await db.execute(update(Review).where(Review.id == review_id).values(is_flagged=True))
# # # #     await db.commit()
# # # #     result = await db.execute(
# # # #         select(Review).options(selectinload(Review.user), selectinload(Review.product))
# # # #         .where(Review.id == review_id)
# # # #     )
# # # #     review = result.scalar_one_or_none()
# # # #     if not review:
# # # #         raise NotFoundError("Review")
# # # #     return APIResponse(data=_build_review_response(review))


# # # # async def _recalculate_rating(db, product_id: int) -> None:
# # # #     """Recompute product.rating and review_count from approved reviews."""
# # # #     from app.models.product import Product as ProductModel
# # # #     stats = (
# # # #         await db.execute(
# # # #             select(func.avg(Review.rating), func.count(Review.id))
# # # #             .where(and_(Review.product_id == product_id, Review.is_approved == True))  # noqa: E712
# # # #         )
# # # #     ).one()
# # # #     avg_rating = float(stats[0] or 0)
# # # #     count = stats[1] or 0
# # # #     await db.execute(
# # # #         update(ProductModel)
# # # #         .where(ProductModel.id == product_id)
# # # #         .values(rating=round(avg_rating, 2), review_count=count)
# # # #     )
# # # #     await db.commit()


# # # """
# # # app/api/v1/admin/reviews/routes.py
# # # Customer product reviews and admin moderation.
# # # """
# # # from typing import Optional

# # # from fastapi import APIRouter, Query
# # # from sqlalchemy import and_, func, select, update
# # # from sqlalchemy.orm import selectinload

# # # from app.core.dependencies import CurrentAdminID, CurrentUserID, DBSession
# # # from app.core.exceptions import ConflictError, NotFoundError
# # # from app.models.product import Product
# # # from app.models.review import Review
# # # from app.schemas.base import APIResponse, PaginatedResponse
# # # from app.schemas.extras import ReviewCreateRequest, ReviewResponse
# # # from app.utils.pagination import paginate

# # # router = APIRouter(tags=["Reviews"])


# # # def _build_review_response(review: Review) -> ReviewResponse:
# # #     return ReviewResponse(
# # #         id=review.id,
# # #         product_id=review.product_id,
# # #         product_title=review.product.title if review.product else "",
# # #         user_id=review.user_id,
# # #         user_name=review.user.full_name if review.user else "",
# # #         rating=review.rating,
# # #         title=review.title,
# # #         body=review.body,
# # #         is_approved=review.is_approved,
# # #         is_flagged=review.is_flagged,
# # #         created_at=review.created_at,
# # #     )


# # # async def _get_review_with_relations(db: DBSession, review_id: int) -> Review | None:
# # #     result = await db.execute(
# # #         select(Review)
# # #         .options(selectinload(Review.user), selectinload(Review.product))
# # #         .where(Review.id == review_id)
# # #     )
# # #     return result.scalar_one_or_none()


# # # @router.get("/products/{product_id}/reviews", response_model=APIResponse[list[ReviewResponse]])
# # # async def get_product_reviews(product_id: int, db: DBSession):
# # #     result = await db.execute(
# # #         select(Review)
# # #         .options(selectinload(Review.user), selectinload(Review.product))
# # #         .where(
# # #             Review.product_id == product_id,
# # #             Review.is_approved == True,  # noqa: E712
# # #         )
# # #         .order_by(Review.created_at.desc(), Review.id.desc())
# # #     )
# # #     reviews = result.scalars().all()
# # #     return APIResponse(data=[_build_review_response(review) for review in reviews])


# # # @router.post("/reviews", response_model=APIResponse[ReviewResponse], status_code=201)
# # # async def submit_review(body: ReviewCreateRequest, user_id: CurrentUserID, db: DBSession):
# # #     product = (
# # #         await db.execute(
# # #             select(Product).where(
# # #                 Product.id == body.product_id,
# # #                 Product.is_deleted == False,  # noqa: E712
# # #                 Product.is_active == True,  # noqa: E712
# # #             )
# # #         )
# # #     ).scalar_one_or_none()

# # #     if not product:
# # #         raise NotFoundError("Product")

# # #     existing = (
# # #         await db.execute(
# # #             select(Review).where(
# # #                 Review.user_id == user_id,
# # #                 Review.product_id == body.product_id,
# # #             )
# # #         )
# # #     ).scalar_one_or_none()

# # #     if existing:
# # #         raise ConflictError("You have already reviewed this product")

# # #     review = Review(
# # #         user_id=user_id,
# # #         product_id=body.product_id,
# # #         rating=body.rating,
# # #         title=body.title,
# # #         body=body.body,
# # #         is_approved=True,
# # #         is_flagged=False,
# # #     )
# # #     db.add(review)
# # #     await db.flush()
# # #     await _recalculate_rating(db, body.product_id, commit=False)
# # #     await db.commit()

# # #     fresh_review = await _get_review_with_relations(db, review.id)
# # #     if not fresh_review:
# # #         raise NotFoundError("Review")

# # #     return APIResponse(data=_build_review_response(fresh_review), message="Review added")


# # # @router.get("/admin/reviews", response_model=PaginatedResponse[ReviewResponse])
# # # async def admin_list_reviews(
# # #     admin_id: CurrentAdminID,
# # #     db: DBSession,
# # #     approved: Optional[bool] = Query(default=None),
# # #     flagged: Optional[bool] = Query(default=None),
# # #     page: int = Query(default=1, ge=1),
# # #     page_size: int = Query(default=20, ge=1, le=100),
# # # ):
# # #     q = select(Review).options(selectinload(Review.user), selectinload(Review.product))
# # #     count_q = select(func.count(Review.id))

# # #     filters = []
# # #     if approved is not None:
# # #         filters.append(Review.is_approved == approved)
# # #     if flagged is not None:
# # #         filters.append(Review.is_flagged == flagged)

# # #     if filters:
# # #         q = q.where(*filters)
# # #         count_q = count_q.where(*filters)

# # #     total = (await db.execute(count_q)).scalar_one()
# # #     reviews = (
# # #         await db.execute(
# # #             q.order_by(Review.created_at.desc(), Review.id.desc())
# # #             .offset((page - 1) * page_size)
# # #             .limit(page_size)
# # #         )
# # #     ).scalars().all()

# # #     return paginate([_build_review_response(review) for review in reviews], total, page, page_size)


# # # @router.patch("/admin/reviews/{review_id}/approve", response_model=APIResponse[ReviewResponse])
# # # async def approve_review(review_id: int, admin_id: CurrentAdminID, db: DBSession):
# # #     review = await _get_review_with_relations(db, review_id)
# # #     if not review:
# # #         raise NotFoundError("Review")

# # #     await db.execute(
# # #         update(Review)
# # #         .where(Review.id == review_id)
# # #         .values(is_approved=True, is_flagged=False)
# # #     )
# # #     await _recalculate_rating(db, review.product_id, commit=False)
# # #     await db.commit()

# # #     fresh_review = await _get_review_with_relations(db, review_id)
# # #     if not fresh_review:
# # #         raise NotFoundError("Review")

# # #     return APIResponse(data=_build_review_response(fresh_review), message="Review approved")


# # # @router.patch("/admin/reviews/{review_id}/reject", response_model=APIResponse[None])
# # # async def reject_review(review_id: int, admin_id: CurrentAdminID, db: DBSession):
# # #     review = await _get_review_with_relations(db, review_id)
# # #     if not review:
# # #         raise NotFoundError("Review")

# # #     product_id = review.product_id
# # #     await db.delete(review)
# # #     await db.flush()
# # #     await _recalculate_rating(db, product_id, commit=False)
# # #     await db.commit()

# # #     return APIResponse(message="Review deleted")


# # # @router.delete("/admin/reviews/{review_id}", response_model=APIResponse[None])
# # # async def delete_review(review_id: int, admin_id: CurrentAdminID, db: DBSession):
# # #     return await reject_review(review_id, admin_id, db)


# # # @router.patch("/admin/reviews/{review_id}/flag", response_model=APIResponse[ReviewResponse])
# # # async def flag_review(review_id: int, admin_id: CurrentAdminID, db: DBSession):
# # #     review = await _get_review_with_relations(db, review_id)
# # #     if not review:
# # #         raise NotFoundError("Review")

# # #     await db.execute(
# # #         update(Review)
# # #         .where(Review.id == review_id)
# # #         .values(is_flagged=True, is_approved=False)
# # #     )
# # #     await _recalculate_rating(db, review.product_id, commit=False)
# # #     await db.commit()

# # #     fresh_review = await _get_review_with_relations(db, review_id)
# # #     if not fresh_review:
# # #         raise NotFoundError("Review")

# # #     return APIResponse(data=_build_review_response(fresh_review), message="Review hidden and flagged")


# # # async def _recalculate_rating(db: DBSession, product_id: int, commit: bool = True) -> None:
# # #     avg_rating, count = (
# # #         await db.execute(
# # #             select(func.avg(Review.rating), func.count(Review.id)).where(
# # #                 Review.product_id == product_id,
# # #                 Review.is_approved == True,  # noqa: E712
# # #             )
# # #         )
# # #     ).one()

# # #     await db.execute(
# # #         update(Product)
# # #         .where(Product.id == product_id)
# # #         .values(
# # #             rating=round(float(avg_rating or 0), 2),
# # #             review_count=count or 0,
# # #         )
# # #     )

# # #     if commit:
# # #         await db.commit()


# # """
# # app/api/v1/admin/reviews/routes.py
# # Reviews: customer submission, public product reviews, and admin moderation.
# # """
# # from datetime import datetime, timezone
# # from typing import Optional

# # from fastapi import APIRouter, Query
# # from sqlalchemy import and_, func, select, update
# # from sqlalchemy.ext.asyncio import AsyncSession
# # from sqlalchemy.orm import selectinload

# # from app.core.dependencies import CurrentAdminID, CurrentUserID, DBSession
# # from app.core.exceptions import ConflictError, NotFoundError
# # from app.models.product import Product
# # from app.models.review import Review
# # from app.schemas.base import APIResponse, PaginatedResponse
# # from app.schemas.extras import ReviewCreateRequest, ReviewResponse
# # from app.utils.pagination import paginate

# # router = APIRouter(tags=["Reviews"])


# # def _build_review_response(review: Review) -> ReviewResponse:
# #     return ReviewResponse(
# #         id=review.id,
# #         product_id=review.product_id,
# #         product_title=review.product.title if review.product else "",
# #         user_id=review.user_id,
# #         user_name=review.user.full_name if review.user else "",
# #         user_email=review.user.email if review.user else "",
# #         rating=review.rating,
# #         title=review.title,
# #         body=review.body,
# #         is_approved=review.is_approved,
# #         is_flagged=review.is_flagged,
# #         is_removed=review.is_removed,
# #         removed_at=review.removed_at,
# #         created_at=review.created_at,
# #     )


# # async def _load_review(db: AsyncSession, review_id: int) -> Optional[Review]:
# #     result = await db.execute(
# #         select(Review)
# #         .options(selectinload(Review.user), selectinload(Review.product))
# #         .where(Review.id == review_id)
# #     )
# #     return result.scalar_one_or_none()


# # async def _recalculate_rating(
# #     db: AsyncSession,
# #     product_id: int,
# #     commit: bool = True,
# # ) -> None:
# #     stats = (
# #         await db.execute(
# #             select(func.avg(Review.rating), func.count(Review.id)).where(
# #                 and_(
# #                     Review.product_id == product_id,
# #                     Review.is_approved == True,  # noqa: E712
# #                     Review.is_flagged == False,  # noqa: E712
# #                     Review.is_removed == False,  # noqa: E712
# #                 )
# #             )
# #         )
# #     ).one()

# #     await db.execute(
# #         update(Product)
# #         .where(Product.id == product_id)
# #         .values(rating=round(float(stats[0] or 0), 2), review_count=stats[1] or 0)
# #     )

# #     if commit:
# #         await db.commit()


# # @router.get("/products/{product_id}/reviews", response_model=APIResponse[list[ReviewResponse]])
# # async def get_product_reviews(product_id: int, db: DBSession):
# #     result = await db.execute(
# #         select(Review)
# #         .options(selectinload(Review.user), selectinload(Review.product))
# #         .where(
# #             Review.product_id == product_id,
# #             Review.is_approved == True,  # noqa: E712
# #             Review.is_flagged == False,  # noqa: E712
# #             Review.is_removed == False,  # noqa: E712
# #         )
# #         .order_by(Review.created_at.desc())
# #     )
# #     reviews = result.scalars().all()
# #     return APIResponse(data=[_build_review_response(review) for review in reviews])


# # @router.post("/reviews", response_model=APIResponse[ReviewResponse], status_code=201)
# # async def submit_review(body: ReviewCreateRequest, user_id: CurrentUserID, db: DBSession):
# #     product = (
# #         await db.execute(
# #             select(Product).where(
# #                 Product.id == body.product_id,
# #                 Product.is_deleted == False,  # noqa: E712
# #                 Product.is_active == True,  # noqa: E712
# #             )
# #         )
# #     ).scalar_one_or_none()
# #     if not product:
# #         raise NotFoundError("Product")

# #     existing = (
# #         await db.execute(
# #             select(Review).where(
# #                 Review.user_id == user_id,
# #                 Review.product_id == body.product_id,
# #             )
# #         )
# #     ).scalar_one_or_none()
# #     if existing:
# #         raise ConflictError("You have already reviewed this product")

# #     review = Review(
# #         user_id=user_id,
# #         product_id=body.product_id,
# #         rating=body.rating,
# #         title=None,
# #         body=body.body.strip(),
# #         is_approved=True,
# #         is_flagged=False,
# #         is_removed=False,
# #     )
# #     db.add(review)
# #     await db.flush()

# #     await _recalculate_rating(db, body.product_id, commit=False)
# #     await db.commit()

# #     fresh_review = await _load_review(db, review.id)
# #     return APIResponse(data=_build_review_response(fresh_review), message="Review added")  # type: ignore[arg-type]


# # @router.get("/admin/reviews", response_model=PaginatedResponse[ReviewResponse])
# # async def admin_list_reviews(
# #     admin_id: CurrentAdminID,
# #     db: DBSession,
# #     flagged: Optional[bool] = Query(default=None),
# #     removed: Optional[bool] = Query(default=None),
# #     page: int = Query(default=1, ge=1),
# #     page_size: int = Query(default=20, ge=1, le=100),
# # ):
# #     filters = []

# #     if flagged is True:
# #         filters.append(Review.is_flagged == True)  # noqa: E712
# #         filters.append(Review.is_removed == False)  # noqa: E712
# #     elif removed is True:
# #         filters.append(Review.is_removed == True)  # noqa: E712
# #     else:
# #         filters.append(Review.is_removed == False)  # noqa: E712

# #     q = select(Review).options(selectinload(Review.user), selectinload(Review.product))
# #     if filters:
# #         q = q.where(*filters)

# #     count_q = select(func.count()).select_from(q.subquery())
# #     total = (await db.execute(count_q)).scalar_one()

# #     result = await db.execute(
# #         q.order_by(Review.created_at.desc())
# #         .offset((page - 1) * page_size)
# #         .limit(page_size)
# #     )
# #     reviews = result.scalars().all()

# #     return paginate([_build_review_response(review) for review in reviews], total, page, page_size)


# # @router.patch("/admin/reviews/{review_id}/approve", response_model=APIResponse[ReviewResponse])
# # async def approve_review(review_id: int, admin_id: CurrentAdminID, db: DBSession):
# #     review = await _load_review(db, review_id)
# #     if not review:
# #         raise NotFoundError("Review")

# #     await db.execute(
# #         update(Review)
# #         .where(Review.id == review_id)
# #         .values(is_approved=True, is_flagged=False, is_removed=False, removed_at=None)
# #     )
# #     await _recalculate_rating(db, review.product_id, commit=False)
# #     await db.commit()

# #     fresh_review = await _load_review(db, review_id)
# #     return APIResponse(data=_build_review_response(fresh_review), message="Review approved")  # type: ignore[arg-type]


# # @router.patch("/admin/reviews/{review_id}/reject", response_model=APIResponse[ReviewResponse])
# # async def reject_review(review_id: int, admin_id: CurrentAdminID, db: DBSession):
# #     review = await _load_review(db, review_id)
# #     if not review:
# #         raise NotFoundError("Review")

# #     await db.execute(
# #         update(Review)
# #         .where(Review.id == review_id)
# #         .values(
# #             is_approved=False,
# #             is_flagged=False,
# #             is_removed=True,
# #             removed_at=datetime.now(timezone.utc),
# #         )
# #     )
# #     await _recalculate_rating(db, review.product_id, commit=False)
# #     await db.commit()

# #     fresh_review = await _load_review(db, review_id)
# #     return APIResponse(data=_build_review_response(fresh_review), message="Review removed")  # type: ignore[arg-type]


# # @router.delete("/admin/reviews/{review_id}", response_model=APIResponse[ReviewResponse])
# # async def delete_review(review_id: int, admin_id: CurrentAdminID, db: DBSession):
# #     return await reject_review(review_id, admin_id, db)


# # @router.patch("/admin/reviews/{review_id}/flag", response_model=APIResponse[ReviewResponse])
# # async def flag_review(review_id: int, admin_id: CurrentAdminID, db: DBSession):
# #     review = await _load_review(db, review_id)
# #     if not review:
# #         raise NotFoundError("Review")

# #     await db.execute(
# #         update(Review)
# #         .where(Review.id == review_id)
# #         .values(is_flagged=True, is_approved=False, is_removed=False, removed_at=None)
# #     )
# #     await _recalculate_rating(db, review.product_id, commit=False)
# #     await db.commit()

# #     fresh_review = await _load_review(db, review_id)
# #     return APIResponse(data=_build_review_response(fresh_review), message="Review hidden and flagged")  # type: ignore[arg-type]


# """
# app/api/v1/admin/reviews/routes.py
# Reviews: customer submission, public product reviews, and admin moderation.

# This version does not require an is_removed column in the reviews table.
# Removed reviews are represented as is_approved=False and is_flagged=False.
# """
# from typing import Optional

# from fastapi import APIRouter, Query
# from sqlalchemy import and_, func, select, update
# from sqlalchemy.ext.asyncio import AsyncSession
# from sqlalchemy.orm import selectinload

# from app.core.dependencies import CurrentAdminID, CurrentUserID, DBSession
# from app.core.exceptions import ConflictError, NotFoundError
# from app.models.product import Product
# from app.models.review import Review
# from app.schemas.base import APIResponse, PaginatedResponse
# from app.schemas.extras import ReviewCreateRequest, ReviewResponse
# from app.utils.pagination import paginate

# router = APIRouter(tags=["Reviews"])


# def _is_removed(review: Review) -> bool:
#     return not bool(review.is_approved) and not bool(review.is_flagged)


# def _build_review_response(review: Review) -> ReviewResponse:
#     user = review.user
#     product = review.product

#     return ReviewResponse(
#         id=review.id,
#         product_id=review.product_id,
#         product_title=product.title if product else "",
#         user_id=review.user_id,
#         user_name=user.full_name if user else "",
#         user_email=user.email if user else "",
#         rating=review.rating,
#         title=review.title,
#         body=review.body,
#         is_approved=review.is_approved,
#         is_flagged=review.is_flagged,
#         is_removed=_is_removed(review),
#         removed_at=None,
#         created_at=review.created_at,
#     )


# async def _load_review(db: AsyncSession, review_id: int) -> Optional[Review]:
#     result = await db.execute(
#         select(Review)
#         .options(selectinload(Review.user), selectinload(Review.product))
#         .where(Review.id == review_id)
#     )
#     return result.scalar_one_or_none()


# async def _recalculate_rating(
#     db: AsyncSession,
#     product_id: int,
#     commit: bool = True,
# ) -> None:
#     avg_rating, review_count = (
#         await db.execute(
#             select(func.avg(Review.rating), func.count(Review.id)).where(
#                 and_(
#                     Review.product_id == product_id,
#                     Review.is_approved == True,  # noqa: E712
#                     Review.is_flagged == False,  # noqa: E712
#                 )
#             )
#         )
#     ).one()

#     await db.execute(
#         update(Product)
#         .where(Product.id == product_id)
#         .values(
#             rating=round(float(avg_rating or 0), 2),
#             review_count=review_count or 0,
#         )
#     )

#     if commit:
#         await db.commit()


# @router.get("/products/{product_id}/reviews", response_model=APIResponse[list[ReviewResponse]])
# async def get_product_reviews(product_id: int, db: DBSession):
#     result = await db.execute(
#         select(Review)
#         .options(selectinload(Review.user), selectinload(Review.product))
#         .where(
#             Review.product_id == product_id,
#             Review.is_approved == True,  # noqa: E712
#             Review.is_flagged == False,  # noqa: E712
#         )
#         .order_by(Review.created_at.desc(), Review.id.desc())
#     )
#     reviews = result.scalars().all()
#     return APIResponse(data=[_build_review_response(review) for review in reviews])


# @router.post("/reviews", response_model=APIResponse[ReviewResponse], status_code=201)
# async def submit_review(body: ReviewCreateRequest, user_id: CurrentUserID, db: DBSession):
#     product = (
#         await db.execute(
#             select(Product).where(
#                 Product.id == body.product_id,
#                 Product.is_deleted == False,  # noqa: E712
#                 Product.is_active == True,  # noqa: E712
#             )
#         )
#     ).scalar_one_or_none()

#     if not product:
#         raise NotFoundError("Product")

#     existing = (
#         await db.execute(
#             select(Review).where(
#                 Review.user_id == user_id,
#                 Review.product_id == body.product_id,
#             )
#         )
#     ).scalar_one_or_none()

#     if existing:
#         raise ConflictError("You have already reviewed this product")

#     review = Review(
#         user_id=user_id,
#         product_id=body.product_id,
#         rating=body.rating,
#         title=None,
#         body=body.body.strip(),
#         is_approved=True,
#         is_flagged=False,
#     )
#     db.add(review)
#     await db.flush()
#     review_id = review.id

#     await _recalculate_rating(db, body.product_id, commit=False)
#     await db.commit()

#     fresh_review = await _load_review(db, review_id)
#     if not fresh_review:
#         raise NotFoundError("Review")

#     return APIResponse(data=_build_review_response(fresh_review), message="Review added")


# @router.get("/admin/reviews", response_model=PaginatedResponse[ReviewResponse])
# async def admin_list_reviews(
#     admin_id: CurrentAdminID,
#     db: DBSession,
#     flagged: Optional[bool] = Query(default=None),
#     removed: Optional[bool] = Query(default=None),
#     approved: Optional[bool] = Query(default=None),
#     page: int = Query(default=1, ge=1),
#     page_size: int = Query(default=20, ge=1, le=100),
# ):
#     filters = []

#     if removed is True:
#       filters.extend(
#           [
#               Review.is_approved == False,  # noqa: E712
#               Review.is_flagged == False,  # noqa: E712
#           ]
#       )
#     elif flagged is True:
#         filters.append(Review.is_flagged == True)  # noqa: E712
#     elif approved is not None:
#         filters.append(Review.is_approved == approved)

#     q = select(Review).options(selectinload(Review.user), selectinload(Review.product))
#     if filters:
#         q = q.where(*filters)

#     count_q = select(func.count()).select_from(q.subquery())
#     total = (await db.execute(count_q)).scalar_one()

#     result = await db.execute(
#         q.order_by(Review.created_at.desc(), Review.id.desc())
#         .offset((page - 1) * page_size)
#         .limit(page_size)
#     )
#     reviews = result.scalars().all()

#     return paginate([_build_review_response(review) for review in reviews], total, page, page_size)


# @router.patch("/admin/reviews/{review_id}/approve", response_model=APIResponse[ReviewResponse])
# async def approve_review(review_id: int, admin_id: CurrentAdminID, db: DBSession):
#     review = await _load_review(db, review_id)
#     if not review:
#         raise NotFoundError("Review")

#     await db.execute(
#         update(Review)
#         .where(Review.id == review_id)
#         .values(is_approved=True, is_flagged=False)
#     )
#     await _recalculate_rating(db, review.product_id, commit=False)
#     await db.commit()

#     fresh_review = await _load_review(db, review_id)
#     if not fresh_review:
#         raise NotFoundError("Review")

#     return APIResponse(data=_build_review_response(fresh_review), message="Review approved")


# @router.patch("/admin/reviews/{review_id}/reject", response_model=APIResponse[ReviewResponse])
# async def reject_review(review_id: int, admin_id: CurrentAdminID, db: DBSession):
#     review = await _load_review(db, review_id)
#     if not review:
#         raise NotFoundError("Review")

#     await db.execute(
#         update(Review)
#         .where(Review.id == review_id)
#         .values(is_approved=False, is_flagged=False)
#     )
#     await _recalculate_rating(db, review.product_id, commit=False)
#     await db.commit()

#     fresh_review = await _load_review(db, review_id)
#     if not fresh_review:
#         raise NotFoundError("Review")

#     return APIResponse(data=_build_review_response(fresh_review), message="Review removed")


# @router.delete("/admin/reviews/{review_id}", response_model=APIResponse[ReviewResponse])
# async def delete_review(review_id: int, admin_id: CurrentAdminID, db: DBSession):
#     return await reject_review(review_id, admin_id, db)


# @router.patch("/admin/reviews/{review_id}/flag", response_model=APIResponse[ReviewResponse])
# async def flag_review(review_id: int, admin_id: CurrentAdminID, db: DBSession):
#     review = await _load_review(db, review_id)
#     if not review:
#         raise NotFoundError("Review")

#     await db.execute(
#         update(Review)
#         .where(Review.id == review_id)
#         .values(is_flagged=True, is_approved=False)
#     )
#     await _recalculate_rating(db, review.product_id, commit=False)
#     await db.commit()

#     fresh_review = await _load_review(db, review_id)
#     if not fresh_review:
#         raise NotFoundError("Review")

#     return APIResponse(data=_build_review_response(fresh_review), message="Review hidden and flagged")


"""
app/api/v1/admin/reviews/routes.py
Reviews: customer submission, public product reviews, and admin moderation.

This version does not require is_removed or removed_at database columns.
Removed reviews are represented as is_approved=False and is_flagged=False.
"""
from typing import Optional

from fastapi import APIRouter, Query
from sqlalchemy import and_, func, select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.dependencies import CurrentAdminID, CurrentUserID, DBSession
from app.core.exceptions import ConflictError, NotFoundError
from app.models.product import Product
from app.models.review import Review
from app.schemas.base import APIResponse, PaginatedResponse
from app.schemas.extras import ReviewCreateRequest, ReviewResponse
from app.utils.pagination import paginate

router = APIRouter(tags=["Reviews"])


def _is_removed(review: Review) -> bool:
    return not bool(review.is_approved) and not bool(review.is_flagged)


def _build_review_response(review: Review) -> ReviewResponse:
    user = review.user
    product = review.product

    return ReviewResponse(
        id=review.id,
        product_id=review.product_id,
        product_title=product.title if product else "",
        user_id=review.user_id,
        user_name=user.full_name if user else "",
        user_email=user.email if user else "",
        rating=review.rating,
        title=review.title,
        body=review.body,
        is_approved=review.is_approved,
        is_flagged=review.is_flagged,
        is_removed=_is_removed(review),
        removed_at=None,
        created_at=review.created_at,
    )


async def _load_review(db: AsyncSession, review_id: int) -> Optional[Review]:
    result = await db.execute(
        select(Review)
        .options(selectinload(Review.user), selectinload(Review.product))
        .where(Review.id == review_id)
    )
    return result.scalar_one_or_none()


async def _recalculate_rating(
    db: AsyncSession,
    product_id: int,
    commit: bool = True,
) -> None:
    avg_rating, review_count = (
        await db.execute(
            select(func.avg(Review.rating), func.count(Review.id)).where(
                and_(
                    Review.product_id == product_id,
                    Review.is_approved == True,  # noqa: E712
                    Review.is_flagged == False,  # noqa: E712
                )
            )
        )
    ).one()

    await db.execute(
        update(Product)
        .where(Product.id == product_id)
        .values(
            rating=round(float(avg_rating or 0), 2),
            review_count=review_count or 0,
        )
    )

    if commit:
        await db.commit()


@router.get("/products/{product_id}/reviews", response_model=APIResponse[list[ReviewResponse]])
async def get_product_reviews(product_id: int, db: DBSession):
    result = await db.execute(
        select(Review)
        .options(selectinload(Review.user), selectinload(Review.product))
        .where(
            Review.product_id == product_id,
            Review.is_approved == True,  # noqa: E712
            Review.is_flagged == False,  # noqa: E712
        )
        .order_by(Review.created_at.desc(), Review.id.desc())
    )
    reviews = result.scalars().all()
    return APIResponse(data=[_build_review_response(review) for review in reviews])


@router.post("/reviews", response_model=APIResponse[ReviewResponse], status_code=201)
async def submit_review(body: ReviewCreateRequest, user_id: CurrentUserID, db: DBSession):
    product = (
        await db.execute(
            select(Product).where(
                Product.id == body.product_id,
                Product.is_deleted == False,  # noqa: E712
                Product.is_active == True,  # noqa: E712
            )
        )
    ).scalar_one_or_none()

    if not product:
        raise NotFoundError("Product")

    existing = (
        await db.execute(
            select(Review).where(
                Review.user_id == user_id,
                Review.product_id == body.product_id,
            )
        )
    ).scalar_one_or_none()

    if existing:
        raise ConflictError("You have already reviewed this product")

    review = Review(
        user_id=user_id,
        product_id=body.product_id,
        rating=body.rating,
        title=None,
        body=body.body.strip(),
        is_approved=True,
        is_flagged=False,
    )
    db.add(review)
    await db.flush()
    review_id = review.id

    await _recalculate_rating(db, body.product_id, commit=False)
    await db.commit()

    fresh_review = await _load_review(db, review_id)
    if not fresh_review:
        raise NotFoundError("Review")

    return APIResponse(data=_build_review_response(fresh_review), message="Review added")


@router.get("/admin/reviews", response_model=PaginatedResponse[ReviewResponse])
async def admin_list_reviews(
    admin_id: CurrentAdminID,
    db: DBSession,
    flagged: Optional[bool] = Query(default=None),
    removed: Optional[bool] = Query(default=None),
    approved: Optional[bool] = Query(default=None),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
):
    filters = []

    if removed is True:
        filters.extend(
            [
                Review.is_approved == False,  # noqa: E712
                Review.is_flagged == False,  # noqa: E712
            ]
        )
    elif flagged is True:
        filters.append(Review.is_flagged == True)  # noqa: E712
    elif approved is not None:
        filters.append(Review.is_approved == approved)

    q = select(Review).options(selectinload(Review.user), selectinload(Review.product))
    if filters:
        q = q.where(*filters)

    count_q = select(func.count()).select_from(q.subquery())
    total = (await db.execute(count_q)).scalar_one()

    result = await db.execute(
        q.order_by(Review.created_at.desc(), Review.id.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
    )
    reviews = result.scalars().all()

    return paginate([_build_review_response(review) for review in reviews], total, page, page_size)


@router.patch("/admin/reviews/{review_id}/approve", response_model=APIResponse[ReviewResponse])
async def approve_review(review_id: int, admin_id: CurrentAdminID, db: DBSession):
    review = await _load_review(db, review_id)
    if not review:
        raise NotFoundError("Review")

    await db.execute(
        update(Review)
        .where(Review.id == review_id)
        .values(is_approved=True, is_flagged=False)
    )
    await _recalculate_rating(db, review.product_id, commit=False)
    await db.commit()

    fresh_review = await _load_review(db, review_id)
    if not fresh_review:
        raise NotFoundError("Review")

    return APIResponse(data=_build_review_response(fresh_review), message="Review approved")


@router.patch("/admin/reviews/{review_id}/reject", response_model=APIResponse[ReviewResponse])
async def reject_review(review_id: int, admin_id: CurrentAdminID, db: DBSession):
    review = await _load_review(db, review_id)
    if not review:
        raise NotFoundError("Review")

    await db.execute(
        update(Review)
        .where(Review.id == review_id)
        .values(is_approved=False, is_flagged=False)
    )
    await _recalculate_rating(db, review.product_id, commit=False)
    await db.commit()

    fresh_review = await _load_review(db, review_id)
    if not fresh_review:
        raise NotFoundError("Review")

    return APIResponse(data=_build_review_response(fresh_review), message="Review removed")


@router.delete("/admin/reviews/{review_id}", response_model=APIResponse[ReviewResponse])
async def delete_review(review_id: int, admin_id: CurrentAdminID, db: DBSession):
    return await reject_review(review_id, admin_id, db)


@router.patch("/admin/reviews/{review_id}/flag", response_model=APIResponse[ReviewResponse])
async def flag_review(review_id: int, admin_id: CurrentAdminID, db: DBSession):
    review = await _load_review(db, review_id)
    if not review:
        raise NotFoundError("Review")

    await db.execute(
        update(Review)
        .where(Review.id == review_id)
        .values(is_flagged=True, is_approved=False)
    )
    await _recalculate_rating(db, review.product_id, commit=False)
    await db.commit()

    fresh_review = await _load_review(db, review_id)
    if not fresh_review:
        raise NotFoundError("Review")

    return APIResponse(data=_build_review_response(fresh_review), message="Review hidden and flagged")
