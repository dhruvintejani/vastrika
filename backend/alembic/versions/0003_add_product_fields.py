# """Add fabric and specifications to products

# Revision ID: 0003_add_product_fields
# Revises: 0002_add_missing_tables
# Create Date: 2025-01-03 00:00:00.000000
# """
# from typing import Sequence, Union

# import sqlalchemy as sa
# from alembic import op

# revision: str = "0003_add_product_fields"
# down_revision: Union[str, None] = "0002_add_missing_tables"
# branch_labels: Union[str, Sequence[str], None] = None
# depends_on: Union[str, Sequence[str], None] = None


# def upgrade() -> None:
#     op.add_column("products", sa.Column("fabric", sa.String(255), nullable=True))
#     op.add_column("products", sa.Column("specifications", sa.Text(), nullable=True))


# def downgrade() -> None:
#     op.drop_column("products", "specifications")
#     op.drop_column("products", "fabric")

"""Add fabric and specifications to products

Revision ID: 0003_add_product_fields
Revises: 0002_add_missing_tables
Create Date: 2025-01-03 00:00:00.000000
"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op
from sqlalchemy import text

revision: str = "0003_add_product_fields"
down_revision: Union[str, None] = "0002_add_missing_tables"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def _column_exists(table: str, column: str) -> bool:
    conn = op.get_bind()
    result = conn.execute(text(
        "SELECT column_name FROM information_schema.columns "
        "WHERE table_name=:t AND column_name=:c"
    ), {"t": table, "c": column})
    return result.fetchone() is not None


def upgrade() -> None:
    # ── products.fabric / products.specifications ────────────────────────────
    if not _column_exists("products", "fabric"):
        op.add_column("products", sa.Column("fabric", sa.String(255), nullable=True))
    if not _column_exists("products", "specifications"):
        op.add_column("products", sa.Column("specifications", sa.Text(), nullable=True))

    # ── site_settings: fix 'group' -> 'setting_group' if an old DB has it ────
    if _column_exists("site_settings", "group"):
        op.execute(text('ALTER TABLE site_settings RENAME COLUMN "group" TO setting_group'))
    elif not _column_exists("site_settings", "setting_group"):
        op.add_column(
            "site_settings",
            sa.Column("setting_group", sa.String(50), nullable=False, server_default="general"),
        )


def downgrade() -> None:
    op.drop_column("products", "specifications")
    op.drop_column("products", "fabric")