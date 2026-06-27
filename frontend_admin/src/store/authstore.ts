// // src/store/authStore.ts
// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import { adminApi } from '../api/client';
// import toast from 'react-hot-toast';

// interface AuthState {
//   token: string | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   login: (email: string, password: string) => Promise<boolean>;
//   logout: () => Promise<void>;
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set, get) => ({
//       token: null,
//       isAuthenticated: false,
//       isLoading: false,

//       login: async (email, password) => {
//         set({ isLoading: true });
//         try {
//           const res = await adminApi.login(email, password);
//           const token = res.data.data.access_token;
//           localStorage.setItem('vastrika_admin_token', token);
//           set({ token, isAuthenticated: true, isLoading: false });
//           return true;
//         } catch (err: any) {
//           set({ isLoading: false });
//           const msg = err.response?.data?.error || 'Login failed';
//           toast.error(msg, { style: toastStyle });
//           return false;
//         }
//       },

//       logout: async () => {
//         try { await adminApi.logout(); } catch { /* ignore */ }
//         localStorage.removeItem('vastrika_admin_token');
//         set({ token: null, isAuthenticated: false });
//       },
//     }),
//     {
//       name: 'vastrika-admin-auth',
//       partialize: (state) => ({ token: state.token, isAuthenticated: state.isAuthenticated }),
//     }
//   )
// );

// export const toastStyle = {
//   fontFamily: 'Outfit, sans-serif',
//   fontSize: '14px',
//   background: '#232323',
//   color: '#f0ebe3',
//   border: '1px solid #2e2e2e',
//   borderRadius: '12px',
// };

// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { adminApi } from '../api/client';
import toast from 'react-hot-toast';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  // Logout confirm dialog visibility
  showLogoutConfirm: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  setShowLogoutConfirm: (show: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      isLoading: false,
      showLogoutConfirm: false,

      setShowLogoutConfirm: (show) => set({ showLogoutConfirm: show }),

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const res = await adminApi.login(email, password);
          const token = res.data.data.access_token;
          localStorage.setItem('vastrika_admin_token', token);
          set({ token, isAuthenticated: true, isLoading: false });
          return true;
        } catch (err: any) {
          set({ isLoading: false });
          const msg = err.response?.data?.error || 'Login failed';
          toast.error(msg, { style: toastStyle });
          return false;
        }
      },

      logout: async () => {
        try { await adminApi.logout(); } catch { /* ignore */ }
        localStorage.removeItem('vastrika_admin_token');
        set({ token: null, isAuthenticated: false, showLogoutConfirm: false });
      },
    }),
    {
      name: 'vastrika-admin-auth',
      partialize: (state) => ({ token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);

export const toastStyle = {
  fontFamily: 'Outfit, sans-serif',
  fontSize: '14px',
  background: '#232323',
  color: '#f0ebe3',
  border: '1px solid #2e2e2e',
  borderRadius: '12px',
};