// // // // src/api/products.ts
// // // // Maps backend API responses to the Product shape used by all existing frontend components.
// // // // Existing components use: id, title, category (string), price, oldPrice, images (string[]),
// // // // sizes (string[]), colors (string[]), stock (number), badge, rating, reviews, isNew,
// // // // isFeatured, description, fabric, specifications.
// // // import { apiClient } from './client';

// // // export interface BackendProduct {
// // //   id: number;
// // //   title: string;
// // //   description?: string;
// // //   fabric?: string;
// // //   specifications?: string;
// // //   category: { id: number; name: string; slug: string };
// // //   price: number;
// // //   old_price: number;
// // //   badge?: string;
// // //   rating: number;
// // //   review_count: number;
// // //   is_new: boolean;
// // //   is_featured: boolean;
// // //   images: { id: number; url: string; sort_order: number }[];
// // //   variants: { id: number; size: string; color: string; stock: number; additional_price: number }[];
// // //   total_stock?: number;
// // // }

// // // /** Transform a backend product into the shape all existing components expect. */
// // // export function adaptProduct(p: BackendProduct) {
// // //   const sizes = [...new Set(p.variants?.map((v) => v.size) ?? ['Free Size'])];
// // //   const colors = [...new Set(p.variants?.map((v) => v.color) ?? [])];
// // //   const stock = p.total_stock ?? p.variants?.reduce((s, v) => s + v.stock, 0) ?? 0;
// // //   return {
// // //     id: p.id,
// // //     title: p.title,
// // //     category: p.category.name,
// // //     price: Number(p.price),
// // //     oldPrice: Number(p.old_price),
// // //     images: p.images?.map((i) => i.url) ?? [],
// // //     sizes,
// // //     colors,
// // //     stock,
// // //     badge: p.badge ?? null,
// // //     rating: Number(p.rating),
// // //     reviews: p.review_count,
// // //     isNew: p.is_new,
// // //     isFeatured: p.is_featured,
// // //     description: p.description ?? '',
// // //     fabric: p.fabric ?? '',
// // //     specifications: p.specifications ?? '',
// // //   };
// // // }

// // // export type AdaptedProduct = ReturnType<typeof adaptProduct>;

// // // export const productsApi = {
// // //   list: async (params?: {
// // //     category?: string;
// // //     search?: string;
// // //     min_price?: number;
// // //     max_price?: number;
// // //     sort_by?: string;
// // //     page?: number;
// // //     page_size?: number;
// // //   }) => {
// // //     const res = await apiClient.get<{
// // //       data: BackendProduct[];
// // //       total: number;
// // //       page: number;
// // //       page_size: number;
// // //       total_pages: number;
// // //     }>('/products', { params });
// // //     return {
// // //       products: (res.data.data ?? []).map(adaptProduct),
// // //       total: res.data.total,
// // //       page: res.data.page,
// // //       totalPages: res.data.total_pages,
// // //     };
// // //   },

// // //   getById: async (id: number) => {
// // //     const res = await apiClient.get<{ data: BackendProduct }>(`/products/${id}`);
// // //     return adaptProduct(res.data.data);
// // //   },

// // //   getFeatured: async (limit = 8) => {
// // //     const res = await apiClient.get<{ data: BackendProduct[] }>('/products/featured', {
// // //       params: { limit },
// // //     });
// // //     return (res.data.data ?? []).map(adaptProduct);
// // //   },

// // //   getNewArrivals: async (limit = 12) => {
// // //     const res = await apiClient.get<{ data: BackendProduct[] }>('/products/new-arrivals', {
// // //       params: { limit },
// // //     });
// // //     return (res.data.data ?? []).map(adaptProduct);
// // //   },

// // //   getCategories: async () => {
// // //     const res = await apiClient.get<{
// // //       data: { id: number; name: string; slug: string }[];
// // //     }>('/categories');
// // //     return res.data.data ?? [];
// // //   },
// // // };

// // // src/api/products.ts
// // // Maps backend API responses to the Product shape used by all existing frontend components.
// // // Existing components use: id, title, category (string), price, oldPrice, images (string[]),
// // // sizes (string[]), colors (string[]), stock (number), badge, rating, reviews, isNew,
// // // isFeatured, description, fabric, specifications.
// // import { apiClient } from './client';

// // export interface BackendProduct {
// //   id: number;
// //   title: string;
// //   description?: string;
// //   fabric?: string;
// //   specifications?: string;
// //   category: { id: number; name: string; slug: string };
// //   price: number;
// //   old_price: number;
// //   badge?: string;
// //   rating: number;
// //   review_count: number;
// //   is_new: boolean;
// //   is_featured: boolean;
// //   images: { id: number; url: string; sort_order: number }[];
// //   variants: { id: number; size: string; color: string; stock: number; additional_price: number }[];
// //   total_stock?: number;
// // }

// // /** Transform a backend product into the shape all existing components expect. */
// // export function adaptProduct(p: BackendProduct) {
// //   const sizes = [...new Set(p.variants?.map((v) => v.size) ?? ['Free Size'])];
// //   const colors = [...new Set(p.variants?.map((v) => v.color) ?? [])];
// //   const stock = p.total_stock ?? p.variants?.reduce((s, v) => s + v.stock, 0) ?? 0;
// //   return {
// //     id: p.id,
// //     title: p.title,
// //     category: p.category.name,
// //     price: Number(p.price),
// //     oldPrice: Number(p.old_price),
// //     images: p.images?.map((i) => i.url) ?? [],
// //     sizes,
// //     colors,
// //     stock,
// //     badge: p.badge ?? null,
// //     rating: Number(p.rating),
// //     reviews: p.review_count,
// //     isNew: p.is_new,
// //     isFeatured: p.is_featured,
// //     description: p.description ?? '',
// //     fabric: p.fabric ?? '',
// //     specifications: p.specifications ?? '',
// //   };
// // }

// // export type AdaptedProduct = ReturnType<typeof adaptProduct>;

// // export const productsApi = {
// //   list: async (params?: {
// //     category?: string;
// //     search?: string;
// //     min_price?: number;
// //     max_price?: number;
// //     sort_by?: string;
// //     page?: number;
// //     page_size?: number;
// //   }) => {
// //     const res = await apiClient.get<{
// //       data: BackendProduct[];
// //       total: number;
// //       page: number;
// //       page_size: number;
// //       total_pages: number;
// //     }>('/products', { params });
// //     return {
// //       products: (res.data.data ?? []).map(adaptProduct),
// //       total: res.data.total,
// //       page: res.data.page,
// //       totalPages: res.data.total_pages,
// //     };
// //   },

// //   getById: async (id: number) => {
// //     const res = await apiClient.get<{ data: BackendProduct }>(`/products/${id}`);
// //     return adaptProduct(res.data.data);
// //   },

// //   getFeatured: async (limit = 8) => {
// //     const res = await apiClient.get<{ data: BackendProduct[] }>('/products/featured', {
// //       params: { limit },
// //     });
// //     return (res.data.data ?? []).map(adaptProduct);
// //   },

// //   getNewArrivals: async (limit = 12) => {
// //     const res = await apiClient.get<{ data: BackendProduct[] }>('/products/new-arrivals', {
// //       params: { limit },
// //     });
// //     return (res.data.data ?? []).map(adaptProduct);
// //   },

// //   // Fetch products filtered by category name — used by Home.tsx "Trending Sarees" section
// //   getByCategory: async (categoryName: string, limit = 4) => {
// //     const slug = categoryName.toLowerCase().replace(/\s+/g, '-');
// //     const res = await apiClient.get<{
// //       data: BackendProduct[];
// //       total: number;
// //     }>('/products', {
// //       params: { category: slug, page: 1, page_size: limit, sort_by: 'featured' },
// //     });
// //     return (res.data.data ?? []).map(adaptProduct);
// //   },

// //   getCategories: async () => {
// //     const res = await apiClient.get<{
// //       data: { id: number; name: string; slug: string }[];
// //     }>('/categories');
// //     return res.data.data ?? [];
// //   },
// // };

// // src/api/products.ts
// // Maps backend API responses to the Product shape used by all existing frontend components.
// import { apiClient } from './client';

// export interface BackendProduct {
//   id: number;
//   title: string;
//   description?: string;
//   fabric?: string;
//   specifications?: string;
//   category: { id: number; name: string; slug: string };
//   price: number;
//   old_price: number;
//   badge?: string;
//   rating: number;
//   review_count: number;
//   is_new: boolean;
//   is_featured: boolean;
//   images: { id: number; url: string; sort_order: number }[];
//   // Full product detail (from /products/{id})
//   variants?: { id: number; size: string; color: string; stock: number; additional_price: number }[];
//   // List response fields (from /products, /products/featured, /products/new-arrivals)
//   // These are pre-computed on the backend so ProductCard gets real sizes/colors
//   sizes?: string[];
//   colors?: string[];
//   total_stock?: number;
// }

// /**
//  * Transform a backend product into the shape all existing components expect.
//  *
//  * Priority for sizes/colors:
//  * 1. Use backend-provided sizes[]/colors[] if present (list endpoints)
//  * 2. Derive from variants[] if present (detail endpoint)
//  * 3. Fall back to ['Free Size'] / [] only if both are missing
//  */
// export function adaptProduct(p: BackendProduct) {
//   // Sizes: prefer pre-computed list from backend, fall back to variants
//   let sizes: string[];
//   if (p.sizes && p.sizes.length > 0) {
//     sizes = p.sizes;
//   } else if (p.variants && p.variants.length > 0) {
//     sizes = [...new Set(p.variants.map((v) => v.size).filter(Boolean))];
//   } else {
//     sizes = ['Free Size'];
//   }

//   // Colors: prefer pre-computed list, fall back to variants
//   // Filter out the 'Default' sentinel — it's an internal placeholder,
//   // not a real color to show to the user
//   let colors: string[];
//   if (p.colors && p.colors.length > 0) {
//     colors = p.colors.filter((c) => c && c !== 'Default');
//   } else if (p.variants && p.variants.length > 0) {
//     colors = [...new Set(
//       p.variants.map((v) => v.color).filter((c) => c && c !== 'Default')
//     )];
//   } else {
//     colors = [];
//   }

//   // Stock: from total_stock field (list) or sum of variants (detail)
//   const stock =
//     p.total_stock ??
//     (p.variants ? p.variants.reduce((s, v) => s + v.stock, 0) : 0);

//   return {
//     id: p.id,
//     title: p.title,
//     category: p.category.name,
//     price: Number(p.price),
//     oldPrice: Number(p.old_price),
//     images: p.images?.map((i) => i.url) ?? [],
//     sizes,
//     colors,
//     stock,
//     badge: p.badge ?? null,
//     rating: Number(p.rating),
//     reviews: p.review_count,
//     isNew: p.is_new,
//     isFeatured: p.is_featured,
//     description: p.description ?? '',
//     fabric: p.fabric ?? '',
//     specifications: p.specifications ?? '',
//   };
// }

// export type AdaptedProduct = ReturnType<typeof adaptProduct>;

// export const productsApi = {
//   list: async (params?: {
//     category?: string;
//     search?: string;
//     min_price?: number;
//     max_price?: number;
//     sort_by?: string;
//     page?: number;
//     page_size?: number;
//   }) => {
//     const res = await apiClient.get<{
//       data: BackendProduct[];
//       total: number;
//       page: number;
//       page_size: number;
//       total_pages: number;
//     }>('/products', { params });
//     return {
//       products: (res.data.data ?? []).map(adaptProduct),
//       total: res.data.total,
//       page: res.data.page,
//       totalPages: res.data.total_pages,
//     };
//   },

//   getById: async (id: number) => {
//     const res = await apiClient.get<{ data: BackendProduct }>(`/products/${id}`);
//     return adaptProduct(res.data.data);
//   },

//   getFeatured: async (limit = 8) => {
//     const res = await apiClient.get<{ data: BackendProduct[] }>('/products/featured', {
//       params: { limit },
//     });
//     return (res.data.data ?? []).map(adaptProduct);
//   },

//   getNewArrivals: async (limit = 12) => {
//     const res = await apiClient.get<{ data: BackendProduct[] }>('/products/new-arrivals', {
//       params: { limit },
//     });
//     return (res.data.data ?? []).map(adaptProduct);
//   },

//   getByCategory: async (categoryName: string, limit = 4) => {
//     const slug = categoryName.toLowerCase().replace(/\s+/g, '-');
//     const res = await apiClient.get<{
//       data: BackendProduct[];
//       total: number;
//     }>('/products', {
//       params: { category: slug, page: 1, page_size: limit, sort_by: 'featured' },
//     });
//     return (res.data.data ?? []).map(adaptProduct);
//   },

//   getCategories: async () => {
//     const res = await apiClient.get<{
//       data: { id: number; name: string; slug: string }[];
//     }>('/categories');
//     return res.data.data ?? [];
//   },
// };

import { apiClient } from './client';

export interface BackendProduct {
  id: number;
  title: string;
  description?: string;
  fabric?: string;
  specifications?: string;
  category: { id: number; name: string; slug: string };
  price: number;
  old_price: number;
  badge?: string;
  rating: number;
  review_count: number;
  is_new: boolean;
  is_featured: boolean;
  images: { id: number; url: string; sort_order: number }[];
  variants?: { id: number; size: string; color: string; stock: number; additional_price: number }[];
  sizes?: string[];
  colors?: string[];
  total_stock?: number;
}

export function adaptProduct(p: BackendProduct) {
  let sizes: string[];

  if (p.sizes && p.sizes.length > 0) {
    sizes = p.sizes;
  } else if (p.variants && p.variants.length > 0) {
    sizes = [...new Set(p.variants.map((v) => v.size).filter(Boolean))];
  } else {
    sizes = ['Free Size'];
  }

  let colors: string[];

  if (p.colors && p.colors.length > 0) {
    colors = p.colors.filter((c) => c && c !== 'Default');
  } else if (p.variants && p.variants.length > 0) {
    colors = [
      ...new Set(
        p.variants.map((v) => v.color).filter((c) => c && c !== 'Default')
      ),
    ];
  } else {
    colors = [];
  }

  const stock =
    p.total_stock ??
    (p.variants ? p.variants.reduce((sum, variant) => sum + variant.stock, 0) : 0);

  return {
    id: p.id,
    title: p.title,
    category: p.category.name,
    price: Number(p.price),
    oldPrice: Number(p.old_price),
    images: p.images?.map((image) => image.url) ?? [],
    sizes,
    colors,
    stock,
    badge: p.badge ?? null,
    rating: Number(p.rating),
    reviews: p.review_count,
    isNew: p.is_new,
    isFeatured: p.is_featured,
    description: p.description ?? '',
    fabric: p.fabric ?? '',
    specifications: p.specifications ?? '',
  };
}

export type AdaptedProduct = ReturnType<typeof adaptProduct>;

type CacheEntry<T> = {
  data?: T;
  promise?: Promise<T>;
};

const productCache = new Map<string, CacheEntry<any>>();

function getCacheKey(name: string, params?: Record<string, unknown>) {
  return `${name}:${JSON.stringify(params ?? {})}`;
}

function cachedRequest<T>(key: string, request: () => Promise<T>) {
  const cached = productCache.get(key);

  if (cached?.data) {
    return Promise.resolve(cached.data as T);
  }

  if (cached?.promise) {
    return cached.promise as Promise<T>;
  }

  const promise = request()
    .then((data) => {
      productCache.set(key, { data });
      return data;
    })
    .catch((error) => {
      productCache.delete(key);
      throw error;
    });

  productCache.set(key, { promise });

  return promise;
}

export function clearProductsCache() {
  productCache.clear();
}

export const productsApi = {
  list: async (params?: {
    category?: string;
    search?: string;
    min_price?: number;
    max_price?: number;
    sort_by?: string;
    page?: number;
    page_size?: number;
  }) => {
    const key = getCacheKey('list', params);

    return cachedRequest(key, async () => {
      const res = await apiClient.get<{
        data: BackendProduct[];
        total: number;
        page: number;
        page_size: number;
        total_pages: number;
      }>('/products', { params });

      return {
        products: (res.data.data ?? []).map(adaptProduct),
        total: res.data.total,
        page: res.data.page,
        totalPages: res.data.total_pages,
      };
    });
  },

  getById: async (id: number) => {
    const key = getCacheKey('detail', { id });

    return cachedRequest(key, async () => {
      const res = await apiClient.get<{ data: BackendProduct }>(`/products/${id}`);
      return adaptProduct(res.data.data);
    });
  },

  getFeatured: async (limit = 8) => {
    const key = getCacheKey('featured', { limit });

    return cachedRequest(key, async () => {
      const res = await apiClient.get<{ data: BackendProduct[] }>('/products/featured', {
        params: { limit },
      });

      return (res.data.data ?? []).map(adaptProduct);
    });
  },

  getNewArrivals: async (limit = 12) => {
    const key = getCacheKey('new-arrivals', { limit });

    return cachedRequest(key, async () => {
      const res = await apiClient.get<{ data: BackendProduct[] }>('/products/new-arrivals', {
        params: { limit },
      });

      return (res.data.data ?? []).map(adaptProduct);
    });
  },

  getByCategory: async (categoryName: string, limit = 4) => {
    const slug = categoryName.toLowerCase().replace(/\s+/g, '-');
    const key = getCacheKey('category', { slug, limit });

    return cachedRequest(key, async () => {
      const res = await apiClient.get<{
        data: BackendProduct[];
        total: number;
      }>('/products', {
        params: { category: slug, page: 1, page_size: limit, sort_by: 'featured' },
      });

      return (res.data.data ?? []).map(adaptProduct);
    });
  },

  getCategories: async () => {
    const key = getCacheKey('categories');

    return cachedRequest(key, async () => {
      const res = await apiClient.get<{
        data: { id: number; name: string; slug: string }[];
      }>('/categories');

      return res.data.data ?? [];
    });
  },
};