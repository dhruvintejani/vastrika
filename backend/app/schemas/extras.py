# """
# app/schemas/extras.py
# Pydantic schemas for Coupon, Banner, Review, SiteSettings.
# """
# from datetime import datetime
# from decimal import Decimal
# from typing import List, Optional

# from pydantic import BaseModel, Field

# from app.models.coupon import DiscountType


# # ── Coupon ────────────────────────────────────────────────────────────────────

# class CouponCreateRequest(BaseModel):
#     code: str = Field(min_length=3, max_length=50)
#     description: Optional[str] = None
#     discount_type: DiscountType = DiscountType.PERCENTAGE
#     discount_value: Decimal = Field(gt=0)
#     min_order_amount: Decimal = Field(default=Decimal("0.00"), ge=0)
#     max_discount_amount: Optional[Decimal] = Field(default=None, ge=0)
#     usage_limit: Optional[int] = Field(default=None, ge=1)
#     is_active: bool = True
#     expires_at: Optional[datetime] = None


# class CouponUpdateRequest(BaseModel):
#     description: Optional[str] = None
#     discount_type: Optional[DiscountType] = None
#     discount_value: Optional[Decimal] = Field(default=None, gt=0)
#     min_order_amount: Optional[Decimal] = Field(default=None, ge=0)
#     max_discount_amount: Optional[Decimal] = None
#     usage_limit: Optional[int] = None
#     is_active: Optional[bool] = None
#     expires_at: Optional[datetime] = None


# class CouponResponse(BaseModel):
#     id: int
#     code: str
#     description: Optional[str]
#     discount_type: DiscountType
#     discount_value: Decimal
#     min_order_amount: Decimal
#     max_discount_amount: Optional[Decimal]
#     usage_limit: Optional[int]
#     used_count: int
#     is_active: bool
#     expires_at: Optional[datetime]
#     created_at: datetime

#     model_config = {"from_attributes": True}


# class ValidateCouponRequest(BaseModel):
#     code: str
#     order_total: Decimal = Field(gt=0)


# class ValidateCouponResponse(BaseModel):
#     valid: bool
#     discount_amount: Decimal
#     message: str
#     coupon: Optional[CouponResponse] = None


# # ── Banner ────────────────────────────────────────────────────────────────────

# class BannerCreateRequest(BaseModel):
#     title: str = Field(min_length=2, max_length=255)
#     subtitle: Optional[str] = Field(default=None, max_length=500)
#     cta_text: Optional[str] = Field(default=None, max_length=100)
#     cta_link: Optional[str] = Field(default=None, max_length=500)
#     sort_order: int = Field(default=0, ge=0)
#     is_active: bool = True
#     target: Optional[str] = Field(default="homepage", max_length=50)


# class BannerUpdateRequest(BaseModel):
#     title: Optional[str] = Field(default=None, min_length=2, max_length=255)
#     subtitle: Optional[str] = None
#     cta_text: Optional[str] = None
#     cta_link: Optional[str] = None
#     sort_order: Optional[int] = Field(default=None, ge=0)
#     is_active: Optional[bool] = None
#     target: Optional[str] = None


# class BannerResponse(BaseModel):
#     id: int
#     title: str
#     subtitle: Optional[str]
#     cta_text: Optional[str]
#     cta_link: Optional[str]
#     image_url: str
#     sort_order: int
#     is_active: bool
#     target: Optional[str]
#     created_at: datetime

#     model_config = {"from_attributes": True}


# # ── Review ────────────────────────────────────────────────────────────────────

# class ReviewCreateRequest(BaseModel):
#     product_id: int
#     rating: int = Field(ge=1, le=5)
#     title: Optional[str] = Field(default=None, max_length=255)
#     body: Optional[str] = Field(default=None, max_length=2000)


# class ReviewResponse(BaseModel):
#     id: int
#     product_id: int
#     product_title: str
#     user_id: int
#     user_name: str
#     rating: int
#     title: Optional[str]
#     body: Optional[str]
#     is_approved: bool
#     is_flagged: bool
#     created_at: datetime

#     model_config = {"from_attributes": True}


# # ── SiteSettings ──────────────────────────────────────────────────────────────

# class SettingResponse(BaseModel):
#     key: str
#     value: str
#     label: str
#     group: str

#     model_config = {
#         "from_attributes": True,
#         "populate_by_name": True,
#     }


# class UpdateSettingsRequest(BaseModel):
#     settings: dict[str, str]  # {key: value, ...}


# # ── Inventory ─────────────────────────────────────────────────────────────────

# class LowStockItem(BaseModel):
#     product_id: int
#     product_title: str
#     variant_id: int
#     size: str
#     color: str
#     stock: int
#     category: str


# class InventoryResponse(BaseModel):
#     low_stock_items: List[LowStockItem]
#     out_of_stock_count: int
#     low_stock_count: int
#     threshold: int


# # ── Revenue Chart ─────────────────────────────────────────────────────────────

# class RevenueDataPoint(BaseModel):
#     label: str      # e.g. "Jan 2025"
#     revenue: Decimal
#     orders: int


# class RevenueChartResponse(BaseModel):
#     data: List[RevenueDataPoint]
#     period: str     # "7d" | "30d" | "12m"

"""
app/schemas/extras.py
Pydantic schemas for Coupon, Banner, Review, SiteSettings.
"""
from datetime import datetime
from decimal import Decimal
from typing import List, Optional

from pydantic import BaseModel, Field

from app.models.coupon import DiscountType


class CouponCreateRequest(BaseModel):
    code: str = Field(min_length=3, max_length=50)
    description: Optional[str] = None
    discount_type: DiscountType = DiscountType.PERCENTAGE
    discount_value: Decimal = Field(gt=0)
    min_order_amount: Decimal = Field(default=Decimal("0.00"), ge=0)
    max_discount_amount: Optional[Decimal] = Field(default=None, ge=0)
    usage_limit: Optional[int] = Field(default=None, ge=1)
    is_active: bool = True
    expires_at: Optional[datetime] = None


class CouponUpdateRequest(BaseModel):
    description: Optional[str] = None
    discount_type: Optional[DiscountType] = None
    discount_value: Optional[Decimal] = Field(default=None, gt=0)
    min_order_amount: Optional[Decimal] = Field(default=None, ge=0)
    max_discount_amount: Optional[Decimal] = None
    usage_limit: Optional[int] = None
    is_active: Optional[bool] = None
    expires_at: Optional[datetime] = None


class CouponResponse(BaseModel):
    id: int
    code: str
    description: Optional[str]
    discount_type: DiscountType
    discount_value: Decimal
    min_order_amount: Decimal
    max_discount_amount: Optional[Decimal]
    usage_limit: Optional[int]
    used_count: int
    is_active: bool
    expires_at: Optional[datetime]
    created_at: datetime

    model_config = {"from_attributes": True}


class ValidateCouponRequest(BaseModel):
    code: str
    order_total: Decimal = Field(gt=0)


class ValidateCouponResponse(BaseModel):
    valid: bool
    discount_amount: Decimal
    message: str
    coupon: Optional[CouponResponse] = None


class BannerCreateRequest(BaseModel):
    title: str = Field(min_length=2, max_length=255)
    subtitle: Optional[str] = Field(default=None, max_length=500)
    cta_text: Optional[str] = Field(default=None, max_length=100)
    cta_link: Optional[str] = Field(default=None, max_length=500)
    sort_order: int = Field(default=0, ge=0)
    is_active: bool = True
    target: Optional[str] = Field(default="homepage", max_length=50)


class BannerUpdateRequest(BaseModel):
    title: Optional[str] = Field(default=None, min_length=2, max_length=255)
    subtitle: Optional[str] = None
    cta_text: Optional[str] = None
    cta_link: Optional[str] = None
    sort_order: Optional[int] = Field(default=None, ge=0)
    is_active: Optional[bool] = None
    target: Optional[str] = None


class BannerResponse(BaseModel):
    id: int
    title: str
    subtitle: Optional[str]
    cta_text: Optional[str]
    cta_link: Optional[str]
    image_url: str
    sort_order: int
    is_active: bool
    target: Optional[str]
    created_at: datetime

    model_config = {"from_attributes": True}


class ReviewCreateRequest(BaseModel):
    product_id: int
    rating: int = Field(ge=1, le=5)
    body: str = Field(min_length=2, max_length=2000)


class ReviewResponse(BaseModel):
    id: int
    product_id: int
    product_title: str
    user_id: int
    user_name: str
    user_email: str
    rating: int
    title: Optional[str] = None
    body: Optional[str]
    is_approved: bool
    is_flagged: bool
    is_removed: bool = False
    removed_at: Optional[datetime] = None
    created_at: datetime

    model_config = {"from_attributes": True}


class SettingResponse(BaseModel):
    key: str
    value: str
    label: str
    group: str

    model_config = {
        "from_attributes": True,
        "populate_by_name": True,
    }


class UpdateSettingsRequest(BaseModel):
    settings: dict[str, str]


class LowStockItem(BaseModel):
    product_id: int
    product_title: str
    variant_id: int
    size: str
    color: str
    stock: int
    category: str


class InventoryResponse(BaseModel):
    low_stock_items: List[LowStockItem]
    out_of_stock_count: int
    low_stock_count: int
    threshold: int


class RevenueDataPoint(BaseModel):
    label: str
    revenue: Decimal
    orders: int


class RevenueChartResponse(BaseModel):
    data: List[RevenueDataPoint]
    period: str
