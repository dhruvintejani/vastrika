# # # # # """
# # # # # Create or repair the password_reset_otps table.

# # # # # Run once from the backend folder:
# # # # #     python scripts/repair_password_reset_table.py
# # # # # """

# # # # # import os
# # # # # import sys

# # # # # sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# # # # # import asyncio

# # # # # from sqlalchemy import text

# # # # # from app.db.session import AsyncSessionLocal


# # # # # STATEMENTS = [
# # # # #     """
# # # # #     CREATE TABLE IF NOT EXISTS password_reset_otps (
# # # # #         id SERIAL PRIMARY KEY,
# # # # #         user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
# # # # #         otp_hash VARCHAR(128) NOT NULL,
# # # # #         attempts INTEGER NOT NULL DEFAULT 0,
# # # # #         requested_at TIMESTAMP WITH TIME ZONE NOT NULL,
# # # # #         expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
# # # # #         verified_at TIMESTAMP WITH TIME ZONE,
# # # # #         created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
# # # # #         updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
# # # # #     )
# # # # #     """,
# # # # #     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS otp_hash VARCHAR(128) NOT NULL DEFAULT ''",
# # # # #     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS attempts INTEGER NOT NULL DEFAULT 0",
# # # # #     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()",
# # # # #     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()",
# # # # #     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP WITH TIME ZONE",
# # # # #     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()",
# # # # #     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()",
# # # # #     "CREATE UNIQUE INDEX IF NOT EXISTS ix_password_reset_otps_user_id ON password_reset_otps(user_id)",
# # # # # ]


# # # # # async def main() -> None:
# # # # #     async with AsyncSessionLocal() as db:
# # # # #         for statement in STATEMENTS:
# # # # #             await db.execute(text(statement))
# # # # #         await db.commit()

# # # # #     print("Password reset OTP table checked successfully.")


# # # # # if __name__ == "__main__":
# # # # #     asyncio.run(main())


# # # # """
# # # # Create or repair the password_reset_otps table.

# # # # Run once from the backend folder:
# # # #     python scripts/repair_password_reset_table.py
# # # # """
# # # # import asyncio
# # # # import os
# # # # import sys

# # # # sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# # # # from sqlalchemy import text

# # # # from app.db.session import AsyncSessionLocal


# # # # STATEMENTS = [
# # # #     """
# # # #     CREATE TABLE IF NOT EXISTS password_reset_otps (
# # # #         id SERIAL PRIMARY KEY,
# # # #         user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
# # # #         otp_hash VARCHAR(128) NOT NULL,
# # # #         attempts INTEGER NOT NULL DEFAULT 0,
# # # #         requested_at TIMESTAMP WITH TIME ZONE NOT NULL,
# # # #         expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
# # # #         verified_at TIMESTAMP WITH TIME ZONE,
# # # #         created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
# # # #         updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
# # # #     )
# # # #     """,
# # # #     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS otp_hash VARCHAR(128) NOT NULL DEFAULT ''",
# # # #     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS attempts INTEGER NOT NULL DEFAULT 0",
# # # #     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()",
# # # #     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()",
# # # #     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP WITH TIME ZONE",
# # # #     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()",
# # # #     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()",
# # # #     "CREATE UNIQUE INDEX IF NOT EXISTS ix_password_reset_otps_user_id ON password_reset_otps(user_id)",
# # # # ]


# # # # async def main() -> None:
# # # #     async with AsyncSessionLocal() as db:
# # # #         for statement in STATEMENTS:
# # # #             await db.execute(text(statement))
# # # #         await db.commit()

# # # #     print("Password reset OTP table checked successfully.")


# # # # if __name__ == "__main__":
# # # #     asyncio.run(main())


# # # """
# # # Create or repair the password_reset_otps table.

# # # Run once from the backend folder:
# # #     python scripts/repair_password_reset_table.py
# # # """
# # # import asyncio
# # # import os
# # # import sys

# # # sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# # # from sqlalchemy import text

# # # from app.db.session import AsyncSessionLocal


# # # STATEMENTS = [
# # #     """
# # #     CREATE TABLE IF NOT EXISTS password_reset_otps (
# # #         id SERIAL PRIMARY KEY,
# # #         user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
# # #         otp_hash VARCHAR(128) NOT NULL,
# # #         attempts INTEGER NOT NULL DEFAULT 0,
# # #         requested_at TIMESTAMP WITH TIME ZONE NOT NULL,
# # #         expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
# # #         verified_at TIMESTAMP WITH TIME ZONE,
# # #         created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
# # #         updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
# # #     )
# # #     """,
# # #     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS otp_hash VARCHAR(128) NOT NULL DEFAULT ''",
# # #     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS attempts INTEGER NOT NULL DEFAULT 0",
# # #     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()",
# # #     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()",
# # #     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP WITH TIME ZONE",
# # #     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()",
# # #     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()",
# # #     "CREATE UNIQUE INDEX IF NOT EXISTS ix_password_reset_otps_user_id ON password_reset_otps(user_id)",
# # # ]


# # # async def main() -> None:
# # #     async with AsyncSessionLocal() as db:
# # #         for statement in STATEMENTS:
# # #             await db.execute(text(statement))
# # #         await db.commit()

# # #     print("Password reset OTP table checked successfully.")


# # # if __name__ == "__main__":
# # #     asyncio.run(main())


# # """
# # Create or repair the password_reset_otps table.

# # Run once from the backend folder:
# #     python scripts/repair_password_reset_table.py
# # """
# # import asyncio
# # import os
# # import sys

# # sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# # from sqlalchemy import text

# # from app.db.session import AsyncSessionLocal


# # STATEMENTS = [
# #     """
# #     CREATE TABLE IF NOT EXISTS password_reset_otps (
# #         id SERIAL PRIMARY KEY,
# #         user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
# #         otp_hash VARCHAR(128) NOT NULL,
# #         attempts INTEGER NOT NULL DEFAULT 0,
# #         requested_at TIMESTAMP WITH TIME ZONE NOT NULL,
# #         expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
# #         verified_at TIMESTAMP WITH TIME ZONE,
# #         created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
# #         updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
# #     )
# #     """,
# #     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS otp_hash VARCHAR(128) NOT NULL DEFAULT ''",
# #     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS attempts INTEGER NOT NULL DEFAULT 0",
# #     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()",
# #     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()",
# #     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP WITH TIME ZONE",
# #     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()",
# #     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()",
# #     "CREATE UNIQUE INDEX IF NOT EXISTS ix_password_reset_otps_user_id ON password_reset_otps(user_id)",
# # ]


# # async def main() -> None:
# #     async with AsyncSessionLocal() as db:
# #         for statement in STATEMENTS:
# #             await db.execute(text(statement))
# #         await db.commit()

# #     print("Password reset OTP table checked successfully.")


# # if __name__ == "__main__":
# #     asyncio.run(main())

# """
# Create or repair the password_reset_otps table.

# Run once from the backend folder:
#     python scripts/repair_password_reset_table.py
# """
# import asyncio
# import os
# import sys

# sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# from sqlalchemy import text

# from app.db.session import AsyncSessionLocal


# STATEMENTS = [
#     """
#     CREATE TABLE IF NOT EXISTS password_reset_otps (
#         id SERIAL PRIMARY KEY,
#         user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
#         otp_hash VARCHAR(128) NOT NULL,
#         attempts INTEGER NOT NULL DEFAULT 0,
#         requested_at TIMESTAMP WITH TIME ZONE NOT NULL,
#         expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
#         verified_at TIMESTAMP WITH TIME ZONE,
#         created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
#         updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
#     )
#     """,
#     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS otp_hash VARCHAR(128) NOT NULL DEFAULT ''",
#     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS attempts INTEGER NOT NULL DEFAULT 0",
#     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()",
#     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()",
#     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP WITH TIME ZONE",
#     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()",
#     "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()",
#     "CREATE UNIQUE INDEX IF NOT EXISTS ix_password_reset_otps_user_id ON password_reset_otps(user_id)",
# ]


# async def main() -> None:
#     async with AsyncSessionLocal() as db:
#         for statement in STATEMENTS:
#             await db.execute(text(statement))
#         await db.commit()

#     print("Password reset OTP table checked successfully.")


# if __name__ == "__main__":
#     asyncio.run(main())


"""
Create or repair the password_reset_otps table.

Run once from the backend folder:
    python scripts/repair_password_reset_table.py
"""
import asyncio
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import text

from app.db.session import AsyncSessionLocal


STATEMENTS = [
    """
    CREATE TABLE IF NOT EXISTS password_reset_otps (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        otp_hash VARCHAR(128) NOT NULL,
        attempts INTEGER NOT NULL DEFAULT 0,
        requested_at TIMESTAMP WITH TIME ZONE NOT NULL,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        verified_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
    )
    """,
    "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS otp_hash VARCHAR(128) NOT NULL DEFAULT ''",
    "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS attempts INTEGER NOT NULL DEFAULT 0",
    "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()",
    "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()",
    "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP WITH TIME ZONE",
    "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()",
    "ALTER TABLE password_reset_otps ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()",
    "CREATE UNIQUE INDEX IF NOT EXISTS ix_password_reset_otps_user_id ON password_reset_otps(user_id)",
]


async def main() -> None:
    async with AsyncSessionLocal() as db:
        for statement in STATEMENTS:
            await db.execute(text(statement))
        await db.commit()

    print("Password reset OTP table checked successfully.")


if __name__ == "__main__":
    asyncio.run(main())
