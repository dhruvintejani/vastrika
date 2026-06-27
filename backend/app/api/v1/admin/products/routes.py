# """
# app/api/v1/admin/products/routes.py
# Admin product management endpoints (CRUD, images, stock).
# """
# import uuid
# from typing import Optional

# from fastapi import APIRouter, File, Query, UploadFile

# from app.core.dependencies import CurrentAdminID, DBSession
# from app.core.exceptions import ValidationError
# from app.schemas.base import APIResponse, PaginatedResponse
# from app.schemas.product import (
#     CategoryCreateRequest,
#     CategoryResponse,
#     CategoryUpdateRequest,
#     ProductCreateRequest,
#     ProductResponse,
#     ProductUpdateRequest,
#     StockUpdateRequest,
#     ProductImageResponse,
# )
# from app.services.product_service import CategoryService, ProductService
# from app.utils.cloudinary_utils import upload_image
# from app.utils.pagination import paginate

# router = APIRouter(prefix="/admin", tags=["Admin — Products"])

# ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp"}
# MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024  # 5 MB


# # ── Categories (Admin) ────────────────────────────────────────────────────────

# @router.get("/categories", response_model=APIResponse[list[CategoryResponse]])
# async def admin_list_categories(
#     admin_id: CurrentAdminID, db: DBSession, active_only: bool = False
# ):
#     service = CategoryService(db)
#     cats = await service.list_categories(active_only=active_only)
#     return APIResponse(data=[CategoryResponse.model_validate(c) for c in cats])


# @router.post("/categories", response_model=APIResponse[CategoryResponse], status_code=201)
# async def create_category(
#     body: CategoryCreateRequest, admin_id: CurrentAdminID, db: DBSession
# ):
#     service = CategoryService(db)
#     cat = await service.create_category(body.name, body.description)
#     return APIResponse(data=CategoryResponse.model_validate(cat), message="Category created")


# @router.put("/categories/{category_id}", response_model=APIResponse[CategoryResponse])
# async def update_category(
#     category_id: int,
#     body: CategoryUpdateRequest,
#     admin_id: CurrentAdminID,
#     db: DBSession,
# ):
#     service = CategoryService(db)
#     cat = await service.update_category(category_id, body.model_dump(exclude_none=True))
#     return APIResponse(data=CategoryResponse.model_validate(cat))


# @router.delete("/categories/{category_id}", response_model=APIResponse[None])
# async def delete_category(
#     category_id: int, admin_id: CurrentAdminID, db: DBSession
# ):
#     service = CategoryService(db)
#     await service.delete_category(category_id)
#     return APIResponse(message="Category deleted")


# # ── Products (Admin) ──────────────────────────────────────────────────────────

# @router.get("/products", response_model=PaginatedResponse[ProductResponse])
# async def admin_list_products(
#     admin_id: CurrentAdminID,
#     db: DBSession,
#     search: Optional[str] = Query(default=None),
#     page: int = Query(default=1, ge=1),
#     page_size: int = Query(default=20, ge=1, le=100),
# ):
#     """List all products including inactive ones (admin view)."""
#     service = ProductService(db)
#     products, total = await service.list_products(
#         search=search, page=page, page_size=page_size
#     )
#     items = [ProductResponse.model_validate(p) for p in products]
#     return paginate(items, total, page, page_size)


# @router.post("/products", response_model=APIResponse[ProductResponse], status_code=201)
# async def create_product(
#     body: ProductCreateRequest, admin_id: CurrentAdminID, db: DBSession
# ):
#     service = ProductService(db)
#     product = await service.create_product(
#         title=body.title,
#         description=body.description,
#         category_id=body.category_id,
#         price=float(body.price),
#         old_price=float(body.old_price),
#         badge=body.badge,
#         is_new=body.is_new,
#         is_featured=body.is_featured,
#         variants=body.variants,
#         fabric=body.fabric,
#         specifications=body.specifications,
#     )
#     return APIResponse(
#         data=ProductResponse.model_validate(product), message="Product created"
#     )


# @router.put("/products/{product_id}", response_model=APIResponse[ProductResponse])
# async def update_product(
#     product_id: int,
#     body: ProductUpdateRequest,
#     admin_id: CurrentAdminID,
#     db: DBSession,
# ):
#     service = ProductService(db)
#     product = await service.update_product(
#         product_id, body.model_dump(exclude_none=True)
#     )
#     return APIResponse(data=ProductResponse.model_validate(product))


# @router.delete("/products/{product_id}", response_model=APIResponse[None])
# async def delete_product(
#     product_id: int, admin_id: CurrentAdminID, db: DBSession
# ):
#     """Soft delete — product is hidden but data is preserved."""
#     service = ProductService(db)
#     await service.delete_product(product_id)
#     return APIResponse(message="Product deleted")


# @router.post(
#     "/products/{product_id}/images",
#     response_model=APIResponse[ProductImageResponse],
#     status_code=201,
# )
# async def upload_product_image(
#     product_id: int,
#     admin_id: CurrentAdminID,
#     db: DBSession,
#     file: UploadFile = File(...),
#     sort_order: int = Query(default=0, ge=0),
# ):
#     """Upload a product image to Cloudinary and save the reference."""
#     if file.content_type not in ALLOWED_IMAGE_TYPES:
#         raise ValidationError(
#             f"Invalid file type '{file.content_type}'. Allowed: JPEG, PNG, WebP"
#         )

#     file_bytes = await file.read()
#     if len(file_bytes) > MAX_IMAGE_SIZE_BYTES:
#         raise ValidationError("Image file too large. Maximum size is 5 MB")

#     # Generate unique filename
#     ext = file.filename.rsplit(".", 1)[-1] if "." in file.filename else "jpg"
#     filename = f"product_{product_id}_{uuid.uuid4().hex[:8]}.{ext}"

#     result = await upload_image(file_bytes, filename)
#     service = ProductService(db)
#     img = await service.add_image(
#         product_id=product_id,
#         cloudinary_public_id=result["public_id"],
#         url=result["url"],
#         sort_order=sort_order,
#     )
#     return APIResponse(data=ProductImageResponse.model_validate(img), status_code=201)


# @router.delete("/products/{product_id}/images/{image_id}", response_model=APIResponse[None])
# async def delete_product_image(
#     product_id: int, image_id: int, admin_id: CurrentAdminID, db: DBSession
# ):
#     """Remove a product image from both DB and Cloudinary."""
#     service = ProductService(db)
#     await service.delete_image(product_id, image_id)
#     return APIResponse(message="Image deleted")


# @router.patch("/products/{product_id}/stock", response_model=APIResponse[None])
# async def update_stock(
#     product_id: int,
#     body: StockUpdateRequest,
#     admin_id: CurrentAdminID,
#     db: DBSession,
# ):
#     """Update stock count for a specific product variant."""
#     service = ProductService(db)
#     await service.update_stock(product_id, body.variant_id, body.stock)
#     return APIResponse(message="Stock updated")

"""
app/api/v1/admin/products/routes.py
Admin product management endpoints (CRUD, images, stock).
"""
import uuid
from typing import Optional

from fastapi import APIRouter, File, Query, UploadFile

from app.core.dependencies import CurrentAdminID, DBSession
from app.core.exceptions import ValidationError
from app.schemas.base import APIResponse, PaginatedResponse
from app.schemas.product import (
    CategoryCreateRequest,
    CategoryResponse,
    CategoryUpdateRequest,
    ProductCreateRequest,
    ProductResponse,
    ProductUpdateRequest,
    StockUpdateRequest,
    ProductImageResponse,
)
from app.services.product_service import CategoryService, ProductService
from app.utils.cloudinary_utils import upload_image
from app.utils.pagination import paginate

router = APIRouter(prefix="/admin", tags=["Admin — Products"])

ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024  # 5 MB


# ── Categories (Admin) ────────────────────────────────────────────────────────

@router.get("/categories", response_model=APIResponse[list[CategoryResponse]])
async def admin_list_categories(
    admin_id: CurrentAdminID, db: DBSession, active_only: bool = False
):
    service = CategoryService(db)
    cats = await service.list_categories(active_only=active_only)
    return APIResponse(data=[CategoryResponse.model_validate(c) for c in cats])


@router.post("/categories", response_model=APIResponse[CategoryResponse], status_code=201)
async def create_category(
    body: CategoryCreateRequest, admin_id: CurrentAdminID, db: DBSession
):
    service = CategoryService(db)
    cat = await service.create_category(body.name, body.description)
    return APIResponse(data=CategoryResponse.model_validate(cat), message="Category created")


@router.put("/categories/{category_id}", response_model=APIResponse[CategoryResponse])
async def update_category(
    category_id: int,
    body: CategoryUpdateRequest,
    admin_id: CurrentAdminID,
    db: DBSession,
):
    service = CategoryService(db)
    cat = await service.update_category(category_id, body.model_dump(exclude_none=True))
    return APIResponse(data=CategoryResponse.model_validate(cat))


@router.delete("/categories/{category_id}", response_model=APIResponse[None])
async def delete_category(
    category_id: int, admin_id: CurrentAdminID, db: DBSession
):
    service = CategoryService(db)
    await service.delete_category(category_id)
    return APIResponse(message="Category deleted")


# ── Products (Admin) ──────────────────────────────────────────────────────────

@router.get("/products", response_model=PaginatedResponse[ProductResponse])
async def admin_list_products(
    admin_id: CurrentAdminID,
    db: DBSession,
    search: Optional[str] = Query(default=None),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
):
    """List all products including inactive ones (admin view)."""
    service = ProductService(db)
    products, total = await service.list_products(
        search=search, page=page, page_size=page_size
    )
    items = [ProductResponse.model_validate(p) for p in products]
    return paginate(items, total, page, page_size)


@router.post("/products", response_model=APIResponse[ProductResponse], status_code=201)
async def create_product(
    body: ProductCreateRequest, admin_id: CurrentAdminID, db: DBSession
):
    service = ProductService(db)
    product = await service.create_product(
        title=body.title,
        description=body.description,
        category_id=body.category_id,
        price=float(body.price),
        old_price=float(body.old_price),
        badge=body.badge,
        is_new=body.is_new,
        is_featured=body.is_featured,
        variants=body.variants,
        fabric=body.fabric,
        specifications=body.specifications,
    )
    return APIResponse(
        data=ProductResponse.model_validate(product), message="Product created"
    )


@router.put("/products/{product_id}", response_model=APIResponse[ProductResponse])
async def update_product(
    product_id: int,
    body: ProductUpdateRequest,
    admin_id: CurrentAdminID,
    db: DBSession,
):
    service = ProductService(db)
    product = await service.update_product(
        product_id, body.model_dump(exclude_none=True)
    )
    return APIResponse(data=ProductResponse.model_validate(product))


@router.delete("/products/{product_id}", response_model=APIResponse[None])
async def delete_product(
    product_id: int, admin_id: CurrentAdminID, db: DBSession
):
    """Soft delete — product is hidden but data is preserved."""
    service = ProductService(db)
    await service.delete_product(product_id)
    return APIResponse(message="Product deleted")


@router.post(
    "/products/{product_id}/images",
    response_model=APIResponse[ProductImageResponse],
    status_code=201,
)
async def upload_product_image(
    product_id: int,
    admin_id: CurrentAdminID,
    db: DBSession,
    file: UploadFile = File(...),
    sort_order: int = Query(default=0, ge=0),
):
    """Upload a product image to Cloudinary and save the reference."""
    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise ValidationError(
            f"Invalid file type '{file.content_type}'. Allowed: JPEG, PNG, WebP"
        )

    file_bytes = await file.read()
    if len(file_bytes) > MAX_IMAGE_SIZE_BYTES:
        raise ValidationError("Image file too large. Maximum size is 5 MB")

    # Generate unique filename
    ext = file.filename.rsplit(".", 1)[-1] if "." in file.filename else "jpg"
    filename = f"product_{product_id}_{uuid.uuid4().hex[:8]}.{ext}"

    result = await upload_image(file_bytes, filename)
    service = ProductService(db)
    img = await service.add_image(
        product_id=product_id,
        cloudinary_public_id=result["public_id"],
        url=result["url"],
        sort_order=sort_order,
    )
    return APIResponse(data=ProductImageResponse.model_validate(img), status_code=201)


@router.delete("/products/{product_id}/images/{image_id}", response_model=APIResponse[None])
async def delete_product_image(
    product_id: int, image_id: int, admin_id: CurrentAdminID, db: DBSession
):
    """Remove a product image from both DB and Cloudinary."""
    service = ProductService(db)
    await service.delete_image(product_id, image_id)
    return APIResponse(message="Image deleted")


@router.patch("/products/{product_id}/stock", response_model=APIResponse[None])
async def update_stock(
    product_id: int,
    body: StockUpdateRequest,
    admin_id: CurrentAdminID,
    db: DBSession,
):
    """Update stock count for a specific product variant."""
    service = ProductService(db)
    await service.update_stock(product_id, body.variant_id, body.stock)
    return APIResponse(message="Stock updated")