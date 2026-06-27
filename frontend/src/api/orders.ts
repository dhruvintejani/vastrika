// // src/api/orders.ts
// import { apiClient } from './client';

// export interface ShippingAddress {
//   full_name: string;
//   phone: string;
//   address_line1: string;
//   address_line2?: string;
//   city: string;
//   state: string;
//   pincode: string;
// }

// export interface CreateOrderPayload {
//   shipping_address: ShippingAddress;
//   payment_method: 'upi' | 'card' | 'cod' | 'netbanking';
//   notes?: string;
// }

// export interface OrderItem {
//   id: number;
//   product_id: number;
//   product_title: string;
//   product_image: string;
//   selected_size: string;
//   selected_color: string;
//   quantity: number;
//   unit_price: number;
//   total_price: number;
// }

// export interface Order {
//   id: number;
//   order_number: string;
//   status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
//   subtotal: number;
//   shipping_charge: number;
//   discount_amount: number;
//   total_amount: number;
//   shipping_name: string;
//   shipping_phone: string;
//   shipping_address: string;
//   payment_method: string;
//   payment_status: string;
//   notes?: string;
//   items: OrderItem[];
//   created_at: string;
// }

// export interface OrderListItem {
//   id: number;
//   order_number: string;
//   status: Order['status'];
//   total_amount: number;
//   payment_method: string;
//   payment_status: string;
//   item_count: number;
//   created_at: string;
// }

// export const ordersApi = {
//   create: (payload: CreateOrderPayload) =>
//     apiClient.post<{ data: Order; message: string }>('/orders', payload),

//   list: (page = 1, page_size = 10) =>
//     apiClient.get<{ data: OrderListItem[]; total: number; total_pages: number }>('/orders', {
//       params: { page, page_size },
//     }),

//   getById: (id: number) =>
//     apiClient.get<{ data: Order }>(`/orders/${id}`),

//   cancel: (id: number) =>
//     apiClient.post<{ data: Order }>(`/orders/${id}/cancel`),
// };

// src/api/orders.ts
import { apiClient } from './client';

export interface ShippingAddress {
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CreateOrderPayload {
  shipping_address: ShippingAddress;
  payment_method: 'upi' | 'card' | 'cod' | 'netbanking';
  notes?: string;
}

export interface OrderItem {
  id: number;
  product_id: number;
  product_title: string;
  product_image: string;
  selected_size: string;
  selected_color: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Order {
  id: number;
  order_number: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  shipping_charge: number;
  discount_amount: number;
  total_amount: number;
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  payment_method: string;
  payment_status: string;
  notes?: string;
  cancellation_reason?: string;
  items: OrderItem[];
  created_at: string;
}

export interface OrderListItem {
  id: number;
  order_number: string;
  status: Order['status'];
  total_amount: number;
  payment_method: string;
  payment_status: string;
  item_count: number;
  created_at: string;
}

export const ordersApi = {
  create: (payload: CreateOrderPayload) =>
    apiClient.post<{ data: Order; message: string }>('/orders', payload),

  list: (page = 1, page_size = 10) =>
    apiClient.get<{ data: OrderListItem[]; total: number; total_pages: number }>('/orders', {
      params: { page, page_size },
    }),

  getById: (id: number) =>
    apiClient.get<{ data: Order }>(`/orders/${id}`),

  // reason is optional — sent in request body so backend can store it
  cancel: (id: number, reason?: string) =>
    apiClient.post<{ data: Order }>(`/orders/${id}/cancel`, { reason }),
};