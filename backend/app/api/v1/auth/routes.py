"""
app/api/v1/auth/routes.py
Customer authentication endpoints.
"""
from fastapi import APIRouter, Depends
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.core.dependencies import CurrentUserID, DBSession
from app.schemas.auth import (
    AccessTokenResponse,
    ChangePasswordRequest,
    RefreshTokenRequest,
    TokenResponse,
    UserLoginRequest,
    UserRegisterRequest,
)
from app.schemas.base import APIResponse
from app.schemas.user import UpdateProfileRequest, UserProfileResponse
from app.services.auth_service import AuthService
from app.repositories.user_repository import UserRepository

router = APIRouter(prefix="/auth", tags=["Customer Auth"])
limiter = Limiter(key_func=get_remote_address)


@router.post("/register", response_model=APIResponse[UserProfileResponse], status_code=201)
async def register(body: UserRegisterRequest, db: DBSession):
    """Register a new customer account."""
    service = AuthService(db)
    user = await service.register(
        email=body.email,
        password=body.password,
        full_name=body.full_name,
        phone=body.phone,
    )
    return APIResponse(
        data=UserProfileResponse.model_validate(user),
        message="Account created successfully",
    )


@router.post("/login", response_model=APIResponse[TokenResponse])
async def login(body: UserLoginRequest, db: DBSession):
    """Login and receive access + refresh tokens."""
    service = AuthService(db)
    tokens = await service.login(body.email, body.password)
    return APIResponse(data=tokens, message="Login successful")


@router.post("/refresh", response_model=APIResponse[TokenResponse])
async def refresh_token(body: RefreshTokenRequest, db: DBSession):
    """Exchange a valid refresh token for a new token pair."""
    service = AuthService(db)
    tokens = await service.refresh(body.refresh_token)
    return APIResponse(data=tokens)


@router.post("/logout", response_model=APIResponse[None])
async def logout(body: RefreshTokenRequest, db: DBSession):
    """Revoke the refresh token (logout)."""
    service = AuthService(db)
    await service.logout(body.refresh_token)
    return APIResponse(message="Logged out successfully")


@router.get("/me", response_model=APIResponse[UserProfileResponse])
async def get_profile(user_id: CurrentUserID, db: DBSession):
    """Get the current user's profile."""
    repo = UserRepository(db)
    user = await repo.get_by_id(user_id)
    return APIResponse(data=UserProfileResponse.model_validate(user))


@router.put("/me", response_model=APIResponse[UserProfileResponse])
async def update_profile(
    body: UpdateProfileRequest, user_id: CurrentUserID, db: DBSession
):
    """Update the current user's profile."""
    repo = UserRepository(db)
    user = await repo.update_profile(user_id, body.model_dump(exclude_none=True))
    await db.commit()
    return APIResponse(
        data=UserProfileResponse.model_validate(user),
        message="Profile updated successfully",
    )


@router.post("/change-password", response_model=APIResponse[None])
async def change_password(
    body: ChangePasswordRequest, user_id: CurrentUserID, db: DBSession
):
    """Change the current user's password. Revokes all existing sessions."""
    service = AuthService(db)
    await service.change_password(user_id, body.current_password, body.new_password)
    return APIResponse(message="Password changed successfully")