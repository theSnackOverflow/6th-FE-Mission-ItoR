import { useState, useEffect } from 'react';
import axios from 'axios';
import { getPresignedUrl } from '../../api/imageAPI';
import { useNavigate } from 'react-router-dom';
import {
  updateUser,
  getMyInfo,
  updateNickname,
  updatePassword,
  updateProfilePicture,
} from '../../api/userAPI';
import {
  validatePassword,
  validatePasswordConfirm,
} from '../../utils/validation';

import Blank from '../../components/Blank';
import Header from '../../components/Header';
import ProfileImage from '../../components/ProfileImage';
import Input from '../../components/Input/Input';
import SocialLoggIned from './components/SocailLoggIned';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileUrl, setProfileUrl] = useState<string | undefined>('');

  const [nickname, setNickname] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [introduction, setIntroduction] = useState('');

  const isSocialLoggIned = true;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getMyInfo();
        setNickname(user.nickname || '');
        setBirthdate(user.birthDate || '');
        setProfileUrl(user.profilePicture || '');
        setEmail(user.email || '');
        setName(user.name || '');
        setIntroduction(user.introduction || '');
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const handleUploadProfile = async (file: File) => {
    try {
      const presignedUrl = await getPresignedUrl(file.name);

      await axios.put(presignedUrl, file, {
        headers: { 'Content-Type': file.type },
      });

      const imageUrl = presignedUrl.split('?')[0];

      await updateProfilePicture(imageUrl);
      setProfileUrl(imageUrl);
    } catch (error) {
      console.error('프로필 이미지 업로드 실패:', error);
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    const error = validatePassword(value);
    setPasswordError(error || '');
  };

  const handlePasswordConfirmChange = (value: string) => {
    setPasswordConfirm(value);
    const error = validatePasswordConfirm(password, value);
    setPasswordConfirmError(error || '');
  };

  const handleSaveProfile = async () => {
    const passwordError = validatePassword(password);
    const passwordConfirmError = validatePasswordConfirm(password, passwordConfirm);

    if (passwordError || passwordConfirmError) {
      return;
    }

    try {
      await updateNickname(nickname);
      if (password && passwordConfirm) {
        await updatePassword(password);
      }
      await updateUser({
        nickname,
        birthDate: birthdate,
        profilePicture: profileUrl,
        introduction,
      });

      setIsEditing(false);
      navigate('/mypage', {
        state: {
          toast: {
            variant: 'success',
            message: '프로필이 수정되었습니다!',
          },
        },
      });
    } catch (error) {
      console.error(error);
      alert('프로필 수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <Header
        type={isEditing ? 'edit-profile' : 'edit'}
        onEdit={() => setIsEditing(true)}
        onCancel={() => setIsEditing(false)}
        onSave={handleSaveProfile}
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
                placeholder={nickname}
                isDisabled={!isEditing}
              />
              <Input
                variant="des"
                type="text"
                value={introduction}
                onChange={setIntroduction}
                placeholder="자기소개를 입력하세요"
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
              value={email}
              isDisabled={true}
              placeholder={email}
              unChangeable={true}
            />
            {!isSocialLoggIned && (
              <div>
                <Input
                  variant="password"
                  type="password"
                  label="비밀번호"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="........"
                  isDisabled={!isEditing}
                />
                {password && passwordError && (
                  <p className="px-5.5 -mt-2 text-xs font-light text-negative">
                    {passwordError}
                  </p>
                )}

                <Input
                  variant="passwordconfirm"
                  type="password"
                  label="비밀번호 확인"
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmChange}
                  placeholder="........"
                  isDisabled={!isEditing}
                />
                {passwordConfirm && passwordConfirmError && (
                  <p className="px-5.5 -mt-2 text-xs font-light text-negative">
                    {passwordConfirmError}
                  </p>
                )}
              </div>
            )}
            <Input
              variant="name"
              type="text"
              label="이름"
              value={name}
              isDisabled={true}
              placeholder={name}
              unChangeable={true}
            />
            <Input
              variant="birthdate"
              type="text"
              label="생년월일"
              value={birthdate}
              onChange={setBirthdate}
              placeholder={birthdate}
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
