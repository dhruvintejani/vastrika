"""
app/api/v1/contact/routes.py
Contact form submission endpoint.
Wires directly to Contact.tsx's handleSubmit.
"""
from fastapi import APIRouter
from pydantic import BaseModel, EmailStr, Field

from app.core.logging import logger
from app.schemas.base import APIResponse

router = APIRouter(prefix="/contact", tags=["Contact"])


class ContactFormRequest(BaseModel):
    name: str = Field(min_length=2, max_length=255)
    email: EmailStr
    subject: str = Field(default="", max_length=100)
    message: str = Field(min_length=10, max_length=2000)


@router.post("", response_model=APIResponse[None])
async def submit_contact_form(body: ContactFormRequest):
    """
    Handle contact form submissions from Contact.tsx.
    Currently logs the submission. Extend with email sending (e.g. SendGrid)
    by adding an email utility and calling it here.
    """
    logger.info(
        "contact_form_submission",
        name=body.name,
        email=body.email,
        subject=body.subject,
    )
    # TODO: Send notification email to hello@vastrika.in
    # await send_contact_notification(body)
    return APIResponse(message="Thank you! We'll get back to you within 24 hours.")