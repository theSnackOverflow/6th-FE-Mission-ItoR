export interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
  profilePicture?: string;
  birthDate?: string;
  name?: string;
  introduction?: string;
}

export interface SignUpResponse {
  code: number;
  message: string;
  data: {
    email: string;
    nickname: string;
    profilePicture: string | null;
    introduction: string | null;
  };
}

export interface SignUpOAuthResponse {
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

export interface KakaoRedirectResponse {
  code: number;
  message: string;
  data: string;
}

export interface KakaoLoginCallbackResponse {
  code: number;
  message: string;
  data: {
    httpStatus: string;
    responseMessage: string;
  };
}
