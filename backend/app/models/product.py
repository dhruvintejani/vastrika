# """
# app/models/product.py
# Product catalogue models: Category, Product, ProductImage, ProductVariant.
# """
# from decimal import Decimal
# from typing import List, Optional

# from sqlalchemy import (
#     Boolean,
#     Numeric,
#     ForeignKey,
#     Integer,
#     String,
#     Text,
#     UniqueConstraint,
# )
# from sqlalchemy.orm import Mapped, mapped_column, relationship

# from app.db.base import Base, TimestampMixin


# class Category(Base):
#     __tablename__ = "categories"

#     id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
#     name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
#     slug: Mapped[str] = mapped_column(String(100), unique=True, nullable=False, index=True)
#     description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
#     is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

#     # Relationship
#     products: Mapped[List["Product"]] = relationship("Product", back_populates="category")

#     def __repr__(self) -> str:
#         return f"<Category name={self.name}>"


# class Product(Base, TimestampMixin):
#     __tablename__ = "products"

#     id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
#     title: Mapped[str] = mapped_column(String(500), nullable=False, index=True)
#     description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
#     fabric: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
#     specifications: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
#     category_id: Mapped[int] = mapped_column(
#         ForeignKey("categories.id", ondelete="RESTRICT"), nullable=False, index=True
#     )
#     price: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
#     old_price: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
#     badge: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
#     rating: Mapped[Decimal] = mapped_column(Numeric(3, 2), default=Decimal("0.00"), nullable=False)
#     review_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
#     is_new: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
#     is_featured: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
#     is_deleted: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)  # soft delete
#     is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

#     # Relationships
#     category: Mapped["Category"] = relationship("Category", back_populates="products")
#     images: Mapped[List["ProductImage"]] = relationship(
#         "ProductImage",
#         back_populates="product",
#         cascade="all, delete-orphan",
#         order_by="ProductImage.sort_order",
#     )
#     variants: Mapped[List["ProductVariant"]] = relationship(
#         "ProductVariant",
#         back_populates="product",
#         cascade="all, delete-orphan",
#     )
#     cart_items: Mapped[List["CartItem"]] = relationship(  # type: ignore[name-defined]  # noqa: F821
#         "CartItem", back_populates="product"
#     )
#     order_items: Mapped[List["OrderItem"]] = relationship(  # type: ignore[name-defined]  # noqa: F821
#         "OrderItem", back_populates="product"
#     )
#     wishlist_items: Mapped[List["Wishlist"]] = relationship(  # type: ignore[name-defined]  # noqa: F821
#         "Wishlist", back_populates="product"
#     )

#     def __repr__(self) -> str:
#         return f"<Product id={self.id} title={self.title[:40]}>"


# class ProductImage(Base):
#     __tablename__ = "product_images"

#     id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
#     product_id: Mapped[int] = mapped_column(
#         ForeignKey("products.id", ondelete="CASCADE"), nullable=False, index=True
#     )
#     cloudinary_public_id: Mapped[str] = mapped_column(String(500), nullable=False)
#     url: Mapped[str] = mapped_column(String(1000), nullable=False)
#     sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

#     # Relationship
#     product: Mapped["Product"] = relationship("Product", back_populates="images")

#     def __repr__(self) -> str:
#         return f"<ProductImage product_id={self.product_id} order={self.sort_order}>"


# class ProductVariant(Base):
#     """
#     Each variant represents a unique (product, size, color) combination
#     with its own stock count.
#     """
#     __tablename__ = "product_variants"
#     __table_args__ = (
#         UniqueConstraint("product_id", "size", "color", name="uq_variant"),
#     )

#     id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
#     product_id: Mapped[int] = mapped_column(
#         ForeignKey("products.id", ondelete="CASCADE"), nullable=False, index=True
#     )
#     size: Mapped[str] = mapped_column(String(50), nullable=False)
#     color: Mapped[str] = mapped_column(String(100), nullable=False)
#     stock: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
#     additional_price: Mapped[Decimal] = mapped_column(
#         Numeric(10, 2), default=Decimal("0.00"), nullable=False
#     )

#     # Relationship
#     product: Mapped["Product"] = relationship("Product", back_populates="variants")

#     def __repr__(self) -> str:
#         return f"<ProductVariant product_id={self.product_id} size={self.size} color={self.color}>"


"""
app/models/product.py
Product catalogue models: Category, Product, ProductImage, ProductVariant.
"""
from decimal import Decimal
from typing import List, Optional

from sqlalchemy import (
    Boolean,
    Numeric,
    ForeignKey,
    Integer,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin


class Category(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    slug: Mapped[str] = mapped_column(String(100), unique=True, nullable=False, index=True)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    # Relationship
    products: Mapped[List["Product"]] = relationship("Product", back_populates="category")

    def __repr__(self) -> str:
        return f"<Category name={self.name}>"


class Product(Base, TimestampMixin):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(500), nullable=False, index=True)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    fabric: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    specifications: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    category_id: Mapped[int] = mapped_column(
        ForeignKey("categories.id", ondelete="RESTRICT"), nullable=False, index=True
    )
    price: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    old_price: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    badge: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    rating: Mapped[Decimal] = mapped_column(Numeric(3, 2), default=Decimal("0.00"), nullable=False)
    review_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    is_new: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    is_deleted: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)  # soft delete
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    # Relationships
    category: Mapped["Category"] = relationship("Category", back_populates="products")
    images: Mapped[List["ProductImage"]] = relationship(
        "ProductImage",
        back_populates="product",
        cascade="all, delete-orphan",
        order_by="ProductImage.sort_order",
    )
    variants: Mapped[List["ProductVariant"]] = relationship(
        "ProductVariant",
        back_populates="product",
        cascade="all, delete-orphan",
    )
    cart_items: Mapped[List["CartItem"]] = relationship(  # type: ignore[name-defined]  # noqa: F821
        "CartItem", back_populates="product"
    )
    order_items: Mapped[List["OrderItem"]] = relationship(  # type: ignore[name-defined]  # noqa: F821
        "OrderItem", back_populates="product"
    )
    wishlist_items: Mapped[List["Wishlist"]] = relationship(  # type: ignore[name-defined]  # noqa: F821
        "Wishlist", back_populates="product"
    )

    def __repr__(self) -> str:
        return f"<Product id={self.id} title={self.title[:40]}>"


class ProductImage(Base):
    __tablename__ = "product_images"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    product_id: Mapped[int] = mapped_column(
        ForeignKey("products.id", ondelete="CASCADE"), nullable=False, index=True
    )
    cloudinary_public_id: Mapped[str] = mapped_column(String(500), nullable=False)
    url: Mapped[str] = mapped_column(String(1000), nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    # Relationship
    product: Mapped["Product"] = relationship("Product", back_populates="images")

    def __repr__(self) -> str:
        return f"<ProductImage product_id={self.product_id} order={self.sort_order}>"


class ProductVariant(Base):
    """
    Each variant represents a unique (product, size, color) combination
    with its own stock count.
    """
    __tablename__ = "product_variants"
    __table_args__ = (
        UniqueConstraint("product_id", "size", "color", name="uq_variant"),
    )

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    product_id: Mapped[int] = mapped_column(
        ForeignKey("products.id", ondelete="CASCADE"), nullable=False, index=True
    )
    size: Mapped[str] = mapped_column(String(50), nullable=False)
    color: Mapped[str] = mapped_column(String(100), nullable=False)
    stock: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    additional_price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2), default=Decimal("0.00"), nullable=False
    )

    # Relationship
    product: Mapped["Product"] = relationship("Product", back_populates="variants")

    def __repr__(self) -> str:
        return f"<ProductVariant product_id={self.product_id} size={self.size} color={self.color}>"