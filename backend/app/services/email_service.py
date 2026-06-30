# # # # # """
# # # # # app/services/email_service.py
# # # # # Transactional email helpers.
# # # # # """
# # # # # from html import escape

# # # # # import httpx

# # # # # from app.core.config import settings
# # # # # from app.core.exceptions import BusinessRuleError


# # # # # class EmailService:
# # # # #     BREVO_SEND_URL = "https://api.brevo.com/v3/smtp/email"

# # # # #     async def send_password_reset_otp(
# # # # #         self,
# # # # #         to_email: str,
# # # # #         to_name: str,
# # # # #         otp: str,
# # # # #         expires_minutes: int,
# # # # #     ) -> None:
# # # # #         if not settings.BREVO_API_KEY:
# # # # #             raise BusinessRuleError("Brevo API key is missing")
# # # # #         if not settings.BREVO_SENDER_EMAIL:
# # # # #             raise BusinessRuleError("Brevo sender email is missing")

# # # # #         safe_name = escape(to_name or "Customer")
# # # # #         safe_otp = escape(otp)

# # # # #         payload = {
# # # # #             "sender": {
# # # # #                 "name": settings.BREVO_SENDER_NAME,
# # # # #                 "email": settings.BREVO_SENDER_EMAIL,
# # # # #             },
# # # # #             "to": [{"email": to_email, "name": to_name or to_email}],
# # # # #             "subject": "Your Vastrika password reset OTP",
# # # # #             "htmlContent": f"""
# # # # #                 <div style="font-family: Arial, sans-serif; background:#f8f5f0; padding:24px;">
# # # # #                   <div style="max-width:520px; margin:0 auto; background:#ffffff; border:1px solid #eadfce; border-radius:16px; padding:28px;">
# # # # #                     <h2 style="margin:0 0 12px; color:#1f1f1f;">Password reset OTP</h2>
# # # # #                     <p style="margin:0 0 16px; color:#555;">Hi {safe_name},</p>
# # # # #                     <p style="margin:0 0 20px; color:#555;">
# # # # #                       Use this OTP to reset your Vastrika account password.
# # # # #                     </p>
# # # # #                     <div style="font-size:30px; letter-spacing:8px; font-weight:700; color:#7a4e48; background:#f8f5f0; border-radius:12px; padding:16px; text-align:center;">
# # # # #                       {safe_otp}
# # # # #                     </div>
# # # # #                     <p style="margin:20px 0 0; color:#777; font-size:14px;">
# # # # #                       This OTP expires in {expires_minutes} minutes. If you did not request this, you can safely ignore this email.
# # # # #                     </p>
# # # # #                   </div>
# # # # #                 </div>
# # # # #             """,
# # # # #             "textContent": (
# # # # #                 f"Your Vastrika password reset OTP is {otp}. "
# # # # #                 f"It expires in {expires_minutes} minutes."
# # # # #             ),
# # # # #         }

# # # # #         headers = {
# # # # #             "accept": "application/json",
# # # # #             "api-key": settings.BREVO_API_KEY,
# # # # #             "content-type": "application/json",
# # # # #         }

# # # # #         async with httpx.AsyncClient(timeout=15) as client:
# # # # #             response = await client.post(self.BREVO_SEND_URL, json=payload, headers=headers)

# # # # #         if response.status_code >= 400:
# # # # #             raise BusinessRuleError("Could not send reset OTP. Please try again later.")


# # # # """
# # # # app/services/email_service.py
# # # # Transactional email helpers for password reset OTP.
# # # # """
# # # # from html import escape

# # # # import httpx

# # # # from app.core.config import settings
# # # # from app.core.exceptions import BusinessRuleError


# # # # class EmailService:
# # # #     EMAILJS_SEND_URL = "https://api.emailjs.com/api/v1.0/email/send"
# # # #     RESEND_SEND_URL = "https://api.resend.com/emails"

# # # #     async def send_password_reset_otp(
# # # #         self,
# # # #         to_email: str,
# # # #         to_name: str,
# # # #         otp: str,
# # # #         expires_minutes: int,
# # # #     ) -> None:
# # # #         provider = settings.EMAIL_PROVIDER.lower().strip()

# # # #         if provider == "emailjs":
# # # #             await self._send_with_emailjs(to_email, to_name, otp, expires_minutes)
# # # #             return

# # # #         if provider == "resend":
# # # #             await self._send_with_resend(to_email, to_name, otp, expires_minutes)
# # # #             return

# # # #         raise BusinessRuleError("Email provider is not configured correctly")

# # # #     def _build_html(self, to_name: str, otp: str, expires_minutes: int) -> str:
# # # #         safe_name = escape(to_name or "Customer")
# # # #         safe_otp = escape(otp)

# # # #         return f"""
# # # #             <div style="font-family: Arial, sans-serif; background:#f8f5f0; padding:24px;">
# # # #               <div style="max-width:520px; margin:0 auto; background:#ffffff; border:1px solid #eadfce; border-radius:16px; padding:28px;">
# # # #                 <h2 style="margin:0 0 12px; color:#1f1f1f;">Password reset OTP</h2>
# # # #                 <p style="margin:0 0 16px; color:#555;">Hi {safe_name},</p>
# # # #                 <p style="margin:0 0 20px; color:#555;">
# # # #                   Use this OTP to reset your Vastrika account password.
# # # #                 </p>
# # # #                 <div style="font-size:30px; letter-spacing:8px; font-weight:700; color:#7a4e48; background:#f8f5f0; border-radius:12px; padding:16px; text-align:center;">
# # # #                   {safe_otp}
# # # #                 </div>
# # # #                 <p style="margin:20px 0 0; color:#777; font-size:14px;">
# # # #                   This OTP expires in {expires_minutes} minutes. If you did not request this, you can safely ignore this email.
# # # #                 </p>
# # # #               </div>
# # # #             </div>
# # # #         """

# # # #     async def _send_with_emailjs(
# # # #         self,
# # # #         to_email: str,
# # # #         to_name: str,
# # # #         otp: str,
# # # #         expires_minutes: int,
# # # #     ) -> None:
# # # #         if not settings.EMAILJS_SERVICE_ID:
# # # #             raise BusinessRuleError("EmailJS service ID is missing")
# # # #         if not settings.EMAILJS_TEMPLATE_ID:
# # # #             raise BusinessRuleError("EmailJS template ID is missing")
# # # #         if not settings.EMAILJS_PUBLIC_KEY:
# # # #             raise BusinessRuleError("EmailJS public key is missing")

# # # #         message = (
# # # #             f"Your Vastrika password reset OTP is {otp}. "
# # # #             f"It expires in {expires_minutes} minutes."
# # # #         )

# # # #         payload: dict[str, object] = {
# # # #             "service_id": settings.EMAILJS_SERVICE_ID,
# # # #             "template_id": settings.EMAILJS_TEMPLATE_ID,
# # # #             "user_id": settings.EMAILJS_PUBLIC_KEY,
# # # #             "template_params": {
# # # #                 "to_email": to_email,
# # # #                 "to_name": to_name or "Customer",
# # # #                 "user_email": to_email,
# # # #                 "user_name": to_name or "Customer",
# # # #                 "email": to_email,
# # # #                 "name": to_name or "Customer",
# # # #                 "otp": otp,
# # # #                 "code": otp,
# # # #                 "passcode": otp,
# # # #                 "expires_minutes": expires_minutes,
# # # #                 "app_name": settings.APP_NAME,
# # # #                 "subject": "Your Vastrika password reset OTP",
# # # #                 "message": message,
# # # #                 "html_message": self._build_html(to_name, otp, expires_minutes),
# # # #             },
# # # #         }

# # # #         if settings.EMAILJS_PRIVATE_KEY:
# # # #             payload["accessToken"] = settings.EMAILJS_PRIVATE_KEY

# # # #         async with httpx.AsyncClient(timeout=15) as client:
# # # #             response = await client.post(
# # # #                 self.EMAILJS_SEND_URL,
# # # #                 json=payload,
# # # #                 headers={"Content-Type": "application/json"},
# # # #             )

# # # #         if response.status_code >= 400:
# # # #             raise BusinessRuleError("Could not send reset OTP. Please try again later.")

# # # #     async def _send_with_resend(
# # # #         self,
# # # #         to_email: str,
# # # #         to_name: str,
# # # #         otp: str,
# # # #         expires_minutes: int,
# # # #     ) -> None:
# # # #         if not settings.RESEND_API_KEY:
# # # #             raise BusinessRuleError("Resend API key is missing")
# # # #         if not settings.RESEND_FROM_EMAIL:
# # # #             raise BusinessRuleError("Resend sender email is missing")

# # # #         payload = {
# # # #             "from": f"{settings.RESEND_FROM_NAME} <{settings.RESEND_FROM_EMAIL}>",
# # # #             "to": [to_email],
# # # #             "subject": "Your Vastrika password reset OTP",
# # # #             "html": self._build_html(to_name, otp, expires_minutes),
# # # #             "text": (
# # # #                 f"Your Vastrika password reset OTP is {otp}. "
# # # #                 f"It expires in {expires_minutes} minutes."
# # # #             ),
# # # #         }

# # # #         async with httpx.AsyncClient(timeout=15) as client:
# # # #             response = await client.post(
# # # #                 self.RESEND_SEND_URL,
# # # #                 json=payload,
# # # #                 headers={
# # # #                     "Authorization": f"Bearer {settings.RESEND_API_KEY}",
# # # #                     "Content-Type": "application/json",
# # # #                 },
# # # #             )

# # # #         if response.status_code >= 400:
# # # #             raise BusinessRuleError("Could not send reset OTP. Please try again later.")


# # # """
# # # app/services/email_service.py
# # # Transactional email helpers for password reset OTP.
# # # """
# # # from html import escape
# # # import logging

# # # import httpx

# # # from app.core.config import settings
# # # from app.core.exceptions import BusinessRuleError


# # # logger = logging.getLogger("vastrika")


# # # class EmailService:
# # #     EMAILJS_SEND_URL = "https://api.emailjs.com/api/v1.0/email/send"
# # #     RESEND_SEND_URL = "https://api.resend.com/emails"

# # #     async def send_password_reset_otp(
# # #         self,
# # #         to_email: str,
# # #         to_name: str,
# # #         otp: str,
# # #         expires_minutes: int,
# # #     ) -> None:
# # #         provider = settings.EMAIL_PROVIDER.lower().strip()

# # #         if provider == "emailjs":
# # #             await self._send_with_emailjs(to_email, to_name, otp, expires_minutes)
# # #             return

# # #         if provider == "resend":
# # #             await self._send_with_resend(to_email, to_name, otp, expires_minutes)
# # #             return

# # #         raise BusinessRuleError("Email provider is not configured correctly")

# # #     def _build_html(self, to_name: str, otp: str, expires_minutes: int) -> str:
# # #         safe_name = escape(to_name or "Customer")
# # #         safe_otp = escape(otp)

# # #         return f"""
# # #             <div style="font-family: Arial, sans-serif; background:#f8f5f0; padding:24px;">
# # #               <div style="max-width:520px; margin:0 auto; background:#ffffff; border:1px solid #eadfce; border-radius:16px; padding:28px;">
# # #                 <h2 style="margin:0 0 12px; color:#1f1f1f;">Password reset OTP</h2>
# # #                 <p style="margin:0 0 16px; color:#555;">Hi {safe_name},</p>
# # #                 <p style="margin:0 0 20px; color:#555;">
# # #                   Use this OTP to reset your Vastrika account password.
# # #                 </p>
# # #                 <div style="font-size:30px; letter-spacing:8px; font-weight:700; color:#7a4e48; background:#f8f5f0; border-radius:12px; padding:16px; text-align:center;">
# # #                   {safe_otp}
# # #                 </div>
# # #                 <p style="margin:20px 0 0; color:#777; font-size:14px;">
# # #                   This OTP expires in {expires_minutes} minutes. If you did not request this, you can safely ignore this email.
# # #                 </p>
# # #               </div>
# # #             </div>
# # #         """

# # #     async def _send_with_emailjs(
# # #         self,
# # #         to_email: str,
# # #         to_name: str,
# # #         otp: str,
# # #         expires_minutes: int,
# # #     ) -> None:
# # #         if not settings.EMAILJS_SERVICE_ID:
# # #             raise BusinessRuleError("EmailJS service ID is missing")
# # #         if not settings.EMAILJS_TEMPLATE_ID:
# # #             raise BusinessRuleError("EmailJS template ID is missing")
# # #         if not settings.EMAILJS_PUBLIC_KEY:
# # #             raise BusinessRuleError("EmailJS public key is missing")

# # #         message = (
# # #             f"Your Vastrika password reset OTP is {otp}. "
# # #             f"It expires in {expires_minutes} minutes."
# # #         )

# # #         payload: dict[str, object] = {
# # #             "service_id": settings.EMAILJS_SERVICE_ID,
# # #             "template_id": settings.EMAILJS_TEMPLATE_ID,
# # #             "user_id": settings.EMAILJS_PUBLIC_KEY,
# # #             "template_params": {
# # #                 "to_email": to_email,
# # #                 "to_name": to_name or "Customer",
# # #                 "user_email": to_email,
# # #                 "user_name": to_name or "Customer",
# # #                 "email": to_email,
# # #                 "name": to_name or "Customer",
# # #                 "otp": otp,
# # #                 "code": otp,
# # #                 "passcode": otp,
# # #                 "expires_minutes": expires_minutes,
# # #                 "app_name": settings.APP_NAME,
# # #                 "subject": "Your Vastrika password reset OTP",
# # #                 "message": message,
# # #                 "html_message": self._build_html(to_name, otp, expires_minutes),
# # #             },
# # #         }

# # #         async with httpx.AsyncClient(timeout=15) as client:
# # #             response = await client.post(
# # #                 self.EMAILJS_SEND_URL,
# # #                 json=payload,
# # #                 headers={"Content-Type": "application/json"},
# # #             )

# # #         if response.status_code >= 400:
# # #             detail = response.text.strip()
# # #             logger.warning(
# # #                 "emailjs_send_failed",
# # #                 extra={
# # #                     "status_code": response.status_code,
# # #                     "detail": detail[:600],
# # #                 },
# # #             )

# # #             if settings.APP_ENV.lower() == "development":
# # #                 raise BusinessRuleError(
# # #                     f"EmailJS error {response.status_code}: {detail[:220]}"
# # #                 )

# # #             raise BusinessRuleError("Could not send reset OTP. Please try again later.")

# # #     async def _send_with_resend(
# # #         self,
# # #         to_email: str,
# # #         to_name: str,
# # #         otp: str,
# # #         expires_minutes: int,
# # #     ) -> None:
# # #         if not settings.RESEND_API_KEY:
# # #             raise BusinessRuleError("Resend API key is missing")
# # #         if not settings.RESEND_FROM_EMAIL:
# # #             raise BusinessRuleError("Resend sender email is missing")

# # #         payload = {
# # #             "from": f"{settings.RESEND_FROM_NAME} <{settings.RESEND_FROM_EMAIL}>",
# # #             "to": [to_email],
# # #             "subject": "Your Vastrika password reset OTP",
# # #             "html": self._build_html(to_name, otp, expires_minutes),
# # #             "text": (
# # #                 f"Your Vastrika password reset OTP is {otp}. "
# # #                 f"It expires in {expires_minutes} minutes."
# # #             ),
# # #         }

# # #         async with httpx.AsyncClient(timeout=15) as client:
# # #             response = await client.post(
# # #                 self.RESEND_SEND_URL,
# # #                 json=payload,
# # #                 headers={
# # #                     "Authorization": f"Bearer {settings.RESEND_API_KEY}",
# # #                     "Content-Type": "application/json",
# # #                 },
# # #             )

# # #         if response.status_code >= 400:
# # #             detail = response.text.strip()
# # #             logger.warning(
# # #                 "resend_send_failed",
# # #                 extra={
# # #                     "status_code": response.status_code,
# # #                     "detail": detail[:600],
# # #                 },
# # #             )

# # #             if settings.APP_ENV.lower() == "development":
# # #                 raise BusinessRuleError(
# # #                     f"Resend error {response.status_code}: {detail[:220]}"
# # #                 )

# # #             raise BusinessRuleError("Could not send reset OTP. Please try again later.")


# # """
# # app/services/email_service.py
# # Transactional email helpers for password reset OTP.
# # """
# # from html import escape
# # import logging

# # import httpx

# # from app.core.config import settings
# # from app.core.exceptions import BusinessRuleError


# # logger = logging.getLogger("vastrika")


# # class EmailService:
# #     EMAILJS_SEND_URL = "https://api.emailjs.com/api/v1.0/email/send"
# #     RESEND_SEND_URL = "https://api.resend.com/emails"

# #     async def send_password_reset_otp(
# #         self,
# #         to_email: str,
# #         to_name: str,
# #         otp: str,
# #         expires_minutes: int,
# #     ) -> None:
# #         provider = settings.EMAIL_PROVIDER.lower().strip()

# #         if provider == "emailjs":
# #             await self._send_with_emailjs(to_email, to_name, otp, expires_minutes)
# #             return

# #         if provider == "resend":
# #             await self._send_with_resend(to_email, to_name, otp, expires_minutes)
# #             return

# #         raise BusinessRuleError("Email provider is not configured correctly")

# #     def _build_html(self, to_name: str, otp: str, expires_minutes: int) -> str:
# #         safe_name = escape(to_name or "Customer")
# #         safe_otp = escape(otp)

# #         return f"""
# #             <div style="font-family: Arial, sans-serif; background:#f8f5f0; padding:24px;">
# #               <div style="max-width:520px; margin:0 auto; background:#ffffff; border:1px solid #eadfce; border-radius:16px; padding:28px;">
# #                 <h2 style="margin:0 0 12px; color:#1f1f1f;">Password reset OTP</h2>
# #                 <p style="margin:0 0 16px; color:#555;">Hi {safe_name},</p>
# #                 <p style="margin:0 0 20px; color:#555;">
# #                   Use this OTP to reset your Vastrika account password.
# #                 </p>
# #                 <div style="font-size:30px; letter-spacing:8px; font-weight:700; color:#7a4e48; background:#f8f5f0; border-radius:12px; padding:16px; text-align:center;">
# #                   {safe_otp}
# #                 </div>
# #                 <p style="margin:20px 0 0; color:#777; font-size:14px;">
# #                   This OTP expires in {expires_minutes} minutes. If you did not request this, you can safely ignore this email.
# #                 </p>
# #               </div>
# #             </div>
# #         """

# #     async def _send_with_emailjs(
# #         self,
# #         to_email: str,
# #         to_name: str,
# #         otp: str,
# #         expires_minutes: int,
# #     ) -> None:
# #         if not settings.EMAILJS_SERVICE_ID:
# #             raise BusinessRuleError("EmailJS service ID is missing")
# #         if not settings.EMAILJS_TEMPLATE_ID:
# #             raise BusinessRuleError("EmailJS template ID is missing")
# #         if not settings.EMAILJS_PUBLIC_KEY:
# #             raise BusinessRuleError("EmailJS public key is missing")

# #         message = (
# #             f"Your Vastrika password reset OTP is {otp}. "
# #             f"It expires in {expires_minutes} minutes."
# #         )

# #         payload: dict[str, object] = {
# #             "service_id": settings.EMAILJS_SERVICE_ID,
# #             "template_id": settings.EMAILJS_TEMPLATE_ID,
# #             "user_id": settings.EMAILJS_PUBLIC_KEY,
# #             "template_params": {
# #                 "to_email": to_email,
# #                 "to_name": to_name or "Customer",
# #                 "user_email": to_email,
# #                 "user_name": to_name or "Customer",
# #                 "email": to_email,
# #                 "name": to_name or "Customer",
# #                 "otp": otp,
# #                 "code": otp,
# #                 "passcode": otp,
# #                 "expires_minutes": expires_minutes,
# #                 "app_name": settings.APP_NAME,
# #                 "subject": "Your Vastrika password reset OTP",
# #                 "message": message,
# #                 "html_message": self._build_html(to_name, otp, expires_minutes),
# #             },
# #         }

# #         if settings.EMAILJS_PRIVATE_KEY:
# #             payload["accessToken"] = settings.EMAILJS_PRIVATE_KEY

# #         async with httpx.AsyncClient(timeout=15) as client:
# #             response = await client.post(
# #                 self.EMAILJS_SEND_URL,
# #                 json=payload,
# #                 headers={"Content-Type": "application/json"},
# #             )

# #         if response.status_code >= 400:
# #             detail = response.text.strip()
# #             logger.warning(
# #                 "emailjs_send_failed",
# #                 extra={
# #                     "status_code": response.status_code,
# #                     "detail": detail[:600],
# #                 },
# #             )

# #             if settings.APP_ENV.lower() == "development":
# #                 raise BusinessRuleError(
# #                     f"EmailJS error {response.status_code}: {detail[:220]}"
# #                 )

# #             raise BusinessRuleError("Could not send reset OTP. Please try again later.")

# #     async def _send_with_resend(
# #         self,
# #         to_email: str,
# #         to_name: str,
# #         otp: str,
# #         expires_minutes: int,
# #     ) -> None:
# #         if not settings.RESEND_API_KEY:
# #             raise BusinessRuleError("Resend API key is missing")
# #         if not settings.RESEND_FROM_EMAIL:
# #             raise BusinessRuleError("Resend sender email is missing")

# #         payload = {
# #             "from": f"{settings.RESEND_FROM_NAME} <{settings.RESEND_FROM_EMAIL}>",
# #             "to": [to_email],
# #             "subject": "Your Vastrika password reset OTP",
# #             "html": self._build_html(to_name, otp, expires_minutes),
# #             "text": (
# #                 f"Your Vastrika password reset OTP is {otp}. "
# #                 f"It expires in {expires_minutes} minutes."
# #             ),
# #         }

# #         async with httpx.AsyncClient(timeout=15) as client:
# #             response = await client.post(
# #                 self.RESEND_SEND_URL,
# #                 json=payload,
# #                 headers={
# #                     "Authorization": f"Bearer {settings.RESEND_API_KEY}",
# #                     "Content-Type": "application/json",
# #                 },
# #             )

# #         if response.status_code >= 400:
# #             detail = response.text.strip()
# #             logger.warning(
# #                 "resend_send_failed",
# #                 extra={
# #                     "status_code": response.status_code,
# #                     "detail": detail[:600],
# #                 },
# #             )

# #             if settings.APP_ENV.lower() == "development":
# #                 raise BusinessRuleError(
# #                     f"Resend error {response.status_code}: {detail[:220]}"
# #                 )

# #             raise BusinessRuleError("Could not send reset OTP. Please try again later.")


# """
# app/services/email_service.py
# Transactional email helpers for password reset OTP.
# """
# from html import escape
# import logging

# import httpx

# from app.core.config import settings
# from app.core.exceptions import BusinessRuleError


# logger = logging.getLogger("vastrika")


# class EmailService:
#     EMAILJS_SEND_URL = "https://api.emailjs.com/api/v1.0/email/send"
#     RESEND_SEND_URL = "https://api.resend.com/emails"

#     async def send_password_reset_otp(
#         self,
#         to_email: str,
#         to_name: str,
#         otp: str,
#         expires_minutes: int,
#     ) -> None:
#         provider = settings.EMAIL_PROVIDER.lower().strip()

#         if provider == "emailjs":
#             await self._send_with_emailjs(to_email, to_name, otp, expires_minutes)
#             return

#         if provider == "resend":
#             await self._send_with_resend(to_email, to_name, otp, expires_minutes)
#             return

#         raise BusinessRuleError("Email provider is not configured correctly")

#     def _build_html(self, to_name: str, otp: str, expires_minutes: int) -> str:
#         safe_name = escape(to_name or "Customer")
#         safe_otp = escape(otp)

#         return f"""
#             <div style="font-family: Arial, sans-serif; background:#f8f5f0; padding:24px;">
#               <div style="max-width:520px; margin:0 auto; background:#ffffff; border:1px solid #eadfce; border-radius:16px; padding:28px;">
#                 <h2 style="margin:0 0 12px; color:#1f1f1f;">Password reset OTP</h2>
#                 <p style="margin:0 0 16px; color:#555;">Hi {safe_name},</p>
#                 <p style="margin:0 0 20px; color:#555;">
#                   Use this OTP to reset your Vastrika account password.
#                 </p>
#                 <div style="font-size:30px; letter-spacing:8px; font-weight:700; color:#7a4e48; background:#f8f5f0; border-radius:12px; padding:16px; text-align:center;">
#                   {safe_otp}
#                 </div>
#                 <p style="margin:20px 0 0; color:#777; font-size:14px;">
#                   This OTP expires in {expires_minutes} minutes. If you did not request this, you can safely ignore this email.
#                 </p>
#               </div>
#             </div>
#         """

#     async def _send_with_emailjs(
#         self,
#         to_email: str,
#         to_name: str,
#         otp: str,
#         expires_minutes: int,
#     ) -> None:
#         if not settings.EMAILJS_SERVICE_ID:
#             raise BusinessRuleError("EmailJS service ID is missing")
#         if not settings.EMAILJS_TEMPLATE_ID:
#             raise BusinessRuleError("EmailJS template ID is missing")
#         if not settings.EMAILJS_PUBLIC_KEY:
#             raise BusinessRuleError("EmailJS public key is missing")

#         message = (
#             f"Your Vastrika password reset OTP is {otp}. "
#             f"It expires in {expires_minutes} minutes."
#         )

#         payload: dict[str, object] = {
#             "service_id": settings.EMAILJS_SERVICE_ID,
#             "template_id": settings.EMAILJS_TEMPLATE_ID,
#             "user_id": settings.EMAILJS_PUBLIC_KEY,
#             "template_params": {
#                 "to_email": to_email,
#                 "to_name": to_name or "Customer",
#                 "user_email": to_email,
#                 "user_name": to_name or "Customer",
#                 "email": to_email,
#                 "name": to_name or "Customer",
#                 "otp": otp,
#                 "OTP": otp,
#                 "otp_code": otp,
#                 "code": otp,
#                 "reset_code": otp,
#                 "passcode": otp,
#                 "reset_otp": otp,
#                 "expires_minutes": expires_minutes,
#                 "expiry_minutes": expires_minutes,
#                 "valid_minutes": expires_minutes,
#                 "minutes": expires_minutes,
#                 "app_name": settings.APP_NAME,
#                 "subject": "Your Vastrika password reset OTP",
#                 "message": message,
#                 "html_message": self._build_html(to_name, otp, expires_minutes),
#             },
#         }

#         if settings.EMAILJS_PRIVATE_KEY:
#             payload["accessToken"] = settings.EMAILJS_PRIVATE_KEY

#         async with httpx.AsyncClient(timeout=15) as client:
#             response = await client.post(
#                 self.EMAILJS_SEND_URL,
#                 json=payload,
#                 headers={"Content-Type": "application/json"},
#             )

#         if response.status_code >= 400:
#             detail = response.text.strip()
#             logger.warning(
#                 "emailjs_send_failed",
#                 extra={
#                     "status_code": response.status_code,
#                     "detail": detail[:600],
#                 },
#             )

#             if settings.APP_ENV.lower() == "development":
#                 raise BusinessRuleError(
#                     f"EmailJS error {response.status_code}: {detail[:220]}"
#                 )

#             raise BusinessRuleError("Could not send reset OTP. Please try again later.")

#     async def _send_with_resend(
#         self,
#         to_email: str,
#         to_name: str,
#         otp: str,
#         expires_minutes: int,
#     ) -> None:
#         if not settings.RESEND_API_KEY:
#             raise BusinessRuleError("Resend API key is missing")
#         if not settings.RESEND_FROM_EMAIL:
#             raise BusinessRuleError("Resend sender email is missing")

#         payload = {
#             "from": f"{settings.RESEND_FROM_NAME} <{settings.RESEND_FROM_EMAIL}>",
#             "to": [to_email],
#             "subject": "Your Vastrika password reset OTP",
#             "html": self._build_html(to_name, otp, expires_minutes),
#             "text": (
#                 f"Your Vastrika password reset OTP is {otp}. "
#                 f"It expires in {expires_minutes} minutes."
#             ),
#         }

#         async with httpx.AsyncClient(timeout=15) as client:
#             response = await client.post(
#                 self.RESEND_SEND_URL,
#                 json=payload,
#                 headers={
#                     "Authorization": f"Bearer {settings.RESEND_API_KEY}",
#                     "Content-Type": "application/json",
#                 },
#             )

#         if response.status_code >= 400:
#             detail = response.text.strip()
#             logger.warning(
#                 "resend_send_failed",
#                 extra={
#                     "status_code": response.status_code,
#                     "detail": detail[:600],
#                 },
#             )

#             if settings.APP_ENV.lower() == "development":
#                 raise BusinessRuleError(
#                     f"Resend error {response.status_code}: {detail[:220]}"
#                 )

#             raise BusinessRuleError("Could not send reset OTP. Please try again later.")


"""
app/services/email_service.py
Transactional email helpers for password reset OTP.
"""
from html import escape
import logging

import httpx

from app.core.config import settings
from app.core.exceptions import BusinessRuleError


logger = logging.getLogger("vastrika")


class EmailService:
    EMAILJS_SEND_URL = "https://api.emailjs.com/api/v1.0/email/send"
    RESEND_SEND_URL = "https://api.resend.com/emails"

    async def send_password_reset_otp(
        self,
        to_email: str,
        to_name: str,
        otp: str,
        expires_minutes: int,
    ) -> None:
        provider = settings.EMAIL_PROVIDER.lower().strip()

        if provider == "emailjs":
            await self._send_with_emailjs(to_email, to_name, otp, expires_minutes)
            return

        if provider == "resend":
            await self._send_with_resend(to_email, to_name, otp, expires_minutes)
            return

        raise BusinessRuleError("Email provider is not configured correctly")

    def _build_html(self, to_name: str, otp: str, expires_minutes: int) -> str:
        safe_name = escape(to_name or "Customer")
        safe_otp = escape(otp)

        return f"""
            <div style="font-family: Arial, sans-serif; background:#f8f5f0; padding:24px;">
              <div style="max-width:520px; margin:0 auto; background:#ffffff; border:1px solid #eadfce; border-radius:16px; padding:28px;">
                <h2 style="margin:0 0 12px; color:#1f1f1f;">Password reset OTP</h2>
                <p style="margin:0 0 16px; color:#555;">Hi {safe_name},</p>
                <p style="margin:0 0 20px; color:#555;">
                  Use this OTP to reset your Vastrika account password.
                </p>
                <div style="font-size:30px; letter-spacing:8px; font-weight:700; color:#7a4e48; background:#f8f5f0; border-radius:12px; padding:16px; text-align:center;">
                  {safe_otp}
                </div>
                <p style="margin:20px 0 0; color:#777; font-size:14px;">
                  This OTP expires in {expires_minutes} minutes. If you did not request this, you can safely ignore this email.
                </p>
              </div>
            </div>
        """

    async def _send_with_emailjs(
        self,
        to_email: str,
        to_name: str,
        otp: str,
        expires_minutes: int,
    ) -> None:
        if not settings.EMAILJS_SERVICE_ID:
            raise BusinessRuleError("EmailJS service ID is missing")
        if not settings.EMAILJS_TEMPLATE_ID:
            raise BusinessRuleError("EmailJS template ID is missing")
        if not settings.EMAILJS_PUBLIC_KEY:
            raise BusinessRuleError("EmailJS public key is missing")

        message = (
            f"Your Vastrika password reset OTP is {otp}. "
            f"It expires in {expires_minutes} minutes."
        )

        payload: dict[str, object] = {
            "service_id": settings.EMAILJS_SERVICE_ID,
            "template_id": settings.EMAILJS_TEMPLATE_ID,
            "user_id": settings.EMAILJS_PUBLIC_KEY,
            "template_params": {
                "to_email": to_email,
                "to_name": to_name or "Customer",
                "user_email": to_email,
                "user_name": to_name or "Customer",
                "email": to_email,
                "name": to_name or "Customer",
                "otp": otp,
                "OTP": otp,
                "otp_code": otp,
                "code": otp,
                "reset_code": otp,
                "passcode": otp,
                "reset_otp": otp,
                "expires_minutes": expires_minutes,
                "expiry_minutes": expires_minutes,
                "valid_minutes": expires_minutes,
                "minutes": expires_minutes,
                "app_name": settings.APP_NAME,
                "subject": "Your Vastrika password reset OTP",
                "message": message,
                "html_message": self._build_html(to_name, otp, expires_minutes),
            },
        }

        if settings.EMAILJS_PRIVATE_KEY:
            payload["accessToken"] = settings.EMAILJS_PRIVATE_KEY

        async with httpx.AsyncClient(timeout=15) as client:
            response = await client.post(
                self.EMAILJS_SEND_URL,
                json=payload,
                headers={"Content-Type": "application/json"},
            )

        if response.status_code >= 400:
            detail = response.text.strip()
            logger.warning(
                "emailjs_send_failed",
                extra={
                    "status_code": response.status_code,
                    "detail": detail[:600],
                },
            )

            if settings.APP_ENV.lower() == "development":
                raise BusinessRuleError(
                    f"EmailJS error {response.status_code}: {detail[:220]}"
                )

            raise BusinessRuleError("Could not send reset OTP. Please try again later.")

    async def _send_with_resend(
        self,
        to_email: str,
        to_name: str,
        otp: str,
        expires_minutes: int,
    ) -> None:
        if not settings.RESEND_API_KEY:
            raise BusinessRuleError("Resend API key is missing")
        if not settings.RESEND_FROM_EMAIL:
            raise BusinessRuleError("Resend sender email is missing")

        payload = {
            "from": f"{settings.RESEND_FROM_NAME} <{settings.RESEND_FROM_EMAIL}>",
            "to": [to_email],
            "subject": "Your Vastrika password reset OTP",
            "html": self._build_html(to_name, otp, expires_minutes),
            "text": (
                f"Your Vastrika password reset OTP is {otp}. "
                f"It expires in {expires_minutes} minutes."
            ),
        }

        async with httpx.AsyncClient(timeout=15) as client:
            response = await client.post(
                self.RESEND_SEND_URL,
                json=payload,
                headers={
                    "Authorization": f"Bearer {settings.RESEND_API_KEY}",
                    "Content-Type": "application/json",
                },
            )

        if response.status_code >= 400:
            detail = response.text.strip()
            logger.warning(
                "resend_send_failed",
                extra={
                    "status_code": response.status_code,
                    "detail": detail[:600],
                },
            )

            if settings.APP_ENV.lower() == "development":
                raise BusinessRuleError(
                    f"Resend error {response.status_code}: {detail[:220]}"
                )

            raise BusinessRuleError("Could not send reset OTP. Please try again later.")
