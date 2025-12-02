import { useEffect } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { tokenStorage } from '@/utils/tokenStorage';

export const useAuthToken = () => {
  useEffect(() => {
    const token = tokenStorage.getAccessToken();
    const refreshToken = tokenStorage.getRefreshToken();

    if (token) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else if (refreshToken) {
      const refreshAccessToken = async () => {
        try {
          const res = await axiosInstance.post('/auth/reissue', {
            refreshToken,
          });
          const newToken = res.data.data.accessToken;
          const newRefreshToken = res.data.data.refreshToken;
          tokenStorage.setTokens(newToken, newRefreshToken);
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        } catch (err) {
          console.error('토큰 갱신 실패:', err);
          tokenStorage.clearTokens();
          window.location.href = '/';
        }
      };
      refreshAccessToken();
    }
  }, []);
};
