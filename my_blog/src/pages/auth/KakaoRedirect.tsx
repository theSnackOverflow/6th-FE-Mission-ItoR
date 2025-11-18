import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { kakaoLoginCallback } from '@/api/authAPI';

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] =
    useState('카카오 로그인 중입니다...');

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');

    if (!code) {
      const errMsg = '카카오 인가 코드가 없습니다.';
      console.error(errMsg);
      setStatusMessage(errMsg);
      return;
    }

    kakaoLoginCallback(code)
      .then((res) => {
        const { code: resCode, data } = res;

        if (resCode === 0) {
          const backendStatusMessage = data?.responseMessage || '로그인 완료';
          setStatusMessage(backendStatusMessage);
          navigate('/');
        } else {
          navigate('/oauth-signup', { state: { code } });
        }
      })
      .catch((err) => {
        const errorData = err.response?.data;
        const errorMsg =
          `카카오 로그인 리다이렉트 처리 실패: ${err.message}` +
          (errorData ? ` | 서버 응답: ${JSON.stringify(errorData)}` : '');
        console.error(errorMsg);
        setStatusMessage(errorMsg);
      });
  }, [navigate]);

  return (
    <main className="flex flex-col items-center justify-center h-screen text-gray-70">
      <svg
        className="animate-spin h-8 w-8 mb-4 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <p>{statusMessage}</p>
    </main>
  );
};

export default KakaoRedirect;
