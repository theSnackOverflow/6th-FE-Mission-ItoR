import { useNavigate } from 'react-router-dom';
import Blank from './Blank';
import ProfileImage from './ProfileImage';

interface footerProps {
  isLoggined?: boolean;
  nickname?: string;
  intro?: string;
}

// ! 프로필 부분 PropfileSidebar 컴포넌트와 중복 코드 -> 추후 별도의 컴포넌트로 분리 예정

const Footer = ({ isLoggined = true, nickname, intro }: footerProps) => {
  const navigate = useNavigate();
  return (
    <footer className="w-full h-fit flex justify-center bg-gray-96">
      <section className="w-full max-w-[688px] min-w-mobile h-fit flex flex-col">
        <div className="max-[500px]:hidden">{<Blank variant="64" />}</div>

        {/* 프로필 */}
        <div className="w-full h-fit py-6 cursor-pointer">
          <div onClick={() => navigate('/setting')}>
            <div className="px-4 py-3">
              <ProfileImage />
            </div>
            <div className="px-4 py-3 flex flex-col gap-3">
              {/* 닉네임 */}

              <h1 className="text-black text-2xl font-medium">
                {isLoggined && <p>{nickname || '%{닉네임}'}</p>}
              </h1>

              {/* 소개글 */}
              <p className="text-sm text-gray-20 font-light leading-[160%] whitespace-pre-line">
                {isLoggined ? (
                  <span>{intro || '%{한 줄 소개}'}</span>
                ) : (
                  'You can make anything by writing'
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="max-[500px]:hidden">{<Blank variant="64" />}</div>
        <div className="hidden max-[500px]:block">{<Blank variant="32" />}</div>
      </section>
    </footer>
  );
};

export default Footer;
