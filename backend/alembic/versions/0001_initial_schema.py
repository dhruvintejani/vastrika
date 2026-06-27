# """Initial schema — all tables

# Revision ID: 0001_initial
# Revises:
# Create Date: 2025-01-01 00:00:00.000000
# """
# from typing import Sequence, Union

# import sqlalchemy as sa
# from alembic import op

# revision: str = "0001_initial"
# down_revision: Union[str, None] = None
# branch_labels: Union[str, Sequence[str], None] = None
# depends_on: Union[str, Sequence[str], None] = None


# def upgrade() -> None:
#     # ── users ─────────────────────────────────────────────────────────────────
#     op.create_table(
#         "users",
#         sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
#         sa.Column("email", sa.String(255), nullable=False),
#         sa.Column("hashed_password", sa.String(255), nullable=False),
#         sa.Column("full_name", sa.String(255), nullable=False),
#         sa.Column("phone", sa.String(20), nullable=True),
#         sa.Column("address_line1", sa.String(500), nullable=True),
#         sa.Column("address_line2", sa.String(500), nullable=True),
#         sa.Column("city", sa.String(100), nullable=True),
#         sa.Column("state", sa.String(100), nullable=True),
#         sa.Column("pincode", sa.String(10), nullable=True),
#         sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
#         sa.Column("is_blocked", sa.Boolean(), nullable=False, server_default=sa.false()),
#         sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
#         sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now()),
#     )
#     op.create_index("ix_users_email", "users", ["email"], unique=True)

#     # ── admins ────────────────────────────────────────────────────────────────
#     op.create_table(
#         "admins",
#         sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
#         sa.Column("email", sa.String(255), nullable=False),
#         sa.Column("hashed_password", sa.String(255), nullable=False),
#         sa.Column("full_name", sa.String(255), nullable=False),
#         sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
#         sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
#         sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
#     )
#     op.create_index("ix_admins_email", "admins", ["email"], unique=True)

#     # ── admin_sessions ────────────────────────────────────────────────────────
#     op.create_table(
#         "admin_sessions",
#         sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
#         sa.Column("admin_id", sa.BigInteger(), sa.ForeignKey("admins.id", ondelete="CASCADE"), nullable=False),
#         sa.Column("token_jti", sa.String(255), nullable=False),
#         sa.Column("expires_at", sa.DateTime(timezone=True), nullable=False),
#         sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
#         sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
#     )
#     op.create_index("ix_admin_sessions_admin_id", "admin_sessions", ["admin_id"])
#     op.create_index("ix_admin_sessions_token_jti", "admin_sessions", ["token_jti"], unique=True)

#     # ── refresh_tokens ────────────────────────────────────────────────────────
#     op.create_table(
#         "refresh_tokens",
#         sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
#         sa.Column("user_id", sa.BigInteger(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
#         sa.Column("token_hash", sa.String(255), nullable=False),
#         sa.Column("expires_at", sa.DateTime(timezone=True), nullable=False),
#         sa.Column("is_revoked", sa.Boolean(), nullable=False, server_default=sa.false()),
#         sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
#     )
#     op.create_index("ix_refresh_tokens_user_id", "refresh_tokens", ["user_id"])
#     op.create_index("ix_refresh_tokens_token_hash", "refresh_tokens", ["token_hash"], unique=True)

#     # ── categories ────────────────────────────────────────────────────────────
#     op.create_table(
#         "categories",
#         sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
#         sa.Column("name", sa.String(100), nullable=False),
#         sa.Column("slug", sa.String(100), nullable=False),
#         sa.Column("description", sa.Text(), nullable=True),
#         sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
#     )
#     op.create_index("ix_categories_slug", "categories", ["slug"], unique=True)
#     op.create_index("ix_categories_name", "categories", ["name"], unique=True)

#     # ── products ──────────────────────────────────────────────────────────────
#     op.create_table(
#         "products",
#         sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
#         sa.Column("title", sa.String(500), nullable=False),
#         sa.Column("description", sa.Text(), nullable=True),
#         sa.Column("category_id", sa.Integer(), sa.ForeignKey("categories.id", ondelete="RESTRICT"), nullable=False),
#         sa.Column("price", sa.Numeric(10, 2), nullable=False),
#         sa.Column("old_price", sa.Numeric(10, 2), nullable=False),
#         sa.Column("badge", sa.String(50), nullable=True),
#         sa.Column("rating", sa.Numeric(3, 2), nullable=False, server_default="0.00"),
#         sa.Column("review_count", sa.Integer(), nullable=False, server_default="0"),
#         sa.Column("is_new", sa.Boolean(), nullable=False, server_default=sa.false()),
#         sa.Column("is_featured", sa.Boolean(), nullable=False, server_default=sa.false()),
#         sa.Column("is_deleted", sa.Boolean(), nullable=False, server_default=sa.false()),
#         sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
#         sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
#         sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
#     )
#     op.create_index("ix_products_category_id", "products", ["category_id"])
#     op.create_index("ix_products_title", "products", ["title"])

#     # ── product_images ────────────────────────────────────────────────────────
#     op.create_table(
#         "product_images",
#         sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
#         sa.Column("product_id", sa.BigInteger(), sa.ForeignKey("products.id", ondelete="CASCADE"), nullable=False),
#         sa.Column("cloudinary_public_id", sa.String(500), nullable=False),
#         sa.Column("url", sa.String(1000), nullable=False),
#         sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
#     )
#     op.create_index("ix_product_images_product_id", "product_images", ["product_id"])

#     # ── product_variants ──────────────────────────────────────────────────────
#     op.create_table(
#         "product_variants",
#         sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
#         sa.Column("product_id", sa.BigInteger(), sa.ForeignKey("products.id", ondelete="CASCADE"), nullable=False),
#         sa.Column("size", sa.String(50), nullable=False),
#         sa.Column("color", sa.String(100), nullable=False),
#         sa.Column("stock", sa.Integer(), nullable=False, server_default="0"),
#         sa.Column("additional_price", sa.Numeric(10, 2), nullable=False, server_default="0.00"),
#         sa.UniqueConstraint("product_id", "size", "color", name="uq_variant"),
#     )
#     op.create_index("ix_product_variants_product_id", "product_variants", ["product_id"])

#     # ── carts ─────────────────────────────────────────────────────────────────
#     op.create_table(
#         "carts",
#         sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
#         sa.Column("user_id", sa.BigInteger(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
#         sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
#         sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
#     )
#     op.create_index("ix_carts_user_id", "carts", ["user_id"], unique=True)

#     # ── cart_items ────────────────────────────────────────────────────────────
#     op.create_table(
#         "cart_items",
#         sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
#         sa.Column("cart_id", sa.BigInteger(), sa.ForeignKey("carts.id", ondelete="CASCADE"), nullable=False),
#         sa.Column("product_id", sa.BigInteger(), sa.ForeignKey("products.id", ondelete="CASCADE"), nullable=False),
#         sa.Column("variant_id", sa.BigInteger(), sa.ForeignKey("product_variants.id", ondelete="SET NULL"), nullable=True),
#         sa.Column("selected_size", sa.String(50), nullable=False),
#         sa.Column("selected_color", sa.String(100), nullable=False),
#         sa.Column("quantity", sa.Integer(), nullable=False),
#         sa.Column("added_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
#         sa.UniqueConstraint("cart_id", "product_id", "selected_size", "selected_color", name="uq_cart_item"),
#     )
#     op.create_index("ix_cart_items_cart_id", "cart_items", ["cart_id"])

#     # ── wishlists ─────────────────────────────────────────────────────────────
#     op.create_table(
#         "wishlists",
#         sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
#         sa.Column("user_id", sa.BigInteger(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
#         sa.Column("product_id", sa.BigInteger(), sa.ForeignKey("products.id", ondelete="CASCADE"), nullable=False),
#         sa.Column("added_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
#         sa.UniqueConstraint("user_id", "product_id", name="uq_wishlist_item"),
#     )
#     op.create_index("ix_wishlists_user_id", "wishlists", ["user_id"])
#     op.create_index("ix_wishlists_product_id", "wishlists", ["product_id"])

#     # ── orders ────────────────────────────────────────────────────────────────
#     op.create_table(
#         "orders",
#         sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
#         sa.Column("order_number", sa.String(50), nullable=False),
#         sa.Column("user_id", sa.BigInteger(), sa.ForeignKey("users.id", ondelete="RESTRICT"), nullable=False),
#         sa.Column("status", sa.Enum("pending", "confirmed", "processing", "shipped", "delivered", "cancelled", name="orderstatus"), nullable=False, server_default="pending"),
#         sa.Column("subtotal", sa.Numeric(10, 2), nullable=False),
#         sa.Column("shipping_charge", sa.Numeric(10, 2), nullable=False),
#         sa.Column("discount_amount", sa.Numeric(10, 2), nullable=False, server_default="0.00"),
#         sa.Column("total_amount", sa.Numeric(10, 2), nullable=False),
#         sa.Column("shipping_name", sa.String(255), nullable=False),
#         sa.Column("shipping_phone", sa.String(20), nullable=False),
#         sa.Column("shipping_address", sa.Text(), nullable=False),
#         sa.Column("payment_method", sa.Enum("upi", "card", "cod", "netbanking", name="paymentmethod"), nullable=False, server_default="cod"),
#         sa.Column("payment_status", sa.Enum("pending", "paid", "failed", "refunded", name="paymentstatus"), nullable=False, server_default="pending"),
#         sa.Column("notes", sa.Text(), nullable=True),
#         sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
#         sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
#     )
#     op.create_index("ix_orders_order_number", "orders", ["order_number"], unique=True)
#     op.create_index("ix_orders_user_id", "orders", ["user_id"])
#     op.create_index("ix_orders_status", "orders", ["status"])
#     op.create_index("ix_orders_created_at", "orders", ["created_at"])

#     # ── order_items ───────────────────────────────────────────────────────────
#     op.create_table(
#         "order_items",
#         sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
#         sa.Column("order_id", sa.BigInteger(), sa.ForeignKey("orders.id", ondelete="CASCADE"), nullable=False),
#         sa.Column("product_id", sa.BigInteger(), sa.ForeignKey("products.id", ondelete="RESTRICT"), nullable=False),
#         sa.Column("product_title", sa.String(500), nullable=False),
#         sa.Column("product_image", sa.String(1000), nullable=False),
#         sa.Column("selected_size", sa.String(50), nullable=False),
#         sa.Column("selected_color", sa.String(100), nullable=False),
#         sa.Column("quantity", sa.Integer(), nullable=False),
#         sa.Column("unit_price", sa.Numeric(10, 2), nullable=False),
#         sa.Column("total_price", sa.Numeric(10, 2), nullable=False),
#     )
#     op.create_index("ix_order_items_order_id", "order_items", ["order_id"])

#     # ── Seed default categories ───────────────────────────────────────────────
#     op.execute("""
#         INSERT INTO categories (name, slug, description, is_active) VALUES
#         ('Sarees', 'sarees', 'Traditional and contemporary sarees', true),
#         ('Kurtis', 'kurtis', 'Elegant kurtis for everyday and festive wear', true),
#         ('Lehengas', 'lehengas', 'Bridal and festive lehengas', true),
#         ('Dupattas', 'dupattas', 'Handcrafted dupattas', true),
#         ('Anarkalis', 'anarkalis', 'Floor-length anarkali suits', true),
#         ('Ethnic Gowns', 'ethnic-gowns', 'Contemporary ethnic gowns', true)
#     """)


# def downgrade() -> None:
#     op.drop_table("order_items")
#     op.drop_table("orders")
#     op.drop_table("wishlists")
#     op.drop_table("cart_items")
#     op.drop_table("carts")
#     op.drop_table("product_variants")
#     op.drop_table("product_images")
#     op.drop_table("products")
#     op.drop_table("categories")
#     op.drop_table("refresh_tokens")
#     op.drop_table("admin_sessions")
#     op.drop_table("admins")
#     op.drop_table("users")
#     # Drop PostgreSQL ENUM types
#     op.execute("DROP TYPE IF EXISTS orderstatus")
#     op.execute("DROP TYPE IF EXISTS paymentmethod")
#     op.execute("DROP TYPE IF EXISTS paymentstatus")


"""Initial schema — all tables

Revision ID: 0001_initial
Revises:
Create Date: 2025-01-01 00:00:00.000000
"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "0001_initial"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ── users ─────────────────────────────────────────────────────────────────
    op.create_table(
        "users",
        sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
        sa.Column("email", sa.String(255), nullable=False),
        sa.Column("hashed_password", sa.String(255), nullable=False),
        sa.Column("full_name", sa.String(255), nullable=False),
        sa.Column("phone", sa.String(20), nullable=True),
        sa.Column("address_line1", sa.String(500), nullable=True),
        sa.Column("address_line2", sa.String(500), nullable=True),
        sa.Column("city", sa.String(100), nullable=True),
        sa.Column("state", sa.String(100), nullable=True),
        sa.Column("pincode", sa.String(10), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("is_blocked", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now()),
    )
    op.create_index("ix_users_email", "users", ["email"], unique=True)

    # ── admins ────────────────────────────────────────────────────────────────
    op.create_table(
        "admins",
        sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
        sa.Column("email", sa.String(255), nullable=False),
        sa.Column("hashed_password", sa.String(255), nullable=False),
        sa.Column("full_name", sa.String(255), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_index("ix_admins_email", "admins", ["email"], unique=True)

    # ── admin_sessions ────────────────────────────────────────────────────────
    op.create_table(
        "admin_sessions",
        sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
        sa.Column("admin_id", sa.BigInteger(), sa.ForeignKey("admins.id", ondelete="CASCADE"), nullable=False),
        sa.Column("token_jti", sa.String(255), nullable=False),
        sa.Column("expires_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
    )
    op.create_index("ix_admin_sessions_admin_id", "admin_sessions", ["admin_id"])
    op.create_index("ix_admin_sessions_token_jti", "admin_sessions", ["token_jti"], unique=True)

    # ── refresh_tokens ────────────────────────────────────────────────────────
    op.create_table(
        "refresh_tokens",
        sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
        sa.Column("user_id", sa.BigInteger(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("token_hash", sa.String(255), nullable=False),
        sa.Column("expires_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("is_revoked", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
    )
    op.create_index("ix_refresh_tokens_user_id", "refresh_tokens", ["user_id"])
    op.create_index("ix_refresh_tokens_token_hash", "refresh_tokens", ["token_hash"], unique=True)

    # ── categories ────────────────────────────────────────────────────────────
    op.create_table(
        "categories",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("name", sa.String(100), nullable=False),
        sa.Column("slug", sa.String(100), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
    )
    op.create_index("ix_categories_slug", "categories", ["slug"], unique=True)
    op.create_index("ix_categories_name", "categories", ["name"], unique=True)

    # ── products ──────────────────────────────────────────────────────────────
    op.create_table(
        "products",
        sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
        sa.Column("title", sa.String(500), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("category_id", sa.Integer(), sa.ForeignKey("categories.id", ondelete="RESTRICT"), nullable=False),
        sa.Column("price", sa.Numeric(10, 2), nullable=False),
        sa.Column("old_price", sa.Numeric(10, 2), nullable=False),
        sa.Column("badge", sa.String(50), nullable=True),
        sa.Column("rating", sa.Numeric(3, 2), nullable=False, server_default="0.00"),
        sa.Column("review_count", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("is_new", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("is_featured", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("is_deleted", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_index("ix_products_category_id", "products", ["category_id"])
    op.create_index("ix_products_title", "products", ["title"])

    # ── product_images ────────────────────────────────────────────────────────
    op.create_table(
        "product_images",
        sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
        sa.Column("product_id", sa.BigInteger(), sa.ForeignKey("products.id", ondelete="CASCADE"), nullable=False),
        sa.Column("cloudinary_public_id", sa.String(500), nullable=False),
        sa.Column("url", sa.String(1000), nullable=False),
        sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
    )
    op.create_index("ix_product_images_product_id", "product_images", ["product_id"])

    # ── product_variants ──────────────────────────────────────────────────────
    op.create_table(
        "product_variants",
        sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
        sa.Column("product_id", sa.BigInteger(), sa.ForeignKey("products.id", ondelete="CASCADE"), nullable=False),
        sa.Column("size", sa.String(50), nullable=False),
        sa.Column("color", sa.String(100), nullable=False),
        sa.Column("stock", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("additional_price", sa.Numeric(10, 2), nullable=False, server_default="0.00"),
        sa.UniqueConstraint("product_id", "size", "color", name="uq_variant"),
    )
    op.create_index("ix_product_variants_product_id", "product_variants", ["product_id"])

    # ── carts ─────────────────────────────────────────────────────────────────
    op.create_table(
        "carts",
        sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
        sa.Column("user_id", sa.BigInteger(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_index("ix_carts_user_id", "carts", ["user_id"], unique=True)

    # ── cart_items ────────────────────────────────────────────────────────────
    op.create_table(
        "cart_items",
        sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
        sa.Column("cart_id", sa.BigInteger(), sa.ForeignKey("carts.id", ondelete="CASCADE"), nullable=False),
        sa.Column("product_id", sa.BigInteger(), sa.ForeignKey("products.id", ondelete="CASCADE"), nullable=False),
        sa.Column("variant_id", sa.BigInteger(), sa.ForeignKey("product_variants.id", ondelete="SET NULL"), nullable=True),
        sa.Column("selected_size", sa.String(50), nullable=False),
        sa.Column("selected_color", sa.String(100), nullable=False),
        sa.Column("quantity", sa.Integer(), nullable=False),
        sa.Column("added_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.UniqueConstraint("cart_id", "product_id", "selected_size", "selected_color", name="uq_cart_item"),
    )
    op.create_index("ix_cart_items_cart_id", "cart_items", ["cart_id"])

    # ── wishlists ─────────────────────────────────────────────────────────────
    op.create_table(
        "wishlists",
        sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
        sa.Column("user_id", sa.BigInteger(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("product_id", sa.BigInteger(), sa.ForeignKey("products.id", ondelete="CASCADE"), nullable=False),
        sa.Column("added_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.UniqueConstraint("user_id", "product_id", name="uq_wishlist_item"),
    )
    op.create_index("ix_wishlists_user_id", "wishlists", ["user_id"])
    op.create_index("ix_wishlists_product_id", "wishlists", ["product_id"])

    # ── orders ────────────────────────────────────────────────────────────────
    op.create_table(
        "orders",
        sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
        sa.Column("order_number", sa.String(50), nullable=False),
        sa.Column("user_id", sa.BigInteger(), sa.ForeignKey("users.id", ondelete="RESTRICT"), nullable=False),
        sa.Column("status", sa.Enum("pending", "confirmed", "processing", "shipped", "delivered", "cancelled", name="orderstatus"), nullable=False, server_default="pending"),
        sa.Column("subtotal", sa.Numeric(10, 2), nullable=False),
        sa.Column("shipping_charge", sa.Numeric(10, 2), nullable=False),
        sa.Column("discount_amount", sa.Numeric(10, 2), nullable=False, server_default="0.00"),
        sa.Column("total_amount", sa.Numeric(10, 2), nullable=False),
        sa.Column("shipping_name", sa.String(255), nullable=False),
        sa.Column("shipping_phone", sa.String(20), nullable=False),
        sa.Column("shipping_address", sa.Text(), nullable=False),
        sa.Column("payment_method", sa.Enum("upi", "card", "cod", "netbanking", name="paymentmethod"), nullable=False, server_default="cod"),
        sa.Column("payment_status", sa.Enum("pending", "paid", "failed", "refunded", name="paymentstatus"), nullable=False, server_default="pending"),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_index("ix_orders_order_number", "orders", ["order_number"], unique=True)
    op.create_index("ix_orders_user_id", "orders", ["user_id"])
    op.create_index("ix_orders_status", "orders", ["status"])
    op.create_index("ix_orders_created_at", "orders", ["created_at"])

    # ── order_items ───────────────────────────────────────────────────────────
    op.create_table(
        "order_items",
        sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
        sa.Column("order_id", sa.BigInteger(), sa.ForeignKey("orders.id", ondelete="CASCADE"), nullable=False),
        sa.Column("product_id", sa.BigInteger(), sa.ForeignKey("products.id", ondelete="RESTRICT"), nullable=False),
        sa.Column("product_title", sa.String(500), nullable=False),
        sa.Column("product_image", sa.String(1000), nullable=False),
        sa.Column("selected_size", sa.String(50), nullable=False),
        sa.Column("selected_color", sa.String(100), nullable=False),
        sa.Column("quantity", sa.Integer(), nullable=False),
        sa.Column("unit_price", sa.Numeric(10, 2), nullable=False),
        sa.Column("total_price", sa.Numeric(10, 2), nullable=False),
    )
    op.create_index("ix_order_items_order_id", "order_items", ["order_id"])

    # ── Seed default categories ───────────────────────────────────────────────
    op.execute("""
        INSERT INTO categories (name, slug, description, is_active) VALUES
        ('Sarees', 'sarees', 'Traditional and contemporary sarees', true),
        ('Kurtis', 'kurtis', 'Elegant kurtis for everyday and festive wear', true),
        ('Lehengas', 'lehengas', 'Bridal and festive lehengas', true),
        ('Dupattas', 'dupattas', 'Handcrafted dupattas', true),
        ('Anarkalis', 'anarkalis', 'Floor-length anarkali suits', true),
        ('Ethnic Gowns', 'ethnic-gowns', 'Contemporary ethnic gowns', true)
    """)


def downgrade() -> None:
    op.drop_table("order_items")
    op.drop_table("orders")
    op.drop_table("wishlists")
    op.drop_table("cart_items")
    op.drop_table("carts")
    op.drop_table("product_variants")
    op.drop_table("product_images")
    op.drop_table("products")
    op.drop_table("categories")
    op.drop_table("refresh_tokens")
    op.drop_table("admin_sessions")
    op.drop_table("admins")
    op.drop_table("users")
    # Drop PostgreSQL ENUM types
    op.execute("DROP TYPE IF EXISTS orderstatus")
    op.execute("DROP TYPE IF EXISTS paymentmethod")
    op.execute("DROP TYPE IF EXISTS paymentstatus")
