// // import { apiClient } from './client';

// // export interface ProductReview {
// //   id: number;
// //   product_id: number;
// //   product_title: string;
// //   user_id: number;
// //   user_name: string;
// //   rating: number;
// //   title?: string | null;
// //   body?: string | null;
// //   is_approved: boolean;
// //   is_flagged: boolean;
// //   created_at: string;
// // }

// // export const reviewsApi = {
// //   listByProduct: async (productId: number) => {
// //     const res = await apiClient.get<{ data: ProductReview[] }>(
// //       `/products/${productId}/reviews`
// //     );
// //     return res.data.data ?? [];
// //   },

// //   create: async (data: {
// //     product_id: number;
// //     rating: number;
// //     title?: string;
// //     body?: string;
// //   }) => {
// //     const res = await apiClient.post<{ data: ProductReview; message?: string }>(
// //       '/reviews',
// //       data
// //     );
// //     return res.data.data;
// //   },
// // };


// import { apiClient } from './client';

// export interface ProductReview {
//   id: number;
//   product_id: number;
//   product_title: string;
//   user_id: number;
//   user_name: string;
//   user_email: string;
//   rating: number;
//   title?: string | null;
//   body?: string | null;
//   is_approved: boolean;
//   is_flagged: boolean;
//   is_removed: boolean;
//   removed_at?: string | null;
//   created_at: string;
// }

// export const reviewsApi = {
//   listByProduct: async (productId: number): Promise<ProductReview[]> => {
//     const res = await apiClient.get(`/products/${productId}/reviews`);
//     return res.data.data || [];
//   },

//   create: async (data: {
//     product_id: number;
//     rating: number;
//     body: string;
//   }): Promise<ProductReview> => {
//     const res = await apiClient.post('/reviews', data);
//     return res.data.data;
//   },
// };


import { apiClient } from './client';

export interface ProductReview {
  id: number;
  product_id: number;
  product_title: string;
  user_id: number;
  user_name: string;
  user_email: string;
  rating: number;
  title?: string | null;
  body?: string | null;
  is_approved: boolean;
  is_flagged: boolean;
  is_removed: boolean;
  removed_at?: string | null;
  created_at: string;
}

export const reviewsApi = {
  listByProduct: async (productId: number): Promise<ProductReview[]> => {
    const res = await apiClient.get(`/products/${productId}/reviews`);
    return res.data.data || [];
  },

  getMyReview: async (productId: number): Promise<ProductReview | null> => {
    const res = await apiClient.get('/reviews/my', {
      params: { product_id: productId },
    });
    return res.data.data || null;
  },

  create: async (data: {
    product_id: number;
    rating: number;
    body: string;
  }): Promise<ProductReview> => {
    const res = await apiClient.post('/reviews', data);
    return res.data.data;
  },

  update: async (
    reviewId: number,
    data: {
      rating: number;
      body: string;
    }
  ): Promise<ProductReview> => {
    const res = await apiClient.patch(`/reviews/${reviewId}`, data);
    return res.data.data;
  },
};
