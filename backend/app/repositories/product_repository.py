"""
app/repositories/product_repository.py
Database access for Product, Category, ProductImage, ProductVariant.
"""
from typing import List, Optional, Tuple

from sqlalchemy import and_, func, or_, select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.product import Category, Product, ProductImage, ProductVariant


class ProductRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    def _with_relations(self):
        """Reusable eager-load options."""
        return [
            selectinload(Product.images),
            selectinload(Product.variants),
            selectinload(Product.category),
        ]

    # ── Read ──────────────────────────────────────────────────────────────────

    async def get_by_id(self, product_id: int, include_deleted: bool = False) -> Optional[Product]:
        q = select(Product).options(*self._with_relations()).where(Product.id == product_id)
        if not include_deleted:
            q = q.where(Product.is_deleted == False)  # noqa: E712
        result = await self.db.execute(q)
        return result.scalar_one_or_none()

    async def list_products(
        self,
        category_id: Optional[int] = None,
        search: Optional[str] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None,
        is_featured: Optional[bool] = None,
        is_new: Optional[bool] = None,
        sort_by: str = "featured",
        skip: int = 0,
        limit: int = 20,
    ) -> Tuple[List[Product], int]:
        base_q = (
            select(Product)
            .options(*self._with_relations())
            .where(
                and_(
                    Product.is_deleted == False,  # noqa: E712
                    Product.is_active == True,  # noqa: E712
                )
            )
        )

        if category_id is not None:
            base_q = base_q.where(Product.category_id == category_id)
        if search:
            base_q = base_q.where(Product.title.ilike(f"%{search}%"))
        if min_price is not None:
            base_q = base_q.where(Product.price >= min_price)
        if max_price is not None:
            base_q = base_q.where(Product.price <= max_price)
        if is_featured is not None:
            base_q = base_q.where(Product.is_featured == is_featured)
        if is_new is not None:
            base_q = base_q.where(Product.is_new == is_new)

        # Count
        count_q = select(func.count()).select_from(base_q.subquery())
        total = (await self.db.execute(count_q)).scalar_one()

        # Sort
        sort_map = {
            "price_asc": Product.price.asc(),
            "price_desc": Product.price.desc(),
            "rating": Product.rating.desc(),
            "reviews": Product.review_count.desc(),
            "newest": Product.created_at.desc(),
            "featured": Product.is_featured.desc(),
        }
        order_col = sort_map.get(sort_by, Product.is_featured.desc())
        base_q = base_q.order_by(order_col).offset(skip).limit(limit)

        result = await self.db.execute(base_q)
        return list(result.scalars().all()), total

    async def get_featured(self, limit: int = 8) -> List[Product]:
        result = await self.db.execute(
            select(Product)
            .options(*self._with_relations())
            .where(
                and_(
                    Product.is_featured == True,  # noqa: E712
                    Product.is_deleted == False,  # noqa: E712
                    Product.is_active == True,  # noqa: E712
                )
            )
            .limit(limit)
        )
        return list(result.scalars().all())

    async def get_new_arrivals(self, limit: int = 12) -> List[Product]:
        result = await self.db.execute(
            select(Product)
            .options(*self._with_relations())
            .where(
                and_(
                    Product.is_new == True,  # noqa: E712
                    Product.is_deleted == False,  # noqa: E712
                    Product.is_active == True,  # noqa: E712
                )
            )
            .order_by(Product.created_at.desc())
            .limit(limit)
        )
        return list(result.scalars().all())

    # ── Write ─────────────────────────────────────────────────────────────────

    async def create(self, data: dict, variants: list[dict]) -> Product:
        product = Product(**data)
        self.db.add(product)
        await self.db.flush()  # get product.id

        for v in variants:
            variant = ProductVariant(product_id=product.id, **v)
            self.db.add(variant)

        await self.db.flush()
        await self.db.refresh(product)
        return await self.get_by_id(product.id)  # type: ignore

    async def update(self, product_id: int, data: dict) -> Optional[Product]:
        clean = {k: v for k, v in data.items() if v is not None}
        if clean:
            await self.db.execute(
                update(Product).where(Product.id == product_id).values(**clean)
            )
            await self.db.flush()
        return await self.get_by_id(product_id)

    async def soft_delete(self, product_id: int) -> None:
        await self.db.execute(
            update(Product).where(Product.id == product_id).values(is_deleted=True)
        )
        await self.db.flush()

    # ── Images ────────────────────────────────────────────────────────────────

    async def add_image(
        self, product_id: int, cloudinary_public_id: str, url: str, sort_order: int = 0
    ) -> ProductImage:
        img = ProductImage(
            product_id=product_id,
            cloudinary_public_id=cloudinary_public_id,
            url=url,
            sort_order=sort_order,
        )
        self.db.add(img)
        await self.db.flush()
        await self.db.refresh(img)
        return img

    async def get_image(self, image_id: int) -> Optional[ProductImage]:
        result = await self.db.execute(
            select(ProductImage).where(ProductImage.id == image_id)
        )
        return result.scalar_one_or_none()

    async def delete_image(self, image_id: int) -> None:
        img = await self.get_image(image_id)
        if img:
            await self.db.delete(img)
            await self.db.flush()

    # ── Variants / Stock ──────────────────────────────────────────────────────

    async def get_variant(self, variant_id: int) -> Optional[ProductVariant]:
        result = await self.db.execute(
            select(ProductVariant).where(ProductVariant.id == variant_id)
        )
        return result.scalar_one_or_none()

    async def update_variant_stock(self, variant_id: int, stock: int) -> None:
        await self.db.execute(
            update(ProductVariant)
            .where(ProductVariant.id == variant_id)
            .values(stock=stock)
        )
        await self.db.flush()

    async def decrement_variant_stock(self, variant_id: int, quantity: int) -> None:
        """Atomic stock decrement — used during order creation."""
        from sqlalchemy import text
        await self.db.execute(
            text(
                "UPDATE product_variants SET stock = GREATEST(0, stock - :qty) "
                "WHERE id = :vid"
            ),
            {"qty": quantity, "vid": variant_id},
        )
        await self.db.flush()


class CategoryRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_all(self, active_only: bool = True) -> List[Category]:
        q = select(Category)
        if active_only:
            q = q.where(Category.is_active == True)  # noqa: E712
        result = await self.db.execute(q.order_by(Category.name))
        return list(result.scalars().all())

    async def get_by_id(self, category_id: int) -> Optional[Category]:
        result = await self.db.execute(
            select(Category).where(Category.id == category_id)
        )
        return result.scalar_one_or_none()

    async def get_by_slug(self, slug: str) -> Optional[Category]:
        result = await self.db.execute(
            select(Category).where(Category.slug == slug)
        )
        return result.scalar_one_or_none()

    async def create(self, name: str, slug: str, description: Optional[str]) -> Category:
        cat = Category(name=name, slug=slug, description=description)
        self.db.add(cat)
        await self.db.flush()
        await self.db.refresh(cat)
        return cat

    async def update(self, category_id: int, data: dict) -> Optional[Category]:
        clean = {k: v for k, v in data.items() if v is not None}
        if clean:
            await self.db.execute(
                update(Category).where(Category.id == category_id).values(**clean)
            )
            await self.db.flush()
        return await self.get_by_id(category_id)

    async def delete(self, category_id: int) -> None:
        cat = await self.get_by_id(category_id)
        if cat:
            await self.db.delete(cat)
            await self.db.flush()