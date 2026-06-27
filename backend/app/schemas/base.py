"""
app/schemas/base.py
Generic API response wrappers.
"""
from typing import Generic, Optional, TypeVar

from pydantic import BaseModel

T = TypeVar("T")


class APIResponse(BaseModel, Generic[T]):
    """Standard success envelope."""
    success: bool = True
    data: Optional[T] = None
    message: Optional[str] = None


class PaginatedResponse(BaseModel, Generic[T]):
    """Paginated list envelope."""
    success: bool = True
    data: list[T]
    total: int
    page: int
    page_size: int
    total_pages: int