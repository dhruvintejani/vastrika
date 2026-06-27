// src/api/cart.ts
import { apiClient } from './client';

export interface CartItem {
  id: number;
  product_id: number;
  product_title: string;
  product_image?: string;
  category_name: string;
  price: number;
  old_price: number;
  selected_size: string;
  selected_color: string;
  quantity: number;
}

export interface CartResponse {
  id: number;
  items: CartItem[];
  subtotal: number;
  item_count: number;
}

export interface SyncItem {
  product_id: number;
  selected_size: string;
  selected_color: string;
  quantity: number;
}

export const cartApi = {
  get: () =>
    apiClient.get<{ data: CartResponse }>('/cart'),

  addItem: (product_id: number, selected_size: string, selected_color: string, quantity = 1) =>
    apiClient.post<{ data: CartResponse }>('/cart/items', {
      product_id, selected_size, selected_color, quantity,
    }),

  updateItem: (item_id: number, quantity: number) =>
    apiClient.put<{ data: CartResponse }>(`/cart/items/${item_id}`, { quantity }),

  removeItem: (item_id: number) =>
    apiClient.delete<{ data: CartResponse }>(`/cart/items/${item_id}`),

  clear: () =>
    apiClient.delete('/cart'),

  sync: (items: SyncItem[]) =>
    apiClient.post<{ data: CartResponse }>('/cart/sync', { items }),
};