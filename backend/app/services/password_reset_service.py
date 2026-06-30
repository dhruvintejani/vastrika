# # # # # """
# # # # # app/services/password_reset_service.py
# # # # # Forgot-password OTP business logic.
# # # # # """
# # # # # import hashlib
# # # # # import secrets
# # # # # from datetime import datetime, timedelta, timezone

# # # # # from sqlalchemy import delete, select, update
# # # # # from sqlalchemy.ext.asyncio import AsyncSession

# # # # # from app.core.config import settings
# # # # # from app.core.exceptions import BusinessRuleError, UnauthorizedError
# # # # # from app.core.security import hash_password
# # # # # from app.models.password_reset import PasswordResetOTP
# # # # # from app.repositories.token_repository import TokenRepository
# # # # # from app.repositories.user_repository import UserRepository
# # # # # from app.services.email_service import EmailService


# # # # # class PasswordResetService:
# # # # #     def __init__(self, db: AsyncSession):
# # # # #         self.db = db
# # # # #         self.user_repo = UserRepository(db)
# # # # #         self.token_repo = TokenRepository(db)
# # # # #         self.email_service = EmailService()

# # # # #     def _hash_otp(self, user_id: int, email: str, otp: str) -> str:
# # # # #         raw = f"{settings.JWT_SECRET_KEY}:{user_id}:{email.lower()}:{otp}"
# # # # #         return hashlib.sha256(raw.encode()).hexdigest()

# # # # #     def _generate_otp(self) -> str:
# # # # #         return f"{secrets.randbelow(1_000_000):06d}"

# # # # #     def _now(self) -> datetime:
# # # # #         return datetime.now(timezone.utc)

# # # # #     def _as_aware(self, value: datetime) -> datetime:
# # # # #         if value.tzinfo is None:
# # # # #             return value.replace(tzinfo=timezone.utc)
# # # # #         return value

# # # # #     async def request_reset(self, email: str) -> None:
# # # # #         normalized_email = email.strip().lower()
# # # # #         user = await self.user_repo.get_by_email(normalized_email)

# # # # #         if not user or not user.is_active or user.is_blocked:
# # # # #             return

# # # # #         now = self._now()
# # # # #         result = await self.db.execute(
# # # # #             select(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id)
# # # # #         )
# # # # #         existing = result.scalar_one_or_none()

# # # # #         if existing:
# # # # #             requested_at = self._as_aware(existing.requested_at)
# # # # #             cooldown_until = requested_at + timedelta(
# # # # #                 seconds=settings.PASSWORD_RESET_OTP_RESEND_SECONDS
# # # # #             )
# # # # #             if cooldown_until > now:
# # # # #                 return

# # # # #         otp = self._generate_otp()
# # # # #         expires_at = now + timedelta(minutes=settings.PASSWORD_RESET_OTP_EXPIRE_MINUTES)
# # # # #         otp_hash = self._hash_otp(user.id, normalized_email, otp)

# # # # #         if existing:
# # # # #             await self.db.execute(
# # # # #                 update(PasswordResetOTP)
# # # # #                 .where(PasswordResetOTP.user_id == user.id)
# # # # #                 .values(
# # # # #                     otp_hash=otp_hash,
# # # # #                     attempts=0,
# # # # #                     requested_at=now,
# # # # #                     expires_at=expires_at,
# # # # #                     verified_at=None,
# # # # #                 )
# # # # #             )
# # # # #         else:
# # # # #             self.db.add(
# # # # #                 PasswordResetOTP(
# # # # #                     user_id=user.id,
# # # # #                     otp_hash=otp_hash,
# # # # #                     attempts=0,
# # # # #                     requested_at=now,
# # # # #                     expires_at=expires_at,
# # # # #                     verified_at=None,
# # # # #                 )
# # # # #             )

# # # # #         await self.db.flush()
# # # # #         await self.email_service.send_password_reset_otp(
# # # # #             to_email=normalized_email,
# # # # #             to_name=user.full_name,
# # # # #             otp=otp,
# # # # #             expires_minutes=settings.PASSWORD_RESET_OTP_EXPIRE_MINUTES,
# # # # #         )
# # # # #         await self.db.commit()

# # # # #     async def reset_password(self, email: str, otp: str, new_password: str) -> None:
# # # # #         normalized_email = email.strip().lower()
# # # # #         user = await self.user_repo.get_by_email(normalized_email)

# # # # #         if not user or not user.is_active or user.is_blocked:
# # # # #             raise UnauthorizedError("Invalid or expired OTP")

# # # # #         result = await self.db.execute(
# # # # #             select(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id)
# # # # #         )
# # # # #         reset = result.scalar_one_or_none()
# # # # #         if not reset:
# # # # #             raise UnauthorizedError("Invalid or expired OTP")

# # # # #         now = self._now()
# # # # #         expires_at = self._as_aware(reset.expires_at)

# # # # #         if reset.verified_at is not None or expires_at <= now:
# # # # #             await self.db.execute(delete(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id))
# # # # #             await self.db.commit()
# # # # #             raise UnauthorizedError("Invalid or expired OTP")

# # # # #         if reset.attempts >= settings.PASSWORD_RESET_OTP_MAX_ATTEMPTS:
# # # # #             await self.db.execute(delete(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id))
# # # # #             await self.db.commit()
# # # # #             raise BusinessRuleError("Too many incorrect OTP attempts. Please request a new OTP.")

# # # # #         expected_hash = self._hash_otp(user.id, normalized_email, otp)
# # # # #         if not secrets.compare_digest(reset.otp_hash, expected_hash):
# # # # #             await self.db.execute(
# # # # #                 update(PasswordResetOTP)
# # # # #                 .where(PasswordResetOTP.user_id == user.id)
# # # # #                 .values(attempts=PasswordResetOTP.attempts + 1)
# # # # #             )
# # # # #             await self.db.commit()
# # # # #             raise UnauthorizedError("Invalid or expired OTP")

# # # # #         await self.user_repo.update_password(user.id, hash_password(new_password))
# # # # #         await self.token_repo.revoke_all_for_user(user.id)
# # # # #         await self.db.execute(delete(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id))
# # # # #         await self.db.commit()


# # # # """
# # # # app/services/password_reset_service.py
# # # # Forgot-password OTP business logic.
# # # # """
# # # # import hashlib
# # # # import secrets
# # # # from datetime import datetime, timedelta, timezone

# # # # from sqlalchemy import delete, select, update
# # # # from sqlalchemy.ext.asyncio import AsyncSession

# # # # from app.core.config import settings
# # # # from app.core.exceptions import BusinessRuleError, UnauthorizedError
# # # # from app.core.security import hash_password
# # # # from app.models.password_reset import PasswordResetOTP
# # # # from app.repositories.token_repository import TokenRepository
# # # # from app.repositories.user_repository import UserRepository
# # # # from app.services.email_service import EmailService


# # # # class PasswordResetService:
# # # #     def __init__(self, db: AsyncSession):
# # # #         self.db = db
# # # #         self.user_repo = UserRepository(db)
# # # #         self.token_repo = TokenRepository(db)
# # # #         self.email_service = EmailService()

# # # #     def _hash_otp(self, user_id: int, email: str, otp: str) -> str:
# # # #         raw = f"{settings.JWT_SECRET_KEY}:{user_id}:{email.lower()}:{otp}"
# # # #         return hashlib.sha256(raw.encode()).hexdigest()

# # # #     def _generate_otp(self) -> str:
# # # #         return f"{secrets.randbelow(1_000_000):06d}"

# # # #     def _now(self) -> datetime:
# # # #         return datetime.now(timezone.utc)

# # # #     def _as_aware(self, value: datetime) -> datetime:
# # # #         if value.tzinfo is None:
# # # #             return value.replace(tzinfo=timezone.utc)
# # # #         return value

# # # #     async def request_reset(self, email: str) -> None:
# # # #         normalized_email = email.strip().lower()
# # # #         user = await self.user_repo.get_by_email(normalized_email)

# # # #         if not user or not user.is_active or user.is_blocked:
# # # #             return

# # # #         now = self._now()
# # # #         result = await self.db.execute(
# # # #             select(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id)
# # # #         )
# # # #         existing = result.scalar_one_or_none()

# # # #         if existing:
# # # #             requested_at = self._as_aware(existing.requested_at)
# # # #             cooldown_until = requested_at + timedelta(
# # # #                 seconds=settings.PASSWORD_RESET_OTP_RESEND_SECONDS
# # # #             )
# # # #             if cooldown_until > now:
# # # #                 return

# # # #         otp = self._generate_otp()
# # # #         expires_at = now + timedelta(minutes=settings.PASSWORD_RESET_OTP_EXPIRE_MINUTES)
# # # #         otp_hash = self._hash_otp(user.id, normalized_email, otp)

# # # #         if existing:
# # # #             await self.db.execute(
# # # #                 update(PasswordResetOTP)
# # # #                 .where(PasswordResetOTP.user_id == user.id)
# # # #                 .values(
# # # #                     otp_hash=otp_hash,
# # # #                     attempts=0,
# # # #                     requested_at=now,
# # # #                     expires_at=expires_at,
# # # #                     verified_at=None,
# # # #                 )
# # # #             )
# # # #         else:
# # # #             self.db.add(
# # # #                 PasswordResetOTP(
# # # #                     user_id=user.id,
# # # #                     otp_hash=otp_hash,
# # # #                     attempts=0,
# # # #                     requested_at=now,
# # # #                     expires_at=expires_at,
# # # #                     verified_at=None,
# # # #                 )
# # # #             )

# # # #         await self.db.flush()
# # # #         await self.email_service.send_password_reset_otp(
# # # #             to_email=normalized_email,
# # # #             to_name=user.full_name,
# # # #             otp=otp,
# # # #             expires_minutes=settings.PASSWORD_RESET_OTP_EXPIRE_MINUTES,
# # # #         )
# # # #         await self.db.commit()

# # # #     async def reset_password(self, email: str, otp: str, new_password: str) -> None:
# # # #         normalized_email = email.strip().lower()
# # # #         user = await self.user_repo.get_by_email(normalized_email)

# # # #         if not user or not user.is_active or user.is_blocked:
# # # #             raise UnauthorizedError("Invalid or expired OTP")

# # # #         result = await self.db.execute(
# # # #             select(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id)
# # # #         )
# # # #         reset = result.scalar_one_or_none()
# # # #         if not reset:
# # # #             raise UnauthorizedError("Invalid or expired OTP")

# # # #         now = self._now()
# # # #         expires_at = self._as_aware(reset.expires_at)

# # # #         if reset.verified_at is not None or expires_at <= now:
# # # #             await self.db.execute(delete(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id))
# # # #             await self.db.commit()
# # # #             raise UnauthorizedError("Invalid or expired OTP")

# # # #         if reset.attempts >= settings.PASSWORD_RESET_OTP_MAX_ATTEMPTS:
# # # #             await self.db.execute(delete(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id))
# # # #             await self.db.commit()
# # # #             raise BusinessRuleError("Too many incorrect OTP attempts. Please request a new OTP.")

# # # #         expected_hash = self._hash_otp(user.id, normalized_email, otp)
# # # #         if not secrets.compare_digest(reset.otp_hash, expected_hash):
# # # #             await self.db.execute(
# # # #                 update(PasswordResetOTP)
# # # #                 .where(PasswordResetOTP.user_id == user.id)
# # # #                 .values(attempts=PasswordResetOTP.attempts + 1)
# # # #             )
# # # #             await self.db.commit()
# # # #             raise UnauthorizedError("Invalid or expired OTP")

# # # #         await self.user_repo.update_password(user.id, hash_password(new_password))
# # # #         await self.token_repo.revoke_all_for_user(user.id)
# # # #         await self.db.execute(delete(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id))
# # # #         await self.db.commit()


# # # """
# # # app/services/password_reset_service.py
# # # Forgot-password OTP business logic.
# # # """
# # # import hashlib
# # # import secrets
# # # from datetime import datetime, timedelta, timezone

# # # from sqlalchemy import delete, select, update
# # # from sqlalchemy.ext.asyncio import AsyncSession

# # # from app.core.config import settings
# # # from app.core.exceptions import BusinessRuleError, UnauthorizedError
# # # from app.core.security import hash_password
# # # from app.models.password_reset import PasswordResetOTP
# # # from app.repositories.token_repository import TokenRepository
# # # from app.repositories.user_repository import UserRepository
# # # from app.services.email_service import EmailService


# # # class PasswordResetService:
# # #     def __init__(self, db: AsyncSession):
# # #         self.db = db
# # #         self.user_repo = UserRepository(db)
# # #         self.token_repo = TokenRepository(db)
# # #         self.email_service = EmailService()

# # #     def _hash_otp(self, user_id: int, email: str, otp: str) -> str:
# # #         raw = f"{settings.JWT_SECRET_KEY}:{user_id}:{email.lower()}:{otp}"
# # #         return hashlib.sha256(raw.encode()).hexdigest()

# # #     def _generate_otp(self) -> str:
# # #         return f"{secrets.randbelow(1_000_000):06d}"

# # #     def _now(self) -> datetime:
# # #         return datetime.now(timezone.utc)

# # #     def _as_aware(self, value: datetime) -> datetime:
# # #         if value.tzinfo is None:
# # #             return value.replace(tzinfo=timezone.utc)
# # #         return value

# # #     async def request_reset(self, email: str) -> None:
# # #         normalized_email = email.strip().lower()
# # #         user = await self.user_repo.get_by_email(normalized_email)

# # #         if not user or not user.is_active or user.is_blocked:
# # #             return

# # #         now = self._now()
# # #         result = await self.db.execute(
# # #             select(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id)
# # #         )
# # #         existing = result.scalar_one_or_none()

# # #         if existing:
# # #             requested_at = self._as_aware(existing.requested_at)
# # #             cooldown_until = requested_at + timedelta(
# # #                 seconds=settings.PASSWORD_RESET_OTP_RESEND_SECONDS
# # #             )
# # #             if cooldown_until > now:
# # #                 return

# # #         otp = self._generate_otp()
# # #         expires_at = now + timedelta(minutes=settings.PASSWORD_RESET_OTP_EXPIRE_MINUTES)
# # #         otp_hash = self._hash_otp(user.id, normalized_email, otp)

# # #         if existing:
# # #             await self.db.execute(
# # #                 update(PasswordResetOTP)
# # #                 .where(PasswordResetOTP.user_id == user.id)
# # #                 .values(
# # #                     otp_hash=otp_hash,
# # #                     attempts=0,
# # #                     requested_at=now,
# # #                     expires_at=expires_at,
# # #                     verified_at=None,
# # #                 )
# # #             )
# # #         else:
# # #             self.db.add(
# # #                 PasswordResetOTP(
# # #                     user_id=user.id,
# # #                     otp_hash=otp_hash,
# # #                     attempts=0,
# # #                     requested_at=now,
# # #                     expires_at=expires_at,
# # #                     verified_at=None,
# # #                 )
# # #             )

# # #         await self.db.flush()
# # #         await self.email_service.send_password_reset_otp(
# # #             to_email=normalized_email,
# # #             to_name=user.full_name,
# # #             otp=otp,
# # #             expires_minutes=settings.PASSWORD_RESET_OTP_EXPIRE_MINUTES,
# # #         )
# # #         await self.db.commit()

# # #     async def reset_password(self, email: str, otp: str, new_password: str) -> None:
# # #         normalized_email = email.strip().lower()
# # #         user = await self.user_repo.get_by_email(normalized_email)

# # #         if not user or not user.is_active or user.is_blocked:
# # #             raise UnauthorizedError("Invalid or expired OTP")

# # #         result = await self.db.execute(
# # #             select(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id)
# # #         )
# # #         reset = result.scalar_one_or_none()
# # #         if not reset:
# # #             raise UnauthorizedError("Invalid or expired OTP")

# # #         now = self._now()
# # #         expires_at = self._as_aware(reset.expires_at)

# # #         if reset.verified_at is not None or expires_at <= now:
# # #             await self.db.execute(delete(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id))
# # #             await self.db.commit()
# # #             raise UnauthorizedError("Invalid or expired OTP")

# # #         if reset.attempts >= settings.PASSWORD_RESET_OTP_MAX_ATTEMPTS:
# # #             await self.db.execute(delete(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id))
# # #             await self.db.commit()
# # #             raise BusinessRuleError("Too many incorrect OTP attempts. Please request a new OTP.")

# # #         expected_hash = self._hash_otp(user.id, normalized_email, otp)
# # #         if not secrets.compare_digest(reset.otp_hash, expected_hash):
# # #             await self.db.execute(
# # #                 update(PasswordResetOTP)
# # #                 .where(PasswordResetOTP.user_id == user.id)
# # #                 .values(attempts=PasswordResetOTP.attempts + 1)
# # #             )
# # #             await self.db.commit()
# # #             raise UnauthorizedError("Invalid or expired OTP")

# # #         await self.user_repo.update_password(user.id, hash_password(new_password))
# # #         await self.token_repo.revoke_all_for_user(user.id)
# # #         await self.db.execute(delete(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id))
# # #         await self.db.commit()


# # """
# # app/services/password_reset_service.py
# # Forgot-password OTP business logic.
# # """
# # import hashlib
# # import secrets
# # from datetime import datetime, timedelta, timezone

# # from sqlalchemy import delete, select, update
# # from sqlalchemy.ext.asyncio import AsyncSession

# # from app.core.config import settings
# # from app.core.exceptions import BusinessRuleError, UnauthorizedError
# # from app.core.security import hash_password
# # from app.models.password_reset import PasswordResetOTP
# # from app.repositories.token_repository import TokenRepository
# # from app.repositories.user_repository import UserRepository
# # from app.services.email_service import EmailService


# # class PasswordResetService:
# #     def __init__(self, db: AsyncSession):
# #         self.db = db
# #         self.user_repo = UserRepository(db)
# #         self.token_repo = TokenRepository(db)
# #         self.email_service = EmailService()

# #     def _hash_otp(self, user_id: int, email: str, otp: str) -> str:
# #         raw = f"{settings.JWT_SECRET_KEY}:{user_id}:{email.lower()}:{otp}"
# #         return hashlib.sha256(raw.encode()).hexdigest()

# #     def _generate_otp(self) -> str:
# #         return f"{secrets.randbelow(1_000_000):06d}"

# #     def _now(self) -> datetime:
# #         return datetime.now(timezone.utc)

# #     def _as_aware(self, value: datetime) -> datetime:
# #         if value.tzinfo is None:
# #             return value.replace(tzinfo=timezone.utc)
# #         return value

# #     async def request_reset(self, email: str) -> None:
# #         normalized_email = email.strip().lower()
# #         user = await self.user_repo.get_by_email(normalized_email)

# #         if not user or not user.is_active or user.is_blocked:
# #             return

# #         now = self._now()
# #         result = await self.db.execute(
# #             select(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id)
# #         )
# #         existing = result.scalar_one_or_none()

# #         if existing:
# #             requested_at = self._as_aware(existing.requested_at)
# #             cooldown_until = requested_at + timedelta(
# #                 seconds=settings.PASSWORD_RESET_OTP_RESEND_SECONDS
# #             )
# #             if cooldown_until > now:
# #                 return

# #         otp = self._generate_otp()
# #         expires_at = now + timedelta(minutes=settings.PASSWORD_RESET_OTP_EXPIRE_MINUTES)
# #         otp_hash = self._hash_otp(user.id, normalized_email, otp)

# #         if existing:
# #             await self.db.execute(
# #                 update(PasswordResetOTP)
# #                 .where(PasswordResetOTP.user_id == user.id)
# #                 .values(
# #                     otp_hash=otp_hash,
# #                     attempts=0,
# #                     requested_at=now,
# #                     expires_at=expires_at,
# #                     verified_at=None,
# #                 )
# #             )
# #         else:
# #             self.db.add(
# #                 PasswordResetOTP(
# #                     user_id=user.id,
# #                     otp_hash=otp_hash,
# #                     attempts=0,
# #                     requested_at=now,
# #                     expires_at=expires_at,
# #                     verified_at=None,
# #                 )
# #             )

# #         await self.db.flush()
# #         await self.email_service.send_password_reset_otp(
# #             to_email=normalized_email,
# #             to_name=user.full_name,
# #             otp=otp,
# #             expires_minutes=settings.PASSWORD_RESET_OTP_EXPIRE_MINUTES,
# #         )
# #         await self.db.commit()

# #     async def reset_password(self, email: str, otp: str, new_password: str) -> None:
# #         normalized_email = email.strip().lower()
# #         user = await self.user_repo.get_by_email(normalized_email)

# #         if not user or not user.is_active or user.is_blocked:
# #             raise UnauthorizedError("Invalid or expired OTP")

# #         result = await self.db.execute(
# #             select(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id)
# #         )
# #         reset = result.scalar_one_or_none()
# #         if not reset:
# #             raise UnauthorizedError("Invalid or expired OTP")

# #         now = self._now()
# #         expires_at = self._as_aware(reset.expires_at)

# #         if reset.verified_at is not None or expires_at <= now:
# #             await self.db.execute(delete(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id))
# #             await self.db.commit()
# #             raise UnauthorizedError("Invalid or expired OTP")

# #         if reset.attempts >= settings.PASSWORD_RESET_OTP_MAX_ATTEMPTS:
# #             await self.db.execute(delete(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id))
# #             await self.db.commit()
# #             raise BusinessRuleError("Too many incorrect OTP attempts. Please request a new OTP.")

# #         expected_hash = self._hash_otp(user.id, normalized_email, otp)
# #         if not secrets.compare_digest(reset.otp_hash, expected_hash):
# #             await self.db.execute(
# #                 update(PasswordResetOTP)
# #                 .where(PasswordResetOTP.user_id == user.id)
# #                 .values(attempts=PasswordResetOTP.attempts + 1)
# #             )
# #             await self.db.commit()
# #             raise UnauthorizedError("Invalid or expired OTP")

# #         await self.user_repo.update_password(user.id, hash_password(new_password))
# #         await self.token_repo.revoke_all_for_user(user.id)
# #         await self.db.execute(delete(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id))
# #         await self.db.commit()


# """
# app/services/password_reset_service.py
# Forgot-password OTP business logic.
# """
# import hashlib
# import secrets
# from datetime import datetime, timedelta, timezone

# from sqlalchemy import delete, select, update
# from sqlalchemy.ext.asyncio import AsyncSession

# from app.core.config import settings
# from app.core.exceptions import BusinessRuleError, UnauthorizedError
# from app.core.security import hash_password
# from app.models.password_reset import PasswordResetOTP
# from app.repositories.token_repository import TokenRepository
# from app.repositories.user_repository import UserRepository
# from app.services.email_service import EmailService


# class PasswordResetService:
#     def __init__(self, db: AsyncSession):
#         self.db = db
#         self.user_repo = UserRepository(db)
#         self.token_repo = TokenRepository(db)
#         self.email_service = EmailService()

#     def _hash_otp(self, user_id: int, email: str, otp: str) -> str:
#         raw = f"{settings.JWT_SECRET_KEY}:{user_id}:{email.lower()}:{otp}"
#         return hashlib.sha256(raw.encode()).hexdigest()

#     def _generate_otp(self) -> str:
#         return f"{secrets.randbelow(1_000_000):06d}"

#     def _now(self) -> datetime:
#         return datetime.now(timezone.utc)

#     def _as_aware(self, value: datetime) -> datetime:
#         if value.tzinfo is None:
#             return value.replace(tzinfo=timezone.utc)
#         return value

#     async def request_reset(self, email: str) -> None:
#         normalized_email = email.strip().lower()
#         user = await self.user_repo.get_by_email(normalized_email)

#         if not user or not user.is_active or user.is_blocked:
#             return

#         now = self._now()
#         result = await self.db.execute(
#             select(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id)
#         )
#         existing = result.scalar_one_or_none()

#         if existing:
#             requested_at = self._as_aware(existing.requested_at)
#             cooldown_until = requested_at + timedelta(
#                 seconds=settings.PASSWORD_RESET_OTP_RESEND_SECONDS
#             )
#             if cooldown_until > now:
#                 return

#         otp = self._generate_otp()
#         expires_at = now + timedelta(minutes=settings.PASSWORD_RESET_OTP_EXPIRE_MINUTES)
#         otp_hash = self._hash_otp(user.id, normalized_email, otp)

#         if existing:
#             await self.db.execute(
#                 update(PasswordResetOTP)
#                 .where(PasswordResetOTP.user_id == user.id)
#                 .values(
#                     otp_hash=otp_hash,
#                     attempts=0,
#                     requested_at=now,
#                     expires_at=expires_at,
#                     verified_at=None,
#                 )
#             )
#         else:
#             self.db.add(
#                 PasswordResetOTP(
#                     user_id=user.id,
#                     otp_hash=otp_hash,
#                     attempts=0,
#                     requested_at=now,
#                     expires_at=expires_at,
#                     verified_at=None,
#                 )
#             )

#         await self.db.flush()
#         await self.email_service.send_password_reset_otp(
#             to_email=normalized_email,
#             to_name=user.full_name,
#             otp=otp,
#             expires_minutes=settings.PASSWORD_RESET_OTP_EXPIRE_MINUTES,
#         )
#         await self.db.commit()

#     async def reset_password(self, email: str, otp: str, new_password: str) -> None:
#         normalized_email = email.strip().lower()
#         user = await self.user_repo.get_by_email(normalized_email)

#         if not user or not user.is_active or user.is_blocked:
#             raise UnauthorizedError("Invalid or expired OTP")

#         result = await self.db.execute(
#             select(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id)
#         )
#         reset = result.scalar_one_or_none()
#         if not reset:
#             raise UnauthorizedError("Invalid or expired OTP")

#         now = self._now()
#         expires_at = self._as_aware(reset.expires_at)

#         if reset.verified_at is not None or expires_at <= now:
#             await self.db.execute(delete(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id))
#             await self.db.commit()
#             raise UnauthorizedError("Invalid or expired OTP")

#         if reset.attempts >= settings.PASSWORD_RESET_OTP_MAX_ATTEMPTS:
#             await self.db.execute(delete(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id))
#             await self.db.commit()
#             raise BusinessRuleError("Too many incorrect OTP attempts. Please request a new OTP.")

#         expected_hash = self._hash_otp(user.id, normalized_email, otp)
#         if not secrets.compare_digest(reset.otp_hash, expected_hash):
#             await self.db.execute(
#                 update(PasswordResetOTP)
#                 .where(PasswordResetOTP.user_id == user.id)
#                 .values(attempts=PasswordResetOTP.attempts + 1)
#             )
#             await self.db.commit()
#             raise UnauthorizedError("Invalid or expired OTP")

#         await self.user_repo.update_password(user.id, hash_password(new_password))
#         await self.token_repo.revoke_all_for_user(user.id)
#         await self.db.execute(delete(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id))
#         await self.db.commit()


"""
app/services/password_reset_service.py
Forgot-password OTP business logic.
"""
import hashlib
import secrets
from datetime import datetime, timedelta, timezone

from sqlalchemy import delete, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.exceptions import BusinessRuleError, UnauthorizedError
from app.core.security import hash_password
from app.models.password_reset import PasswordResetOTP
from app.repositories.token_repository import TokenRepository
from app.repositories.user_repository import UserRepository
from app.services.email_service import EmailService


class PasswordResetService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.user_repo = UserRepository(db)
        self.token_repo = TokenRepository(db)
        self.email_service = EmailService()

    def _hash_otp(self, user_id: int, email: str, otp: str) -> str:
        raw = f"{settings.JWT_SECRET_KEY}:{user_id}:{email.lower()}:{otp}"
        return hashlib.sha256(raw.encode()).hexdigest()

    def _generate_otp(self) -> str:
        return f"{secrets.randbelow(1_000_000):06d}"

    def _now(self) -> datetime:
        return datetime.now(timezone.utc)

    def _as_aware(self, value: datetime) -> datetime:
        if value.tzinfo is None:
            return value.replace(tzinfo=timezone.utc)
        return value

    async def request_reset(self, email: str) -> None:
        normalized_email = email.strip().lower()
        user = await self.user_repo.get_by_email(normalized_email)

        if not user or not user.is_active or user.is_blocked:
            return

        now = self._now()
        result = await self.db.execute(
            select(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id)
        )
        existing = result.scalar_one_or_none()

        if existing:
            requested_at = self._as_aware(existing.requested_at)
            cooldown_until = requested_at + timedelta(
                seconds=settings.PASSWORD_RESET_OTP_RESEND_SECONDS
            )
            if cooldown_until > now:
                return

        otp = self._generate_otp()
        expires_at = now + timedelta(minutes=settings.PASSWORD_RESET_OTP_EXPIRE_MINUTES)
        otp_hash = self._hash_otp(user.id, normalized_email, otp)

        if existing:
            await self.db.execute(
                update(PasswordResetOTP)
                .where(PasswordResetOTP.user_id == user.id)
                .values(
                    otp_hash=otp_hash,
                    attempts=0,
                    requested_at=now,
                    expires_at=expires_at,
                    verified_at=None,
                )
            )
        else:
            self.db.add(
                PasswordResetOTP(
                    user_id=user.id,
                    otp_hash=otp_hash,
                    attempts=0,
                    requested_at=now,
                    expires_at=expires_at,
                    verified_at=None,
                )
            )

        await self.db.flush()
        await self.email_service.send_password_reset_otp(
            to_email=normalized_email,
            to_name=user.full_name,
            otp=otp,
            expires_minutes=settings.PASSWORD_RESET_OTP_EXPIRE_MINUTES,
        )
        await self.db.commit()

    async def _get_valid_reset(self, email: str, otp: str) -> tuple[object, PasswordResetOTP]:
        normalized_email = email.strip().lower()
        user = await self.user_repo.get_by_email(normalized_email)

        if not user or not user.is_active or user.is_blocked:
            raise UnauthorizedError("Invalid or expired OTP")

        result = await self.db.execute(
            select(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id)
        )
        reset = result.scalar_one_or_none()
        if not reset:
            raise UnauthorizedError("Invalid or expired OTP")

        now = self._now()
        expires_at = self._as_aware(reset.expires_at)

        if reset.verified_at is not None or expires_at <= now:
            await self.db.execute(delete(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id))
            await self.db.commit()
            raise UnauthorizedError("Invalid or expired OTP")

        if reset.attempts >= settings.PASSWORD_RESET_OTP_MAX_ATTEMPTS:
            await self.db.execute(delete(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id))
            await self.db.commit()
            raise BusinessRuleError("Too many incorrect OTP attempts. Please request a new OTP.")

        expected_hash = self._hash_otp(user.id, normalized_email, otp)
        if not secrets.compare_digest(reset.otp_hash, expected_hash):
            await self.db.execute(
                update(PasswordResetOTP)
                .where(PasswordResetOTP.user_id == user.id)
                .values(attempts=PasswordResetOTP.attempts + 1)
            )
            await self.db.commit()
            raise UnauthorizedError("Invalid or expired OTP")

        return user, reset

    async def verify_otp(self, email: str, otp: str) -> None:
        await self._get_valid_reset(email, otp)

    async def reset_password(self, email: str, otp: str, new_password: str) -> None:
        user, _reset = await self._get_valid_reset(email, otp)

        await self.user_repo.update_password(user.id, hash_password(new_password))
        await self.token_repo.revoke_all_for_user(user.id)
        await self.db.execute(delete(PasswordResetOTP).where(PasswordResetOTP.user_id == user.id))
        await self.db.commit()
