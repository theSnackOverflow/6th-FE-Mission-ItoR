import { useNavigate } from 'react-router-dom';

import Button from './Button/Button';
import ProfileImage from './ProfileImage';

interface ProfileSidebar {
  isLoggined?: boolean;
  nickname?: string;
  intro?: string;
}

const ProfileSidebar = ({ isLoggined, nickname, intro }: ProfileSidebar) => {
  const navigate = useNavigate();

  return (
    <section className="w-60 h-[768px] flex flex-col justify-between bg-gray-96">
      <div className="w-full h-fit py-6 cursor-pointer">
        <div onClick={() => navigate('/setting')}>
          <div className="px-4">
            <ProfileImage />
          </div>
          <div className="px-5 py-3 flex flex-col gap-3">
            {/* 닉네임 */}
            <h1 className="text-black text-2xl font-medium">
              {isLoggined && <p>{nickname || '%{닉네임}'}</p>}
            </h1>
            {/* 소개글 */}
            <p className="text-sm text-gray-20 font-light leading-[160%] whitespace-pre-line">
              {isLoggined ? (
                <p>{intro || '%{한 줄 소개}'}</p>
              ) : (
                'You can make anything by writing'
              )}
            </p>
          </div>
        </div>
        {/* blank */}
        <div className="h-5"></div>

        <div className="px-4">
          {isLoggined ? (
            <div className="flex gap-2.5">
              <Button
                text="나의 깃로그"
                size="lg"
                bgColor="white"
                fontColor="blue"
                borderColor="blue"
              />
              <Button
                text="깃로그 쓰기"
                size="lg"
                bgColor="white"
                fontColor="blue"
                borderColor="blue"
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
      {isLoggined && (
        <div className="w-full h-fit flex justify-between px-4 py-6 gap-2.5">
          <Button
            width="w-24"
            text="설정"
            size="lg"
            fontColor="gray"
            borderColor="gray"
            bgColor="white"
          />
          <Button
            width="w-24"
            text="로그아웃"
            size="lg"
            fontColor="gray"
            borderColor="gray"
            bgColor="white"
          />
        </div>
      )}
    </section>
  );
};

export default ProfileSidebar;
