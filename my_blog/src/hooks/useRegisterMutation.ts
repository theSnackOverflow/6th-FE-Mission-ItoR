import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/api/axiosInstance';

interface RegisterPayload {
  email: string;
  password: string;
  nickname: string;
  name: string;
  birthDate: string;
  introduction: string;
  profilePicture?: string;
}

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const res = await axiosInstance.post('/auth/register', payload);
      return res.data;
    },
    onSuccess: (data) => {
      console.log('회원가입 성공:', data);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error('회원가입 요청 실패:', error);
      if (error.response?.data) {
        console.error('서버 응답:', error.response.data);
      }
    },
  });
};
