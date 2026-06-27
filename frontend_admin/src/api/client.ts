// // src/api/client.ts
// import axios from 'axios';

// const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// export const api = axios.create({
//   baseURL: BASE_URL,
//   headers: { 'Content-Type': 'application/json' },
// });

// // Attach admin JWT to every request
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('vastrika_admin_token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // On 401: clear token and dispatch an event so the React auth store can
// // react cleanly via useEffect — do NOT use window.location.href here because
// // that fires synchronously during a React render cycle and causes the
// // route-flickering / infinite redirect loop seen in the admin panel.
// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response?.status === 401) {
//       localStorage.removeItem('vastrika_admin_token');
//       // Dispatch a custom event; App.tsx listens and calls logout()
//       window.dispatchEvent(new Event('admin:unauthorized'));
//     }
//     return Promise.reject(err);
//   }
// );

// // ── Typed API helpers ─────────────────────────────────────────────────────────

// export const adminApi = {
//   // Auth
//   login: (email: string, password: string) =>
//     api.post('/admin/auth/login', { email, password }),
//   logout: () => api.post('/admin/auth/logout'),
//   refresh: () => api.post('/admin/auth/refresh'),

//   // Dashboard
//   getDashboard: () => api.get('/admin/dashboard'),
//   getRevenue: (period: string) => api.get(`/admin/analytics/revenue?period=${period}`),

//   // Products
//   getProducts: (params?: Record<string, unknown>) => api.get('/admin/products', { params }),
//   getProduct: (id: number) => api.get(`/admin/products/${id}`),
//   createProduct: (data: unknown) => api.post('/admin/products', data),
//   updateProduct: (id: number, data: unknown) => api.put(`/admin/products/${id}`, data),
//   deleteProduct: (id: number) => api.delete(`/admin/products/${id}`),
//   uploadProductImage: (id: number, file: File, sortOrder = 0) => {
//     const form = new FormData();
//     form.append('file', file);
//     return api.post(`/admin/products/${id}/images?sort_order=${sortOrder}`, form, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//   },
//   deleteProductImage: (productId: number, imageId: number) =>
//     api.delete(`/admin/products/${productId}/images/${imageId}`),
//   updateStock: (productId: number, variantId: number, stock: number) =>
//     api.patch(`/admin/products/${productId}/stock`, { variant_id: variantId, stock }),

//   // Categories
//   getCategories: () => api.get('/admin/categories'),
//   createCategory: (data: unknown) => api.post('/admin/categories', data),
//   updateCategory: (id: number, data: unknown) => api.put(`/admin/categories/${id}`, data),
//   deleteCategory: (id: number) => api.delete(`/admin/categories/${id}`),

//   // Orders
//   getOrders: (params?: Record<string, unknown>) => api.get('/admin/orders', { params }),
//   getOrder: (id: number) => api.get(`/admin/orders/${id}`),
//   updateOrderStatus: (id: number, status: string) =>
//     api.patch(`/admin/orders/${id}/status`, { status }),

//   // Users
//   getUsers: (params?: Record<string, unknown>) => api.get('/admin/users', { params }),
//   getUser: (id: number) => api.get(`/admin/users/${id}`),
//   blockUser: (id: number) => api.patch(`/admin/users/${id}/block`),
//   unblockUser: (id: number) => api.patch(`/admin/users/${id}/unblock`),

//   // Inventory
//   getInventory: (threshold?: number) =>
//     api.get('/admin/inventory', { params: threshold ? { threshold } : {} }),

//   // Coupons
//   getCoupons: (params?: Record<string, unknown>) => api.get('/admin/coupons', { params }),
//   createCoupon: (data: unknown) => api.post('/admin/coupons', data),
//   updateCoupon: (id: number, data: unknown) => api.put(`/admin/coupons/${id}`, data),
//   deleteCoupon: (id: number) => api.delete(`/admin/coupons/${id}`),

//   // Banners
//   getBanners: () => api.get('/admin/banners'),
//   createBanner: (data: unknown) => api.post('/admin/banners', data),
//   updateBanner: (id: number, data: unknown) => api.put(`/admin/banners/${id}`, data),
//   deleteBanner: (id: number) => api.delete(`/admin/banners/${id}`),
//   uploadBannerImage: (id: number, file: File) => {
//     const form = new FormData();
//     form.append('file', file);
//     return api.post(`/admin/banners/${id}/image`, form, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//   },

//   // Reviews
//   getReviews: (params?: Record<string, unknown>) => api.get('/admin/reviews', { params }),
//   approveReview: (id: number) => api.patch(`/admin/reviews/${id}/approve`),
//   rejectReview: (id: number) => api.patch(`/admin/reviews/${id}/reject`),
//   flagReview: (id: number) => api.patch(`/admin/reviews/${id}/flag`),

//   // Settings
//   getSettings: () => api.get('/admin/settings'),
//   updateSettings: (settings: Record<string, string>) =>
//     api.patch('/admin/settings', { settings }),
// };


// src/api/client.ts
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach admin JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('vastrika_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// On 401: clear token and dispatch an event so the React auth store can
// react cleanly via useEffect — do NOT use window.location.href here because
// that fires synchronously during a React render cycle and causes the
// route-flickering / infinite redirect loop seen in the admin panel.
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('vastrika_admin_token');
      // Dispatch a custom event; App.tsx listens and calls logout()
      window.dispatchEvent(new Event('admin:unauthorized'));
    }
    return Promise.reject(err);
  }
);

// ── Typed API helpers ─────────────────────────────────────────────────────────

export const adminApi = {
  // Auth
  login: (email: string, password: string) =>
    api.post('/admin/auth/login', { email, password }),
  logout: () => api.post('/admin/auth/logout'),
  refresh: () => api.post('/admin/auth/refresh'),

  // Dashboard
  getDashboard: () => api.get('/admin/dashboard'),
  getRevenue: (period: string) => api.get(`/admin/analytics/revenue?period=${period}`),

  // Products
  getProducts: (params?: Record<string, unknown>) => api.get('/admin/products', { params }),
  getProduct: (id: number) => api.get(`/admin/products/${id}`),
  createProduct: (data: unknown) => api.post('/admin/products', data),
  updateProduct: (id: number, data: unknown) => api.put(`/admin/products/${id}`, data),
  deleteProduct: (id: number) => api.delete(`/admin/products/${id}`),
  uploadProductImage: (id: number, file: File, sortOrder = 0) => {
    const form = new FormData();
    form.append('file', file);
    return api.post(`/admin/products/${id}/images?sort_order=${sortOrder}`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteProductImage: (productId: number, imageId: number) =>
    api.delete(`/admin/products/${productId}/images/${imageId}`),
  updateStock: (productId: number, variantId: number, stock: number) =>
    api.patch(`/admin/products/${productId}/stock`, { variant_id: variantId, stock }),

  // Categories
  getCategories: () => api.get('/admin/categories'),
  createCategory: (data: unknown) => api.post('/admin/categories', data),
  updateCategory: (id: number, data: unknown) => api.put(`/admin/categories/${id}`, data),
  deleteCategory: (id: number) => api.delete(`/admin/categories/${id}`),

  // Orders
  getOrders: (params?: Record<string, unknown>) => api.get('/admin/orders', { params }),
  getOrder: (id: number) => api.get(`/admin/orders/${id}`),
  updateOrderStatus: (id: number, status: string) =>
    api.patch(`/admin/orders/${id}/status`, { status }),

  // Users
  getUsers: (params?: Record<string, unknown>) => api.get('/admin/users', { params }),
  getUser: (id: number) => api.get(`/admin/users/${id}`),
  blockUser: (id: number) => api.patch(`/admin/users/${id}/block`),
  unblockUser: (id: number) => api.patch(`/admin/users/${id}/unblock`),

  // Inventory
  getInventory: (threshold?: number) =>
    api.get('/admin/inventory', { params: threshold ? { threshold } : {} }),

  // Coupons
  getCoupons: (params?: Record<string, unknown>) => api.get('/admin/coupons', { params }),
  createCoupon: (data: unknown) => api.post('/admin/coupons', data),
  updateCoupon: (id: number, data: unknown) => api.put(`/admin/coupons/${id}`, data),
  deleteCoupon: (id: number) => api.delete(`/admin/coupons/${id}`),

  // Banners
  getBanners: () => api.get('/admin/banners'),
  createBanner: (data: unknown) => api.post('/admin/banners', data),
  updateBanner: (id: number, data: unknown) => api.put(`/admin/banners/${id}`, data),
  deleteBanner: (id: number) => api.delete(`/admin/banners/${id}`),
  uploadBannerImage: (id: number, file: File) => {
    const form = new FormData();
    form.append('file', file);
    return api.post(`/admin/banners/${id}/image`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // Reviews
  getReviews: (params?: Record<string, unknown>) => api.get('/admin/reviews', { params }),
  approveReview: (id: number) => api.patch(`/admin/reviews/${id}/approve`),
  rejectReview: (id: number) => api.patch(`/admin/reviews/${id}/reject`),
  flagReview: (id: number) => api.patch(`/admin/reviews/${id}/flag`),

  // Settings
  getSettings: () => api.get('/admin/settings'),
  updateSettings: (settings: Record<string, string>) =>
    api.patch('/admin/settings', { settings }),
};
