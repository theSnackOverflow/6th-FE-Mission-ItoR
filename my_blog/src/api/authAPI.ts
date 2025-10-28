import { axiosInstance } from '@/api/axiosInstance';

interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
  profilePicture?: string;
  birthDate?: string;
  name?: string;
  introduction?: string;
}

interface SignUpResponse {
  code: number;
  message: string;
  data: {
    email: string;
    nickname: string;
    profilePicture?: string;
    introduction?: string;
  };
}

export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  try {
    const res = await axiosInstance.post('/auth/register', data);
    return res.data;
  } catch (error) {
    console.error('회원가입 요청 실패', error);
    throw error;
  }
};

export const signUpOAuth = async (payload: {
  email: string;
  nickname: string;
  profilePicture: string;
  birthDate: string;
  name: string;
  introduction: string;
  kakaoId: number;
}) => {
  const response = await axiosInstance.post('/auth/register-oauth', payload);
  return response.data;
};
