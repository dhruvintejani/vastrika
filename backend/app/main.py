# # # """
# # # app/main.py
# # # FastAPI application factory.
# # # """
# # # from contextlib import asynccontextmanager

# # # from fastapi import FastAPI, Request
# # # from fastapi.middleware.cors import CORSMiddleware
# # # from fastapi.responses import JSONResponse
# # # from slowapi import Limiter, _rate_limit_exceeded_handler
# # # from slowapi.errors import RateLimitExceeded
# # # from slowapi.middleware import SlowAPIMiddleware
# # # from slowapi.util import get_remote_address

# # # from app.api.v1.router import api_router
# # # from app.core.config import settings
# # # from app.core.exceptions import VastrikAPIException, register_exception_handlers
# # # from app.core.logging import configure_logging, logger
# # # from app.db.seed import seed_admin
# # # from app.db.session import AsyncSessionLocal, engine


# # # # ── Rate limiter ──────────────────────────────────────────────────────────────
# # # limiter = Limiter(
# # #     key_func=get_remote_address,
# # #     default_limits=[f"{settings.RATE_LIMIT_PER_MINUTE}/minute"],
# # # )


# # # # ── Lifespan ──────────────────────────────────────────────────────────────────
# # # @asynccontextmanager
# # # async def lifespan(app: FastAPI):
# # #     configure_logging()
# # #     logger.info("vastrika_starting", env=settings.APP_ENV)
# # #     async with AsyncSessionLocal() as db:
# # #         try:
# # #             await seed_admin(db)
# # #         except Exception as e:
# # #             logger.error("admin_seed_failed", error=str(e))
# # #     logger.info("vastrika_ready", host=settings.APP_HOST, port=settings.APP_PORT)
# # #     yield
# # #     await engine.dispose()
# # #     logger.info("vastrika_shutdown")


# # # # ── App factory ───────────────────────────────────────────────────────────────
# # # def create_app() -> FastAPI:
# # #     app = FastAPI(
# # #         title="Vastrika API",
# # #         description="Backend API for Vastrika",
# # #         version="1.0.0",
# # #         docs_url="/docs",   # always on in dev; restrict via nginx in prod
# # #         redoc_url="/redoc",
# # #         lifespan=lifespan,
# # #     )

# # #     # ── CORS — registered LAST so it runs FIRST ───────────────────────────────
# # #     # FastAPI/Starlette processes middleware in reverse-registration order.
# # #     # CORS must be outermost so its headers are present on EVERY response,
# # #     # including 4xx/5xx error responses. Without this, browser reports all
# # #     # server errors as "CORS policy" errors instead of the real error code.
# # #     app.add_middleware(
# # #         CORSMiddleware,
# # #         allow_origins=settings.ALLOWED_ORIGINS,
# # #         allow_credentials=True,
# # #         allow_methods=["*"],
# # #         allow_headers=["*"],
# # #         expose_headers=["X-Total-Count"],
# # #         max_age=600,
# # #     )

# # #     # ── Rate limiting — registered FIRST so it runs LAST ─────────────────────
# # #     app.state.limiter = limiter
# # #     app.add_middleware(SlowAPIMiddleware)
# # #     app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# # #     # ── Exception handlers ────────────────────────────────────────────────────
# # #     register_exception_handlers(app)

# # #     # ── Routers ───────────────────────────────────────────────────────────────
# # #     app.include_router(api_router)

# # #     # ── Health check ──────────────────────────────────────────────────────────
# # #     @app.get("/health", tags=["Health"], include_in_schema=False)
# # #     async def health():
# # #         return {"status": "ok", "app": settings.APP_NAME, "env": settings.APP_ENV}

# # #     # ── OPTIONS catch-all — preflights must never be rate-limited ─────────────
# # #     @app.options("/{rest_of_path:path}", include_in_schema=False)
# # #     @limiter.exempt
# # #     async def options_handler(request: Request, rest_of_path: str):
# # #         return JSONResponse(content={}, status_code=200)

# # #     return app


# # # app = create_app()


# # """
# # app/main.py
# # FastAPI application factory.
# # """
# # from contextlib import asynccontextmanager

# # from fastapi import FastAPI, Request
# # from fastapi.middleware.cors import CORSMiddleware
# # from fastapi.responses import JSONResponse
# # from slowapi import Limiter, _rate_limit_exceeded_handler
# # from slowapi.errors import RateLimitExceeded
# # from slowapi.middleware import SlowAPIMiddleware
# # from slowapi.util import get_remote_address

# # from app.api.v1.router import api_router
# # from app.core.config import settings
# # from app.core.exceptions import VastrikAPIException, register_exception_handlers
# # from app.core.logging import configure_logging, logger
# # from app.db.seed import seed_admin
# # from app.db.session import AsyncSessionLocal, engine


# # # ── Rate limiter ──────────────────────────────────────────────────────────────
# # limiter = Limiter(
# #     key_func=get_remote_address,
# #     default_limits=[f"{settings.RATE_LIMIT_PER_MINUTE}/minute"],
# # )


# # # ── Lifespan ──────────────────────────────────────────────────────────────────
# # @asynccontextmanager
# # async def lifespan(app: FastAPI):
# #     configure_logging()
# #     logger.info("vastrika_starting", env=settings.APP_ENV)
# #     async with AsyncSessionLocal() as db:
# #         try:
# #             await seed_admin(db)
# #         except Exception as e:
# #             logger.error("admin_seed_failed", error=str(e))
# #     logger.info("vastrika_ready", host=settings.APP_HOST, port=settings.APP_PORT)
# #     yield
# #     await engine.dispose()
# #     logger.info("vastrika_shutdown")


# # # ── App factory ───────────────────────────────────────────────────────────────
# # def create_app() -> FastAPI:
# #     app = FastAPI(
# #         title="Vastrika API",
# #         description="Backend API for Vastrika",
# #         version="1.0.0",
# #         docs_url="/docs",   # always on in dev; restrict via nginx in prod
# #         redoc_url="/redoc",
# #         lifespan=lifespan,
# #     )

# #     # ── CORS — registered LAST so it runs FIRST ───────────────────────────────
# #     # FastAPI/Starlette processes middleware in reverse-registration order.
# #     # CORS must be outermost so its headers are present on EVERY response,
# #     # including 4xx/5xx error responses. Without this, browser reports all
# #     # server errors as "CORS policy" errors instead of the real error code.
# #     app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["*"],
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# #     )

# #     # ── Rate limiting — registered FIRST so it runs LAST ─────────────────────
# #     app.state.limiter = limiter
# #     app.add_middleware(SlowAPIMiddleware)
# #     app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# #     # ── Exception handlers ────────────────────────────────────────────────────
# #     register_exception_handlers(app)

# #     # ── Routers ───────────────────────────────────────────────────────────────
# #     app.include_router(api_router)

# #     # ── Health check ──────────────────────────────────────────────────────────
# #     @app.get("/health", tags=["Health"], include_in_schema=False)
# #     async def health():
# #         return {"status": "ok", "app": settings.APP_NAME, "env": settings.APP_ENV}

# #     # ── OPTIONS catch-all — preflights must never be rate-limited ─────────────
# #     @app.options("/{rest_of_path:path}", include_in_schema=False)
# #     @limiter.exempt
# #     async def options_handler(request: Request, rest_of_path: str):
# #         return JSONResponse(content={}, status_code=200)

# #     return app


# # app = create_app()


# """
# app/main.py
# FastAPI application factory.

# CORS strategy: Instead of relying on middleware ordering (which breaks when
# SlowAPI or exception handlers return responses before CORSMiddleware runs),
# we inject CORS headers directly in a custom middleware that wraps the entire
# app — including all error responses.
# """
# from contextlib import asynccontextmanager

# from fastapi import FastAPI, Request
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import JSONResponse
# from slowapi import Limiter, _rate_limit_exceeded_handler
# from slowapi.errors import RateLimitExceeded
# from slowapi.middleware import SlowAPIMiddleware
# from slowapi.util import get_remote_address
# from starlette.middleware.base import BaseHTTPMiddleware
# from starlette.responses import Response

# from app.api.v1.router import api_router
# from app.core.config import settings
# from app.core.exceptions import VastrikAPIException, register_exception_handlers
# from app.core.logging import configure_logging, logger
# from app.db.seed import seed_admin
# from app.db.session import AsyncSessionLocal, engine


# # ── Rate limiter ──────────────────────────────────────────────────────────────
# limiter = Limiter(
#     key_func=get_remote_address,
#     default_limits=[f"{settings.RATE_LIMIT_PER_MINUTE}/minute"],
# )


# # ── Custom CORS middleware ────────────────────────────────────────────────────
# # We inject CORS headers at the lowest level so they are present on EVERY
# # response: 200, 401, 403, 422, 429, 500 — and on preflight OPTIONS requests.
# # This is more reliable than CORSMiddleware alone because Starlette's built-in
# # CORSMiddleware does not attach headers to responses generated by other
# # middleware (e.g. SlowAPI 429s) or unhandled exceptions (500s).

# class CORSEverywhere(BaseHTTPMiddleware):
#     async def dispatch(self, request: Request, call_next):
#         origin = request.headers.get("origin", "")
#         allowed = settings.ALLOWED_ORIGINS

#         # Handle preflight OPTIONS immediately — never rate-limit these
#         if request.method == "OPTIONS":
#             response = Response(status_code=200)
#             self._add_cors(response, origin, allowed)
#             return response

#         # Call the rest of the stack
#         try:
#             response = await call_next(request)
#         except Exception as e:
#             import traceback
#             print("=" * 80)
#             print("UNHANDLED EXCEPTION:")
#             traceback.print_exc()
#             print("=" * 80)
#             response = JSONResponse(
#                 status_code=500,
#                 content={"success": False, "error": "Internal server error"},
#             )

#         self._add_cors(response, origin, allowed)
#         return response

#     @staticmethod
#     def _add_cors(response: Response, origin: str, allowed: list[str]) -> None:
#         # Allow the specific origin if it is in the allow-list,
#         # otherwise echo back the first allowed origin as fallback
#         if origin in allowed:
#             response.headers["Access-Control-Allow-Origin"] = origin
#         elif allowed:
#             response.headers["Access-Control-Allow-Origin"] = allowed[0]

#         response.headers["Access-Control-Allow-Credentials"] = "true"
#         response.headers["Access-Control-Allow-Methods"] = (
#             "GET, POST, PUT, PATCH, DELETE, OPTIONS"
#         )
#         response.headers["Access-Control-Allow-Headers"] = (
#             "Authorization, Content-Type, Accept, X-Requested-With"
#         )
#         response.headers["Access-Control-Expose-Headers"] = "X-Total-Count"
#         response.headers["Access-Control-Max-Age"] = "600"
#         response.headers["Vary"] = "Origin"


# # ── Lifespan ──────────────────────────────────────────────────────────────────
# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     configure_logging()
#     logger.info("vastrika_starting", env=settings.APP_ENV)
#     async with AsyncSessionLocal() as db:
#         try:
#             await seed_admin(db)
#         except Exception as e:
#             logger.error("admin_seed_failed", error=str(e))
#     logger.info("vastrika_ready", host=settings.APP_HOST, port=settings.APP_PORT)
#     yield
#     await engine.dispose()
#     logger.info("vastrika_shutdown")


# # ── App factory ───────────────────────────────────────────────────────────────
# def create_app() -> FastAPI:
#     app = FastAPI(
#         title="Vastrika API",
#         description="Backend API for Vastrika",
#         version="1.0.0",
#         docs_url="/docs",
#         redoc_url="/redoc",
#         lifespan=lifespan,
#     )

#     # Registration order matters: Starlette runs middleware in LIFO order
#     # (last registered = outermost = runs first).
#     # We want: CORSEverywhere → SlowAPI → route handler
#     # So register SlowAPI first, CORSEverywhere last.

#     # 1. Rate limiting (inner — registered first)
#     app.state.limiter = limiter
#     app.add_middleware(SlowAPIMiddleware)
#     app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

#     # 2. CORS on everything (outer — registered last, runs first)
#     app.add_middleware(CORSEverywhere)

#     # ── Exception handlers ────────────────────────────────────────────────────
#     register_exception_handlers(app)

#     # ── Routers ───────────────────────────────────────────────────────────────
#     app.include_router(api_router)

#     # ── Health check ──────────────────────────────────────────────────────────
#     @app.get("/health", tags=["Health"], include_in_schema=False)
#     async def health():
#         return {"status": "ok", "app": settings.APP_NAME, "env": settings.APP_ENV}

#     return app


# app = create_app()

"""
app/main.py
FastAPI application factory.
"""
from contextlib import asynccontextmanager
from urllib.parse import urlsplit

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from slowapi.util import get_remote_address
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response

from app.api.v1.router import api_router
from app.core.config import settings
from app.core.exceptions import register_exception_handlers
from app.core.logging import configure_logging, logger
from app.db.seed import seed_admin
from app.db.session import AsyncSessionLocal, engine


limiter = Limiter(
    key_func=get_remote_address,
    default_limits=[f"{settings.RATE_LIMIT_PER_MINUTE}/minute"],
)


def normalize_origin(origin: str) -> str:
    value = (origin or "").strip().rstrip("/")
    parsed = urlsplit(value)

    if parsed.scheme and parsed.netloc:
        return f"{parsed.scheme}://{parsed.netloc}"

    return value


def unique_origins(origins: list[str]) -> list[str]:
    clean_origins: list[str] = []

    for origin in origins:
        clean = normalize_origin(origin)
        if clean and clean not in clean_origins:
            clean_origins.append(clean)

    return clean_origins


def get_allowed_origins() -> list[str]:
    raw_origins = [
        settings.FRONTEND_URL,
        settings.ADMIN_FRONTEND_URL,
        *settings.ALLOWED_ORIGINS,
    ]

    origins = unique_origins(raw_origins)
    extras: list[str] = []

    for origin in origins:
        if "localhost" in origin:
            extras.append(origin.replace("localhost", "127.0.0.1"))
        elif "127.0.0.1" in origin:
            extras.append(origin.replace("127.0.0.1", "localhost"))

    return unique_origins([*origins, *extras])


class CORSEverywhere(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        request_origin = normalize_origin(request.headers.get("origin", ""))
        allowed_origins = get_allowed_origins()

        if request.method == "OPTIONS":
            response = Response(status_code=200)
            self._add_cors(response, request_origin, allowed_origins)
            return response

        try:
            response = await call_next(request)
        except Exception:
            import traceback

            traceback.print_exc()
            response = JSONResponse(
                status_code=500,
                content={"success": False, "error": "Internal server error"},
            )

        self._add_cors(response, request_origin, allowed_origins)
        return response

    @staticmethod
    def _add_cors(response: Response, request_origin: str, allowed_origins: list[str]) -> None:
        if request_origin in allowed_origins:
            response.headers["Access-Control-Allow-Origin"] = request_origin

        response.headers["Access-Control-Allow-Credentials"] = "true"
        response.headers["Access-Control-Allow-Methods"] = (
            "GET, POST, PUT, PATCH, DELETE, OPTIONS"
        )
        response.headers["Access-Control-Allow-Headers"] = (
            "Authorization, Content-Type, Accept, X-Requested-With"
        )
        response.headers["Access-Control-Expose-Headers"] = "X-Total-Count"
        response.headers["Access-Control-Max-Age"] = "600"
        response.headers["Vary"] = "Origin"


@asynccontextmanager
async def lifespan(app: FastAPI):
    configure_logging()
    logger.info("vastrika_starting", env=settings.APP_ENV)

    async with AsyncSessionLocal() as db:
        try:
            await seed_admin(db)
        except Exception as e:
            logger.error("admin_seed_failed", error=str(e))

    logger.info("vastrika_ready", host=settings.APP_HOST, port=settings.APP_PORT)
    yield

    await engine.dispose()
    logger.info("vastrika_shutdown")


def create_app() -> FastAPI:
    app = FastAPI(
        title="Vastrika API",
        description="Backend API for Vastrika",
        version="1.0.0",
        docs_url="/docs",
        redoc_url="/redoc",
        lifespan=lifespan,
    )

    app.state.limiter = limiter
    app.add_middleware(SlowAPIMiddleware)
    app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

    app.add_middleware(CORSEverywhere)

    register_exception_handlers(app)

    app.include_router(api_router)

    @app.get("/health", tags=["Health"], include_in_schema=False)
    async def health():
        return {"status": "ok", "app": settings.APP_NAME, "env": settings.APP_ENV}

    return app


app = create_app()