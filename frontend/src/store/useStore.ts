// // // import { create } from 'zustand';
// // // import { persist } from 'zustand/middleware';
// // // import { Product } from '../data/products';
// // // import toast from 'react-hot-toast';

// // // export interface CartItem extends Product {
// // //   quantity: number;
// // //   selectedSize: string;
// // //   selectedColor: string;
// // // }

// // // interface StoreState {
// // //   cart: CartItem[];
// // //   wishlist: Product[];
// // //   addToCart: (product: Product, size: string, color: string, qty?: number) => void;
// // //   removeFromCart: (id: number) => void;
// // //   updateQuantity: (id: number, quantity: number) => void;
// // //   clearCart: () => void;
// // //   addToWishlist: (product: Product) => void;
// // //   removeFromWishlist: (id: number) => void;
// // //   isInWishlist: (id: number) => boolean;
// // //   isInCart: (id: number) => boolean;
// // //   cartTotal: () => number;
// // //   cartCount: () => number;
// // // }

// // // export const useStore = create<StoreState>()(
// // //   persist(
// // //     (set, get) => ({
// // //       cart: [],
// // //       wishlist: [],

// // //       addToCart: (product, size, color, qty = 1) => {
// // //         const { cart } = get();
// // //         const existing = cart.find(item => item.id === product.id && item.selectedSize === size);
// // //         if (existing) {
// // //           set({
// // //             cart: cart.map(item =>
// // //               item.id === product.id && item.selectedSize === size
// // //                 ? { ...item, quantity: item.quantity + qty }
// // //                 : item
// // //             ),
// // //           });
// // //           toast.success('Cart updated!', {
// // //             style: {
// // //               fontFamily: 'Outfit, sans-serif',
// // //               background: '#F8F5F0',
// // //               color: '#1F1F1F',
// // //               border: '1px solid #C9A86A',
// // //             },
// // //             iconTheme: { primary: '#C9A86A', secondary: '#F8F5F0' },
// // //           });
// // //         } else {
// // //           set({
// // //             cart: [...cart, { ...product, quantity: qty, selectedSize: size, selectedColor: color }],
// // //           });
// // //           toast.success('Added to cart!', {
// // //             style: {
// // //               fontFamily: 'Outfit, sans-serif',
// // //               background: '#F8F5F0',
// // //               color: '#1F1F1F',
// // //               border: '1px solid #C9A86A',
// // //             },
// // //             iconTheme: { primary: '#C9A86A', secondary: '#F8F5F0' },
// // //           });
// // //         }
// // //       },

// // //       removeFromCart: (id) => {
// // //         set({ cart: get().cart.filter(item => item.id !== id) });
// // //         toast.success('Removed from cart', {
// // //           style: {
// // //             fontFamily: 'Outfit, sans-serif',
// // //             background: '#F8F5F0',
// // //             color: '#1F1F1F',
// // //             border: '1px solid #C58C85',
// // //           },
// // //           iconTheme: { primary: '#C58C85', secondary: '#F8F5F0' },
// // //         });
// // //       },

// // //       updateQuantity: (id, quantity) => {
// // //         if (quantity <= 0) {
// // //           get().removeFromCart(id);
// // //           return;
// // //         }
// // //         set({
// // //           cart: get().cart.map(item =>
// // //             item.id === id ? { ...item, quantity } : item
// // //           ),
// // //         });
// // //       },

// // //       clearCart: () => {
// // //         set({ cart: [] });
// // //       },

// // //       addToWishlist: (product) => {
// // //         const { wishlist } = get();
// // //         if (wishlist.find(item => item.id === product.id)) {
// // //           set({ wishlist: wishlist.filter(item => item.id !== product.id) });
// // //           toast('Removed from wishlist', {
// // //             icon: '💔',
// // //             style: {
// // //               fontFamily: 'Outfit, sans-serif',
// // //               background: '#F8F5F0',
// // //               color: '#1F1F1F',
// // //               border: '1px solid #E8DCCB',
// // //             },
// // //           });
// // //         } else {
// // //           set({ wishlist: [...wishlist, product] });
// // //           toast.success('Added to wishlist!', {
// // //             icon: '❤️',
// // //             style: {
// // //               fontFamily: 'Outfit, sans-serif',
// // //               background: '#F8F5F0',
// // //               color: '#1F1F1F',
// // //               border: '1px solid #C9A86A',
// // //             },
// // //           });
// // //         }
// // //       },

// // //       removeFromWishlist: (id) => {
// // //         set({ wishlist: get().wishlist.filter(item => item.id !== id) });
// // //         toast('Removed from wishlist', {
// // //           icon: '💔',
// // //           style: {
// // //             fontFamily: 'Outfit, sans-serif',
// // //             background: '#F8F5F0',
// // //             color: '#1F1F1F',
// // //             border: '1px solid #E8DCCB',
// // //           },
// // //         });
// // //       },

// // //       isInWishlist: (id) => !!get().wishlist.find(item => item.id === id),
// // //       isInCart: (id) => !!get().cart.find(item => item.id === id),

// // //       cartTotal: () =>
// // //         get().cart.reduce((total, item) => total + item.price * item.quantity, 0),

// // //       cartCount: () =>
// // //         get().cart.reduce((total, item) => total + item.quantity, 0),
// // //     }),
// // //     {
// // //       name: 'vastrika-store',
// // //     }
// // //   )
// // // );


// // // src/store/useStore.ts
// // // Unified cart + wishlist store.
// // // - Guests: state is local (Zustand persist) — same behaviour as before.
// // // - Authenticated users: every mutation hits the server API; local state is
// // //   kept in sync so all existing components work without any changes.
// // import { create } from 'zustand';
// // import { persist } from 'zustand/middleware';
// // import toast from 'react-hot-toast';
// // import { cartApi, CartItem as ServerCartItem } from '../api/cart';
// // import { wishlistApi, WishlistItem as ServerWishlistItem } from '../api/wishlist';

// // // ── Shape that all existing components expect ─────────────────────────────────
// // export interface CartProduct {
// //   id: number;
// //   title: string;
// //   category: string;
// //   price: number;
// //   oldPrice: number;
// //   images: string[];
// //   sizes: string[];
// //   colors: string[];
// //   stock: number;
// //   badge?: string | null;
// //   rating: number;
// //   reviews: number;
// //   isNew: boolean;
// //   isFeatured: boolean;
// //   description: string;
// //   fabric: string;
// //   specifications: string;
// // }

// // export interface CartItemLocal extends CartProduct {
// //   selectedSize: string;
// //   selectedColor: string;
// //   quantity: number;
// //   // server cart item id (undefined for guests)
// //   _serverId?: number;
// // }

// // interface StoreState {
// //   cart: CartItemLocal[];
// //   wishlist: CartProduct[];

// //   // Cart actions (called by existing components — signature unchanged)
// //   addToCart: (product: CartProduct, size: string, color: string, quantity?: number) => Promise<void>;
// //   removeFromCart: (productId: number) => Promise<void>;
// //   updateQuantity: (productId: number, quantity: number) => Promise<void>;
// //   cartCount: () => number;
// //   cartTotal: () => number;

// //   // Wishlist actions
// //   addToWishlist: (product: CartProduct) => Promise<void>;
// //   removeFromWishlist: (productId: number) => Promise<void>;
// //   isInWishlist: (productId: number) => boolean;

// //   // Called after login to pull server state
// //   loadServerCart: () => Promise<void>;
// //   loadServerWishlist: () => Promise<void>;

// //   // Provide guest cart items for sync-on-login
// //   getGuestCartForSync: () => { product_id: number; selected_size: string; selected_color: string; quantity: number }[];

// //   // Called on logout to clear server-side state from local
// //   clearServerState: () => void;
// // }

// // function isAuthed(): boolean {
// //   return !!localStorage.getItem('vastrika_access_token');
// // }

// // function serverItemToLocal(item: ServerCartItem): CartItemLocal {
// //   return {
// //     id: item.product_id,
// //     title: item.product_title,
// //     category: item.category_name,
// //     price: Number(item.price),
// //     oldPrice: Number(item.old_price),
// //     images: item.product_image ? [item.product_image] : [],
// //     sizes: [item.selected_size],
// //     colors: [item.selected_color],
// //     stock: 999,
// //     badge: null,
// //     rating: 0,
// //     reviews: 0,
// //     isNew: false,
// //     isFeatured: false,
// //     description: '',
// //     fabric: '',
// //     specifications: '',
// //     selectedSize: item.selected_size,
// //     selectedColor: item.selected_color,
// //     quantity: item.quantity,
// //     _serverId: item.id,
// //   };
// // }

// // function serverWishlistToLocal(item: ServerWishlistItem): CartProduct {
// //   return {
// //     id: item.product_id,
// //     title: item.product_title,
// //     category: item.category_name,
// //     price: Number(item.price),
// //     oldPrice: Number(item.old_price),
// //     images: item.product_image ? [item.product_image] : [],
// //     sizes: [],
// //     colors: [],
// //     stock: 999,
// //     badge: item.badge ?? null,
// //     rating: 0,
// //     reviews: 0,
// //     isNew: false,
// //     isFeatured: false,
// //     description: '',
// //     fabric: '',
// //     specifications: '',
// //   };
// // }

// // const toastOpts = {
// //   style: {
// //     fontFamily: 'Outfit, sans-serif',
// //     background: '#F8F5F0',
// //     color: '#1F1F1F',
// //     border: '1px solid #C9A86A',
// //   },
// //   iconTheme: { primary: '#C9A86A', secondary: '#F8F5F0' },
// // };

// // export const useStore = create<StoreState>()(
// //   persist(
// //     (set, get) => ({
// //       cart: [],
// //       wishlist: [],

// //       // ── Cart ───────────────────────────────────────────────────────────────

// //       addToCart: async (product, size, color, quantity = 1) => {
// //         if (isAuthed()) {
// //           try {
// //             const res = await cartApi.addItem(product.id, size, color, quantity);
// //             const serverCart = res.data.data;
// //             set({ cart: serverCart.items.map(serverItemToLocal) });
// //             toast.success(`${product.title} added to cart`, toastOpts);
// //           } catch (err: any) {
// //             const msg = err.response?.data?.error || 'Could not add to cart';
// //             toast.error(msg, toastOpts);
// //           }
// //           return;
// //         }

// //         // Guest: local state
// //         set((state) => {
// //           const existing = state.cart.find(
// //             (i) => i.id === product.id && i.selectedSize === size && i.selectedColor === color
// //           );
// //           if (existing) {
// //             return {
// //               cart: state.cart.map((i) =>
// //                 i.id === product.id && i.selectedSize === size && i.selectedColor === color
// //                   ? { ...i, quantity: i.quantity + quantity }
// //                   : i
// //               ),
// //             };
// //           }
// //           return {
// //             cart: [
// //               ...state.cart,
// //               { ...product, selectedSize: size, selectedColor: color, quantity },
// //             ],
// //           };
// //         });
// //         toast.success(`${product.title} added to cart`, toastOpts);
// //       },

// //       removeFromCart: async (productId) => {
// //         if (isAuthed()) {
// //           const item = get().cart.find((i) => i.id === productId);
// //           if (item?._serverId) {
// //             try {
// //               const res = await cartApi.removeItem(item._serverId);
// //               set({ cart: res.data.data.items.map(serverItemToLocal) });
// //             } catch {
// //               toast.error('Could not remove item', toastOpts);
// //             }
// //           }
// //           return;
// //         }
// //         set((state) => ({ cart: state.cart.filter((i) => i.id !== productId) }));
// //       },

// //       updateQuantity: async (productId, quantity) => {
// //         if (quantity <= 0) {
// //           await get().removeFromCart(productId);
// //           return;
// //         }
// //         if (isAuthed()) {
// //           const item = get().cart.find((i) => i.id === productId);
// //           if (item?._serverId) {
// //             try {
// //               const res = await cartApi.updateItem(item._serverId, quantity);
// //               set({ cart: res.data.data.items.map(serverItemToLocal) });
// //             } catch {
// //               toast.error('Could not update quantity', toastOpts);
// //             }
// //           }
// //           return;
// //         }
// //         set((state) => ({
// //           cart: state.cart.map((i) =>
// //             i.id === productId ? { ...i, quantity } : i
// //           ),
// //         }));
// //       },

// //       cartCount: () => get().cart.reduce((sum, i) => sum + i.quantity, 0),

// //       cartTotal: () =>
// //         get().cart.reduce((sum, i) => sum + i.price * i.quantity, 0),

// //       // ── Wishlist ──────────────────────────────────────────────────────────

// //       addToWishlist: async (product) => {
// //         if (isAuthed()) {
// //           try {
// //             await wishlistApi.add(product.id);
// //             set((state) => {
// //               if (state.wishlist.find((w) => w.id === product.id)) return state;
// //               return { wishlist: [...state.wishlist, product] };
// //             });
// //             toast.success('Added to wishlist', toastOpts);
// //           } catch (err: any) {
// //             const msg = err.response?.data?.error || 'Could not update wishlist';
// //             toast.error(msg, toastOpts);
// //           }
// //           return;
// //         }
// //         set((state) => {
// //           if (state.wishlist.find((w) => w.id === product.id)) return state;
// //           return { wishlist: [...state.wishlist, product] };
// //         });
// //         toast.success('Added to wishlist', toastOpts);
// //       },

// //       removeFromWishlist: async (productId) => {
// //         if (isAuthed()) {
// //           try {
// //             await wishlistApi.remove(productId);
// //           } catch {
// //             // Still remove locally even if API fails
// //           }
// //         }
// //         set((state) => ({ wishlist: state.wishlist.filter((w) => w.id !== productId) }));
// //       },

// //       isInWishlist: (productId) => !!get().wishlist.find((w) => w.id === productId),

// //       // ── Server sync ───────────────────────────────────────────────────────

// //       loadServerCart: async () => {
// //         try {
// //           const res = await cartApi.get();
// //           set({ cart: res.data.data.items.map(serverItemToLocal) });
// //         } catch {
// //           // If load fails, keep existing local state
// //         }
// //       },

// //       loadServerWishlist: async () => {
// //         try {
// //           const res = await wishlistApi.get();
// //           set({ wishlist: res.data.data.map(serverWishlistToLocal) });
// //         } catch {
// //           // Keep existing local state
// //         }
// //       },

// //       getGuestCartForSync: () =>
// //         get().cart.map((i) => ({
// //           product_id: i.id,
// //           selected_size: i.selectedSize,
// //           selected_color: i.selectedColor,
// //           quantity: i.quantity,
// //         })),

// //       clearServerState: () => set({ cart: [], wishlist: [] }),
// //     }),
// //     {
// //       name: 'vastrika-store',
// //       // Only persist for guests — authenticated state is loaded from server
// //       partialize: (state) => ({
// //         cart: isAuthed() ? [] : state.cart,
// //         wishlist: isAuthed() ? [] : state.wishlist,
// //       }),
// //     }
// //   )
// // );

// // src/store/useStore.ts
// // Unified cart + wishlist store.
// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import toast from 'react-hot-toast';
// import { cartApi, CartItem as ServerCartItem } from '../api/cart';
// import { wishlistApi, WishlistItem as ServerWishlistItem } from '../api/wishlist';

// export interface CartProduct {
//   id: number;
//   title: string;
//   category: string;
//   price: number;
//   oldPrice: number;
//   images: string[];
//   sizes: string[];
//   colors: string[];
//   stock: number;
//   badge?: string | null;
//   rating: number;
//   reviews: number;
//   isNew: boolean;
//   isFeatured: boolean;
//   description: string;
//   fabric: string;
//   specifications: string;
// }

// export interface CartItemLocal extends CartProduct {
//   selectedSize: string;
//   selectedColor: string;
//   quantity: number;
//   _serverId?: number;
// }

// interface StoreState {
//   cart: CartItemLocal[];
//   wishlist: CartProduct[];

//   addToCart: (product: CartProduct, size: string, color: string, quantity?: number) => Promise<void>;
//   removeFromCart: (productId: number) => Promise<void>;
//   // NEW: remove by server cart item ID — avoids matching wrong item when
//   // the same product is in the cart multiple times with different sizes
//   removeFromCartByServerId: (serverId: number) => Promise<void>;
//   updateQuantity: (productId: number, quantity: number) => Promise<void>;
//   cartCount: () => number;
//   cartTotal: () => number;

//   addToWishlist: (product: CartProduct) => Promise<void>;
//   removeFromWishlist: (productId: number) => Promise<void>;
//   isInWishlist: (productId: number) => boolean;

//   loadServerCart: () => Promise<void>;
//   loadServerWishlist: () => Promise<void>;
//   getGuestCartForSync: () => { product_id: number; selected_size: string; selected_color: string; quantity: number }[];
//   clearServerState: () => void;
// }

// function isAuthed(): boolean {
//   return !!localStorage.getItem('vastrika_access_token');
// }

// function serverItemToLocal(item: ServerCartItem): CartItemLocal {
//   return {
//     id: item.product_id,
//     title: item.product_title,
//     category: item.category_name,
//     price: Number(item.price),
//     oldPrice: Number(item.old_price),
//     images: item.product_image ? [item.product_image] : [],
//     sizes: [item.selected_size],
//     colors: item.selected_color && item.selected_color !== 'Default' ? [item.selected_color] : [],
//     stock: 999,
//     badge: null,
//     rating: 0,
//     reviews: 0,
//     isNew: false,
//     isFeatured: false,
//     description: '',
//     fabric: '',
//     specifications: '',
//     selectedSize: item.selected_size,
//     selectedColor: item.selected_color,
//     quantity: item.quantity,
//     _serverId: item.id,
//   };
// }

// function serverWishlistToLocal(item: ServerWishlistItem): CartProduct {
//   return {
//     id: item.product_id,
//     title: item.product_title,
//     category: item.category_name,
//     price: Number(item.price),
//     oldPrice: Number(item.old_price),
//     images: item.product_image ? [item.product_image] : [],
//     sizes: [],
//     colors: [],
//     stock: 999,
//     badge: item.badge ?? null,
//     rating: 0,
//     reviews: 0,
//     isNew: false,
//     isFeatured: false,
//     description: '',
//     fabric: '',
//     specifications: '',
//   };
// }

// const toastOpts = {
//   style: {
//     fontFamily: 'Outfit, sans-serif',
//     background: '#F8F5F0',
//     color: '#1F1F1F',
//     border: '1px solid #C9A86A',
//   },
//   iconTheme: { primary: '#C9A86A', secondary: '#F8F5F0' },
// };

// export const useStore = create<StoreState>()(
//   persist(
//     (set, get) => ({
//       cart: [],
//       wishlist: [],

//       // ── Cart ───────────────────────────────────────────────────────────────

//       addToCart: async (product, size, color, quantity = 1) => {
//         if (isAuthed()) {
//           try {
//             const res = await cartApi.addItem(product.id, size, color, quantity);
//             const serverCart = res.data.data;
//             set({ cart: serverCart.items.map(serverItemToLocal) });
//             toast.success(`${product.title} added to cart`, toastOpts);
//           } catch (err: any) {
//             const msg = err.response?.data?.error || 'Could not add to cart';
//             toast.error(msg, toastOpts);
//           }
//           return;
//         }
//         set((state) => {
//           const existing = state.cart.find(
//             (i) => i.id === product.id && i.selectedSize === size && i.selectedColor === color
//           );
//           if (existing) {
//             return {
//               cart: state.cart.map((i) =>
//                 i.id === product.id && i.selectedSize === size && i.selectedColor === color
//                   ? { ...i, quantity: i.quantity + quantity }
//                   : i
//               ),
//             };
//           }
//           return {
//             cart: [...state.cart, { ...product, selectedSize: size, selectedColor: color, quantity }],
//           };
//         });
//         toast.success(`${product.title} added to cart`, toastOpts);
//       },

//       // Primary remove — used by guests and as fallback
//       removeFromCart: async (productId) => {
//         if (isAuthed()) {
//           // Find the first matching item and use its _serverId
//           const item = get().cart.find((i) => i.id === productId);
//           if (item?._serverId) {
//             await get().removeFromCartByServerId(item._serverId);
//           }
//           return;
//         }
//         set((state) => ({ cart: state.cart.filter((i) => i.id !== productId) }));
//       },

//       // Precise remove by server cart item ID — avoids wrong-item deletion
//       // when the same product appears multiple times with different sizes.
//       // Cart.tsx should call this directly using item._serverId when authed.
//       removeFromCartByServerId: async (serverId) => {
//         if (!isAuthed()) return;
//         try {
//           const res = await cartApi.removeItem(serverId);
//           set({ cart: res.data.data.items.map(serverItemToLocal) });
//         } catch {
//           toast.error('Could not remove item. Please try again.', toastOpts);
//         }
//       },

//       updateQuantity: async (productId, quantity) => {
//         if (quantity <= 0) {
//           await get().removeFromCart(productId);
//           return;
//         }
//         if (isAuthed()) {
//           const item = get().cart.find((i) => i.id === productId);
//           if (item?._serverId) {
//             try {
//               const res = await cartApi.updateItem(item._serverId, quantity);
//               set({ cart: res.data.data.items.map(serverItemToLocal) });
//             } catch {
//               toast.error('Could not update quantity', toastOpts);
//             }
//           }
//           return;
//         }
//         set((state) => ({
//           cart: state.cart.map((i) => i.id === productId ? { ...i, quantity } : i),
//         }));
//       },

//       cartCount: () => get().cart.reduce((sum, i) => sum + i.quantity, 0),
//       cartTotal: () => get().cart.reduce((sum, i) => sum + i.price * i.quantity, 0),

//       // ── Wishlist ──────────────────────────────────────────────────────────

//       addToWishlist: async (product) => {
//         if (isAuthed()) {
//           try {
//             await wishlistApi.add(product.id);
//             set((state) => {
//               if (state.wishlist.find((w) => w.id === product.id)) return state;
//               return { wishlist: [...state.wishlist, product] };
//             });
//             toast.success('Added to wishlist', toastOpts);
//           } catch (err: any) {
//             const msg = err.response?.data?.error || 'Could not update wishlist';
//             toast.error(msg, toastOpts);
//           }
//           return;
//         }
//         set((state) => {
//           if (state.wishlist.find((w) => w.id === product.id)) return state;
//           return { wishlist: [...state.wishlist, product] };
//         });
//         toast.success('Added to wishlist', toastOpts);
//       },

//       removeFromWishlist: async (productId) => {
//         if (isAuthed()) {
//           try {
//             await wishlistApi.remove(productId);
//           } catch {
//             // Still remove locally even if API fails
//           }
//         }
//         set((state) => ({ wishlist: state.wishlist.filter((w) => w.id !== productId) }));
//       },

//       isInWishlist: (productId) => !!get().wishlist.find((w) => w.id === productId),

//       // ── Server sync ───────────────────────────────────────────────────────

//       loadServerCart: async () => {
//         try {
//           const res = await cartApi.get();
//           set({ cart: res.data.data.items.map(serverItemToLocal) });
//         } catch {
//           // Keep existing local state
//         }
//       },

//       loadServerWishlist: async () => {
//         try {
//           const res = await wishlistApi.get();
//           set({ wishlist: res.data.data.map(serverWishlistToLocal) });
//         } catch {
//           // Keep existing local state
//         }
//       },

//       getGuestCartForSync: () =>
//         get().cart.map((i) => ({
//           product_id: i.id,
//           selected_size: i.selectedSize,
//           selected_color: i.selectedColor,
//           quantity: i.quantity,
//         })),

//       clearServerState: () => set({ cart: [], wishlist: [] }),
//     }),
//     {
//       name: 'vastrika-store',
//       partialize: (state) => ({
//         cart: isAuthed() ? [] : state.cart,
//         wishlist: isAuthed() ? [] : state.wishlist,
//       }),
//     }
//   )
// );

// src/store/useStore.ts
// Unified cart + wishlist store.
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';
import { cartApi, CartItem as ServerCartItem } from '../api/cart';
import { wishlistApi, WishlistItem as ServerWishlistItem } from '../api/wishlist';

export interface CartProduct {
  id: number;
  title: string;
  category: string;
  price: number;
  oldPrice: number;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  badge?: string | null;
  rating: number;
  reviews: number;
  isNew: boolean;
  isFeatured: boolean;
  description: string;
  fabric: string;
  specifications: string;
}

export interface CartItemLocal extends CartProduct {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  _serverId?: number;
}

interface StoreState {
  cart: CartItemLocal[];
  wishlist: CartProduct[];

  addToCart: (product: CartProduct, size: string, color: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  removeFromCartByServerId: (serverId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  updateQuantityByServerId: (serverId: number, quantity: number) => Promise<void>;
  cartCount: () => number;
  cartTotal: () => number;

  addToWishlist: (product: CartProduct) => Promise<void>;
  removeFromWishlist: (productId: number) => Promise<void>;
  isInWishlist: (productId: number) => boolean;

  loadServerCart: () => Promise<void>;
  loadServerWishlist: () => Promise<void>;
  getGuestCartForSync: () => { product_id: number; selected_size: string; selected_color: string; quantity: number }[];
  clearServerState: () => void;
}

function isAuthed(): boolean {
  return !!localStorage.getItem('vastrika_access_token');
}

function serverItemToLocal(item: ServerCartItem): CartItemLocal {
  return {
    id: item.product_id,
    title: item.product_title,
    category: item.category_name,
    price: Number(item.price),
    oldPrice: Number(item.old_price),
    images: item.product_image ? [item.product_image] : [],
    // Don't expose 'Default' sentinel as a real color in the UI
    sizes: [item.selected_size],
    colors: item.selected_color && item.selected_color !== 'Default' ? [item.selected_color] : [],
    stock: 999,
    badge: null,
    rating: 0,
    reviews: 0,
    isNew: false,
    isFeatured: false,
    description: '',
    fabric: '',
    specifications: '',
    selectedSize: item.selected_size,
    selectedColor: item.selected_color,
    quantity: item.quantity,
    _serverId: item.id,
  };
}

function serverWishlistToLocal(item: ServerWishlistItem): CartProduct {
  return {
    id: item.product_id,
    title: item.product_title,
    category: item.category_name,
    price: Number(item.price),
    oldPrice: Number(item.old_price),
    images: item.product_image ? [item.product_image] : [],
    sizes: [],
    colors: [],
    stock: 999,
    badge: item.badge ?? null,
    rating: 0,
    reviews: 0,
    isNew: false,
    isFeatured: false,
    description: '',
    fabric: '',
    specifications: '',
  };
}

const toastOpts = {
  style: {
    fontFamily: 'Outfit, sans-serif',
    background: '#F8F5F0',
    color: '#1F1F1F',
    border: '1px solid #C9A86A',
  },
  iconTheme: { primary: '#C9A86A', secondary: '#F8F5F0' },
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],

      // ── Cart ───────────────────────────────────────────────────────────────

      addToCart: async (product, size, color, quantity = 1) => {
        if (isAuthed()) {
          // Optimistic update: show item instantly before API responds
          set((state) => {
            const existing = state.cart.find(
              (i) => i.id === product.id && i.selectedSize === size && i.selectedColor === color
            );
            if (existing) {
              return {
                cart: state.cart.map((i) =>
                  i.id === product.id && i.selectedSize === size && i.selectedColor === color
                    ? { ...i, quantity: i.quantity + quantity }
                    : i
                ),
              };
            }
            return {
              cart: [
                ...state.cart,
                { ...product, selectedSize: size, selectedColor: color, quantity, _serverId: undefined },
              ],
            };
          });

          try {
            const res = await cartApi.addItem(product.id, size, color, quantity);
            // Replace optimistic state with real server state (includes _serverId)
            set({ cart: res.data.data.items.map(serverItemToLocal) });
            toast.success(`${product.title} added to cart`, toastOpts);
          } catch (err: any) {
            // Roll back optimistic update on failure
            set((state) => ({
              cart: state.cart.filter(
                (i) => !(i.id === product.id && i.selectedSize === size && i.selectedColor === color && !i._serverId)
              ),
            }));
            const msg = err.response?.data?.error || 'Could not add to cart';
            toast.error(msg, toastOpts);
          }
          return;
        }

        // Guest: local state only
        set((state) => {
          const existing = state.cart.find(
            (i) => i.id === product.id && i.selectedSize === size && i.selectedColor === color
          );
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.id === product.id && i.selectedSize === size && i.selectedColor === color
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return {
            cart: [...state.cart, { ...product, selectedSize: size, selectedColor: color, quantity }],
          };
        });
        toast.success(`${product.title} added to cart`, toastOpts);
      },

      removeFromCart: async (productId) => {
        if (isAuthed()) {
          const item = get().cart.find((i) => i.id === productId);
          if (item?._serverId) {
            await get().removeFromCartByServerId(item._serverId);
          }
          return;
        }
        set((state) => ({ cart: state.cart.filter((i) => i.id !== productId) }));
      },

      removeFromCartByServerId: async (serverId) => {
        // Optimistic: remove immediately so UI updates without refresh
        set((state) => ({ cart: state.cart.filter((i) => i._serverId !== serverId) }));

        if (!isAuthed()) return;
        try {
          const res = await cartApi.removeItem(serverId);
          // Sync with server state to get accurate _serverIds
          set({ cart: res.data.data.items.map(serverItemToLocal) });
        } catch {
          // Re-fetch cart to restore correct state if delete failed
          try {
            const res = await cartApi.get();
            set({ cart: res.data.data.items.map(serverItemToLocal) });
          } catch {
            // Keep optimistic state if re-fetch also fails
          }
          toast.error('Could not remove item. Please try again.', toastOpts);
        }
      },

      updateQuantity: async (productId, quantity) => {
        // Minimum quantity is 1 — never go to 0 or trigger removal
        const safeQty = Math.max(1, quantity);
        if (isAuthed()) {
          const item = get().cart.find((i) => i.id === productId);
          if (item?._serverId) {
            await get().updateQuantityByServerId(item._serverId, safeQty);
          }
          return;
        }
        set((state) => ({
          cart: state.cart.map((i) => i.id === productId ? { ...i, quantity: safeQty } : i),
        }));
      },

      // Update by _serverId to fix wrong-item update when same product
      // appears in cart multiple times with different sizes/colors.
      // Cart.tsx calls this directly using item._serverId.
      updateQuantityByServerId: async (serverId, quantity) => {
        const safeQty = Math.max(1, quantity);

        // Optimistic update: show new quantity immediately
        set((state) => ({
          cart: state.cart.map((i) =>
            i._serverId === serverId ? { ...i, quantity: safeQty } : i
          ),
        }));

        if (!isAuthed()) return;
        try {
          const res = await cartApi.updateItem(serverId, safeQty);
          set({ cart: res.data.data.items.map(serverItemToLocal) });
        } catch {
          // Re-fetch to restore correct state
          try {
            const res = await cartApi.get();
            set({ cart: res.data.data.items.map(serverItemToLocal) });
          } catch { /* keep optimistic */ }
          toast.error('Could not update quantity', toastOpts);
        }
      },

      cartCount: () => get().cart.reduce((sum, i) => sum + i.quantity, 0),
      cartTotal: () => get().cart.reduce((sum, i) => sum + i.price * i.quantity, 0),

      // ── Wishlist ──────────────────────────────────────────────────────────

      addToWishlist: async (product) => {
        // Optimistic: add immediately
        set((state) => {
          if (state.wishlist.find((w) => w.id === product.id)) return state;
          return { wishlist: [...state.wishlist, product] };
        });

        if (isAuthed()) {
          try {
            await wishlistApi.add(product.id);
            toast.success('Added to wishlist', toastOpts);
          } catch (err: any) {
            // Roll back
            set((state) => ({ wishlist: state.wishlist.filter((w) => w.id !== product.id) }));
            const msg = err.response?.data?.error || 'Could not update wishlist';
            toast.error(msg, toastOpts);
          }
          return;
        }
        toast.success('Added to wishlist', toastOpts);
      },

      removeFromWishlist: async (productId) => {
        // Optimistic: remove immediately so UI updates without refresh
        set((state) => ({ wishlist: state.wishlist.filter((w) => w.id !== productId) }));

        if (isAuthed()) {
          try {
            await wishlistApi.remove(productId);
          } catch {
            // Failure is silent — local state already updated
          }
        }
      },

      isInWishlist: (productId) => !!get().wishlist.find((w) => w.id === productId),

      // ── Server sync ───────────────────────────────────────────────────────

      loadServerCart: async () => {
        try {
          const res = await cartApi.get();
          set({ cart: res.data.data.items.map(serverItemToLocal) });
        } catch {
          // Keep local state
        }
      },

      loadServerWishlist: async () => {
        try {
          const res = await wishlistApi.get();
          set({ wishlist: res.data.data.map(serverWishlistToLocal) });
        } catch {
          // Keep local state
        }
      },

      getGuestCartForSync: () =>
        get().cart.map((i) => ({
          product_id: i.id,
          selected_size: i.selectedSize,
          selected_color: i.selectedColor,
          quantity: i.quantity,
        })),

      clearServerState: () => set({ cart: [], wishlist: [] }),
    }),
    {
      name: 'vastrika-store',
      partialize: (state) => ({
        cart: isAuthed() ? [] : state.cart,
        wishlist: isAuthed() ? [] : state.wishlist,
      }),
    }
  )
);