# """
# reset_admin.py
# Run this once to reset the admin password in the database.
# Usage:
#     cd vastrika-backend
#     python reset_admin.py

# It reads DB credentials from your .env file automatically.
# """
# import asyncio
# import sys
# from pathlib import Path

# # Add project root to path
# sys.path.insert(0, str(Path(__file__).parent))

# from app.core.config import settings
# from app.core.security import hash_password
# from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
# from sqlalchemy import update, select, text


# async def reset_admin():
#     print(f"Connecting to: {settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}")

#     engine = create_async_engine(settings.DATABASE_URL, echo=False)
#     SessionLocal = async_sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

#     async with SessionLocal() as db:
#         # Import here so models are loaded
#         from app.models.admin import Admin

#         # Check what admin accounts exist
#         result = await db.execute(select(Admin.id, Admin.email, Admin.full_name))
#         admins = result.all()

#         if not admins:
#             print("\nNo admin accounts found. Creating one now...")
#             new_admin = Admin(
#                 email=settings.ADMIN_SEED_EMAIL,
#                 hashed_password=hash_password(settings.ADMIN_SEED_PASSWORD),
#                 full_name=settings.ADMIN_SEED_FULL_NAME,
#                 is_active=True,
#             )
#             db.add(new_admin)
#             await db.commit()
#             print(f"Admin created: {settings.ADMIN_SEED_EMAIL}")
#             print(f"Password:      {settings.ADMIN_SEED_PASSWORD}")
#         else:
#             print(f"\nFound {len(admins)} admin account(s):")
#             for a in admins:
#                 print(f"  ID={a.id}  email={a.email}  name={a.full_name}")

#             # Reset ALL admins to match .env credentials
#             new_hash = hash_password(settings.ADMIN_SEED_PASSWORD)
#             await db.execute(
#                 update(Admin)
#                 .where(Admin.email == settings.ADMIN_SEED_EMAIL)
#                 .values(
#                     hashed_password=new_hash,
#                     email=settings.ADMIN_SEED_EMAIL,
#                     is_active=True,
#                 )
#             )
#             await db.commit()
#             print(f"\nPassword reset for: {settings.ADMIN_SEED_EMAIL}")
#             print(f"New password:       {settings.ADMIN_SEED_PASSWORD}")
#             print("\nIf the email above didn't match any record, run this SQL manually:")
#             print(f"  UPDATE admins SET email='{settings.ADMIN_SEED_EMAIL}' WHERE id=1;")
#             print("Then run this script again.")

#     await engine.dispose()
#     print("\nDone. You can now log in to the admin panel.")


# if __name__ == "__main__":
#     asyncio.run(reset_admin())