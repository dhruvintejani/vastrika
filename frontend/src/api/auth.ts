// // // // // // // src/api/auth.ts
// // // // // // import { apiClient } from './client';

// // // // // // export interface RegisterPayload {
// // // // // //   email: string;
// // // // // //   password: string;
// // // // // //   full_name: string;
// // // // // //   phone?: string;
// // // // // // }

// // // // // // export interface LoginPayload {
// // // // // //   email: string;
// // // // // //   password: string;
// // // // // // }

// // // // // // export interface UserProfile {
// // // // // //   id: number;
// // // // // //   email: string;
// // // // // //   full_name: string;
// // // // // //   phone?: string;
// // // // // //   address_line1?: string;
// // // // // //   address_line2?: string;
// // // // // //   city?: string;
// // // // // //   state?: string;
// // // // // //   pincode?: string;
// // // // // //   is_active: boolean;
// // // // // //   created_at: string;
// // // // // // }

// // // // // // export interface UpdateProfilePayload {
// // // // // //   full_name?: string;
// // // // // //   phone?: string;
// // // // // //   address_line1?: string;
// // // // // //   address_line2?: string;
// // // // // //   city?: string;
// // // // // //   state?: string;
// // // // // //   pincode?: string;
// // // // // // }

// // // // // // export const authApi = {
// // // // // //   register: (payload: RegisterPayload) =>
// // // // // //     apiClient.post<{ success: boolean; data: UserProfile; message: string }>(
// // // // // //       '/auth/register',
// // // // // //       payload
// // // // // //     ),

// // // // // //   login: (payload: LoginPayload) =>
// // // // // //     apiClient.post<{ success: boolean; data: { access_token: string; refresh_token: string } }>(
// // // // // //       '/auth/login',
// // // // // //       payload
// // // // // //     ),

// // // // // //   logout: (refreshToken: string) =>
// // // // // //     apiClient.post('/auth/logout', { refresh_token: refreshToken }),

// // // // // //   getProfile: () =>
// // // // // //     apiClient.get<{ success: boolean; data: UserProfile }>('/auth/me'),

// // // // // //   updateProfile: (payload: UpdateProfilePayload) =>
// // // // // //     apiClient.put<{ success: boolean; data: UserProfile }>('/auth/me', payload),

// // // // // //   changePassword: (currentPassword: string, newPassword: string) =>
// // // // // //     apiClient.post('/auth/change-password', {
// // // // // //       current_password: currentPassword,
// // // // // //       new_password: newPassword,
// // // // // //     }),
// // // // // // };

// // // // // import { apiClient } from './client';

// // // // // export interface RegisterPayload {
// // // // //   email: string;
// // // // //   password: string;
// // // // //   full_name: string;
// // // // //   phone?: string;
// // // // // }

// // // // // export interface LoginPayload {
// // // // //   email: string;
// // // // //   password: string;
// // // // // }

// // // // // export interface UserProfile {
// // // // //   id: number;
// // // // //   email: string;
// // // // //   full_name: string;
// // // // //   phone?: string;
// // // // //   address_line1?: string;
// // // // //   address_line2?: string;
// // // // //   city?: string;
// // // // //   state?: string;
// // // // //   pincode?: string;
// // // // //   is_active: boolean;
// // // // //   created_at: string;
// // // // // }

// // // // // export interface UpdateProfilePayload {
// // // // //   full_name?: string;
// // // // //   phone?: string;
// // // // //   address_line1?: string;
// // // // //   address_line2?: string;
// // // // //   city?: string;
// // // // //   state?: string;
// // // // //   pincode?: string;
// // // // // }

// // // // // export const authApi = {
// // // // //   register: (payload: RegisterPayload) =>
// // // // //     apiClient.post<{ success: boolean; data: UserProfile; message: string }>(
// // // // //       '/auth/register',
// // // // //       payload
// // // // //     ),

// // // // //   login: (payload: LoginPayload) =>
// // // // //     apiClient.post<{ success: boolean; data: { access_token: string; refresh_token: string } }>(
// // // // //       '/auth/login',
// // // // //       payload
// // // // //     ),

// // // // //   forgotPassword: (email: string) =>
// // // // //     apiClient.post<{ success: boolean; message: string }>('/auth/forgot-password', {
// // // // //       email,
// // // // //     }),

// // // // //   resetPassword: (email: string, otp: string, newPassword: string) =>
// // // // //     apiClient.post<{ success: boolean; message: string }>('/auth/reset-password', {
// // // // //       email,
// // // // //       otp,
// // // // //       new_password: newPassword,
// // // // //     }),

// // // // //   logout: (refreshToken: string) =>
// // // // //     apiClient.post('/auth/logout', { refresh_token: refreshToken }),

// // // // //   getProfile: () =>
// // // // //     apiClient.get<{ success: boolean; data: UserProfile }>('/auth/me'),

// // // // //   updateProfile: (payload: UpdateProfilePayload) =>
// // // // //     apiClient.put<{ success: boolean; data: UserProfile }>('/auth/me', payload),

// // // // //   changePassword: (currentPassword: string, newPassword: string) =>
// // // // //     apiClient.post('/auth/change-password', {
// // // // //       current_password: currentPassword,
// // // // //       new_password: newPassword,
// // // // //     }),
// // // // // };


// // // // import { apiClient } from './client';

// // // // export interface RegisterPayload {
// // // //   email: string;
// // // //   password: string;
// // // //   full_name: string;
// // // //   phone?: string;
// // // // }

// // // // export interface LoginPayload {
// // // //   email: string;
// // // //   password: string;
// // // // }

// // // // export interface UserProfile {
// // // //   id: number;
// // // //   email: string;
// // // //   full_name: string;
// // // //   phone?: string;
// // // //   address_line1?: string;
// // // //   address_line2?: string;
// // // //   city?: string;
// // // //   state?: string;
// // // //   pincode?: string;
// // // //   is_active: boolean;
// // // //   created_at: string;
// // // // }

// // // // export interface UpdateProfilePayload {
// // // //   full_name?: string;
// // // //   phone?: string;
// // // //   address_line1?: string;
// // // //   address_line2?: string;
// // // //   city?: string;
// // // //   state?: string;
// // // //   pincode?: string;
// // // // }

// // // // export const authApi = {
// // // //   register: (payload: RegisterPayload) =>
// // // //     apiClient.post<{ success: boolean; data: UserProfile; message: string }>(
// // // //       '/auth/register',
// // // //       payload
// // // //     ),

// // // //   login: (payload: LoginPayload) =>
// // // //     apiClient.post<{ success: boolean; data: { access_token: string; refresh_token: string } }>(
// // // //       '/auth/login',
// // // //       payload
// // // //     ),

// // // //   forgotPassword: (email: string) =>
// // // //     apiClient.post<{ success: boolean; message: string }>('/auth/forgot-password', {
// // // //       email,
// // // //     }),

// // // //   resetPassword: (email: string, otp: string, newPassword: string) =>
// // // //     apiClient.post<{ success: boolean; message: string }>('/auth/reset-password', {
// // // //       email,
// // // //       otp,
// // // //       new_password: newPassword,
// // // //     }),

// // // //   logout: (refreshToken: string) =>
// // // //     apiClient.post('/auth/logout', { refresh_token: refreshToken }),

// // // //   getProfile: () =>
// // // //     apiClient.get<{ success: boolean; data: UserProfile }>('/auth/me'),

// // // //   updateProfile: (payload: UpdateProfilePayload) =>
// // // //     apiClient.put<{ success: boolean; data: UserProfile }>('/auth/me', payload),

// // // //   changePassword: (currentPassword: string, newPassword: string) =>
// // // //     apiClient.post('/auth/change-password', {
// // // //       current_password: currentPassword,
// // // //       new_password: newPassword,
// // // //     }),
// // // // };


// // // import { apiClient } from './client';

// // // export interface RegisterPayload {
// // //   email: string;
// // //   password: string;
// // //   full_name: string;
// // //   phone?: string;
// // // }

// // // export interface LoginPayload {
// // //   email: string;
// // //   password: string;
// // // }

// // // export interface UserProfile {
// // //   id: number;
// // //   email: string;
// // //   full_name: string;
// // //   phone?: string;
// // //   address_line1?: string;
// // //   address_line2?: string;
// // //   city?: string;
// // //   state?: string;
// // //   pincode?: string;
// // //   is_active: boolean;
// // //   created_at: string;
// // // }

// // // export interface UpdateProfilePayload {
// // //   full_name?: string;
// // //   phone?: string;
// // //   address_line1?: string;
// // //   address_line2?: string;
// // //   city?: string;
// // //   state?: string;
// // //   pincode?: string;
// // // }

// // // export const authApi = {
// // //   register: (payload: RegisterPayload) =>
// // //     apiClient.post<{ success: boolean; data: UserProfile; message: string }>(
// // //       '/auth/register',
// // //       payload
// // //     ),

// // //   login: (payload: LoginPayload) =>
// // //     apiClient.post<{ success: boolean; data: { access_token: string; refresh_token: string } }>(
// // //       '/auth/login',
// // //       payload
// // //     ),

// // //   forgotPassword: (email: string) =>
// // //     apiClient.post<{ success: boolean; message: string }>('/auth/forgot-password', {
// // //       email,
// // //     }),

// // //   resetPassword: (email: string, otp: string, newPassword: string) =>
// // //     apiClient.post<{ success: boolean; message: string }>('/auth/reset-password', {
// // //       email,
// // //       otp,
// // //       new_password: newPassword,
// // //     }),

// // //   logout: (refreshToken: string) =>
// // //     apiClient.post('/auth/logout', { refresh_token: refreshToken }),

// // //   getProfile: () =>
// // //     apiClient.get<{ success: boolean; data: UserProfile }>('/auth/me'),

// // //   updateProfile: (payload: UpdateProfilePayload) =>
// // //     apiClient.put<{ success: boolean; data: UserProfile }>('/auth/me', payload),

// // //   changePassword: (currentPassword: string, newPassword: string) =>
// // //     apiClient.post('/auth/change-password', {
// // //       current_password: currentPassword,
// // //       new_password: newPassword,
// // //     }),
// // // };


// // import { apiClient } from './client';

// // export interface RegisterPayload {
// //   email: string;
// //   password: string;
// //   full_name: string;
// //   phone?: string;
// // }

// // export interface LoginPayload {
// //   email: string;
// //   password: string;
// // }

// // export interface UserProfile {
// //   id: number;
// //   email: string;
// //   full_name: string;
// //   phone?: string;
// //   address_line1?: string;
// //   address_line2?: string;
// //   city?: string;
// //   state?: string;
// //   pincode?: string;
// //   is_active: boolean;
// //   created_at: string;
// // }

// // export interface UpdateProfilePayload {
// //   full_name?: string;
// //   phone?: string;
// //   address_line1?: string;
// //   address_line2?: string;
// //   city?: string;
// //   state?: string;
// //   pincode?: string;
// // }

// // export const authApi = {
// //   register: (payload: RegisterPayload) =>
// //     apiClient.post<{ success: boolean; data: UserProfile; message: string }>(
// //       '/auth/register',
// //       payload
// //     ),

// //   login: (payload: LoginPayload) =>
// //     apiClient.post<{ success: boolean; data: { access_token: string; refresh_token: string } }>(
// //       '/auth/login',
// //       payload
// //     ),

// //   forgotPassword: (email: string) =>
// //     apiClient.post<{ success: boolean; message: string }>('/auth/forgot-password', {
// //       email,
// //     }),

// //   resetPassword: (email: string, otp: string, newPassword: string) =>
// //     apiClient.post<{ success: boolean; message: string }>('/auth/reset-password', {
// //       email,
// //       otp,
// //       new_password: newPassword,
// //     }),

// //   logout: (refreshToken: string) =>
// //     apiClient.post('/auth/logout', { refresh_token: refreshToken }),

// //   getProfile: () =>
// //     apiClient.get<{ success: boolean; data: UserProfile }>('/auth/me'),

// //   updateProfile: (payload: UpdateProfilePayload) =>
// //     apiClient.put<{ success: boolean; data: UserProfile }>('/auth/me', payload),

// //   changePassword: (currentPassword: string, newPassword: string) =>
// //     apiClient.post('/auth/change-password', {
// //       current_password: currentPassword,
// //       new_password: newPassword,
// //     }),
// // };


// import { apiClient } from './client';

// export interface RegisterPayload {
//   email: string;
//   password: string;
//   full_name: string;
//   phone?: string;
// }

// export interface LoginPayload {
//   email: string;
//   password: string;
// }

// export interface UserProfile {
//   id: number;
//   email: string;
//   full_name: string;
//   phone?: string;
//   address_line1?: string;
//   address_line2?: string;
//   city?: string;
//   state?: string;
//   pincode?: string;
//   is_active: boolean;
//   created_at: string;
// }

// export interface UpdateProfilePayload {
//   full_name?: string;
//   phone?: string;
//   address_line1?: string;
//   address_line2?: string;
//   city?: string;
//   state?: string;
//   pincode?: string;
// }

// export const authApi = {
//   register: (payload: RegisterPayload) =>
//     apiClient.post<{ success: boolean; data: UserProfile; message: string }>(
//       '/auth/register',
//       payload
//     ),

//   login: (payload: LoginPayload) =>
//     apiClient.post<{ success: boolean; data: { access_token: string; refresh_token: string } }>(
//       '/auth/login',
//       payload
//     ),

//   forgotPassword: (email: string) =>
//     apiClient.post<{ success: boolean; message: string }>('/auth/forgot-password', {
//       email,
//     }),

//   resetPassword: (email: string, otp: string, newPassword: string) =>
//     apiClient.post<{ success: boolean; message: string }>('/auth/reset-password', {
//       email,
//       otp,
//       new_password: newPassword,
//     }),

//   logout: (refreshToken: string) =>
//     apiClient.post('/auth/logout', { refresh_token: refreshToken }),

//   getProfile: () =>
//     apiClient.get<{ success: boolean; data: UserProfile }>('/auth/me'),

//   updateProfile: (payload: UpdateProfilePayload) =>
//     apiClient.put<{ success: boolean; data: UserProfile }>('/auth/me', payload),

//   changePassword: (currentPassword: string, newPassword: string) =>
//     apiClient.post('/auth/change-password', {
//       current_password: currentPassword,
//       new_password: newPassword,
//     }),
// };


import { apiClient } from './client';

export interface RegisterPayload {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserProfile {
  id: number;
  email: string;
  full_name: string;
  phone?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  is_active: boolean;
  created_at: string;
}

export interface UpdateProfilePayload {
  full_name?: string;
  phone?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export const authApi = {
  register: (payload: RegisterPayload) =>
    apiClient.post<{ success: boolean; data: UserProfile; message: string }>(
      '/auth/register',
      payload
    ),

  login: (payload: LoginPayload) =>
    apiClient.post<{ success: boolean; data: { access_token: string; refresh_token: string } }>(
      '/auth/login',
      payload
    ),

  forgotPassword: (email: string) =>
    apiClient.post<{ success: boolean; message: string }>('/auth/forgot-password', {
      email,
    }),

  verifyResetOtp: (email: string, otp: string) =>
    apiClient.post<{ success: boolean; message: string }>('/auth/verify-reset-otp', {
      email,
      otp,
    }),

  resetPassword: (email: string, otp: string, newPassword: string) =>
    apiClient.post<{ success: boolean; message: string }>('/auth/reset-password', {
      email,
      otp,
      new_password: newPassword,
    }),

  logout: (refreshToken: string) =>
    apiClient.post('/auth/logout', { refresh_token: refreshToken }),

  getProfile: () =>
    apiClient.get<{ success: boolean; data: UserProfile }>('/auth/me'),

  updateProfile: (payload: UpdateProfilePayload) =>
    apiClient.put<{ success: boolean; data: UserProfile }>('/auth/me', payload),

  changePassword: (currentPassword: string, newPassword: string) =>
    apiClient.post('/auth/change-password', {
      current_password: currentPassword,
      new_password: newPassword,
    }),
};
