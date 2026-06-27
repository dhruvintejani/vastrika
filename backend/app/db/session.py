# """
# app/db/session.py
# Async SQLAlchemy engine and session factory.
# """
# from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
# from sqlalchemy.pool import NullPool

# from app.core.config import settings

# # Create the async engine
# # NullPool is used so connections aren't held open between requests in async context
# engine = create_async_engine(
#     settings.DATABASE_URL,
#     echo=settings.APP_DEBUG,
#     pool_pre_ping=True,
#     pool_recycle=3600,
#     pool_size=10,
#     max_overflow=20,
# )

# # Session factory
# AsyncSessionLocal = async_sessionmaker(
#     bind=engine,
#     class_=AsyncSession,
#     expire_on_commit=False,
#     autocommit=False,
#     autoflush=False,
# )


"""
app/db/session.py
Async SQLAlchemy engine and session factory for PostgreSQL + asyncpg.
"""
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from app.core.config import settings

engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.APP_DEBUG,
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20,
    # asyncpg uses its own connection pool; pool_recycle not needed
    # but pool_pre_ping ensures stale connections are detected
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)
