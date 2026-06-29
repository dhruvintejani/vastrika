# # # """
# # # app/schemas/product.py
# # # Pydantic schemas for products, categories, variants.
# # # """
# # # from decimal import Decimal
# # # from typing import List, Optional

# # # from pydantic import BaseModel, Field


# # # # ── Category ──────────────────────────────────────────────────────────────────

# # # class CategoryResponse(BaseModel):
# # #     id: int
# # #     name: str
# # #     slug: str
# # #     description: Optional[str]
# # #     is_active: bool

# # #     model_config = {"from_attributes": True}


# # # class CategoryCreateRequest(BaseModel):
# # #     name: str = Field(min_length=2, max_length=100)
# # #     description: Optional[str] = None


# # # class CategoryUpdateRequest(BaseModel):
# # #     name: Optional[str] = Field(default=None, min_length=2, max_length=100)
# # #     description: Optional[str] = None
# # #     is_active: Optional[bool] = None


# # # # ── Product Image ─────────────────────────────────────────────────────────────

# # # class ProductImageResponse(BaseModel):
# # #     id: int
# # #     cloudinary_public_id: str
# # #     url: str
# # #     sort_order: int

# # #     model_config = {"from_attributes": True}


# # # # ── Product Variant ───────────────────────────────────────────────────────────

# # # class ProductVariantResponse(BaseModel):
# # #     id: int
# # #     size: str
# # #     color: str
# # #     stock: int
# # #     additional_price: Decimal

# # #     model_config = {"from_attributes": True}


# # # class ProductVariantCreate(BaseModel):
# # #     size: str = Field(min_length=1, max_length=50)
# # #     color: str = Field(min_length=1, max_length=100)
# # #     stock: int = Field(ge=0, default=0)
# # #     additional_price: Decimal = Field(default=Decimal("0.00"), ge=0)


# # # # ── Product ───────────────────────────────────────────────────────────────────

# # # class ProductResponse(BaseModel):
# # #     id: int
# # #     title: str
# # #     description: Optional[str]
# # #     fabric: Optional[str]
# # #     specifications: Optional[str]
# # #     category: CategoryResponse
# # #     price: Decimal
# # #     old_price: Decimal
# # #     badge: Optional[str]
# # #     rating: Decimal
# # #     review_count: int
# # #     is_new: bool
# # #     is_featured: bool
# # #     images: List[ProductImageResponse]
# # #     variants: List[ProductVariantResponse]

# # #     # Derived convenience fields used by the frontend
# # #     @property
# # #     def images_urls(self) -> List[str]:
# # #         return [img.url for img in self.images]

# # #     @property
# # #     def sizes(self) -> List[str]:
# # #         return list(dict.fromkeys(v.size for v in self.variants))

# # #     @property
# # #     def colors(self) -> List[str]:
# # #         return list(dict.fromkeys(v.color for v in self.variants))

# # #     @property
# # #     def stock(self) -> int:
# # #         return sum(v.stock for v in self.variants)

# # #     model_config = {"from_attributes": True}


# # # class ProductListResponse(BaseModel):
# # #     """Lightweight response for listing (no variants detail)."""
# # #     id: int
# # #     title: str
# # #     category: CategoryResponse
# # #     price: Decimal
# # #     old_price: Decimal
# # #     badge: Optional[str]
# # #     rating: Decimal
# # #     review_count: int
# # #     is_new: bool
# # #     is_featured: bool
# # #     images: List[ProductImageResponse]
# # #     total_stock: int

# # #     model_config = {"from_attributes": True}


# # # class ProductCreateRequest(BaseModel):
# # #     title: str = Field(min_length=3, max_length=500)
# # #     description: Optional[str] = None
# # #     fabric: Optional[str] = Field(default=None, max_length=255)
# # #     specifications: Optional[str] = None
# # #     category_id: int
# # #     price: Decimal = Field(gt=0)
# # #     old_price: Decimal = Field(gt=0)
# # #     badge: Optional[str] = Field(default=None, max_length=50)
# # #     is_new: bool = False
# # #     is_featured: bool = False
# # #     variants: List[ProductVariantCreate] = Field(min_length=1)


# # # class ProductUpdateRequest(BaseModel):
# # #     title: Optional[str] = Field(default=None, min_length=3, max_length=500)
# # #     description: Optional[str] = None
# # #     fabric: Optional[str] = Field(default=None, max_length=255)
# # #     specifications: Optional[str] = None
# # #     category_id: Optional[int] = None
# # #     price: Optional[Decimal] = Field(default=None, gt=0)
# # #     old_price: Optional[Decimal] = Field(default=None, gt=0)
# # #     badge: Optional[str] = Field(default=None, max_length=50)
# # #     is_new: Optional[bool] = None
# # #     is_featured: Optional[bool] = None
# # #     is_active: Optional[bool] = None


# # # class StockUpdateRequest(BaseModel):
# # #     variant_id: int
# # #     stock: int = Field(ge=0)

# # """
# # app/schemas/product.py
# # Pydantic schemas for products, categories, variants.
# # """
# # from decimal import Decimal
# # from typing import List, Optional

# # from pydantic import BaseModel, Field


# # # ── Category ──────────────────────────────────────────────────────────────────

# # class CategoryResponse(BaseModel):
# #     id: int
# #     name: str
# #     slug: str
# #     description: Optional[str]
# #     is_active: bool

# #     model_config = {"from_attributes": True}


# # class CategoryCreateRequest(BaseModel):
# #     name: str = Field(min_length=2, max_length=100)
# #     description: Optional[str] = None


# # class CategoryUpdateRequest(BaseModel):
# #     name: Optional[str] = Field(default=None, min_length=2, max_length=100)
# #     description: Optional[str] = None
# #     is_active: Optional[bool] = None


# # # ── Product Image ─────────────────────────────────────────────────────────────

# # class ProductImageResponse(BaseModel):
# #     id: int
# #     cloudinary_public_id: str
# #     url: str
# #     sort_order: int

# #     model_config = {"from_attributes": True}


# # # ── Product Variant ───────────────────────────────────────────────────────────

# # class ProductVariantResponse(BaseModel):
# #     id: int
# #     size: str
# #     color: str
# #     stock: int
# #     additional_price: Decimal

# #     model_config = {"from_attributes": True}


# # class ProductVariantCreate(BaseModel):
# #     size: str = Field(min_length=1, max_length=50)
# #     color: str = Field(min_length=1, max_length=100)
# #     stock: int = Field(ge=0, default=0)
# #     additional_price: Decimal = Field(default=Decimal("0.00"), ge=0)


# # # ── Product ───────────────────────────────────────────────────────────────────

# # class ProductResponse(BaseModel):
# #     id: int
# #     title: str
# #     description: Optional[str]
# #     fabric: Optional[str]
# #     specifications: Optional[str]
# #     category: CategoryResponse
# #     price: Decimal
# #     old_price: Decimal
# #     badge: Optional[str]
# #     rating: Decimal
# #     review_count: int
# #     is_new: bool
# #     is_featured: bool
# #     images: List[ProductImageResponse]
# #     variants: List[ProductVariantResponse]

# #     # Derived convenience fields used by the frontend
# #     @property
# #     def images_urls(self) -> List[str]:
# #         return [img.url for img in self.images]

# #     @property
# #     def sizes(self) -> List[str]:
# #         return list(dict.fromkeys(v.size for v in self.variants))

# #     @property
# #     def colors(self) -> List[str]:
# #         return list(dict.fromkeys(v.color for v in self.variants))

# #     @property
# #     def stock(self) -> int:
# #         return sum(v.stock for v in self.variants)

# #     model_config = {"from_attributes": True}


# # class ProductListResponse(BaseModel):
# #     """Lightweight response for listing (no variants detail)."""
# #     id: int
# #     title: str
# #     description: Optional[str] = None
# #     fabric: Optional[str] = None
# #     specifications: Optional[str] = None
# #     category: CategoryResponse
# #     price: Decimal
# #     old_price: Decimal
# #     badge: Optional[str]
# #     rating: Decimal
# #     review_count: int
# #     is_new: bool
# #     is_featured: bool
# #     images: List[ProductImageResponse]
# #     total_stock: int

# #     model_config = {"from_attributes": True}


# # class ProductCreateRequest(BaseModel):
# #     title: str = Field(min_length=3, max_length=500)
# #     description: Optional[str] = None
# #     fabric: Optional[str] = Field(default=None, max_length=255)
# #     specifications: Optional[str] = None
# #     category_id: int
# #     price: Decimal = Field(gt=0)
# #     old_price: Decimal = Field(gt=0)
# #     badge: Optional[str] = Field(default=None, max_length=50)
# #     is_new: bool = False
# #     is_featured: bool = False
# #     variants: List[ProductVariantCreate] = Field(min_length=1)


# # class ProductUpdateRequest(BaseModel):
# #     title: Optional[str] = Field(default=None, min_length=3, max_length=500)
# #     description: Optional[str] = None
# #     fabric: Optional[str] = Field(default=None, max_length=255)
# #     specifications: Optional[str] = None
# #     category_id: Optional[int] = None
# #     price: Optional[Decimal] = Field(default=None, gt=0)
# #     old_price: Optional[Decimal] = Field(default=None, gt=0)
# #     badge: Optional[str] = Field(default=None, max_length=50)
# #     is_new: Optional[bool] = None
# #     is_featured: Optional[bool] = None
# #     is_active: Optional[bool] = None


# # class StockUpdateRequest(BaseModel):
# #     variant_id: int
# #     stock: int = Field(ge=0)

# """
# app/schemas/product.py
# Pydantic schemas for products and categories.

# FIX: ProductListResponse now includes sizes[] and colors[] arrays so the
# frontend can show size selectors on product cards without needing to fetch
# the full product detail. These are derived from the product's variants in
# the route handler.
# """
# from decimal import Decimal
# from typing import List, Optional

# from pydantic import BaseModel, Field


# class CategoryResponse(BaseModel):
#     id: int
#     name: str
#     slug: str

#     model_config = {"from_attributes": True}


# class ProductImageResponse(BaseModel):
#     id: int
#     cloudinary_public_id: str
#     url: str
#     sort_order: int

#     model_config = {"from_attributes": True}


# class ProductVariantResponse(BaseModel):
#     id: int
#     size: str
#     color: str
#     stock: int
#     additional_price: Decimal

#     model_config = {"from_attributes": True}


# class ProductListResponse(BaseModel):
#     """
#     Lightweight response for listing (home, shop, search).
#     Includes sizes[] and colors[] derived from variants so ProductCard
#     can show size selectors without a separate full-product API call.
#     """
#     id: int
#     title: str
#     category: CategoryResponse
#     price: Decimal
#     old_price: Decimal
#     badge: Optional[str]
#     rating: Decimal
#     review_count: int
#     is_new: bool
#     is_featured: bool
#     images: List[ProductImageResponse]
#     total_stock: int
#     # Unique sizes and colors from all variants — used by ProductCard
#     sizes: List[str] = []
#     colors: List[str] = []

#     model_config = {"from_attributes": True}


# class ProductResponse(BaseModel):
#     """Full product detail including all variants."""
#     id: int
#     title: str
#     description: Optional[str] = None
#     fabric: Optional[str] = None
#     specifications: Optional[str] = None
#     category: CategoryResponse
#     price: Decimal
#     old_price: Decimal
#     badge: Optional[str]
#     rating: Decimal
#     review_count: int
#     is_new: bool
#     is_featured: bool
#     images: List[ProductImageResponse]
#     variants: List[ProductVariantResponse]

#     model_config = {"from_attributes": True}


# class ProductCreateRequest(BaseModel):
#     title: str = Field(min_length=3, max_length=500)
#     description: Optional[str] = None
#     fabric: Optional[str] = Field(default=None, max_length=255)
#     specifications: Optional[str] = None
#     category_id: int
#     price: Decimal = Field(gt=0)
#     old_price: Decimal = Field(gt=0)
#     badge: Optional[str] = Field(default=None, max_length=100)
#     is_new: bool = False
#     is_featured: bool = False
#     is_active: bool = True
#     variants: List[dict] = []


# class ProductUpdateRequest(BaseModel):
#     title: Optional[str] = Field(default=None, min_length=3, max_length=500)
#     description: Optional[str] = None
#     fabric: Optional[str] = Field(default=None, max_length=255)
#     specifications: Optional[str] = None
#     category_id: Optional[int] = None
#     price: Optional[Decimal] = Field(default=None, gt=0)
#     old_price: Optional[Decimal] = Field(default=None, gt=0)
#     badge: Optional[str] = None
#     is_new: Optional[bool] = None
#     is_featured: Optional[bool] = None
#     is_active: Optional[bool] = None
#     variants: Optional[List[dict]] = None


# class CategoryCreateRequest(BaseModel):
#     name: str = Field(min_length=2, max_length=100)
#     description: Optional[str] = None


# class CategoryUpdateRequest(BaseModel):
#     name: Optional[str] = Field(default=None, min_length=2, max_length=100)
#     description: Optional[str] = None
#     is_active: Optional[bool] = None
    

"""
app/schemas/product.py
Pydantic schemas for products and categories.
"""

from decimal import Decimal
from typing import List, Optional

from pydantic import BaseModel, Field


class CategoryResponse(BaseModel):
    id: int
    name: str
    slug: str

    model_config = {"from_attributes": True}


class CategoryCreateRequest(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    description: Optional[str] = None


class CategoryUpdateRequest(BaseModel):
    name: Optional[str] = Field(default=None, min_length=2, max_length=100)
    description: Optional[str] = None
    is_active: Optional[bool] = None


class ProductImageResponse(BaseModel):
    id: int
    cloudinary_public_id: str
    url: str
    sort_order: int

    model_config = {"from_attributes": True}


class ProductVariantResponse(BaseModel):
    id: int
    size: str
    color: str
    stock: int
    additional_price: Decimal

    model_config = {"from_attributes": True}


class ProductVariantCreate(BaseModel):
    size: str = Field(min_length=1, max_length=50)
    color: str = Field(min_length=1, max_length=100)
    stock: int = Field(default=0, ge=0)
    additional_price: Decimal = Field(default=Decimal("0.00"), ge=0)


class ProductListResponse(BaseModel):
    id: int
    title: str
    category: CategoryResponse
    price: Decimal
    old_price: Decimal
    badge: Optional[str] = None
    rating: Decimal
    review_count: int
    is_new: bool
    is_featured: bool
    images: List[ProductImageResponse] = Field(default_factory=list)
    total_stock: int
    sizes: List[str] = Field(default_factory=list)
    colors: List[str] = Field(default_factory=list)

    model_config = {"from_attributes": True}


class ProductResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    fabric: Optional[str] = None
    specifications: Optional[str] = None
    category: CategoryResponse
    price: Decimal
    old_price: Decimal
    badge: Optional[str] = None
    rating: Decimal
    review_count: int
    is_new: bool
    is_featured: bool
    images: List[ProductImageResponse] = Field(default_factory=list)
    variants: List[ProductVariantResponse] = Field(default_factory=list)

    model_config = {"from_attributes": True}


class ProductCreateRequest(BaseModel):
    title: str = Field(min_length=3, max_length=500)
    description: Optional[str] = None
    fabric: Optional[str] = Field(default=None, max_length=255)
    specifications: Optional[str] = None
    category_id: int
    price: Decimal = Field(gt=0)
    old_price: Decimal = Field(gt=0)
    badge: Optional[str] = Field(default=None, max_length=100)
    is_new: bool = False
    is_featured: bool = False
    is_active: bool = True
    variants: List[ProductVariantCreate] = Field(default_factory=list)


class ProductUpdateRequest(BaseModel):
    title: Optional[str] = Field(default=None, min_length=3, max_length=500)
    description: Optional[str] = None
    fabric: Optional[str] = Field(default=None, max_length=255)
    specifications: Optional[str] = None
    category_id: Optional[int] = None
    price: Optional[Decimal] = Field(default=None, gt=0)
    old_price: Optional[Decimal] = Field(default=None, gt=0)
    badge: Optional[str] = Field(default=None, max_length=100)
    is_new: Optional[bool] = None
    is_featured: Optional[bool] = None
    is_active: Optional[bool] = None
    variants: Optional[List[ProductVariantCreate]] = None


class StockUpdateRequest(BaseModel):
    variant_id: int = Field(gt=0)
    stock: int = Field(ge=0)