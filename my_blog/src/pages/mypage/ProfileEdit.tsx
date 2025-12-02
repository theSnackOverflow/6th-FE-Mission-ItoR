import { useNavigate } from 'react-router-dom';
import { updateUser, updateNickname, updatePassword } from '../../api/userAPI';
import { useProfileForm } from './hooks/useProfileForm';
import { useAuth } from '@/context/AuthContext';

import Blank from '@/components/Blank';
import { BaseHeader, EditProfileHeader } from '../../components/Header';
import ProfileImageSection from './components/ProfileImageSection';
import BasicInfoSection from './components/BasicInfoSection';
import AccountInfoSection from './components/AccountInfoSection';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isSocialLoggIned = user?.isSocialLogin ?? false;

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
      console.log('[ProfileEdit] handleSaveProfile 호출');
      await updateNickname(nickname);
      if (password && passwordConfirm) {
        await updatePassword(password);
      }

      const payload: Record<string, unknown> = {};
      if (nickname) payload.nickname = nickname;
      if (birthdate) payload.birthDate = birthdate;
      // don't send blob: URLs or empty strings for profilePicture
      if (
        profileUrl &&
        typeof profileUrl === 'string' &&
        !profileUrl.startsWith('blob:')
      ) {
        payload.profilePicture = profileUrl;
      }
      if (introduction) payload.introduction = introduction;

      // ensure email and name are present (server requires them even if not changing)
      if (!payload.email && user?.email) {
        payload.email = user.email;
      }
      if (!payload.name && user?.name) {
        payload.name = user.name;
      }

      console.log('[ProfileEdit] updateUser payload:', payload);
      await updateUser(payload);

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
      console.error('[ProfileEdit] 프로필 수정 중 오류:', error);
      // show server error details if available
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err: any = error;
      const serverMsg = err?.response?.data || err?.message;
      console.error('[ProfileEdit] 서버 응답:', serverMsg);
      alert(
        `프로필 수정 중 오류가 발생했습니다.\n${JSON.stringify(serverMsg)}`,
      );
    }
  };

  return (
    <>
      {isEditing ? (
        <EditProfileHeader
          onCancel={() => setIsEditing(false)}
          onSave={handleSaveProfile}
        />
      ) : (
        <BaseHeader>
          <button
            className="px-3 py-2 text-sm font-normal text-black"
            onClick={() => setIsEditing(true)}
          >
            편집하기
          </button>
        </BaseHeader>
      )}
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
