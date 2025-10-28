import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '@/api/axiosInstance';

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] =
    useState('카카오 로그인 중입니다...');

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    if (!code) {
      const errMsg = '카카오 인가 코드가 없습니다.';
      console.error(errMsg);
      setStatusMessage(errMsg);
      return;
    }

    axiosInstance
      .get(`/auth/kakao/redirect?code=${code}`)
      .then((res) => {
        const { code: resCode, message, data } = res.data;

        if (resCode === 200 && data) {
          const backendStatusMessage =
            data.responseMessage || '로그인 처리 완료';
          console.log('카카오 로그인 성공:', backendStatusMessage);
          setStatusMessage(backendStatusMessage);
        } else {
          const errorMsg = `로그인 실패 - 코드: ${resCode}, 메시지: ${message}`;
          console.error(errorMsg);
          setStatusMessage(errorMsg);
        }
      })
      .catch((err) => {
        const errorMsg = `카카오 로그인 리다이렉트 처리 실패: ${err?.message || err}`;
        console.error(errorMsg);
        setStatusMessage(errorMsg);
      });
  }, [navigate]);

  return (
    <main className="flex items-center justify-center h-screen text-gray-70">
      <p>{statusMessage}</p>
    </main>
  );
};

export default KakaoRedirect;
