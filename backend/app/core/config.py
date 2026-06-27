# # """
# # app/core/config.py
# # Centralised application configuration using Pydantic Settings.
# # All values are read from environment variables / .env file.
# # """
# # from functools import lru_cache
# # from typing import List

# # from pydantic import computed_field, field_validator
# # from pydantic_settings import BaseSettings, SettingsConfigDict


# # class Settings(BaseSettings):
# #     model_config = SettingsConfigDict(
# #         env_file=".env",
# #         env_file_encoding="utf-8",
# #         case_sensitive=False,
# #         extra="ignore",
# #     )

# #     # ── App ───────────────────────────────────────────
# #     APP_NAME: str = "Vastrika"
# #     APP_ENV: str = "development"
# #     APP_DEBUG: bool = False
# #     APP_HOST: str = "0.0.0.0"
# #     APP_PORT: int = 8000

# #     # ── CORS ──────────────────────────────────────────
# #     FRONTEND_URL: str = "http://localhost:5173"
# #     ADMIN_FRONTEND_URL: str = "http://localhost:5174"

# #     @computed_field  # type: ignore[misc]
# #     @property
# #     def ALLOWED_ORIGINS(self) -> List[str]:
# #         origins = [self.FRONTEND_URL, self.ADMIN_FRONTEND_URL]
# #         # Include both localhost and 127.0.0.1 so the browser never hits a
# #         # CORS block regardless of which hostname the frontend uses
# #         extras = []
# #         for o in origins:
# #             if "localhost" in o:
# #                 extras.append(o.replace("localhost", "127.0.0.1"))
# #             elif "127.0.0.1" in o:
# #                 extras.append(o.replace("127.0.0.1", "localhost"))
# #         return list(dict.fromkeys(origins + extras))

# #     # ── Database ──────────────────────────────────────
# #     DB_HOST: str = "localhost"
# #     DB_PORT: int = 5432
# #     DB_NAME: str = "vastrika_db"
# #     DB_USER: str = "vastrika_user"
# #     DB_PASSWORD: str = ""

# #     @computed_field  # type: ignore[misc]
# #     @property
# #     def DATABASE_URL(self) -> str:
# #         return (
# #             f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASSWORD}"
# #             f"@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
# #         )

# #     @computed_field  # type: ignore[misc]
# #     @property
# #     def SYNC_DATABASE_URL(self) -> str:
# #         """Used by Alembic migrations (sync psycopg2 driver)."""
# #         return (
# #             f"postgresql+psycopg2://{self.DB_USER}:{self.DB_PASSWORD}"
# #             f"@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
# #         )

# #     # ── JWT — Customer ────────────────────────────────
# #     JWT_SECRET_KEY: str = "change-me-in-production"
# #     JWT_ALGORITHM: str = "HS256"
# #     JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
# #     JWT_REFRESH_TOKEN_EXPIRE_DAYS: int = 7

# #     # ── JWT — Admin ───────────────────────────────────
# #     ADMIN_JWT_SECRET_KEY: str = "admin-change-me-in-production"
# #     ADMIN_JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
# #     ADMIN_SESSION_EXPIRE_HOURS: int = 8
# #     MAX_ADMIN_SESSIONS: int = 2

# #     # ── Admin Seed ────────────────────────────────────
# #     ADMIN_SEED_EMAIL: str = "dhruvinadmin@gmail.com"
# #     ADMIN_SEED_PASSWORD: str = ""
# #     ADMIN_SEED_FULL_NAME: str = "Dhruvin Admin"

# #     # ── Cloudinary ────────────────────────────────────
# #     CLOUDINARY_CLOUD_NAME: str = ""
# #     CLOUDINARY_API_KEY: str = ""
# #     CLOUDINARY_API_SECRET: str = ""
# #     CLOUDINARY_UPLOAD_FOLDER: str = "vastrika/products"

# #     # ── Rate Limiting ─────────────────────────────────
# #     RATE_LIMIT_PER_MINUTE: int = 200     # default; lower in production via .env
# #     AUTH_RATE_LIMIT_PER_MINUTE: int = 20  # login/register endpoints

# #     # ── Business Rules ────────────────────────────────
# #     FREE_SHIPPING_THRESHOLD: int = 999
# #     STANDARD_SHIPPING_CHARGE: int = 99


# # @lru_cache()
# # def get_settings() -> Settings:
# #     """Return cached settings instance."""
# #     return Settings()


# # # Module-level singleton for convenience
# # settings = get_settings()

# """
# app/core/config.py
# Centralised application configuration using Pydantic Settings.
# All values are read from environment variables / .env file.
# """
# from functools import lru_cache
# from typing import List

# from pydantic import computed_field, field_validator
# from pydantic_settings import BaseSettings, SettingsConfigDict


# class Settings(BaseSettings):
#     model_config = SettingsConfigDict(
#         env_file=".env",
#         env_file_encoding="utf-8",
#         case_sensitive=False,
#         extra="ignore",
#     )

#     # ── App ───────────────────────────────────────────
#     APP_NAME: str = "Vastrika"
#     APP_ENV: str = "development"
#     APP_DEBUG: bool = False
#     APP_HOST: str = "0.0.0.0"
#     APP_PORT: int = 8000

#     # ── CORS ──────────────────────────────────────────
#     FRONTEND_URL: str = "http://localhost:5173"
#     ADMIN_FRONTEND_URL: str = "http://localhost:5174"

#     @computed_field  # type: ignore[misc]
#     @property
#     def ALLOWED_ORIGINS(self) -> List[str]:
#         origins = [self.FRONTEND_URL, self.ADMIN_FRONTEND_URL]
#         # Include both localhost and 127.0.0.1 so the browser never hits a
#         # CORS block regardless of which hostname the frontend uses
#         extras = []
#         for o in origins:
#             if "localhost" in o:
#                 extras.append(o.replace("localhost", "127.0.0.1"))
#             elif "127.0.0.1" in o:
#                 extras.append(o.replace("127.0.0.1", "localhost"))
#         return list(dict.fromkeys(origins + extras))

#     # ── Database ──────────────────────────────────────
#     DB_HOST: str = "localhost"
#     DB_PORT: int = 5432
#     DB_NAME: str = "vastrika_db"
#     DB_USER: str = "vastrika_user"
#     DB_PASSWORD: str = ""

#     @computed_field  # type: ignore[misc]
#     @property
#     def DATABASE_URL(self) -> str:
#         return (
#             f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASSWORD}"
#             f"@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
#         )

#     @computed_field  # type: ignore[misc]
#     @property
#     def SYNC_DATABASE_URL(self) -> str:
#         """Used by Alembic migrations (sync psycopg2 driver)."""
#         return (
#             f"postgresql+psycopg2://{self.DB_USER}:{self.DB_PASSWORD}"
#             f"@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
#         )

#     # ── JWT — Customer ────────────────────────────────
#     JWT_SECRET_KEY: str = "change-me-in-production"
#     JWT_ALGORITHM: str = "HS256"
#     JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
#     JWT_REFRESH_TOKEN_EXPIRE_DAYS: int = 7

#     # ── JWT — Admin ───────────────────────────────────
#     ADMIN_JWT_SECRET_KEY: str = "admin-change-me-in-production"
#     ADMIN_JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
#     ADMIN_SESSION_EXPIRE_HOURS: int = 8
#     MAX_ADMIN_SESSIONS: int = 2

#     # ── Admin Seed ────────────────────────────────────
#     ADMIN_SEED_EMAIL: str = "dhruvinadmin@gmail.com"
#     ADMIN_SEED_PASSWORD: str = ""
#     ADMIN_SEED_FULL_NAME: str = "Dhruvin Admin"

#     # ── Cloudinary ────────────────────────────────────
#     CLOUDINARY_CLOUD_NAME: str = ""
#     CLOUDINARY_API_KEY: str = ""
#     CLOUDINARY_API_SECRET: str = ""
#     CLOUDINARY_UPLOAD_FOLDER: str = "vastrika/products"

#     # ── Rate Limiting ─────────────────────────────────
#     RATE_LIMIT_PER_MINUTE: int = 200     # default; lower in production via .env
#     AUTH_RATE_LIMIT_PER_MINUTE: int = 20  # login/register endpoints

#     # ── Business Rules ────────────────────────────────
#     FREE_SHIPPING_THRESHOLD: int = 999
#     STANDARD_SHIPPING_CHARGE: int = 99


# @lru_cache()
# def get_settings() -> Settings:
#     """Return cached settings instance."""
#     return Settings()


# # Module-level singleton for convenience
# settings = get_settings()


"""
app/core/config.py
Centralised application configuration using Pydantic Settings.
All values are read from environment variables / .env file.
"""
from functools import lru_cache
from typing import List

from pydantic import computed_field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # ── App ───────────────────────────────────────────
    APP_NAME: str = "Vastrika"
    APP_ENV: str = "development"
    APP_DEBUG: bool = False
    APP_HOST: str = "0.0.0.0"
    APP_PORT: int = 8000

    # ── CORS ──────────────────────────────────────────
    FRONTEND_URL: str = "http://localhost:5173"
    ADMIN_FRONTEND_URL: str = "http://localhost:5174"

    @computed_field  # type: ignore[misc]
    @property
    def ALLOWED_ORIGINS(self) -> List[str]:
        origins = [self.FRONTEND_URL, self.ADMIN_FRONTEND_URL]
        # Include both localhost and 127.0.0.1 so the browser never hits a
        # CORS block regardless of which hostname the frontend uses
        extras = []
        for o in origins:
            if "localhost" in o:
                extras.append(o.replace("localhost", "127.0.0.1"))
            elif "127.0.0.1" in o:
                extras.append(o.replace("127.0.0.1", "localhost"))
        return list(dict.fromkeys(origins + extras))

    # ── Database ──────────────────────────────────────
    DB_HOST: str = "localhost"
    DB_PORT: int = 5432
    DB_NAME: str = "vastrika_db"
    DB_USER: str = "vastrika_user"
    DB_PASSWORD: str = ""

    @computed_field  # type: ignore[misc]
    @property
    def DATABASE_URL(self) -> str:
        return (
            f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASSWORD}"
            f"@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        )

    @computed_field  # type: ignore[misc]
    @property
    def SYNC_DATABASE_URL(self) -> str:
        """Used by Alembic migrations (sync psycopg2 driver)."""
        return (
            f"postgresql+psycopg2://{self.DB_USER}:{self.DB_PASSWORD}"
            f"@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        )

    # ── JWT — Customer ────────────────────────────────
    JWT_SECRET_KEY: str = "change-me-in-production"
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    JWT_REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # ── JWT — Admin ───────────────────────────────────
    ADMIN_JWT_SECRET_KEY: str = "admin-change-me-in-production"
    ADMIN_JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    ADMIN_SESSION_EXPIRE_HOURS: int = 8
    MAX_ADMIN_SESSIONS: int = 2

    # ── Admin Seed ────────────────────────────────────
    ADMIN_SEED_EMAIL: str = "dhruvinadmin@gmail.com"
    ADMIN_SEED_PASSWORD: str = ""
    ADMIN_SEED_FULL_NAME: str = "Dhruvin Admin"

    # ── Cloudinary ────────────────────────────────────
    CLOUDINARY_CLOUD_NAME: str = ""
    CLOUDINARY_API_KEY: str = ""
    CLOUDINARY_API_SECRET: str = ""
    CLOUDINARY_UPLOAD_FOLDER: str = "vastrika/products"

    # ── Rate Limiting ─────────────────────────────────
    RATE_LIMIT_PER_MINUTE: int = 200     # default; lower in production via .env
    AUTH_RATE_LIMIT_PER_MINUTE: int = 20  # login/register endpoints

    # ── Business Rules ────────────────────────────────
    FREE_SHIPPING_THRESHOLD: int = 999
    STANDARD_SHIPPING_CHARGE: int = 99


@lru_cache()
def get_settings() -> Settings:
    """Return cached settings instance."""
    return Settings()


# Module-level singleton for convenience
settings = get_settings()
