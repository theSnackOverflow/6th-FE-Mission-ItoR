import { useNavigate } from 'react-router-dom';
import Blank from './Blank';
import ProfileImage from './ProfileImage';

import SettingIcon from '../assets/icons/settings.svg?react';

interface ProfileSectionProps {
  isLoggedIn?: boolean;
  nickname?: string;
  intro?: string;
  showEdit?: boolean;
}

// ! 프로필 부분 PropfileSidebar 컴포넌트와 중복 코드 -> 추후 별도의 컴포넌트로 분리 예정

const ProfileSection = ({
  isLoggedIn = true,
  nickname,
  intro,
  showEdit = false,
}: ProfileSectionProps) => {
  const navigate = useNavigate();
  return (
    <section className="mt-10 -w-full h-fit flex justify-center bg-gray-96">
      <section className="w-full max-w-[688px] min-w-mobile h-fit flex flex-col">
        <div className="max-[500px]:hidden">{<Blank variant="64" />}</div>
        <div className="hidden max-[500px]:block">{<Blank variant="32" />}</div>
        {/* 프로필 */}
        <div className="w-full h-fit cursor-pointer">
          <div onClick={() => navigate('/profile/edit')}>
            <div className="px-4 py-3">
              <ProfileImage />
            </div>
            <div className="px-4 py-3 flex flex-col gap-3">
              {/* 닉네임 */}

              <h1 className="text-black text-2xl font-medium">
                {isLoggedIn && <p>{nickname || '%{닉네임}'}</p>}
              </h1>

              {/* 소개글 */}
              <p className="text-sm text-gray-20 font-light leading-[160%] whitespace-pre-line">
                {isLoggedIn ? (
                  <span className="px-1">{intro || '%{한 줄 소개}'}</span>
                ) : (
                  'You can make anything by writing'
                )}
              </p>
            </div>
          </div>
        </div>
        {showEdit ? (
          <div>
            <div className="w-full px-4 py-3">
              <button
                onClick={() => navigate('/profile/edit')}
                className="flex items-center gap-1 px-2 pt-0.5 pb-1 text-gray-56 border border-gray-90 rounded-xs"
              >
                <SettingIcon className="w-3 h-3" />
                <div className="text-xs font-normal">내 프로필 설정</div>
              </button>
              <Blank variant="20" />
            </div>
          </div>
        ) : (
          <div>
            <div className="max-[500px]:hidden">{<Blank variant="64" />}</div>
            <div className="hidden max-[500px]:block">
              {<Blank variant="32" />}
            </div>
          </div>
        )}
      </section>
    </section>
  );
};

export default ProfileSection;
