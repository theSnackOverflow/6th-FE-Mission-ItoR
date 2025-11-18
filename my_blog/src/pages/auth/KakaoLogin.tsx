import LoginButton from '@/components/Button/LoginButton';
import { getKakaoRedirectUrl } from '@/api/authAPI';

const KakaoLogin = () => {
  const handleKakaoLogin = async () => {
    try {
      const url = await getKakaoRedirectUrl();
      window.location.href = url;
    } catch (error) {
      console.error('카카오 로그인 URL 요청 실패', error);
    }
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
