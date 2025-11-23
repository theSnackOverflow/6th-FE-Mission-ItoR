import { useEffect } from 'react';
import axiosInstance from '@/api/axiosInstance';

export const useAuthToken = () => {
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else if (refreshToken) {
      const refreshAccessToken = async () => {
        try {
          const res = await axiosInstance.post('/auth/reissue', {
            refreshToken,
          });
          const newToken = res.data.data.accessToken;
          localStorage.setItem('accessToken', newToken);
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        } catch (err) {
          console.error('토큰 갱신 실패:', err);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/';
        }
      };
      refreshAccessToken();
    }
  }, []);
};
