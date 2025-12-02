import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

import Button from './Button/Button';
import ProfileImage from './ProfileImage';

interface ProfileSidebarProps {
  isLoggedIn?: boolean;
  nickname?: string;
  intro?: string;
  profileUrl?: string;
  onLogout?: () => void;
  onLogin?: () => void;
}

const ProfileSidebar = ({
  isLoggedIn = false,
  nickname,
  intro,
  profileUrl,
  onLogout,
  onLogin,
}: ProfileSidebarProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <section className="fixed w-60 h-full flex flex-col justify-between bg-gray-96 border-r border-gray-90">
      <div className="w-full h-fit py-6 cursor-pointer">
        <div onClick={() => navigate('/profile/edit')}>
          <div className="px-4">
            <ProfileImage src={profileUrl} />
          </div>
          <div className="px-5 py-3 flex flex-col gap-3">
            {/* 닉네임 */}
            <h1 className="text-black text-2xl font-medium">
              {isLoggedIn ? <p>{nickname}</p> : null}
            </h1>
            {/* 소개글 */}
            <p className="text-sm text-gray-20 font-light leading-[160%] whitespace-pre-line">
              {isLoggedIn ? (
                <span>{intro}</span>
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
                onClick={() => {
                  if (isAuthenticated) {
                    navigate('/post/new');
                    return;
                  }
                  try {
                    sessionStorage.setItem('auth_redirect', '/post/new');
                  } catch {
                    /* ignore */
                  }
                  window.dispatchEvent(new Event('open-login-modal'));
                }}
              />
            </div>
          ) : (
            <Button
              text="깃로그 시작하기"
              size="lg"
              bgColor="white"
              fontColor="blue"
              borderColor="blue"
              onClick={() => onLogin?.()}
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
            onClick={() => navigate('/profile/edit')}
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
