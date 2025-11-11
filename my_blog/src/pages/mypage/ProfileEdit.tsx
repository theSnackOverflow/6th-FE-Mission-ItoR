import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  updateUser,
  getMyInfo,
  updateNickname,
  updatePassword,
  updateProfilePicture,
} from '../../api/userAPI';

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

  const PASSWORD_RULE = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,16}$/;
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
    const url = URL.createObjectURL(file);
    setProfileUrl(url);
    try {
      await updateProfilePicture(url);
    } catch (error) {
      console.error('프로필 이미지 업데이트 실패:', error);
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    if (!PASSWORD_RULE.test(value)) {
      setPasswordError(
        '* 영문, 숫자, 특수문자를 포함하여 8~16자로 입력해주세요',
      );
    } else {
      setPasswordError('');
    }
  };

  const handlePasswordConfirmChange = (value: string) => {
    setPasswordConfirm(value);

    if (password !== value) {
      setPasswordConfirmError('* 비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordConfirmError('');
    }
  };

  const handleSaveProfile = async () => {
    const isPasswordValid = PASSWORD_RULE.test(password);
    const isPasswordMatch = password === passwordConfirm;

    if (!isPasswordValid || !isPasswordMatch) {
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
