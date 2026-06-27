"""
tests/test_auth.py
Tests for customer registration, login, and token refresh.
"""
import pytest
from httpx import AsyncClient


REGISTER_URL = "/api/v1/auth/register"
LOGIN_URL = "/api/v1/auth/login"
REFRESH_URL = "/api/v1/auth/refresh"
ME_URL = "/api/v1/auth/me"


@pytest.mark.asyncio
async def test_register_success(client: AsyncClient):
    response = await client.post(REGISTER_URL, json={
        "email": "test@example.com",
        "password": "TestPass1",
        "full_name": "Test User",
    })
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True
    assert data["data"]["email"] == "test@example.com"


@pytest.mark.asyncio
async def test_register_duplicate_email(client: AsyncClient):
    payload = {"email": "dup@example.com", "password": "TestPass1", "full_name": "Dup User"}
    await client.post(REGISTER_URL, json=payload)
    response = await client.post(REGISTER_URL, json=payload)
    assert response.status_code == 409


@pytest.mark.asyncio
async def test_login_success(client: AsyncClient):
    await client.post(REGISTER_URL, json={
        "email": "login@example.com",
        "password": "TestPass1",
        "full_name": "Login User",
    })
    response = await client.post(LOGIN_URL, json={
        "email": "login@example.com",
        "password": "TestPass1",
    })
    assert response.status_code == 200
    tokens = response.json()["data"]
    assert "access_token" in tokens
    assert "refresh_token" in tokens


@pytest.mark.asyncio
async def test_login_wrong_password(client: AsyncClient):
    await client.post(REGISTER_URL, json={
        "email": "wrong@example.com",
        "password": "TestPass1",
        "full_name": "Wrong User",
    })
    response = await client.post(LOGIN_URL, json={
        "email": "wrong@example.com",
        "password": "WrongPass1",
    })
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_get_profile_authenticated(client: AsyncClient):
    await client.post(REGISTER_URL, json={
        "email": "profile@example.com",
        "password": "TestPass1",
        "full_name": "Profile User",
    })
    login_resp = await client.post(LOGIN_URL, json={
        "email": "profile@example.com",
        "password": "TestPass1",
    })
    access_token = login_resp.json()["data"]["access_token"]

    response = await client.get(ME_URL, headers={"Authorization": f"Bearer {access_token}"})
    assert response.status_code == 200
    assert response.json()["data"]["email"] == "profile@example.com"


@pytest.mark.asyncio
async def test_get_profile_unauthenticated(client: AsyncClient):
    response = await client.get(ME_URL)
    assert response.status_code == 401