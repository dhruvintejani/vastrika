"""
app/api/v1/admin/banners/routes.py
Banner management — admin CRUD + public list.
"""
import uuid

from fastapi import APIRouter, File, Query, UploadFile
from sqlalchemy import select, update

from app.core.dependencies import CurrentAdminID, DBSession
from app.core.exceptions import NotFoundError, ValidationError
from app.models.banner import Banner
from app.schemas.base import APIResponse
from app.schemas.extras import BannerCreateRequest, BannerResponse, BannerUpdateRequest
from app.utils.cloudinary_utils import delete_cloudinary_image, upload_image

router = APIRouter(tags=["Banners"])

ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_SIZE = 5 * 1024 * 1024


# ── Public ────────────────────────────────────────────────────────────────────

@router.get("/banners", response_model=APIResponse[list[BannerResponse]])
async def list_banners(db: DBSession, target: str = Query(default="homepage")):
    """Public endpoint: get active banners for homepage/shop."""
    result = await db.execute(
        select(Banner)
        .where(Banner.is_active == True, Banner.target == target)  # noqa: E712
        .order_by(Banner.sort_order.asc())
    )
    banners = result.scalars().all()
    return APIResponse(data=[BannerResponse.model_validate(b) for b in banners])


# ── Admin CRUD ────────────────────────────────────────────────────────────────

@router.get("/admin/banners", response_model=APIResponse[list[BannerResponse]])
async def admin_list_banners(admin_id: CurrentAdminID, db: DBSession):
    result = await db.execute(select(Banner).order_by(Banner.sort_order.asc()))
    banners = result.scalars().all()
    return APIResponse(data=[BannerResponse.model_validate(b) for b in banners])


@router.post("/admin/banners", response_model=APIResponse[BannerResponse], status_code=201)
async def create_banner(
    admin_id: CurrentAdminID,
    db: DBSession,
    body: BannerCreateRequest,
):
    """Create a banner (image uploaded separately via /admin/banners/{id}/image)."""
    banner = Banner(**body.model_dump(), image_url="")
    db.add(banner)
    await db.commit()
    await db.refresh(banner)
    return APIResponse(data=BannerResponse.model_validate(banner), message="Banner created")


@router.post("/admin/banners/{banner_id}/image", response_model=APIResponse[BannerResponse])
async def upload_banner_image(
    banner_id: int,
    admin_id: CurrentAdminID,
    db: DBSession,
    file: UploadFile = File(...),
):
    result = await db.execute(select(Banner).where(Banner.id == banner_id))
    banner = result.scalar_one_or_none()
    if not banner:
        raise NotFoundError("Banner")

    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise ValidationError("Invalid file type. Allowed: JPEG, PNG, WebP")
    file_bytes = await file.read()
    if len(file_bytes) > MAX_SIZE:
        raise ValidationError("Image too large. Max 5 MB")

    # Delete old image if exists
    if banner.cloudinary_public_id:
        await delete_cloudinary_image(banner.cloudinary_public_id)

    filename = f"banner_{banner_id}_{uuid.uuid4().hex[:8]}"
    result_cld = await upload_image(file_bytes, filename, folder="vastrika/banners")

    await db.execute(
        update(Banner).where(Banner.id == banner_id).values(
            image_url=result_cld["url"],
            cloudinary_public_id=result_cld["public_id"],
        )
    )
    await db.commit()
    result2 = await db.execute(select(Banner).where(Banner.id == banner_id))
    banner = result2.scalar_one()
    return APIResponse(data=BannerResponse.model_validate(banner))


@router.put("/admin/banners/{banner_id}", response_model=APIResponse[BannerResponse])
async def update_banner(
    banner_id: int, body: BannerUpdateRequest, admin_id: CurrentAdminID, db: DBSession
):
    result = await db.execute(select(Banner).where(Banner.id == banner_id))
    if not result.scalar_one_or_none():
        raise NotFoundError("Banner")
    update_data = {k: v for k, v in body.model_dump().items() if v is not None}
    await db.execute(update(Banner).where(Banner.id == banner_id).values(**update_data))
    await db.commit()
    result2 = await db.execute(select(Banner).where(Banner.id == banner_id))
    return APIResponse(data=BannerResponse.model_validate(result2.scalar_one()))


@router.delete("/admin/banners/{banner_id}", response_model=APIResponse[None])
async def delete_banner(banner_id: int, admin_id: CurrentAdminID, db: DBSession):
    result = await db.execute(select(Banner).where(Banner.id == banner_id))
    banner = result.scalar_one_or_none()
    if not banner:
        raise NotFoundError("Banner")
    if banner.cloudinary_public_id:
        await delete_cloudinary_image(banner.cloudinary_public_id)
    await db.delete(banner)
    await db.commit()
    return APIResponse(message="Banner deleted")