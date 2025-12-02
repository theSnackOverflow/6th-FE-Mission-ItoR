import { useMutation } from '@tanstack/react-query';
import { signUpOAuth } from '@/api/authAPI';

export const useOAuthSignUp = () => {
  return useMutation({
    mutationFn: signUpOAuth,
    onSuccess: (data) => {
      console.log('카카오 회원가입 성공:', data);
    },
    onError: (error) => {
      console.error('카카오 회원가입 실패:', error);
    },
  });
};
