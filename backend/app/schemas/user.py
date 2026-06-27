"""
app/schemas/user.py
Pydantic schemas for user profile.
"""
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class UserProfileResponse(BaseModel):
    id: int
    email: str
    full_name: str
    phone: Optional[str]
    address_line1: Optional[str]
    address_line2: Optional[str]
    city: Optional[str]
    state: Optional[str]
    pincode: Optional[str]
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class UpdateProfileRequest(BaseModel):
    full_name: Optional[str] = Field(default=None, min_length=2, max_length=255)
    phone: Optional[str] = Field(default=None, max_length=20)
    address_line1: Optional[str] = Field(default=None, max_length=500)
    address_line2: Optional[str] = Field(default=None, max_length=500)
    city: Optional[str] = Field(default=None, max_length=100)
    state: Optional[str] = Field(default=None, max_length=100)
    pincode: Optional[str] = Field(default=None, max_length=10)


# Admin view of user
class AdminUserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    phone: Optional[str]
    city: Optional[str]
    state: Optional[str]
    is_active: bool
    is_blocked: bool
    created_at: datetime

    model_config = {"from_attributes": True}