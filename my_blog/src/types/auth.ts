// 회원가입 요청
export interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
  profilePicture?: string;
  birthDate?: string;
  name?: string;
  introduction?: string;
}

// 회원가입 응답
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

// 카카오 회원가입 응답
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

// 로그인 응답
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

// 토큰 재발급 응답
export interface ReissueResponse {
  code: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

// 카카오 리다이렉트 응답
export interface KakaoRedirectResponse {
  code: number;
  message: string;
  data: string;
}

// 카카오 로그인 콜백 응답
export interface KakaoLoginCallbackResponse {
  code: number;
  message: string;
  data: {
    httpStatus: string;
    responseMessage: string;
  };
}
