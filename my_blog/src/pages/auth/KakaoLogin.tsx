import { useEffect } from 'react';

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Auth: {
        authorize: (options: { redirectUri: string }) => void;
      };
    };
  }
}

const KakaoLogin = () => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.Kakao) {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
          console.log('Kakao SDK 초기화');
        }
      } else {
        console.error('Kakao SDK not loaded. index.html 스크립트 확인 필요');
      }
    } catch (error) {
      console.error('Kakao SDK 초기화 중 오류:', error);
    }
  }, []);

  const handleKakaoLogin = () => {
    // Kakao SDK 존재 여부 확인
    if (!window.Kakao) {
      console.error('Kakao SDK가 로드되지 않았습니다.');
      return;
    }

    try {
      window.Kakao.Auth.authorize({
        redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
      });
    } catch (error) {
      console.error(' Kakao 로그인 요청 중 오류 발생:', error);
    }
  };

  return (
    <button
      onClick={handleKakaoLogin}
      className="w-full h-12 bg-kakao-bg rounded-md text-black font-semibold hover:opacity-90"
    >
      로그인
    </button>
  );
};

export default KakaoLogin;
