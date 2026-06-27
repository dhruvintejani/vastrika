"""
app/core/security.py
Password hashing, JWT creation/verification, token utilities.
"""
import hashlib
import secrets
from datetime import datetime, timedelta, timezone
from typing import Any, Optional
from uuid import uuid4

from jose import JWTError, jwt
from passlib.context import CryptContext

from app.core.config import settings

# ── Password hashing ──────────────────────────────────────────────────────────

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(plain_password: str) -> str:
    """Return bcrypt hash of a plain-text password."""
    return pwd_context.hash(plain_password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Return True if plain_password matches the stored hash."""
    return pwd_context.verify(plain_password, hashed_password)


# ── JWT helpers ───────────────────────────────────────────────────────────────

def _create_token(
    subject: str,
    token_type: str,
    expires_delta: timedelta,
    secret_key: str,
    algorithm: str,
    extra_claims: Optional[dict] = None,
) -> tuple[str, str]:
    """
    Internal factory for JWTs.
    Returns (encoded_token, jti) where jti is a unique token ID
    used for session tracking / revocation.
    """
    jti = str(uuid4())
    now = datetime.now(timezone.utc)
    expire = now + expires_delta

    payload: dict[str, Any] = {
        "sub": str(subject),
        "type": token_type,
        "jti": jti,
        "iat": now,
        "exp": expire,
    }
    if extra_claims:
        payload.update(extra_claims)

    token = jwt.encode(payload, secret_key, algorithm=algorithm)
    return token, jti


# ── Customer tokens ───────────────────────────────────────────────────────────

def create_access_token(user_id: int) -> str:
    token, _ = _create_token(
        subject=str(user_id),
        token_type="access",
        expires_delta=timedelta(minutes=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES),
        secret_key=settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM,
    )
    return token


def create_refresh_token() -> tuple[str, str]:
    """
    Returns (raw_refresh_token, token_hash).
    We store only the hash in the DB, never the raw token.
    """
    raw = secrets.token_urlsafe(64)
    token_hash = hashlib.sha256(raw.encode()).hexdigest()
    return raw, token_hash


def decode_access_token(token: str) -> Optional[dict]:
    """Decode and validate a customer access token. Returns payload or None."""
    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET_KEY,
            algorithms=[settings.JWT_ALGORITHM],
        )
        if payload.get("type") != "access":
            return None
        return payload
    except JWTError:
        return None


def hash_refresh_token(raw_token: str) -> str:
    """Produce SHA-256 hash of a raw refresh token for storage lookup."""
    return hashlib.sha256(raw_token.encode()).hexdigest()


# ── Admin tokens ──────────────────────────────────────────────────────────────

def create_admin_access_token(admin_id: int) -> tuple[str, str]:
    """
    Returns (encoded_token, jti).
    jti is stored in admin_sessions for concurrent-session tracking.
    """
    token, jti = _create_token(
        subject=str(admin_id),
        token_type="admin_access",
        expires_delta=timedelta(minutes=settings.ADMIN_JWT_ACCESS_TOKEN_EXPIRE_MINUTES),
        secret_key=settings.ADMIN_JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM,
        extra_claims={"role": "admin"},
    )
    return token, jti


def decode_admin_access_token(token: str) -> Optional[dict]:
    """Decode and validate an admin access token. Returns payload or None."""
    try:
        payload = jwt.decode(
            token,
            settings.ADMIN_JWT_SECRET_KEY,
            algorithms=[settings.JWT_ALGORITHM],
        )
        if payload.get("type") != "admin_access":
            return None
        return payload
    except JWTError:
        return None