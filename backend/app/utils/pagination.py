"""
app/utils/pagination.py
Pagination helper for building PaginatedResponse objects.
"""
import math
from typing import List, TypeVar

from app.schemas.base import PaginatedResponse

T = TypeVar("T")


def paginate(items: List[T], total: int, page: int, page_size: int) -> PaginatedResponse:
    total_pages = math.ceil(total / page_size) if page_size > 0 else 1
    return PaginatedResponse(
        data=items,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
    )