// // // // src/types/index.ts

// // // export interface PaginatedResponse<T> {
// // //   success: boolean;
// // //   data: T[];
// // //   total: number;
// // //   page: number;
// // //   page_size: number;
// // //   total_pages: number;
// // // }

// // // export interface APIResponse<T> {
// // //   success: boolean;
// // //   data: T;
// // //   message?: string;
// // // }

// // // export interface Product {
// // //   id: number;
// // //   title: string;
// // //   description?: string;
// // //   category: Category;
// // //   price: number;
// // //   old_price: number;
// // //   badge?: string;
// // //   rating: number;
// // //   review_count: number;
// // //   is_new: boolean;
// // //   is_featured: boolean;
// // //   images: ProductImage[];
// // //   variants: ProductVariant[];
// // // }

// // // export interface ProductImage {
// // //   id: number;
// // //   cloudinary_public_id: string;
// // //   url: string;
// // //   sort_order: number;
// // // }

// // // export interface ProductVariant {
// // //   id: number;
// // //   size: string;
// // //   color: string;
// // //   stock: number;
// // //   additional_price: number;
// // // }

// // // export interface Category {
// // //   id: number;
// // //   name: string;
// // //   slug: string;
// // //   description?: string;
// // //   is_active: boolean;
// // // }

// // // export interface Order {
// // //   id: number;
// // //   order_number: string;
// // //   status: OrderStatus;
// // //   subtotal: number;
// // //   shipping_charge: number;
// // //   discount_amount: number;
// // //   total_amount: number;
// // //   shipping_name: string;
// // //   shipping_phone: string;
// // //   shipping_address: string;
// // //   payment_method: string;
// // //   payment_status: string;
// // //   notes?: string;
// // //   items: OrderItem[];
// // //   created_at: string;
// // //   user_id?: number;
// // //   user_email?: string;
// // //   user_name?: string;
// // // }

// // // export interface OrderItem {
// // //   id: number;
// // //   product_id: number;
// // //   product_title: string;
// // //   product_image: string;
// // //   selected_size: string;
// // //   selected_color: string;
// // //   quantity: number;
// // //   unit_price: number;
// // //   total_price: number;
// // // }

// // // // export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
// // // export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

// // // export interface User {
// // //   id: number;
// // //   email: string;
// // //   full_name: string;
// // //   phone?: string;
// // //   city?: string;
// // //   state?: string;
// // //   is_active: boolean;
// // //   is_blocked: boolean;
// // //   created_at: string;
// // // }

// // // export interface Coupon {
// // //   id: number;
// // //   code: string;
// // //   description?: string;
// // //   discount_type: 'percentage' | 'fixed';
// // //   discount_value: number;
// // //   min_order_amount: number;
// // //   max_discount_amount?: number;
// // //   usage_limit?: number;
// // //   used_count: number;
// // //   is_active: boolean;
// // //   expires_at?: string;
// // //   created_at: string;
// // // }

// // // export interface Banner {
// // //   id: number;
// // //   title: string;
// // //   subtitle?: string;
// // //   cta_text?: string;
// // //   cta_link?: string;
// // //   image_url: string;
// // //   sort_order: number;
// // //   is_active: boolean;
// // //   target?: string;
// // //   created_at: string;
// // // }

// // // export interface Review {
// // //   id: number;
// // //   product_id: number;
// // //   product_title: string;
// // //   user_id: number;
// // //   user_name: string;
// // //   rating: number;
// // //   title?: string;
// // //   body?: string;
// // //   is_approved: boolean;
// // //   is_flagged: boolean;
// // //   created_at: string;
// // // }

// // // export interface Setting {
// // //   key: string;
// // //   value: string;
// // //   label: string;
// // //   group: string;
// // // }

// // // export interface LowStockItem {
// // //   product_id: number;
// // //   product_title: string;
// // //   variant_id: number;
// // //   size: string;
// // //   color: string;
// // //   stock: number;
// // //   category: string;
// // // }

// // // export interface DashboardStats {
// // //   total_users: number;
// // //   total_orders: number;
// // //   total_revenue: number;
// // //   total_products: number;
// // //   pending_orders: number;
// // //   orders_today: number;
// // //   revenue_today: number;
// // // }

// // // export interface RevenueDataPoint {
// // //   label: string;
// // //   revenue: number;
// // //   orders: number;
// // // }


// // // src/types/index.ts

// // export interface PaginatedResponse<T> {
// //   success: boolean;
// //   data: T[];
// //   total: number;
// //   page: number;
// //   page_size: number;
// //   total_pages: number;
// // }

// // export interface APIResponse<T> {
// //   success: boolean;
// //   data: T;
// //   message?: string;
// // }

// // export interface Product {
// //   id: number;
// //   title: string;
// //   description?: string;
// //   fabric?: string;
// //   specifications?: string;
// //   category: Category;
// //   price: number;
// //   old_price: number;
// //   badge?: string;
// //   rating: number;
// //   review_count: number;
// //   is_new: boolean;
// //   is_featured: boolean;
// //   images: ProductImage[];
// //   variants: ProductVariant[];
// // }

// // export interface ProductImage {
// //   id: number;
// //   cloudinary_public_id: string;
// //   url: string;
// //   sort_order: number;
// // }

// // export interface ProductVariant {
// //   id: number;
// //   size: string;
// //   color: string;
// //   stock: number;
// //   additional_price: number;
// // }

// // export interface Category {
// //   id: number;
// //   name: string;
// //   slug: string;
// //   description?: string;
// //   is_active: boolean;
// // }

// // export interface Order {
// //   id: number;
// //   order_number: string;
// //   status: OrderStatus;
// //   subtotal: number;
// //   shipping_charge: number;
// //   discount_amount: number;
// //   total_amount: number;
// //   shipping_name: string;
// //   shipping_phone: string;
// //   shipping_address: string;
// //   payment_method: string;
// //   payment_status: string;
// //   notes?: string;
// //   items: OrderItem[];
// //   created_at: string;
// //   user_id?: number;
// //   user_email?: string;
// //   user_name?: string;
// // }

// // export interface OrderItem {
// //   id: number;
// //   product_id: number;
// //   product_title: string;
// //   product_image: string;
// //   selected_size: string;
// //   selected_color: string;
// //   quantity: number;
// //   unit_price: number;
// //   total_price: number;
// // }

// // // IMPORTANT: Backend DB stores lowercase values.
// // // Always use lowercase — never 'PENDING', 'CANCELLED' etc.
// // export type OrderStatus =
// //   | 'pending'
// //   | 'confirmed'
// //   | 'processing'
// //   | 'shipped'
// //   | 'delivered'
// //   | 'cancelled';

// // export interface User {
// //   id: number;
// //   email: string;
// //   full_name: string;
// //   phone?: string;
// //   city?: string;
// //   state?: string;
// //   is_active: boolean;
// //   is_blocked: boolean;
// //   created_at: string;
// // }

// // export interface Coupon {
// //   id: number;
// //   code: string;
// //   description?: string;
// //   discount_type: 'percentage' | 'fixed';
// //   discount_value: number;
// //   min_order_amount: number;
// //   max_discount_amount?: number;
// //   usage_limit?: number;
// //   used_count: number;
// //   is_active: boolean;
// //   expires_at?: string;
// //   created_at: string;
// // }

// // export interface Banner {
// //   id: number;
// //   title: string;
// //   subtitle?: string;
// //   cta_text?: string;
// //   cta_link?: string;
// //   image_url: string;
// //   sort_order: number;
// //   is_active: boolean;
// //   target?: string;
// //   created_at: string;
// // }

// // export interface Review {
// //   id: number;
// //   product_id: number;
// //   product_title: string;
// //   user_id: number;
// //   user_name: string;
// //   rating: number;
// //   title?: string;
// //   body?: string;
// //   is_approved: boolean;
// //   is_flagged: boolean;
// //   created_at: string;
// // }

// // export interface Setting {
// //   key: string;
// //   value: string;
// //   label: string;
// //   group: string;
// // }

// // export interface LowStockItem {
// //   product_id: number;
// //   product_title: string;
// //   variant_id: number;
// //   size: string;
// //   color: string;
// //   stock: number;
// //   category: string;
// // }

// // export interface DashboardStats {
// //   total_users: number;
// //   total_orders: number;
// //   total_revenue: number;
// //   total_products: number;
// //   pending_orders: number;
// //   orders_today: number;
// //   revenue_today: number;
// // }

// // export interface RevenueDataPoint {
// //   label: string;
// //   revenue: number;
// //   orders: number;
// // }

// // src/types/index.ts

// export interface PaginatedResponse<T> {
//   success: boolean;
//   data: T[];
//   total: number;
//   page: number;
//   page_size: number;
//   total_pages: number;
// }

// export interface APIResponse<T> {
//   success: boolean;
//   data: T;
//   message?: string;
// }

// export interface Product {
//   id: number;
//   title: string;
//   description?: string;
//   fabric?: string;
//   specifications?: string;
//   category: Category;
//   price: number;
//   old_price: number;
//   badge?: string;
//   rating: number;
//   review_count: number;
//   is_new: boolean;
//   is_featured: boolean;
//   is_active: boolean;
//   images: ProductImage[];
//   variants: ProductVariant[];
// }

// export interface ProductImage {
//   id: number;
//   cloudinary_public_id: string;
//   url: string;
//   sort_order: number;
// }

// export interface ProductVariant {
//   id: number;
//   size: string;
//   color: string;
//   stock: number;
//   additional_price: number;
// }

// export interface Category {
//   id: number;
//   name: string;
//   slug: string;
//   description?: string;
//   is_active: boolean;
// }

// export interface Order {
//   id: number;
//   order_number: string;
//   status: OrderStatus;
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
//   user_id?: number;
//   user_email?: string;
//   user_name?: string;
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

// export type OrderStatus =
//   | 'pending'
//   | 'confirmed'
//   | 'processing'
//   | 'shipped'
//   | 'delivered'
//   | 'cancelled';

// export interface User {
//   id: number;
//   email: string;
//   full_name: string;
//   phone?: string;
//   city?: string;
//   state?: string;
//   is_active: boolean;
//   is_blocked: boolean;
//   created_at: string;
// }

// export interface Coupon {
//   id: number;
//   code: string;
//   description?: string;
//   discount_type: 'percentage' | 'fixed';
//   discount_value: number;
//   min_order_amount: number;
//   max_discount_amount?: number;
//   usage_limit?: number;
//   used_count: number;
//   is_active: boolean;
//   expires_at?: string;
//   created_at: string;
// }

// export interface Banner {
//   id: number;
//   title: string;
//   subtitle?: string;
//   cta_text?: string;
//   cta_link?: string;
//   image_url: string;
//   sort_order: number;
//   is_active: boolean;
//   target?: string;
//   created_at: string;
// }

// export interface Review {
//   id: number;
//   product_id: number;
//   product_title: string;
//   user_id: number;
//   user_name: string;
//   rating: number;
//   title?: string;
//   body?: string;
//   is_approved: boolean;
//   is_flagged: boolean;
//   created_at: string;
// }

// export interface Setting {
//   key: string;
//   value: string;
//   label: string;
//   group: string;
// }

// export interface LowStockItem {
//   product_id: number;
//   product_title: string;
//   variant_id: number;
//   size: string;
//   color: string;
//   stock: number;
//   category: string;
// }

// export interface DashboardStats {
//   total_users: number;
//   total_orders: number;
//   total_revenue: number;
//   total_products: number;
//   pending_orders: number;
//   orders_today: number;
//   revenue_today: number;
// }

// export interface RevenueDataPoint {
//   label: string;
//   revenue: number;
//   orders: number;
// }


// src/types/index.ts

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface Product {
  id: number;
  title: string;
  description?: string;
  fabric?: string;
  specifications?: string;
  category: Category;
  price: number;
  old_price: number;
  badge?: string;
  rating: number;
  review_count: number;
  is_new: boolean;
  is_featured: boolean;
  is_active:boolean
  images: ProductImage[];
  variants: ProductVariant[];
}

export interface ProductImage {
  id: number;
  cloudinary_public_id: string;
  url: string;
  sort_order: number;
}

export interface ProductVariant {
  id: number;
  size: string;
  color: string;
  stock: number;
  additional_price: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  is_active: boolean;
}

export interface Order {
  id: number;
  order_number: string;
  status: OrderStatus;
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
  cancellation_reason?: string | null;
  items: OrderItem[];
  created_at: string;
  user_id?: number;
  user_email?: string;
  user_name?: string;
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

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface User {
  id: number;
  email: string;
  full_name: string;
  phone?: string;
  city?: string;
  state?: string;
  is_active: boolean;
  is_blocked: boolean;
  created_at: string;
}

export interface Coupon {
  id: number;
  code: string;
  description?: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_amount: number;
  max_discount_amount?: number;
  usage_limit?: number;
  used_count: number;
  is_active: boolean;
  expires_at?: string;
  created_at: string;
}

export interface Banner {
  id: number;
  title: string;
  subtitle?: string;
  cta_text?: string;
  cta_link?: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
  target?: string;
  created_at: string;
}

export interface Review {
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

export interface Setting {
  key: string;
  value: string;
  label: string;
  group: string;
}

export interface LowStockItem {
  product_id: number;
  product_title: string;
  variant_id: number;
  size: string;
  color: string;
  stock: number;
  category: string;
}

export interface DashboardStats {
  total_users: number;
  total_orders: number;
  total_revenue: number;
  total_products: number;
  pending_orders: number;
  orders_today: number;
  revenue_today: number;
}

export interface RevenueDataPoint {
  label: string;
  revenue: number;
  orders: number;
}
