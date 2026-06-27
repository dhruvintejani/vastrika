// // src/store/useAuthStore.ts
// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import { authApi, UserProfile } from '../api/auth';
// import { cartApi, SyncItem } from '../api/cart';
// import { wishlistApi } from '../api/wishlist';
// import { clearTokens, setTokens } from '../api/client';

// interface AuthState {
//   user: UserProfile | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   error: string | null;
//   login: (email: string, password: string, guestCart?: SyncItem[]) => Promise<boolean>;
//   register: (email: string, password: string, fullName: string, phone?: string) => Promise<boolean>;
//   logout: () => Promise<void>;
//   loadUser: () => Promise<void>;
//   clearError: () => void;
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set, get) => ({
//       user: null,
//       isAuthenticated: false,
//       isLoading: false,
//       error: null,

//       login: async (email, password, guestCart = []) => {
//         set({ isLoading: true, error: null });
//         try {
//           const res = await authApi.login({ email, password });
//           const { access_token, refresh_token } = res.data.data;
//           setTokens(access_token, refresh_token);

//           // Load user profile
//           const profileRes = await authApi.getProfile();
//           const user = profileRes.data.data;
//           set({ user, isAuthenticated: true, isLoading: false });

//           // Sync guest cart to server if there were items
//           if (guestCart.length > 0) {
//             try {
//               await cartApi.sync(guestCart);
//             } catch {
//               // Non-fatal: cart sync failure should not block login
//             }
//           }

//           return true;
//         } catch (err: any) {
//           const msg =
//             err.response?.data?.error ||
//             err.response?.data?.detail ||
//             'Invalid email or password';
//           set({ isLoading: false, error: msg });
//           return false;
//         }
//       },

//       register: async (email, password, fullName, phone) => {
//         set({ isLoading: true, error: null });
//         try {
//           await authApi.register({ email, password, full_name: fullName, phone });
//           // Auto-login after registration
//           return await get().login(email, password);
//         } catch (err: any) {
//           const msg =
//             err.response?.data?.error ||
//             err.response?.data?.detail ||
//             'Registration failed';
//           set({ isLoading: false, error: msg });
//           return false;
//         }
//       },

//       logout: async () => {
//         const refreshToken = localStorage.getItem('vastrika_refresh_token');
//         if (refreshToken) {
//           try {
//             await authApi.logout(refreshToken);
//           } catch {
//             // Ignore logout errors
//           }
//         }
//         clearTokens();
//         set({ user: null, isAuthenticated: false, error: null });
//       },

//       loadUser: async () => {
//         const token = localStorage.getItem('vastrika_access_token');
//         if (!token) return;
//         try {
//           const res = await authApi.getProfile();
//           set({ user: res.data.data, isAuthenticated: true });
//         } catch {
//           clearTokens();
//           set({ user: null, isAuthenticated: false });
//         }
//       },

//       clearError: () => set({ error: null }),
//     }),
//     {
//       name: 'vastrika-auth',
//       partialize: (state) => ({
//         user: state.user,
//         isAuthenticated: state.isAuthenticated,
//       }),
//     }
//   )
// );

// src/store/useAuthStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi, UserProfile } from '../api/auth';
import { cartApi, SyncItem } from '../api/cart';
import { clearTokens, setTokens } from '../api/client';
// wishlistApi was imported but never called — removed to keep imports clean.
// Wishlist loading is handled in useStore.ts (loadServerWishlist).

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  // Logout confirm dialog visibility — set true wherever logout button lives
  showLogoutConfirm: boolean;
  login: (email: string, password: string, guestCart?: SyncItem[]) => Promise<boolean>;
  register: (email: string, password: string, fullName: string, phone?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
  clearError: () => void;
  setShowLogoutConfirm: (show: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      showLogoutConfirm: false,

      setShowLogoutConfirm: (show) => set({ showLogoutConfirm: show }),

      login: async (email, password, guestCart = []) => {
        set({ isLoading: true, error: null });
        try {
          const res = await authApi.login({ email, password });
          const { access_token, refresh_token } = res.data.data;
          setTokens(access_token, refresh_token);

          const profileRes = await authApi.getProfile();
          const user = profileRes.data.data;
          set({ user, isAuthenticated: true, isLoading: false });

          if (guestCart.length > 0) {
            try {
              await cartApi.sync(guestCart);
            } catch {
              // Non-fatal
            }
          }

          return true;
        } catch (err: any) {
          const msg =
            err.response?.data?.error ||
            err.response?.data?.detail ||
            'Invalid email or password';
          set({ isLoading: false, error: msg });
          return false;
        }
      },

      register: async (email, password, fullName, phone) => {
        set({ isLoading: true, error: null });
        try {
          await authApi.register({ email, password, full_name: fullName, phone });
          return await get().login(email, password);
        } catch (err: any) {
          const msg =
            err.response?.data?.error ||
            err.response?.data?.detail ||
            'Registration failed';
          set({ isLoading: false, error: msg });
          return false;
        }
      },

      logout: async () => {
        const refreshToken = localStorage.getItem('vastrika_refresh_token');
        if (refreshToken) {
          try {
            await authApi.logout(refreshToken);
          } catch {
            // Ignore logout errors — always clear local state
          }
        }
        clearTokens();
        set({ user: null, isAuthenticated: false, error: null, showLogoutConfirm: false });
      },

      loadUser: async () => {
        const token = localStorage.getItem('vastrika_access_token');
        if (!token) return;
        try {
          const res = await authApi.getProfile();
          set({ user: res.data.data, isAuthenticated: true });
        } catch {
          clearTokens();
          set({ user: null, isAuthenticated: false });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'vastrika-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);