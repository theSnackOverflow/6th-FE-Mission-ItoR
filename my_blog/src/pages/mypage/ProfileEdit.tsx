import { useNavigate } from 'react-router-dom';
import { updateUser, updateNickname, updatePassword } from '../../api/userAPI';
import { useProfileForm } from './hooks/useProfileForm';

import Blank from '../../components/Blank';
import Header from '../../components/Header';
import ProfileImageSection from './components/ProfileImageSection';
import BasicInfoSection from './components/BasicInfoSection';
import AccountInfoSection from './components/AccountInfoSection';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const isSocialLoggIned = true;

  const {
    isEditing,
    setIsEditing,
    profileUrl,
    setProfileUrl,
    nickname,
    setNickname,
    birthdate,
    setBirthdate,
    email,
    name,
    introduction,
    setIntroduction,
    password,
    passwordConfirm,
    passwordError,
    passwordConfirmError,
    handlePasswordChange,
    handlePasswordConfirmChange,
    validateForm,
  } = useProfileForm();

  const handleSaveProfile = async () => {
    if (!validateForm()) {
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
      <main className="top-[74px]">
        <div className="mt-18 w-full h-fit flex flex-col justify-center items-center bg-gray-96">
          <div className="w-full max-w-[688px] min-w-mobile h-full flex flex-col">
            <div className="max-[500px]:hidden">
              <Blank variant="64" />
            </div>
            <div className="hidden max-[500px]:block">
              <Blank variant="32" />
            </div>

            <ProfileImageSection
              profileUrl={profileUrl}
              isEditing={isEditing}
              onProfileUrlChange={setProfileUrl}
            />

            <BasicInfoSection
              nickname={nickname}
              introduction={introduction}
              isEditing={isEditing}
              onNicknameChange={setNickname}
              onIntroductionChange={setIntroduction}
            />

            <Blank variant="20" />
          </div>
        </div>

        <AccountInfoSection
          email={email}
          password={password}
          passwordConfirm={passwordConfirm}
          passwordError={passwordError}
          passwordConfirmError={passwordConfirmError}
          name={name}
          birthdate={birthdate}
          isEditing={isEditing}
          isSocialLogin={isSocialLoggIned}
          onPasswordChange={handlePasswordChange}
          onPasswordConfirmChange={handlePasswordConfirmChange}
          onBirthdateChange={setBirthdate}
        />
      </main>
    </>
  );
};

export default ProfileEdit;
