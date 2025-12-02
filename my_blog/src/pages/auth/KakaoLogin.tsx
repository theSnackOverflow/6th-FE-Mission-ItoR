import LoginButton from '@/components/Button/LoginButton';

const KakaoLogin = () => {
  const handleKakaoLogin = () => {
    const backendBase = import.meta.env?.VITE_API_BASE_URL || '';
    const target = backendBase ? `${backendBase}/auth/kakao` : '/auth/kakao';
    // Use top-level navigation to allow server redirect to Kakao (avoid CORS)
    window.location.href = target;
  };

  return (
    <LoginButton
      type="KAKAOLOGIN"
      text="카카오로 회원가입"
      onClick={handleKakaoLogin}
    />
  );
};

export default KakaoLogin;
