import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { signUp } from '@/api/authAPI';

import type { UseMutationResult } from '@tanstack/react-query';

export const useSignUp = (): UseMutationResult<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  unknown,
  Parameters<typeof signUp>[0]
> => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log('회원가입 성공:', data);
      alert('회원가입이 완료되었습니다!');
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        console.error('회원가입 실패:', error.response?.data || error.message);
        alert(
          `회원가입 실패: ${error.response?.data?.message || '네트워크 오류가 발생했습니다.'}`,
        );
      } else {
        console.error('예상치 못한 오류:', error);
        alert('알 수 없는 오류가 발생했습니다.');
      }
    },
  });
};
