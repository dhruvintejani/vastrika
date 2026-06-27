"""
app/api/v1/admin/users/routes.py
Admin user management endpoints.
"""
from fastapi import APIRouter, Query

from app.core.dependencies import CurrentAdminID, DBSession
from app.schemas.base import APIResponse, PaginatedResponse
from app.schemas.user import AdminUserResponse
from app.repositories.user_repository import UserRepository
from app.utils.pagination import paginate

router = APIRouter(prefix="/admin/users", tags=["Admin — Users"])


@router.get("", response_model=PaginatedResponse[AdminUserResponse])
async def list_users(
    admin_id: CurrentAdminID,
    db: DBSession,
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
):
    """List all registered customers."""
    repo = UserRepository(db)
    skip = (page - 1) * page_size
    users, total = await repo.list_all(skip=skip, limit=page_size)
    items = [AdminUserResponse.model_validate(u) for u in users]
    return paginate(items, total, page, page_size)


@router.get("/{user_id}", response_model=APIResponse[AdminUserResponse])
async def get_user(user_id: int, admin_id: CurrentAdminID, db: DBSession):
    """Get a specific user's profile."""
    from app.core.exceptions import NotFoundError
    repo = UserRepository(db)
    user = await repo.get_by_id(user_id)
    if not user:
        raise NotFoundError("User")
    return APIResponse(data=AdminUserResponse.model_validate(user))


@router.patch("/{user_id}/block", response_model=APIResponse[AdminUserResponse])
async def block_user(user_id: int, admin_id: CurrentAdminID, db: DBSession):
    """Block a user account. They will not be able to login."""
    from app.core.exceptions import NotFoundError
    repo = UserRepository(db)
    user = await repo.set_blocked(user_id, True)
    if not user:
        raise NotFoundError("User")
    await db.commit()
    return APIResponse(
        data=AdminUserResponse.model_validate(user),
        message="User account blocked",
    )


@router.patch("/{user_id}/unblock", response_model=APIResponse[AdminUserResponse])
async def unblock_user(user_id: int, admin_id: CurrentAdminID, db: DBSession):
    """Unblock a previously blocked user account."""
    from app.core.exceptions import NotFoundError
    repo = UserRepository(db)
    user = await repo.set_blocked(user_id, False)
    if not user:
        raise NotFoundError("User")
    await db.commit()
    return APIResponse(
        data=AdminUserResponse.model_validate(user),
        message="User account unblocked",
    )