import LoginButton from '@/components/Button/LoginButton';

const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const KakaoLogin = () => {
  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthUrl;
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
