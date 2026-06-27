"""
app/api/v1/admin/settings/routes.py
Site settings management.
"""
from fastapi import APIRouter
from sqlalchemy import select, update

from app.core.dependencies import CurrentAdminID, DBSession
from app.models.settings import SiteSetting
from app.schemas.base import APIResponse
from app.schemas.extras import SettingResponse, UpdateSettingsRequest

router = APIRouter(tags=["Admin — Settings"])


@router.get("/admin/settings", response_model=APIResponse[list[SettingResponse]])
async def get_settings(admin_id: CurrentAdminID, db: DBSession):
    """Get all site settings grouped."""
    result = await db.execute(select(SiteSetting).order_by(SiteSetting.group, SiteSetting.key))
    settings = result.scalars().all()
    return APIResponse(data=[SettingResponse.model_validate(s) for s in settings])


@router.patch("/admin/settings", response_model=APIResponse[list[SettingResponse]])
async def update_settings(body: UpdateSettingsRequest, admin_id: CurrentAdminID, db: DBSession):
    """
    Bulk-update settings. Body: { "settings": { "store_name": "My Store", ... } }
    Only updates keys that already exist in the DB.
    """
    for key, value in body.settings.items():
        await db.execute(
            update(SiteSetting).where(SiteSetting.key == key).values(value=str(value))
        )
    await db.commit()
    result = await db.execute(select(SiteSetting).order_by(SiteSetting.group, SiteSetting.key))
    settings = result.scalars().all()
    return APIResponse(data=[SettingResponse.model_validate(s) for s in settings], message="Settings saved")