"""
app/api/v1/admin/auth/routes.py
Admin authentication endpoints.
"""
from fastapi import APIRouter, Depends, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.dependencies import CurrentAdminID, DBSession
from app.schemas.auth import AdminLoginRequest, AdminTokenResponse
from app.schemas.base import APIResponse
from app.services.admin_auth_service import AdminAuthService

router = APIRouter(prefix="/admin/auth", tags=["Admin Auth"])
bearer_scheme = HTTPBearer(auto_error=False)


@router.post("/login", response_model=APIResponse[AdminTokenResponse])
async def admin_login(body: AdminLoginRequest, db: DBSession):
    """
    Admin login. Max 2 concurrent sessions enforced.
    Returns a JWT — store it and send as Bearer token for all /admin/* requests.
    """
    service = AdminAuthService(db)
    token_response = await service.login(body.email, body.password)
    return APIResponse(data=token_response, message="Admin login successful")


@router.post("/logout", response_model=APIResponse[None])
async def admin_logout(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: DBSession = None,
):
    """Revoke the current admin session."""
    if credentials:
        service = AdminAuthService(db)
        await service.logout(credentials.credentials)
    return APIResponse(message="Logged out successfully")


@router.post("/refresh", response_model=APIResponse[AdminTokenResponse])
async def admin_refresh(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: DBSession = None,
):
    """Refresh an admin access token before it expires."""
    service = AdminAuthService(db)
    token_response = await service.refresh(credentials.credentials)
    return APIResponse(data=token_response)