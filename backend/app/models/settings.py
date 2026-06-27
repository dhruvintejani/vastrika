# """
# app/models/settings.py
# Key-value store for site settings (single-row pattern via key uniqueness).
# """
# from sqlalchemy import String, Text
# from sqlalchemy.orm import Mapped, mapped_column

# from app.db.base import Base, TimestampMixin


# class SiteSetting(Base, TimestampMixin):
#     """
#     Flexible key-value settings store.
#     Each row is one setting: key → value (JSON string or plain string).
#     """
#     __tablename__ = "site_settings"

#     id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
#     key: Mapped[str] = mapped_column(String(100), unique=True, nullable=False, index=True)
#     value: Mapped[str] = mapped_column(Text, nullable=False, default="")
#     label: Mapped[str] = mapped_column(String(255), nullable=False, default="")
#     group: Mapped[str] = mapped_column(String(50), nullable=False, default="general")

#     def __repr__(self) -> str:
#         return f"<SiteSetting key={self.key}>"

"""
app/models/settings.py
Key-value store for site settings.

NOTE: 'group' is a reserved word in PostgreSQL. We use the column name
'setting_group' in the DB but expose it as 'group' in Python via the
'key' argument to mapped_column.
"""
from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, TimestampMixin


class SiteSetting(Base, TimestampMixin):
    __tablename__ = "site_settings"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    key: Mapped[str] = mapped_column(String(100), unique=True, nullable=False, index=True)
    value: Mapped[str] = mapped_column(Text, nullable=False, default="")
    label: Mapped[str] = mapped_column(String(255), nullable=False, default="")
    # 'group' is a reserved word — map Python attribute 'group' to column 'setting_group'
    group: Mapped[str] = mapped_column(
        "setting_group", String(50), nullable=False, default="general"
    )

    def __repr__(self) -> str:
        return f"<SiteSetting key={self.key}>"