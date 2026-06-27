# """
# app/api/v1/products/routes.py
# Public product and category endpoints.
# """
# from typing import Optional

# from fastapi import APIRouter, Query

# from app.core.dependencies import DBSession
# from app.schemas.base import APIResponse, PaginatedResponse
# from app.schemas.product import CategoryResponse, ProductListResponse, ProductResponse
# from app.services.product_service import CategoryService, ProductService
# from app.utils.pagination import paginate

# router = APIRouter(tags=["Products"])


# # ── Categories ────────────────────────────────────────────────────────────────

# @router.get("/categories", response_model=APIResponse[list[CategoryResponse]])
# async def list_categories(db: DBSession):
#     """Get all active product categories."""
#     service = CategoryService(db)
#     categories = await service.list_categories(active_only=True)
#     return APIResponse(data=[CategoryResponse.model_validate(c) for c in categories])


# # ── Products ──────────────────────────────────────────────────────────────────

# @router.get("/products", response_model=PaginatedResponse[ProductListResponse])
# async def list_products(
#     db: DBSession,
#     category: Optional[str] = Query(default=None, description="Category slug or 'All'"),
#     search: Optional[str] = Query(default=None, max_length=200),
#     min_price: Optional[float] = Query(default=None, ge=0),
#     max_price: Optional[float] = Query(default=None, ge=0),
#     sort_by: str = Query(
#         default="featured",
#         pattern="^(featured|price_asc|price_desc|rating|reviews|newest)$",
#     ),
#     page: int = Query(default=1, ge=1),
#     page_size: int = Query(default=20, ge=1, le=100),
# ):
#     """
#     List products with filtering, sorting, and pagination.
#     Maps directly to the Shop page filters in the frontend.
#     """
#     service = ProductService(db)
#     products, total = await service.list_products(
#         category_slug=category,
#         search=search,
#         min_price=min_price,
#         max_price=max_price,
#         sort_by=sort_by,
#         page=page,
#         page_size=page_size,
#     )

#     # Build list responses with computed total_stock
#     items = []
#     for p in products:
#         total_stock = sum(v.stock for v in p.variants)
#         items.append(
#             ProductListResponse(
#                 id=p.id,
#                 title=p.title,
#                 category=CategoryResponse.model_validate(p.category),
#                 price=p.price,
#                 old_price=p.old_price,
#                 badge=p.badge,
#                 rating=p.rating,
#                 review_count=p.review_count,
#                 is_new=p.is_new,
#                 is_featured=p.is_featured,
#                 images=p.images,
#                 total_stock=total_stock,
#             )
#         )

#     return paginate(items, total, page, page_size)


# @router.get("/products/featured", response_model=APIResponse[list[ProductListResponse]])
# async def get_featured_products(
#     db: DBSession,
#     limit: int = Query(default=8, ge=1, le=20),
# ):
#     """Get featured products for the homepage."""
#     service = ProductService(db)
#     products = await service.get_featured(limit)
#     items = []
#     for p in products:
#         items.append(
#             ProductListResponse(
#                 id=p.id,
#                 title=p.title,
#                 category=CategoryResponse.model_validate(p.category),
#                 price=p.price,
#                 old_price=p.old_price,
#                 badge=p.badge,
#                 rating=p.rating,
#                 review_count=p.review_count,
#                 is_new=p.is_new,
#                 is_featured=p.is_featured,
#                 images=p.images,
#                 total_stock=sum(v.stock for v in p.variants),
#             )
#         )
#     return APIResponse(data=items)


# @router.get("/products/new-arrivals", response_model=APIResponse[list[ProductListResponse]])
# async def get_new_arrivals(
#     db: DBSession,
#     limit: int = Query(default=12, ge=1, le=20),
# ):
#     """Get new arrivals for the New Arrivals page."""
#     service = ProductService(db)
#     products = await service.get_new_arrivals(limit)
#     items = []
#     for p in products:
#         items.append(
#             ProductListResponse(
#                 id=p.id,
#                 title=p.title,
#                 category=CategoryResponse.model_validate(p.category),
#                 price=p.price,
#                 old_price=p.old_price,
#                 badge=p.badge,
#                 rating=p.rating,
#                 review_count=p.review_count,
#                 is_new=p.is_new,
#                 is_featured=p.is_featured,
#                 images=p.images,
#                 total_stock=sum(v.stock for v in p.variants),
#             )
#         )
#     return APIResponse(data=items)


# @router.get("/products/{product_id}", response_model=APIResponse[ProductResponse])
# async def get_product(product_id: int, db: DBSession):
#     """Get full product detail including all variants and images."""
#     service = ProductService(db)
#     product = await service.get_product(product_id)
#     return APIResponse(data=ProductResponse.model_validate(product))


"""
app/api/v1/products/routes.py
Public product and category endpoints.
"""
from typing import Optional

from fastapi import APIRouter, Query

from app.core.dependencies import DBSession
from app.schemas.base import APIResponse, PaginatedResponse
from app.schemas.product import CategoryResponse, ProductListResponse, ProductResponse
from app.services.product_service import CategoryService, ProductService
from app.utils.pagination import paginate

router = APIRouter(tags=["Products"])


def _build_list_response(p) -> ProductListResponse:
    """
    Build a ProductListResponse from a Product ORM object.
    Extracts unique sizes and colors from variants so ProductCard can show
    size selectors without a separate full-product API call.
    """
    variants = p.variants or []
    sizes = list(dict.fromkeys(v.size for v in variants if v.size))
    colors = list(dict.fromkeys(
        v.color for v in variants
        if v.color and v.color != 'Default'
    ))
    total_stock = sum(v.stock for v in variants)

    return ProductListResponse(
        id=p.id,
        title=p.title,
        category=CategoryResponse.model_validate(p.category),
        price=p.price,
        old_price=p.old_price,
        badge=p.badge,
        rating=p.rating,
        review_count=p.review_count,
        is_new=p.is_new,
        is_featured=p.is_featured,
        images=p.images,
        total_stock=total_stock,
        sizes=sizes,
        colors=colors,
    )


# ── Categories ────────────────────────────────────────────────────────────────

@router.get("/categories", response_model=APIResponse[list[CategoryResponse]])
async def list_categories(db: DBSession):
    service = CategoryService(db)
    categories = await service.list_categories(active_only=True)
    return APIResponse(data=[CategoryResponse.model_validate(c) for c in categories])


# ── Products ──────────────────────────────────────────────────────────────────

@router.get("/products", response_model=PaginatedResponse[ProductListResponse])
async def list_products(
    db: DBSession,
    category: Optional[str] = Query(default=None),
    search: Optional[str] = Query(default=None, max_length=200),
    min_price: Optional[float] = Query(default=None, ge=0),
    max_price: Optional[float] = Query(default=None, ge=0),
    sort_by: str = Query(
        default="featured",
        pattern="^(featured|price_asc|price_desc|rating|reviews|newest)$",
    ),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
):
    service = ProductService(db)
    products, total = await service.list_products(
        category_slug=category,
        search=search,
        min_price=min_price,
        max_price=max_price,
        sort_by=sort_by,
        page=page,
        page_size=page_size,
    )
    items = [_build_list_response(p) for p in products]
    return paginate(items, total, page, page_size)


@router.get("/products/featured", response_model=APIResponse[list[ProductListResponse]])
async def get_featured_products(
    db: DBSession,
    limit: int = Query(default=8, ge=1, le=20),
):
    service = ProductService(db)
    products = await service.get_featured(limit)
    return APIResponse(data=[_build_list_response(p) for p in products])


@router.get("/products/new-arrivals", response_model=APIResponse[list[ProductListResponse]])
async def get_new_arrivals(
    db: DBSession,
    limit: int = Query(default=12, ge=1, le=20),
):
    service = ProductService(db)
    products = await service.get_new_arrivals(limit)
    return APIResponse(data=[_build_list_response(p) for p in products])


@router.get("/products/{product_id}", response_model=APIResponse[ProductResponse])
async def get_product(product_id: int, db: DBSession):
    service = ProductService(db)
    product = await service.get_product(product_id)
    return APIResponse(data=ProductResponse.model_validate(product))