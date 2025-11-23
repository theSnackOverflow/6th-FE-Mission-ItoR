export const ROUTES = {
  HOME: '/',
  POST: {
    NEW: '/post/new',
    DETAIL: (id: string) => `/post/${id}`,
  },
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
    SIGNUP_MAIN: '/signup/main',
    KAKAO_REDIRECT: '/auth/kakao/callback',
  },
  PROFILE: {
    EDIT: '/profile/edit',
    MYPAGE: '/mypage',
  },
} as const;
