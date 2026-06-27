# """
# app/services/product_service.py
# Business logic for products and categories.
# """
# import re
# from typing import List, Optional, Tuple

# from sqlalchemy.ext.asyncio import AsyncSession

# from app.core.exceptions import ConflictError, NotFoundError, ValidationError
# from app.repositories.product_repository import CategoryRepository, ProductRepository
# from app.models.product import Product, Category
# from app.utils.cloudinary_utils import delete_cloudinary_image


# def _slugify(text: str) -> str:
#     """Convert a string to a URL-safe slug."""
#     text = text.lower().strip()
#     text = re.sub(r"[^\w\s-]", "", text)
#     text = re.sub(r"[\s_-]+", "-", text)
#     return text.strip("-")


# class ProductService:
#     def __init__(self, db: AsyncSession):
#         self.db = db
#         self.product_repo = ProductRepository(db)
#         self.category_repo = CategoryRepository(db)

#     async def list_products(
#         self,
#         category_slug: Optional[str] = None,
#         search: Optional[str] = None,
#         min_price: Optional[float] = None,
#         max_price: Optional[float] = None,
#         is_featured: Optional[bool] = None,
#         is_new: Optional[bool] = None,
#         sort_by: str = "featured",
#         page: int = 1,
#         page_size: int = 20,
#     ) -> Tuple[List[Product], int]:
#         category_id = None
#         if category_slug and category_slug.lower() != "all":
#             cat = await self.category_repo.get_by_slug(category_slug)
#             if cat:
#                 category_id = cat.id

#         skip = (page - 1) * page_size
#         return await self.product_repo.list_products(
#             category_id=category_id,
#             search=search,
#             min_price=min_price,
#             max_price=max_price,
#             is_featured=is_featured,
#             is_new=is_new,
#             sort_by=sort_by,
#             skip=skip,
#             limit=page_size,
#         )

#     async def get_product(self, product_id: int) -> Product:
#         product = await self.product_repo.get_by_id(product_id)
#         if not product:
#             raise NotFoundError("Product")
#         return product

#     async def get_featured(self, limit: int = 8) -> List[Product]:
#         return await self.product_repo.get_featured(limit)

#     async def get_new_arrivals(self, limit: int = 12) -> List[Product]:
#         return await self.product_repo.get_new_arrivals(limit)

#     async def create_product(
#         self, title: str, description: Optional[str], category_id: int,
#         price: float, old_price: float, badge: Optional[str],
#         is_new: bool, is_featured: bool, variants: list,
#         fabric: Optional[str] = None, specifications: Optional[str] = None
#     ) -> Product:
#         # Validate category exists
#         category = await self.category_repo.get_by_id(category_id)
#         if not category:
#             raise NotFoundError("Category")

#         product_data = {
#             "title": title,
#             "description": description,
#             "fabric": fabric,
#             "specifications": specifications,
#             "category_id": category_id,
#             "price": price,
#             "old_price": old_price,
#             "badge": badge,
#             "is_new": is_new,
#             "is_featured": is_featured,
#         }
#         variant_dicts = [v.model_dump() for v in variants]
#         product = await self.product_repo.create(product_data, variant_dicts)
#         await self.db.commit()
#         return product

#     async def update_product(self, product_id: int, data: dict) -> Product:
#         product = await self.product_repo.get_by_id(product_id)
#         if not product:
#             raise NotFoundError("Product")

#         if "category_id" in data and data["category_id"]:
#             category = await self.category_repo.get_by_id(data["category_id"])
#             if not category:
#                 raise NotFoundError("Category")

#         updated = await self.product_repo.update(product_id, data)
#         await self.db.commit()
#         return updated  # type: ignore

#     async def delete_product(self, product_id: int) -> None:
#         product = await self.product_repo.get_by_id(product_id)
#         if not product:
#             raise NotFoundError("Product")
#         await self.product_repo.soft_delete(product_id)
#         await self.db.commit()

#     async def add_image(
#         self, product_id: int, cloudinary_public_id: str, url: str, sort_order: int = 0
#     ):
#         product = await self.product_repo.get_by_id(product_id)
#         if not product:
#             raise NotFoundError("Product")
#         img = await self.product_repo.add_image(product_id, cloudinary_public_id, url, sort_order)
#         await self.db.commit()
#         return img

#     async def delete_image(self, product_id: int, image_id: int) -> None:
#         product = await self.product_repo.get_by_id(product_id)
#         if not product:
#             raise NotFoundError("Product")
#         img = await self.product_repo.get_image(image_id)
#         if not img or img.product_id != product_id:
#             raise NotFoundError("Image")
#         # Delete from Cloudinary
#         await delete_cloudinary_image(img.cloudinary_public_id)
#         await self.product_repo.delete_image(image_id)
#         await self.db.commit()

#     async def update_stock(self, product_id: int, variant_id: int, stock: int) -> None:
#         product = await self.product_repo.get_by_id(product_id)
#         if not product:
#             raise NotFoundError("Product")
#         variant = await self.product_repo.get_variant(variant_id)
#         if not variant or variant.product_id != product_id:
#             raise NotFoundError("Variant")
#         await self.product_repo.update_variant_stock(variant_id, stock)
#         await self.db.commit()


# class CategoryService:
#     def __init__(self, db: AsyncSession):
#         self.db = db
#         self.repo = CategoryRepository(db)

#     async def list_categories(self, active_only: bool = True) -> List[Category]:
#         return await self.repo.get_all(active_only)

#     async def get_category(self, category_id: int) -> Category:
#         cat = await self.repo.get_by_id(category_id)
#         if not cat:
#             raise NotFoundError("Category")
#         return cat

#     async def create_category(
#         self, name: str, description: Optional[str] = None
#     ) -> Category:
#         slug = _slugify(name)
#         existing = await self.repo.get_by_slug(slug)
#         if existing:
#             raise ConflictError(f"Category '{name}' already exists")
#         cat = await self.repo.create(name=name, slug=slug, description=description)
#         await self.db.commit()
#         return cat

#     async def update_category(self, category_id: int, data: dict) -> Category:
#         cat = await self.repo.get_by_id(category_id)
#         if not cat:
#             raise NotFoundError("Category")
#         if "name" in data and data["name"]:
#             data["slug"] = _slugify(data["name"])
#         updated = await self.repo.update(category_id, data)
#         await self.db.commit()
#         return updated  # type: ignore

#     async def delete_category(self, category_id: int) -> None:
#         cat = await self.repo.get_by_id(category_id)
#         if not cat:
#             raise NotFoundError("Category")
#         await self.repo.delete(category_id)
#         await self.db.commit()

"""
app/services/product_service.py
Business logic for products and categories.
"""
import re
from typing import List, Optional, Tuple

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import ConflictError, NotFoundError, ValidationError
from app.repositories.product_repository import CategoryRepository, ProductRepository
from app.models.product import Product, Category
from app.utils.cloudinary_utils import delete_cloudinary_image


def _slugify(text: str) -> str:
    """Convert a string to a URL-safe slug."""
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_-]+", "-", text)
    return text.strip("-")


class ProductService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.product_repo = ProductRepository(db)
        self.category_repo = CategoryRepository(db)

    async def list_products(
        self,
        category_slug: Optional[str] = None,
        search: Optional[str] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None,
        is_featured: Optional[bool] = None,
        is_new: Optional[bool] = None,
        sort_by: str = "featured",
        page: int = 1,
        page_size: int = 20,
    ) -> Tuple[List[Product], int]:
        category_id = None
        if category_slug and category_slug.lower() != "all":
            cat = await self.category_repo.get_by_slug(category_slug)
            if cat:
                category_id = cat.id

        skip = (page - 1) * page_size
        return await self.product_repo.list_products(
            category_id=category_id,
            search=search,
            min_price=min_price,
            max_price=max_price,
            is_featured=is_featured,
            is_new=is_new,
            sort_by=sort_by,
            skip=skip,
            limit=page_size,
        )

    async def get_product(self, product_id: int) -> Product:
        product = await self.product_repo.get_by_id(product_id)
        if not product:
            raise NotFoundError("Product")
        return product

    async def get_featured(self, limit: int = 8) -> List[Product]:
        return await self.product_repo.get_featured(limit)

    async def get_new_arrivals(self, limit: int = 12) -> List[Product]:
        return await self.product_repo.get_new_arrivals(limit)

    async def create_product(
        self, title: str, description: Optional[str], category_id: int,
        price: float, old_price: float, badge: Optional[str],
        is_new: bool, is_featured: bool, variants: list,
        fabric: Optional[str] = None, specifications: Optional[str] = None
    ) -> Product:
        # Validate category exists
        category = await self.category_repo.get_by_id(category_id)
        if not category:
            raise NotFoundError("Category")

        product_data = {
            "title": title,
            "description": description,
            "fabric": fabric,
            "specifications": specifications,
            "category_id": category_id,
            "price": price,
            "old_price": old_price,
            "badge": badge,
            "is_new": is_new,
            "is_featured": is_featured,
        }
        variant_dicts = [v.model_dump() for v in variants]
        product = await self.product_repo.create(product_data, variant_dicts)
        await self.db.commit()
        return product

    async def update_product(self, product_id: int, data: dict) -> Product:
        product = await self.product_repo.get_by_id(product_id)
        if not product:
            raise NotFoundError("Product")

        if "category_id" in data and data["category_id"]:
            category = await self.category_repo.get_by_id(data["category_id"])
            if not category:
                raise NotFoundError("Category")

        updated = await self.product_repo.update(product_id, data)
        await self.db.commit()
        return updated  # type: ignore

    async def delete_product(self, product_id: int) -> None:
        product = await self.product_repo.get_by_id(product_id)
        if not product:
            raise NotFoundError("Product")
        await self.product_repo.soft_delete(product_id)
        await self.db.commit()

    async def add_image(
        self, product_id: int, cloudinary_public_id: str, url: str, sort_order: int = 0
    ):
        product = await self.product_repo.get_by_id(product_id)
        if not product:
            raise NotFoundError("Product")
        img = await self.product_repo.add_image(product_id, cloudinary_public_id, url, sort_order)
        await self.db.commit()
        return img

    async def delete_image(self, product_id: int, image_id: int) -> None:
        product = await self.product_repo.get_by_id(product_id)
        if not product:
            raise NotFoundError("Product")
        img = await self.product_repo.get_image(image_id)
        if not img or img.product_id != product_id:
            raise NotFoundError("Image")
        # Delete from Cloudinary
        await delete_cloudinary_image(img.cloudinary_public_id)
        await self.product_repo.delete_image(image_id)
        await self.db.commit()

    async def update_stock(self, product_id: int, variant_id: int, stock: int) -> None:
        product = await self.product_repo.get_by_id(product_id)
        if not product:
            raise NotFoundError("Product")
        variant = await self.product_repo.get_variant(variant_id)
        if not variant or variant.product_id != product_id:
            raise NotFoundError("Variant")
        await self.product_repo.update_variant_stock(variant_id, stock)
        await self.db.commit()


class CategoryService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.repo = CategoryRepository(db)

    async def list_categories(self, active_only: bool = True) -> List[Category]:
        return await self.repo.get_all(active_only)

    async def get_category(self, category_id: int) -> Category:
        cat = await self.repo.get_by_id(category_id)
        if not cat:
            raise NotFoundError("Category")
        return cat

    async def create_category(
        self, name: str, description: Optional[str] = None
    ) -> Category:
        slug = _slugify(name)
        existing = await self.repo.get_by_slug(slug)
        if existing:
            raise ConflictError(f"Category '{name}' already exists")
        cat = await self.repo.create(name=name, slug=slug, description=description)
        await self.db.commit()
        return cat

    async def update_category(self, category_id: int, data: dict) -> Category:
        cat = await self.repo.get_by_id(category_id)
        if not cat:
            raise NotFoundError("Category")
        if "name" in data and data["name"]:
            data["slug"] = _slugify(data["name"])
        updated = await self.repo.update(category_id, data)
        await self.db.commit()
        return updated  # type: ignore

    async def delete_category(self, category_id: int) -> None:
        cat = await self.repo.get_by_id(category_id)
        if not cat:
            raise NotFoundError("Category")
        await self.repo.delete(category_id)
        await self.db.commit()