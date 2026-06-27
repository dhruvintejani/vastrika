"""
tests/test_admin_sessions.py
Tests for admin concurrent session enforcement.
"""
import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import hash_password
from app.models.admin import Admin

ADMIN_LOGIN_URL = "/api/v1/admin/auth/login"
ADMIN_LOGOUT_URL = "/api/v1/admin/auth/logout"


async def _seed_admin(db: AsyncSession):
    admin = Admin(
        email="testadmin@vastrika.in",
        hashed_password=hash_password("AdminPass1"),
        full_name="Test Admin",
        is_active=True,
    )
    db.add(admin)
    await db.commit()


@pytest.mark.asyncio
async def test_admin_login_success(client: AsyncClient, db_session: AsyncSession):
    await _seed_admin(db_session)
    response = await client.post(ADMIN_LOGIN_URL, json={
        "email": "testadmin@vastrika.in",
        "password": "AdminPass1",
    })
    assert response.status_code == 200
    assert "access_token" in response.json()["data"]


@pytest.mark.asyncio
async def test_admin_max_sessions_enforced(client: AsyncClient, db_session: AsyncSession):
    """Third concurrent login attempt must be rejected with 403."""
    await _seed_admin(db_session)
    credentials = {"email": "testadmin@vastrika.in", "password": "AdminPass1"}

    # First two logins should succeed
    r1 = await client.post(ADMIN_LOGIN_URL, json=credentials)
    r2 = await client.post(ADMIN_LOGIN_URL, json=credentials)
    assert r1.status_code == 200
    assert r2.status_code == 200

    # Third login must be rejected
    r3 = await client.post(ADMIN_LOGIN_URL, json=credentials)
    assert r3.status_code == 403
    assert "Maximum" in r3.json()["error"]


@pytest.mark.asyncio
async def test_admin_can_login_after_logout(client: AsyncClient, db_session: AsyncSession):
    """After logout, the freed session slot allows a new login."""
    await _seed_admin(db_session)
    credentials = {"email": "testadmin@vastrika.in", "password": "AdminPass1"}

    r1 = await client.post(ADMIN_LOGIN_URL, json=credentials)
    r2 = await client.post(ADMIN_LOGIN_URL, json=credentials)
    token1 = r1.json()["data"]["access_token"]

    # Logout session 1
    await client.post(
        ADMIN_LOGOUT_URL,
        headers={"Authorization": f"Bearer {token1}"},
    )

    # Now a third login should succeed
    r3 = await client.post(ADMIN_LOGIN_URL, json=credentials)
    assert r3.status_code == 200