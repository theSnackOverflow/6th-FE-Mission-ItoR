import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';
import { login } from '@/api/authAPI';
import { ROUTES } from '@/const/routes';
import { useAuth } from '@/context/AuthContext';

type LoginSuccessData = {
  accessToken: string;
  refreshToken: string;
  nickname?: string;
  profilePicture?: string;
  introduction?: string;
};

type ApiErrorResponse = {
  code?: number;
  message?: string;
  error?: string;
};

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  return useMutation<
    LoginSuccessData,
    AxiosError<ApiErrorResponse>,
    { email: string; password: string }
  >({
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: ({ accessToken, refreshToken, nickname, profilePicture }) => {
      // update global auth state (stores tokens and sets axios header)
      auth.login(accessToken, refreshToken, {
        nickName: nickname,
        profileUrl: profilePicture,
      });
      navigate(ROUTES.HOME);
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
    },
  });
};
