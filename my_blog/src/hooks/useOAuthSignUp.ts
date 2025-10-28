import { useMutation } from '@tanstack/react-query';
import { signUpOAuth } from '@/api/authAPI';

export const useOAuthSignUp = () => {
  return useMutation({
    mutationFn: signUpOAuth,
    onSuccess: (data) => {
      console.log('OAuth 회원가입 성공:', data);
    },
    onError: (error) => {
      console.error('OAuth 회원가입 실패:', error);
    },
  });
};
