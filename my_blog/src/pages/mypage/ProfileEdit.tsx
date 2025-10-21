import { useState } from 'react';

import Blank from '../../components/Blank';
import Header from '../../components/Header';
import ProfileImage from '../../components/ProfileImage';
import Input from '../../components/Input';
import SocialLoggIned from './components/SocailLoggIned';

const MOCK_USER = {
  nickname: '2ssac',
  des: '안녕하세요!',
  email: '2ssac@leets.com',
  password: '......',
  name: '김릿츠',
  birthdate: '2000-01-12',
  profileUrl: '',
};

const ProfileEdit = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileUrl, setProfileUrl] = useState<string | undefined>(
    MOCK_USER.profileUrl,
  );

  const [nickname, setNickname] = useState(MOCK_USER.nickname);
  const [birthdate, setBirthdate] = useState(MOCK_USER.birthdate);

  const isSocialLoggIned = false;

  const handleUploadProfile = (file: File) => {
    const url = URL.createObjectURL(file);
    setProfileUrl(url);
  };

  return (
    <>
      <Header
        type={isEditing ? 'edit-profile' : 'edit'}
        onEdit={() => setIsEditing(true)}
        onCancel={() => setIsEditing(false)}
      />
      <main style={{ top: 74 }}>
        <div className="mt-18 w-full h-fit flex flex-col justify-center items-center bg-gray-96">
          <div className="w-full max-w-[688px] min-w-mobile h-full flex flex-col">
            <div className="max-[500px]:hidden">{<Blank variant="64" />}</div>
            <div className="hidden max-[500px]:block">
              {<Blank variant="32" />}
            </div>
            {/* 프로필 */}
            <div className="px-4 py-3">
              <ProfileImage
                src={profileUrl}
                isEdit={isEditing}
                onUpload={handleUploadProfile}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Input
                variant="nickname"
                type="text"
                value={nickname}
                onChange={setNickname}
                placeholder={MOCK_USER.nickname}
                isDisabled={!isEditing}
              />
              <Input
                variant="des"
                type="text"
                placeholder={MOCK_USER.des}
                isDisabled={!isEditing}
              />
            </div>
            <Blank variant="20" />
          </div>
        </div>
        <section className="mb-12 flex justify-center">
          <section className="w-full max-w-[688px] min-w-mobile h-full flex flex-col">
            <Blank variant="20" />
            {isSocialLoggIned && <SocialLoggIned />}
            <Input
              variant="email"
              type="email"
              label="이메일"
              value="2ssac@leets.com"
              isDisabled={true}
              placeholder={MOCK_USER.password}
              unChangeable={true}
            />
            {!isSocialLoggIned && (
              <div>
                <Input
                  variant="password"
                  type="password"
                  label="비밀번호"
                  placeholder={MOCK_USER.password}
                  isDisabled={!isEditing}
                />
                <Input
                  variant="passwordconfirm"
                  type="password"
                  label="비밀번호 확인"
                  placeholder={MOCK_USER.password}
                  isDisabled={!isEditing}
                />
              </div>
            )}
            <Input
              variant="name"
              type="text"
              label="이름"
              value="김릿츠"
              isDisabled={true}
              placeholder={MOCK_USER.name}
              unChangeable={true}
            />
            <Input
              variant="birthdate"
              type="text"
              label="생년월일"
              value={birthdate}
              onChange={setBirthdate}
              placeholder={MOCK_USER.birthdate}
              isDisabled={!isEditing}
            />
            <Blank variant="32" />
          </section>
        </section>
      </main>
    </>
  );
};
export default ProfileEdit;
