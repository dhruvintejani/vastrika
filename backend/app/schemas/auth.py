# # # # # # """
# # # # # # app/schemas/auth.py
# # # # # # Pydantic schemas for authentication endpoints.
# # # # # # """
# # # # # # from typing import Optional

# # # # # # from pydantic import BaseModel, EmailStr, Field, field_validator


# # # # # # class UserRegisterRequest(BaseModel):
# # # # # #     email: EmailStr
# # # # # #     password: str = Field(min_length=8, max_length=128)
# # # # # #     full_name: str = Field(min_length=2, max_length=255)
# # # # # #     phone: Optional[str] = Field(default=None, max_length=20)

# # # # # #     @field_validator("password")
# # # # # #     @classmethod
# # # # # #     def password_strength(cls, v: str) -> str:
# # # # # #         if not any(c.isupper() for c in v):
# # # # # #             raise ValueError("Password must contain at least one uppercase letter")
# # # # # #         if not any(c.isdigit() for c in v):
# # # # # #             raise ValueError("Password must contain at least one digit")
# # # # # #         return v


# # # # # # class UserLoginRequest(BaseModel):
# # # # # #     email: EmailStr
# # # # # #     password: str


# # # # # # class ChangePasswordRequest(BaseModel):
# # # # # #     current_password: str
# # # # # #     new_password: str = Field(min_length=8, max_length=128)

# # # # # #     @field_validator("new_password")
# # # # # #     @classmethod
# # # # # #     def password_strength(cls, v: str) -> str:
# # # # # #         if not any(c.isupper() for c in v):
# # # # # #             raise ValueError("Password must contain at least one uppercase letter")
# # # # # #         if not any(c.isdigit() for c in v):
# # # # # #             raise ValueError("Password must contain at least one digit")
# # # # # #         return v


# # # # # # class TokenResponse(BaseModel):
# # # # # #     access_token: str
# # # # # #     refresh_token: str
# # # # # #     token_type: str = "bearer"


# # # # # # class AccessTokenResponse(BaseModel):
# # # # # #     access_token: str
# # # # # #     token_type: str = "bearer"


# # # # # # class RefreshTokenRequest(BaseModel):
# # # # # #     refresh_token: str


# # # # # # class AdminLoginRequest(BaseModel):
# # # # # #     email: EmailStr
# # # # # #     password: str


# # # # # # class AdminTokenResponse(BaseModel):
# # # # # #     access_token: str
# # # # # #     token_type: str = "bearer"

# # # # # """
# # # # # app/schemas/auth.py
# # # # # Pydantic schemas for authentication endpoints.
# # # # # """
# # # # # from typing import Optional

# # # # # from pydantic import BaseModel, EmailStr, Field, field_validator


# # # # # def validate_password_strength(value: str) -> str:
# # # # #     if not any(char.isupper() for char in value):
# # # # #         raise ValueError("Password must contain at least one uppercase letter")
# # # # #     if not any(char.isdigit() for char in value):
# # # # #         raise ValueError("Password must contain at least one digit")
# # # # #     return value


# # # # # class UserRegisterRequest(BaseModel):
# # # # #     email: EmailStr
# # # # #     password: str = Field(min_length=8, max_length=128)
# # # # #     full_name: str = Field(min_length=2, max_length=255)
# # # # #     phone: Optional[str] = Field(default=None, max_length=20)

# # # # #     @field_validator("password")
# # # # #     @classmethod
# # # # #     def password_strength(cls, value: str) -> str:
# # # # #         return validate_password_strength(value)


# # # # # class UserLoginRequest(BaseModel):
# # # # #     email: EmailStr
# # # # #     password: str


# # # # # class ChangePasswordRequest(BaseModel):
# # # # #     current_password: str
# # # # #     new_password: str = Field(min_length=8, max_length=128)

# # # # #     @field_validator("new_password")
# # # # #     @classmethod
# # # # #     def password_strength(cls, value: str) -> str:
# # # # #         return validate_password_strength(value)


# # # # # class ForgotPasswordRequest(BaseModel):
# # # # #     email: EmailStr


# # # # # class ResetPasswordRequest(BaseModel):
# # # # #     email: EmailStr
# # # # #     otp: str = Field(min_length=6, max_length=6)
# # # # #     new_password: str = Field(min_length=8, max_length=128)

# # # # #     @field_validator("otp")
# # # # #     @classmethod
# # # # #     def otp_digits_only(cls, value: str) -> str:
# # # # #         if not value.isdigit():
# # # # #             raise ValueError("OTP must contain only digits")
# # # # #         return value

# # # # #     @field_validator("new_password")
# # # # #     @classmethod
# # # # #     def password_strength(cls, value: str) -> str:
# # # # #         return validate_password_strength(value)


# # # # # class TokenResponse(BaseModel):
# # # # #     access_token: str
# # # # #     refresh_token: str
# # # # #     token_type: str = "bearer"


# # # # # class AccessTokenResponse(BaseModel):
# # # # #     access_token: str
# # # # #     token_type: str = "bearer"


# # # # # class RefreshTokenRequest(BaseModel):
# # # # #     refresh_token: str


# # # # # class AdminLoginRequest(BaseModel):
# # # # #     email: EmailStr
# # # # #     password: str


# # # # # class AdminTokenResponse(BaseModel):
# # # # #     access_token: str
# # # # #     token_type: str = "bearer"


# # # # """
# # # # app/schemas/auth.py
# # # # Pydantic schemas for authentication endpoints.
# # # # """
# # # # from typing import Optional

# # # # from pydantic import BaseModel, EmailStr, Field, field_validator


# # # # def validate_password_strength(value: str) -> str:
# # # #     if not any(char.isupper() for char in value):
# # # #         raise ValueError("Password must contain at least one uppercase letter")
# # # #     if not any(char.isdigit() for char in value):
# # # #         raise ValueError("Password must contain at least one digit")
# # # #     return value


# # # # class UserRegisterRequest(BaseModel):
# # # #     email: EmailStr
# # # #     password: str = Field(min_length=8, max_length=128)
# # # #     full_name: str = Field(min_length=2, max_length=255)
# # # #     phone: Optional[str] = Field(default=None, max_length=20)

# # # #     @field_validator("password")
# # # #     @classmethod
# # # #     def password_strength(cls, value: str) -> str:
# # # #         return validate_password_strength(value)


# # # # class UserLoginRequest(BaseModel):
# # # #     email: EmailStr
# # # #     password: str


# # # # class ChangePasswordRequest(BaseModel):
# # # #     current_password: str
# # # #     new_password: str = Field(min_length=8, max_length=128)

# # # #     @field_validator("new_password")
# # # #     @classmethod
# # # #     def password_strength(cls, value: str) -> str:
# # # #         return validate_password_strength(value)


# # # # class ForgotPasswordRequest(BaseModel):
# # # #     email: EmailStr


# # # # class ResetPasswordRequest(BaseModel):
# # # #     email: EmailStr
# # # #     otp: str = Field(min_length=6, max_length=6)
# # # #     new_password: str = Field(min_length=8, max_length=128)

# # # #     @field_validator("otp")
# # # #     @classmethod
# # # #     def otp_digits_only(cls, value: str) -> str:
# # # #         if not value.isdigit():
# # # #             raise ValueError("OTP must contain only digits")
# # # #         return value

# # # #     @field_validator("new_password")
# # # #     @classmethod
# # # #     def password_strength(cls, value: str) -> str:
# # # #         return validate_password_strength(value)


# # # # class TokenResponse(BaseModel):
# # # #     access_token: str
# # # #     refresh_token: str
# # # #     token_type: str = "bearer"


# # # # class AccessTokenResponse(BaseModel):
# # # #     access_token: str
# # # #     token_type: str = "bearer"


# # # # class RefreshTokenRequest(BaseModel):
# # # #     refresh_token: str


# # # # class AdminLoginRequest(BaseModel):
# # # #     email: EmailStr
# # # #     password: str


# # # # class AdminTokenResponse(BaseModel):
# # # #     access_token: str
# # # #     token_type: str = "bearer"


# # # """
# # # app/schemas/auth.py
# # # Pydantic schemas for authentication endpoints.
# # # """
# # # from typing import Optional

# # # from pydantic import BaseModel, EmailStr, Field, field_validator


# # # def validate_password_strength(value: str) -> str:
# # #     if not any(char.isupper() for char in value):
# # #         raise ValueError("Password must contain at least one uppercase letter")
# # #     if not any(char.isdigit() for char in value):
# # #         raise ValueError("Password must contain at least one digit")
# # #     return value


# # # class UserRegisterRequest(BaseModel):
# # #     email: EmailStr
# # #     password: str = Field(min_length=8, max_length=128)
# # #     full_name: str = Field(min_length=2, max_length=255)
# # #     phone: Optional[str] = Field(default=None, max_length=20)

# # #     @field_validator("password")
# # #     @classmethod
# # #     def password_strength(cls, value: str) -> str:
# # #         return validate_password_strength(value)


# # # class UserLoginRequest(BaseModel):
# # #     email: EmailStr
# # #     password: str


# # # class ChangePasswordRequest(BaseModel):
# # #     current_password: str
# # #     new_password: str = Field(min_length=8, max_length=128)

# # #     @field_validator("new_password")
# # #     @classmethod
# # #     def password_strength(cls, value: str) -> str:
# # #         return validate_password_strength(value)


# # # class ForgotPasswordRequest(BaseModel):
# # #     email: EmailStr


# # # class ResetPasswordRequest(BaseModel):
# # #     email: EmailStr
# # #     otp: str = Field(min_length=6, max_length=6)
# # #     new_password: str = Field(min_length=8, max_length=128)

# # #     @field_validator("otp")
# # #     @classmethod
# # #     def otp_digits_only(cls, value: str) -> str:
# # #         if not value.isdigit():
# # #             raise ValueError("OTP must contain only digits")
# # #         return value

# # #     @field_validator("new_password")
# # #     @classmethod
# # #     def password_strength(cls, value: str) -> str:
# # #         return validate_password_strength(value)


# # # class TokenResponse(BaseModel):
# # #     access_token: str
# # #     refresh_token: str
# # #     token_type: str = "bearer"


# # # class AccessTokenResponse(BaseModel):
# # #     access_token: str
# # #     token_type: str = "bearer"


# # # class RefreshTokenRequest(BaseModel):
# # #     refresh_token: str


# # # class AdminLoginRequest(BaseModel):
# # #     email: EmailStr
# # #     password: str


# # # class AdminTokenResponse(BaseModel):
# # #     access_token: str
# # #     token_type: str = "bearer"


# # """
# # app/schemas/auth.py
# # Pydantic schemas for authentication endpoints.
# # """
# # from typing import Optional

# # from pydantic import BaseModel, EmailStr, Field, field_validator


# # def validate_password_strength(value: str) -> str:
# #     if not any(char.isupper() for char in value):
# #         raise ValueError("Password must contain at least one uppercase letter")
# #     if not any(char.isdigit() for char in value):
# #         raise ValueError("Password must contain at least one digit")
# #     return value


# # class UserRegisterRequest(BaseModel):
# #     email: EmailStr
# #     password: str = Field(min_length=8, max_length=128)
# #     full_name: str = Field(min_length=2, max_length=255)
# #     phone: Optional[str] = Field(default=None, max_length=20)

# #     @field_validator("password")
# #     @classmethod
# #     def password_strength(cls, value: str) -> str:
# #         return validate_password_strength(value)


# # class UserLoginRequest(BaseModel):
# #     email: EmailStr
# #     password: str


# # class ChangePasswordRequest(BaseModel):
# #     current_password: str
# #     new_password: str = Field(min_length=8, max_length=128)

# #     @field_validator("new_password")
# #     @classmethod
# #     def password_strength(cls, value: str) -> str:
# #         return validate_password_strength(value)


# # class ForgotPasswordRequest(BaseModel):
# #     email: EmailStr


# # class ResetPasswordRequest(BaseModel):
# #     email: EmailStr
# #     otp: str = Field(min_length=6, max_length=6)
# #     new_password: str = Field(min_length=8, max_length=128)

# #     @field_validator("otp")
# #     @classmethod
# #     def otp_digits_only(cls, value: str) -> str:
# #         if not value.isdigit():
# #             raise ValueError("OTP must contain only digits")
# #         return value

# #     @field_validator("new_password")
# #     @classmethod
# #     def password_strength(cls, value: str) -> str:
# #         return validate_password_strength(value)


# # class TokenResponse(BaseModel):
# #     access_token: str
# #     refresh_token: str
# #     token_type: str = "bearer"


# # class AccessTokenResponse(BaseModel):
# #     access_token: str
# #     token_type: str = "bearer"


# # class RefreshTokenRequest(BaseModel):
# #     refresh_token: str


# # class AdminLoginRequest(BaseModel):
# #     email: EmailStr
# #     password: str


# # class AdminTokenResponse(BaseModel):
# #     access_token: str
# #     token_type: str = "bearer"


# """
# app/schemas/auth.py
# Pydantic schemas for authentication endpoints.
# """
# from typing import Optional

# from pydantic import BaseModel, EmailStr, Field, field_validator


# def validate_password_strength(value: str) -> str:
#     if not any(char.isupper() for char in value):
#         raise ValueError("Password must contain at least one uppercase letter")
#     if not any(char.isdigit() for char in value):
#         raise ValueError("Password must contain at least one digit")
#     return value


# class UserRegisterRequest(BaseModel):
#     email: EmailStr
#     password: str = Field(min_length=8, max_length=128)
#     full_name: str = Field(min_length=2, max_length=255)
#     phone: Optional[str] = Field(default=None, max_length=20)

#     @field_validator("password")
#     @classmethod
#     def password_strength(cls, value: str) -> str:
#         return validate_password_strength(value)


# class UserLoginRequest(BaseModel):
#     email: EmailStr
#     password: str


# class ChangePasswordRequest(BaseModel):
#     current_password: str
#     new_password: str = Field(min_length=8, max_length=128)

#     @field_validator("new_password")
#     @classmethod
#     def password_strength(cls, value: str) -> str:
#         return validate_password_strength(value)


# class ForgotPasswordRequest(BaseModel):
#     email: EmailStr


# class ResetPasswordRequest(BaseModel):
#     email: EmailStr
#     otp: str = Field(min_length=6, max_length=6)
#     new_password: str = Field(min_length=8, max_length=128)

#     @field_validator("otp")
#     @classmethod
#     def otp_digits_only(cls, value: str) -> str:
#         if not value.isdigit():
#             raise ValueError("OTP must contain only digits")
#         return value

#     @field_validator("new_password")
#     @classmethod
#     def password_strength(cls, value: str) -> str:
#         return validate_password_strength(value)


# class TokenResponse(BaseModel):
#     access_token: str
#     refresh_token: str
#     token_type: str = "bearer"


# class AccessTokenResponse(BaseModel):
#     access_token: str
#     token_type: str = "bearer"


# class RefreshTokenRequest(BaseModel):
#     refresh_token: str


# class AdminLoginRequest(BaseModel):
#     email: EmailStr
#     password: str


# class AdminTokenResponse(BaseModel):
#     access_token: str
#     token_type: str = "bearer"


"""
app/schemas/auth.py
Pydantic schemas for authentication endpoints.
"""
from typing import Optional

from pydantic import BaseModel, EmailStr, Field, field_validator


def validate_password_strength(value: str) -> str:
    if not any(char.isupper() for char in value):
        raise ValueError("Password must contain at least one uppercase letter")
    if not any(char.isdigit() for char in value):
        raise ValueError("Password must contain at least one digit")
    return value


class UserRegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    full_name: str = Field(min_length=2, max_length=255)
    phone: Optional[str] = Field(default=None, min_length=10, max_length=10)

    @field_validator("password")
    @classmethod
    def password_strength(cls, value: str) -> str:
        return validate_password_strength(value)

    @field_validator("phone")
    @classmethod
    def phone_digits_only(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return value
        if not value.isdigit():
            raise ValueError("Phone number must contain only digits")
        return value


class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str = Field(min_length=8, max_length=128)

    @field_validator("new_password")
    @classmethod
    def password_strength(cls, value: str) -> str:
        return validate_password_strength(value)


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class VerifyResetOTPRequest(BaseModel):
    email: EmailStr
    otp: str = Field(min_length=6, max_length=6)

    @field_validator("otp")
    @classmethod
    def otp_digits_only(cls, value: str) -> str:
        if not value.isdigit():
            raise ValueError("OTP must contain only digits")
        return value


class ResetPasswordRequest(BaseModel):
    email: EmailStr
    otp: str = Field(min_length=6, max_length=6)
    new_password: str = Field(min_length=8, max_length=128)

    @field_validator("otp")
    @classmethod
    def otp_digits_only(cls, value: str) -> str:
        if not value.isdigit():
            raise ValueError("OTP must contain only digits")
        return value

    @field_validator("new_password")
    @classmethod
    def password_strength(cls, value: str) -> str:
        return validate_password_strength(value)


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class AccessTokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class RefreshTokenRequest(BaseModel):
    refresh_token: str


class AdminLoginRequest(BaseModel):
    email: EmailStr
    password: str


class AdminTokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
