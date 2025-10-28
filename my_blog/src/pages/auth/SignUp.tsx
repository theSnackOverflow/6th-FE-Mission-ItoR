import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/api/axiosInstance';

import Blank from '../../components/Blank';
import Header from '../../components/Header';

import LoginButton from '../../components/Button/LoginButton';

const SignUp = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = async () => {
    try {
      const res = await axiosInstance.get('/auth/kakao');
      const redirectUrl = res.data;
      window.location.href = redirectUrl;
    } catch (error) {
      console.error('카카오 로그인 URL 요청 실패:', error);
    }
  };

  return (
    <>
      <Header />
      <main className="mt-[70px] w-full h-screen flex flex-col">
        <section className="w-full flex flex-col items-center bg-gray-96 ">
          <div className="w-full max-w-[688px] min-w-mobile">
            <Blank variant="32" />
            <div className="w-full px-4 py-3 text-2xl font-medium text-black">
              회원가입
            </div>
            <Blank variant="20" />
          </div>
        </section>
        <section className="w-full flex justify-center">
          <div className="relative max-w-[782px] min-w-[358px] h-fit py-20 flex justify-between items-center rounded-[9px] max-[700px]:flex-col">
            <div className="w-96 h-fit flex flex-col justify-center items-center">
              <div className="h-40 px-4.5 flex items-center">
                <p className="text-[90px] text-black font-bold font-smooch max-[700px]:text-[82px]">
                  GITLOG
                </p>
              </div>
              <div className="px-4 py-3">
                <p className="text-sm font-light text-gray-56">
                  You can make anything by writing
                </p>
              </div>
            </div>
            <div className="w-[390px] flex-1 px-4 pt-8">
              <div className="flex flex-col px-4">
                <LoginButton
                  type="EMAILOGIN"
                  text="이메일로 회원가입"
                  onClick={() => {
                    navigate('./main');
                  }}
                />
                <div className="w-full mt-0.5 flex justify-center items-center">
                  <div className="w-26 border border-gray-96"></div>
                  <span className="px-2 pt-0.5 pb-1 text-xs font-normal text-gray-56">
                    또는
                  </span>
                  <div className="w-26 border border-gray-96"></div>
                </div>
                <LoginButton
                  type="KAKOLOGIN"
                  text="카카오로 회원가입"
                  onClick={handleKakaoLogin}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default SignUp;
