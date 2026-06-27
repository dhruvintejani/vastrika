"""
app/core/exceptions.py
Custom exception classes and FastAPI exception handlers.
"""
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse


class VastrikAPIException(Exception):
    """Base exception for all Vastrika API errors."""
    def __init__(self, status_code: int, detail: str, error_code: str | None = None):
        self.status_code = status_code
        self.detail = detail
        self.error_code = error_code
        super().__init__(detail)


class NotFoundError(VastrikAPIException):
    def __init__(self, resource: str = "Resource"):
        super().__init__(404, f"{resource} not found", "NOT_FOUND")


class ConflictError(VastrikAPIException):
    def __init__(self, detail: str):
        super().__init__(409, detail, "CONFLICT")


class UnauthorizedError(VastrikAPIException):
    def __init__(self, detail: str = "Not authenticated"):
        super().__init__(401, detail, "UNAUTHORIZED")


class ForbiddenError(VastrikAPIException):
    def __init__(self, detail: str = "Permission denied"):
        super().__init__(403, detail, "FORBIDDEN")


class ValidationError(VastrikAPIException):
    def __init__(self, detail: str):
        super().__init__(422, detail, "VALIDATION_ERROR")


class BusinessRuleError(VastrikAPIException):
    def __init__(self, detail: str):
        super().__init__(400, detail, "BUSINESS_RULE_ERROR")


def register_exception_handlers(app: FastAPI) -> None:
    """Attach custom exception handlers to the FastAPI app."""

    @app.exception_handler(VastrikAPIException)
    async def vastrika_exception_handler(
        request: Request, exc: VastrikAPIException
    ) -> JSONResponse:
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "success": False,
                "error": exc.detail,
                "error_code": exc.error_code,
            },
        )