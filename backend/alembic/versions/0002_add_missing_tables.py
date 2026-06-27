# # """Add coupons, banners, reviews, site_settings

# # Revision ID: 0002_add_missing_tables
# # Revises: 0001_initial
# # Create Date: 2025-01-02 00:00:00.000000
# # """
# # from typing import Sequence, Union

# # import sqlalchemy as sa
# # from alembic import op

# # revision: str = "0002_add_missing_tables"
# # down_revision: Union[str, None] = "0001_initial"
# # branch_labels: Union[str, Sequence[str], None] = None
# # depends_on: Union[str, Sequence[str], None] = None


# # def upgrade() -> None:
# #     # ── coupons ───────────────────────────────────────────────────────────────
# #     op.create_table(
# #         "coupons",
# #         sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
# #         sa.Column("code", sa.String(50), nullable=False),
# #         sa.Column("description", sa.Text(), nullable=True),
# #         sa.Column(
# #             "discount_type",
# #             sa.Enum("percentage", "fixed", name="discounttype"),
# #             nullable=False,
# #             server_default="percentage",
# #         ),
# #         sa.Column("discount_value", sa.Numeric(10, 2), nullable=False),
# #         sa.Column("min_order_amount", sa.Numeric(10, 2), nullable=False, server_default="0.00"),
# #         sa.Column("max_discount_amount", sa.Numeric(10, 2), nullable=True),
# #         sa.Column("usage_limit", sa.Integer(), nullable=True),
# #         sa.Column("used_count", sa.Integer(), nullable=False, server_default="0"),
# #         sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
# #         sa.Column("expires_at", sa.DateTime(timezone=True), nullable=True),
# #         sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
# #         sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
# #     )
# #     op.create_index("ix_coupons_code", "coupons", ["code"], unique=True)

# #     # ── banners ───────────────────────────────────────────────────────────────
# #     op.create_table(
# #         "banners",
# #         sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
# #         sa.Column("title", sa.String(255), nullable=False),
# #         sa.Column("subtitle", sa.String(500), nullable=True),
# #         sa.Column("cta_text", sa.String(100), nullable=True),
# #         sa.Column("cta_link", sa.String(500), nullable=True),
# #         sa.Column("image_url", sa.String(1000), nullable=False),
# #         sa.Column("cloudinary_public_id", sa.String(500), nullable=True),
# #         sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
# #         sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
# #         sa.Column("target", sa.String(50), nullable=True),
# #         sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
# #         sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
# #     )

# #     # ── reviews ───────────────────────────────────────────────────────────────
# #     op.create_table(
# #         "reviews",
# #         sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
# #         sa.Column("user_id", sa.BigInteger(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
# #         sa.Column("product_id", sa.BigInteger(), sa.ForeignKey("products.id", ondelete="CASCADE"), nullable=False),
# #         sa.Column("rating", sa.Integer(), nullable=False),
# #         sa.Column("title", sa.String(255), nullable=True),
# #         sa.Column("body", sa.Text(), nullable=True),
# #         sa.Column("is_approved", sa.Boolean(), nullable=False, server_default=sa.false()),
# #         sa.Column("is_flagged", sa.Boolean(), nullable=False, server_default=sa.false()),
# #         sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
# #         sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
# #         sa.UniqueConstraint("user_id", "product_id", name="uq_user_product_review"),
# #     )
# #     op.create_index("ix_reviews_user_id", "reviews", ["user_id"])
# #     op.create_index("ix_reviews_product_id", "reviews", ["product_id"])

# #     # ── site_settings ─────────────────────────────────────────────────────────
# #     op.create_table(
# #         "site_settings",
# #         sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
# #         sa.Column("key", sa.String(100), nullable=False),
# #         sa.Column("value", sa.Text(), nullable=False, server_default=""),
# #         sa.Column("label", sa.String(255), nullable=False, server_default=""),
# #         sa.Column("group", sa.String(50), nullable=False, server_default="general"),
# #         sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
# #         sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
# #     )
# #     op.create_index("ix_site_settings_key", "site_settings", ["key"], unique=True)

# #     # ── Seed default settings ─────────────────────────────────────────────────
# #     op.execute("""
# #         INSERT INTO site_settings (key, value, label, "group") VALUES
# #         ('store_name', 'Vastrika', 'Store Name', 'general'),
# #         ('store_email', 'hello@vastrika.in', 'Store Email', 'general'),
# #         ('store_phone', '+91 98765 43210', 'Store Phone', 'general'),
# #         ('store_address', 'Bandra West, Mumbai, Maharashtra 400050', 'Store Address', 'general'),
# #         ('currency', 'INR', 'Currency', 'general'),
# #         ('free_shipping_threshold', '999', 'Free Shipping Threshold (₹)', 'shipping'),
# #         ('standard_shipping_charge', '99', 'Standard Shipping Charge (₹)', 'shipping'),
# #         ('maintenance_mode', 'false', 'Maintenance Mode', 'general'),
# #         ('allow_reviews', 'true', 'Allow Customer Reviews', 'general'),
# #         ('auto_approve_reviews', 'false', 'Auto-Approve Reviews', 'general')
# #     """)


# # def downgrade() -> None:
# #     op.drop_table("site_settings")
# #     op.drop_table("reviews")
# #     op.drop_table("banners")
# #     op.drop_table("coupons")
# #     op.execute("DROP TYPE IF EXISTS discounttype")


# """Add coupons, banners, reviews, site_settings

# Revision ID: 0002_add_missing_tables
# Revises: 0001_initial
# Create Date: 2025-01-02 00:00:00.000000
# """
# from typing import Sequence, Union

# import sqlalchemy as sa
# from alembic import op

# revision: str = "0002_add_missing_tables"
# down_revision: Union[str, None] = "0001_initial"
# branch_labels: Union[str, Sequence[str], None] = None
# depends_on: Union[str, Sequence[str], None] = None


# def upgrade() -> None:
#     # ── coupons ───────────────────────────────────────────────────────────────
#     op.create_table(
#         "coupons",
#         sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
#         sa.Column("code", sa.String(50), nullable=False),
#         sa.Column("description", sa.Text(), nullable=True),
#         sa.Column(
#             "discount_type",
#             sa.Enum("percentage", "fixed", name="discounttype"),
#             nullable=False,
#             server_default="percentage",
#         ),
#         sa.Column("discount_value", sa.Numeric(10, 2), nullable=False),
#         sa.Column("min_order_amount", sa.Numeric(10, 2), nullable=False, server_default="0.00"),
#         sa.Column("max_discount_amount", sa.Numeric(10, 2), nullable=True),
#         sa.Column("usage_limit", sa.Integer(), nullable=True),
#         sa.Column("used_count", sa.Integer(), nullable=False, server_default="0"),
#         sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
#         sa.Column("expires_at", sa.DateTime(timezone=True), nullable=True),
#         sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
#         sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
#     )
#     op.create_index("ix_coupons_code", "coupons", ["code"], unique=True)

#     # ── banners ───────────────────────────────────────────────────────────────
#     op.create_table(
#         "banners",
#         sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
#         sa.Column("title", sa.String(255), nullable=False),
#         sa.Column("subtitle", sa.String(500), nullable=True),
#         sa.Column("cta_text", sa.String(100), nullable=True),
#         sa.Column("cta_link", sa.String(500), nullable=True),
#         sa.Column("image_url", sa.String(1000), nullable=False),
#         sa.Column("cloudinary_public_id", sa.String(500), nullable=True),
#         sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
#         sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
#         sa.Column("target", sa.String(50), nullable=True),
#         sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
#         sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
#     )

#     # ── reviews ───────────────────────────────────────────────────────────────
#     op.create_table(
#         "reviews",
#         sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
#         sa.Column("user_id", sa.BigInteger(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
#         sa.Column("product_id", sa.BigInteger(), sa.ForeignKey("products.id", ondelete="CASCADE"), nullable=False),
#         sa.Column("rating", sa.Integer(), nullable=False),
#         sa.Column("title", sa.String(255), nullable=True),
#         sa.Column("body", sa.Text(), nullable=True),
#         sa.Column("is_approved", sa.Boolean(), nullable=False, server_default=sa.false()),
#         sa.Column("is_flagged", sa.Boolean(), nullable=False, server_default=sa.false()),
#         sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
#         sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
#         sa.UniqueConstraint("user_id", "product_id", name="uq_user_product_review"),
#     )
#     op.create_index("ix_reviews_user_id", "reviews", ["user_id"])
#     op.create_index("ix_reviews_product_id", "reviews", ["product_id"])

#     # ── site_settings ─────────────────────────────────────────────────────────
#     op.create_table(
#         "site_settings",
#         sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
#         sa.Column("key", sa.String(100), nullable=False),
#         sa.Column("value", sa.Text(), nullable=False, server_default=""),
#         sa.Column("label", sa.String(255), nullable=False, server_default=""),
#         sa.Column("group", sa.String(50), nullable=False, server_default="general"),
#         sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
#         sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
#     )
#     op.create_index("ix_site_settings_key", "site_settings", ["key"], unique=True)

#     # ── Seed default settings ─────────────────────────────────────────────────
#     op.execute("""
#         INSERT INTO site_settings (key, value, label, "group") VALUES
#         ('store_name', 'Vastrika', 'Store Name', 'general'),
#         ('store_email', 'hello@vastrika.in', 'Store Email', 'general'),
#         ('store_phone', '+91 74349 61919', 'Store Phone', 'general'),
#         ('store_address', 'Bandra West, Mumbai, Maharashtra 400050', 'Store Address', 'general'),
#         ('currency', 'INR', 'Currency', 'general'),
#         ('free_shipping_threshold', '999', 'Free Shipping Threshold (₹)', 'shipping'),
#         ('standard_shipping_charge', '99', 'Standard Shipping Charge (₹)', 'shipping'),
#         ('maintenance_mode', 'false', 'Maintenance Mode', 'general'),
#         ('allow_reviews', 'true', 'Allow Customer Reviews', 'general'),
#         ('auto_approve_reviews', 'false', 'Auto-Approve Reviews', 'general')
#     """)


# def downgrade() -> None:
#     op.drop_table("site_settings")
#     op.drop_table("reviews")
#     op.drop_table("banners")
#     op.drop_table("coupons")
#     op.execute("DROP TYPE IF EXISTS discounttype")


"""Add coupons, banners, reviews, site_settings

Revision ID: 0002_add_missing_tables
Revises: 0001_initial
Create Date: 2025-01-02 00:00:00.000000
"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "0002_add_missing_tables"
down_revision: Union[str, None] = "0001_initial"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ── coupons ───────────────────────────────────────────────────────────────
    op.create_table(
        "coupons",
        sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
        sa.Column("code", sa.String(50), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column(
            "discount_type",
            sa.Enum("percentage", "fixed", name="discounttype"),
            nullable=False,
            server_default="percentage",
        ),
        sa.Column("discount_value", sa.Numeric(10, 2), nullable=False),
        sa.Column("min_order_amount", sa.Numeric(10, 2), nullable=False, server_default="0.00"),
        sa.Column("max_discount_amount", sa.Numeric(10, 2), nullable=True),
        sa.Column("usage_limit", sa.Integer(), nullable=True),
        sa.Column("used_count", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("expires_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_index("ix_coupons_code", "coupons", ["code"], unique=True)

    # ── banners ───────────────────────────────────────────────────────────────
    op.create_table(
        "banners",
        sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
        sa.Column("title", sa.String(255), nullable=False),
        sa.Column("subtitle", sa.String(500), nullable=True),
        sa.Column("cta_text", sa.String(100), nullable=True),
        sa.Column("cta_link", sa.String(500), nullable=True),
        sa.Column("image_url", sa.String(1000), nullable=False),
        sa.Column("cloudinary_public_id", sa.String(500), nullable=True),
        sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("target", sa.String(50), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )

    # ── reviews ───────────────────────────────────────────────────────────────
    op.create_table(
        "reviews",
        sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
        sa.Column("user_id", sa.BigInteger(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("product_id", sa.BigInteger(), sa.ForeignKey("products.id", ondelete="CASCADE"), nullable=False),
        sa.Column("rating", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(255), nullable=True),
        sa.Column("body", sa.Text(), nullable=True),
        sa.Column("is_approved", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("is_flagged", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.UniqueConstraint("user_id", "product_id", name="uq_user_product_review"),
    )
    op.create_index("ix_reviews_user_id", "reviews", ["user_id"])
    op.create_index("ix_reviews_product_id", "reviews", ["product_id"])

    # ── site_settings ─────────────────────────────────────────────────────────
    # NOTE: 'group' is a reserved word in PostgreSQL — column is named 'setting_group'
    op.create_table(
        "site_settings",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("key", sa.String(100), nullable=False),
        sa.Column("value", sa.Text(), nullable=False, server_default=""),
        sa.Column("label", sa.String(255), nullable=False, server_default=""),
        sa.Column("setting_group", sa.String(50), nullable=False, server_default="general"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_index("ix_site_settings_key", "site_settings", ["key"], unique=True)

    # ── Seed default settings ─────────────────────────────────────────────────
    op.execute("""
        INSERT INTO site_settings (key, value, label, setting_group) VALUES
        ('store_name', 'Vastrika', 'Store Name', 'general'),
        ('store_email', 'hello@vastrika.in', 'Store Email', 'general'),
        ('store_phone', '+91 98765 43210', 'Store Phone', 'general'),
        ('store_address', 'Bandra West, Mumbai, Maharashtra 400050', 'Store Address', 'general'),
        ('currency', 'INR', 'Currency', 'general'),
        ('free_shipping_threshold', '999', 'Free Shipping Threshold', 'shipping'),
        ('standard_shipping_charge', '99', 'Standard Shipping Charge', 'shipping'),
        ('maintenance_mode', 'false', 'Maintenance Mode', 'general'),
        ('allow_reviews', 'true', 'Allow Customer Reviews', 'general'),
        ('auto_approve_reviews', 'false', 'Auto-Approve Reviews', 'general')
    """)


def downgrade() -> None:
    op.drop_table("site_settings")
    op.drop_table("reviews")
    op.drop_table("banners")
    op.drop_table("coupons")
    op.execute("DROP TYPE IF EXISTS discounttype")