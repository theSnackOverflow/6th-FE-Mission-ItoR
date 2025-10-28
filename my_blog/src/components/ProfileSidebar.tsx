import { useNavigate } from 'react-router-dom';

import Button from './Button/Button';
import ProfileImage from './ProfileImage';

interface profileSidebarProps {
  isLoggedIn?: boolean;
  nickname?: string;
  intro?: string;
  onLogout?: () => void;
}

const ProfileSidebar = ({
  isLoggedIn,
  nickname,
  intro,
  onLogout,
}: profileSidebarProps) => {
  const navigate = useNavigate();

  return (
    <section className="fixed w-60 h-full flex flex-col justify-between bg-gray-96 border-r border-gray-90">
      <div className="w-full h-fit py-6 cursor-pointer">
        <div onClick={() => navigate('/profile/edit')}>
          <div className="px-4">
            <ProfileImage />
          </div>
          <div className="px-5 py-3 flex flex-col gap-3">
            {/* 닉네임 */}
            <h1 className="text-black text-2xl font-medium">
              {isLoggedIn && <p>{nickname || '%{닉네임}'}</p>}
            </h1>
            {/* 소개글 */}
            <p className="text-sm text-gray-20 font-light leading-[160%] whitespace-pre-line">
              {isLoggedIn ? (
                <span>{intro || '%{한 줄 소개}'}</span>
              ) : (
                'You can make anything by writing'
              )}
            </p>
          </div>
        </div>
        {/* blank */}
        <div className="h-5"></div>

        <div className="px-4">
          {isLoggedIn ? (
            <div className="flex gap-2.5">
              <Button
                text="나의 깃로그"
                size="lg"
                bgColor="white"
                fontColor="blue"
                borderColor="blue"
                onClick={() => navigate('/mypage')}
              />
              <Button
                text="깃로그 쓰기"
                size="lg"
                bgColor="white"
                fontColor="blue"
                borderColor="blue"
                onClick={() => navigate('/post/new')}
              />
            </div>
          ) : (
            <Button
              text="깃로그 시작하기"
              size="lg"
              bgColor="white"
              fontColor="blue"
              borderColor="blue"
            />
          )}
        </div>
      </div>
      {/* 하단 버튼 */}
      {isLoggedIn && (
        <div className="w-full h-fit flex justify-between px-4 py-6 gap-2.5">
          <Button
            width="w-24"
            text="설정"
            size="lg"
            fontColor="gray"
            borderColor="gray"
            bgColor="white"
            onClick={() => {}}
          />
          <Button
            width="w-24"
            text="로그아웃"
            size="lg"
            fontColor="gray"
            borderColor="gray"
            bgColor="white"
            onClick={() => {
              console.log('[Sidebar] Logout button clicked');
              onLogout?.();
            }}
          />
        </div>
      )}
    </section>
  );
};

export default ProfileSidebar;
