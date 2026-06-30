"""
Create or repair the reviews table for local/dev databases.

Run once from the backend folder:
    python scripts/repair_reviews_table.py
"""

import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import asyncio

from sqlalchemy import text

from app.db.session import AsyncSessionLocal


STATEMENTS = [
    """
    CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        rating INTEGER NOT NULL,
        title VARCHAR(255),
        body TEXT,
        is_approved BOOLEAN NOT NULL DEFAULT TRUE,
        is_flagged BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
    )
    """,
    "ALTER TABLE reviews ADD COLUMN IF NOT EXISTS title VARCHAR(255)",
    "ALTER TABLE reviews ADD COLUMN IF NOT EXISTS body TEXT",
    "ALTER TABLE reviews ADD COLUMN IF NOT EXISTS is_approved BOOLEAN NOT NULL DEFAULT TRUE",
    "ALTER TABLE reviews ADD COLUMN IF NOT EXISTS is_flagged BOOLEAN NOT NULL DEFAULT FALSE",
    "ALTER TABLE reviews ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()",
    "ALTER TABLE reviews ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()",
    "CREATE INDEX IF NOT EXISTS ix_reviews_user_id ON reviews(user_id)",
    "CREATE INDEX IF NOT EXISTS ix_reviews_product_id ON reviews(product_id)",
    "CREATE UNIQUE INDEX IF NOT EXISTS uq_user_product_review ON reviews(user_id, product_id)",
]


async def main() -> None:
    async with AsyncSessionLocal() as db:
        for statement in STATEMENTS:
            await db.execute(text(statement))
        await db.commit()

    print("Reviews table checked successfully.")


if __name__ == "__main__":
    asyncio.run(main())
