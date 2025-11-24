import { useNavigate } from 'react-router-dom';
import Blank from '@/components/Blank';
import LoginModal from '@/components/Modal/LoginModal';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <main className="relative mt-[70px] w-full h-screen flex flex-col">
      <section className="w-full flex flex-col items-center bg-gray-96 ">
        <Blank variant="32" />
        <div className="w-full max-w-[688px] min-w-mobile px-4 py-3 flex flex-col gap-3">
          <div className="w-full text-2xl font-medium text-black">로그인</div>
          <div className="w-full text-sm font-light text-gray-20">
            로그인하여 서비스를 이용하세요.
          </div>
        </div>
        <Blank variant="20" />
      </section>

      <section className="w-full flex flex-col justify-center items-center ">
        <div className="w-full max-w-[688px] min-w-mobile h-fit flex flex-col">
          <Blank variant="32" />
          <div className="w-full px-4 py-3">
            <LoginModal onClose={() => navigate('/')} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
