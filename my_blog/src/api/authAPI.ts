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
    profilePicture: string | null;
    introduction: string | null;
  };
}

interface SignUpOAuthResponse {
  code: number;
  message: string;
  data: {
    email: string;
    nickname: string;
    profilePicture: string;
    introduction: string;
  };
}

export interface LoginResponse {
  code: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    nickname: string;
    profilePicture: string;
    introduction: string;
    httpStatus: string;
    responseMessage: string;
  };
}

export interface ReissueResponse {
  code: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  try {
    const res = await axiosInstance.post('/auth/register', data);
    return res.data as SignUpResponse;
  } catch (error) {
    console.error('회원가입 요청 실패', error);
    throw error;
  }
};

interface SignUpOAuthRequest {
  email: string;
  nickname: string;
  profilePicture: string;
  birthDate: string;
  name: string;
  introduction: string;
  kakaoId: number;
}

export const signUpOAuth = async (
  payload: SignUpOAuthRequest,
): Promise<SignUpOAuthResponse> => {
  try {
    const res = await axiosInstance.post('/auth/register-oauth', payload);
    return res.data as SignUpOAuthResponse;
  } catch (error) {
    console.error('OAuth 회원가입 요청 실패', error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  const res = await axiosInstance.post<LoginResponse>('/auth/login', {
    email,
    password,
  });

  const { accessToken, refreshToken, nickname, profilePicture, introduction } =
    res.data.data;

  return {
    accessToken,
    refreshToken,
    nickname,
    profilePicture,
    introduction,
  };
};

export const reissue = async (refreshToken: string) => {
  const res = await axiosInstance.post<ReissueResponse>('/auth/reissue', {
    refreshToken,
  });

  const { accessToken, refreshToken: newRefreshToken } = res.data.data;

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};
