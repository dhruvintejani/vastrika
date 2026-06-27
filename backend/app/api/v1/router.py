# """
# app/api/v1/router.py
# Aggregates all route modules into a single v1 APIRouter.
# """
# from fastapi import APIRouter

# from app.api.v1.auth.routes import router as auth_router
# from app.api.v1.admin.auth.routes import router as admin_auth_router
# from app.api.v1.admin.products.routes import router as admin_products_router
# from app.api.v1.admin.orders.routes import router as admin_orders_router
# from app.api.v1.admin.users.routes import router as admin_users_router
# from app.api.v1.admin.dashboard.routes import router as admin_dashboard_router
# from app.api.v1.admin.coupons.routes import router as coupons_router
# from app.api.v1.admin.banners.routes import router as banners_router
# from app.api.v1.admin.reviews.routes import router as reviews_router
# from app.api.v1.admin.settings.routes import router as settings_router
# from app.api.v1.admin.inventory.routes import router as inventory_router
# from app.api.v1.products.routes import router as products_router
# from app.api.v1.cart.routes import router as cart_router
# from app.api.v1.wishlist.routes import router as wishlist_router
# from app.api.v1.orders.routes import router as orders_router
# from app.api.v1.contact.routes import router as contact_router

# api_router = APIRouter(prefix="/api/v1")

# # Public routes
# api_router.include_router(auth_router)
# api_router.include_router(products_router)
# api_router.include_router(contact_router)
# api_router.include_router(banners_router)    # GET /banners is public
# api_router.include_router(reviews_router)   # GET /products/{id}/reviews is public
# api_router.include_router(coupons_router)   # POST /coupons/validate is authenticated

# # Authenticated customer routes
# api_router.include_router(cart_router)
# api_router.include_router(wishlist_router)
# api_router.include_router(orders_router)

# # Admin routes (all require admin JWT)
# api_router.include_router(admin_auth_router)
# api_router.include_router(admin_products_router)
# api_router.include_router(admin_orders_router)
# api_router.include_router(admin_users_router)
# api_router.include_router(admin_dashboard_router)
# api_router.include_router(settings_router)
# api_router.include_router(inventory_router)


"""
app/api/v1/router.py
Aggregates all route modules into a single v1 APIRouter.
"""
from fastapi import APIRouter

from app.api.v1.auth.routes import router as auth_router
from app.api.v1.admin.auth.routes import router as admin_auth_router
from app.api.v1.admin.products.routes import router as admin_products_router
from app.api.v1.admin.orders.routes import router as admin_orders_router
from app.api.v1.admin.users.routes import router as admin_users_router
from app.api.v1.admin.dashboard.routes import router as admin_dashboard_router
from app.api.v1.admin.coupons.routes import router as coupons_router
from app.api.v1.admin.banners.routes import router as banners_router
from app.api.v1.admin.reviews.routes import router as reviews_router
from app.api.v1.admin.settings.routes import router as settings_router
from app.api.v1.admin.inventory.routes import router as inventory_router
from app.api.v1.products.routes import router as products_router
from app.api.v1.cart.routes import router as cart_router
from app.api.v1.wishlist.routes import router as wishlist_router
from app.api.v1.orders.routes import router as orders_router
from app.api.v1.contact.routes import router as contact_router

api_router = APIRouter(prefix="/api/v1")

# Public routes
api_router.include_router(auth_router)
api_router.include_router(products_router)
api_router.include_router(contact_router)
api_router.include_router(banners_router)    # GET /banners is public
api_router.include_router(reviews_router)   # GET /products/{id}/reviews is public
api_router.include_router(coupons_router)   # POST /coupons/validate is authenticated

# Authenticated customer routes
api_router.include_router(cart_router)
api_router.include_router(wishlist_router)
api_router.include_router(orders_router)

# Admin routes (all require admin JWT)
api_router.include_router(admin_auth_router)
api_router.include_router(admin_products_router)
api_router.include_router(admin_orders_router)
api_router.include_router(admin_users_router)
api_router.include_router(admin_dashboard_router)
api_router.include_router(settings_router)
api_router.include_router(inventory_router)