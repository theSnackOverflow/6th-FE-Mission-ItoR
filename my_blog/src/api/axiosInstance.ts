import type { AxiosRequestHeaders } from 'axios';
import axios from 'axios';

const baseConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
};

export const axiosInstance = axios.create(baseConfig);
export default axiosInstance;

export const axiosPrivateInstance = axios.create(baseConfig);

axiosPrivateInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  if (!config.headers) {
    config.headers = {} as AxiosRequestHeaders; //! 타입 캐스팅 이렇게 해도 되나?
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const reissueTokens = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) throw new Error('No refresh token found');

  const response = await axiosInstance.post('/auth/reissue', {
    refreshToken,
  });

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
    response.data.data;

  localStorage.setItem('accessToken', newAccessToken);
  localStorage.setItem('refreshToken', newRefreshToken);

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

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosPrivateInstance(originalRequest);
      } catch (reissueError) {
        console.error('Token reissue failed → Logging out');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return Promise.reject(reissueError);
      }
    }

    return Promise.reject(error);
  },
);
