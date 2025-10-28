const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const KakaoLogin = () => {
  const handleKakaoLogin = () => {
    try {
      const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

      window.location.href = kakaoAuthUrl;
    } catch (error) {
      console.error('카카오 로그인 리다이렉트 실패:', error);
    }
  };

  return (
    <button
      onClick={handleKakaoLogin}
      className="w-full h-12 bg-[#FEE500] rounded-md text-black font-semibold hover:opacity-90"
    >
      카카오로 회원가입
    </button>
  );
};

export default KakaoLogin;
