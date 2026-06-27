// src/api/wishlist.ts
import { apiClient } from './client';

export interface WishlistItem {
  id: number;
  product_id: number;
  product_title: string;
  product_image?: string;
  category_name: string;
  price: number;
  old_price: number;
  badge?: string;
}

export const wishlistApi = {
  get: () =>
    apiClient.get<{ data: WishlistItem[] }>('/wishlist'),

  add: (product_id: number) =>
    apiClient.post(`/wishlist/${product_id}`),

  remove: (product_id: number) =>
    apiClient.delete(`/wishlist/${product_id}`),
};