// src/api/client.ts
import axios, { AxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach access token on every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('vastrika_access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// On 401, attempt one silent refresh then retry
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

apiClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as any;
    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    const refreshToken = localStorage.getItem('vastrika_refresh_token');
    if (!refreshToken) {
      clearTokens();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve) => {
        refreshSubscribers.push((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          resolve(apiClient(original));
        });
      });
    }

    original._retry = true;
    isRefreshing = true;

    try {
      const res = await axios.post(`${BASE_URL}/auth/refresh`, {
        refresh_token: refreshToken,
      });
      const { access_token, refresh_token } = res.data.data;
      localStorage.setItem('vastrika_access_token', access_token);
      localStorage.setItem('vastrika_refresh_token', refresh_token);
      apiClient.defaults.headers.common.Authorization = `Bearer ${access_token}`;
      onRefreshed(access_token);
      isRefreshing = false;
      original.headers.Authorization = `Bearer ${access_token}`;
      return apiClient(original);
    } catch {
      isRefreshing = false;
      clearTokens();
      // Dispatch event so useAuthStore can react
      window.dispatchEvent(new Event('auth:expired'));
      return Promise.reject(error);
    }
  }
);

export function clearTokens() {
  localStorage.removeItem('vastrika_access_token');
  localStorage.removeItem('vastrika_refresh_token');
}

export function setTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem('vastrika_access_token', accessToken);
  localStorage.setItem('vastrika_refresh_token', refreshToken);
}

export function getAccessToken(): string | null {
  return localStorage.getItem('vastrika_access_token');
}