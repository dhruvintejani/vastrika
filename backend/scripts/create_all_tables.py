import asyncio
import importlib
import os
import pkgutil
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def import_all_models() -> None:
    import app.models

    for module in pkgutil.iter_modules(app.models.__path__):
        importlib.import_module(f"app.models.{module.name}")


async def main() -> None:
    import_all_models()

    from app.db.base import Base
    from app.db.seed import seed_admin
    from app.db.session import AsyncSessionLocal, engine

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as db:
        await seed_admin(db)
        await db.commit()

    await engine.dispose()
    print("Database tables created and admin seed checked successfully.")


if __name__ == "__main__":
    asyncio.run(main())