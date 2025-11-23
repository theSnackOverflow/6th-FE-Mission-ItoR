import type { InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { tokenStorage } from '@/utils/tokenStorage';

const baseConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
};

export const axiosInstance = axios.create(baseConfig);
export default axiosInstance;

export const axiosPrivateInstance = axios.create(baseConfig);

axiosPrivateInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getAccessToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
);

const reissueTokens = async () => {
  const refreshToken = tokenStorage.getRefreshToken();

  if (!refreshToken) throw new Error('No refresh token found');

  const response = await axiosInstance.post('/auth/reissue', {
    refreshToken,
  });

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
    response.data.data;

  tokenStorage.setTokens(newAccessToken, newRefreshToken);

  return newAccessToken;
};

axiosPrivateInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await reissueTokens();

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return axiosPrivateInstance(originalRequest);
      } catch (reissueError) {
        console.error('Token reissue failed → Logging out');
        tokenStorage.clearTokens();
        return Promise.reject(reissueError);
      }
    }

    return Promise.reject(error);
  },
);
