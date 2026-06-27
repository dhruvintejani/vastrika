"""
app/utils/cloudinary_utils.py
Cloudinary upload and deletion helpers.
"""
import asyncio
from typing import Optional

import cloudinary
import cloudinary.uploader

from app.core.config import settings
from app.core.logging import logger


def _configure_cloudinary() -> None:
    cloudinary.config(
        cloud_name=settings.CLOUDINARY_CLOUD_NAME,
        api_key=settings.CLOUDINARY_API_KEY,
        api_secret=settings.CLOUDINARY_API_SECRET,
        secure=True,
    )


_configure_cloudinary()


async def upload_image(
    file_bytes: bytes,
    filename: str,
    folder: Optional[str] = None,
) -> dict:
    """
    Upload image bytes to Cloudinary.
    Returns dict with 'public_id' and 'secure_url'.
    Runs the blocking upload in a thread pool to keep FastAPI non-blocking.
    """
    upload_folder = folder or settings.CLOUDINARY_UPLOAD_FOLDER

    def _upload():
        return cloudinary.uploader.upload(
            file_bytes,
            folder=upload_folder,
            public_id=filename,
            overwrite=True,
            resource_type="image",
            transformation=[
                {"width": 800, "height": 1067, "crop": "fill", "quality": "auto"},
            ],
        )

    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(None, _upload)

    return {
        "public_id": result["public_id"],
        "url": result["secure_url"],
    }


async def delete_cloudinary_image(public_id: str) -> None:
    """Delete an image from Cloudinary by public_id."""
    def _delete():
        return cloudinary.uploader.destroy(public_id, resource_type="image")

    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(None, _delete)
    if result.get("result") != "ok":
        logger.warning("cloudinary_delete_failed", public_id=public_id, result=result)