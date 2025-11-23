import { useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/api/axiosInstance';
import { useNavigate } from 'react-router-dom';

import Blank from '@/components/Blank';

import ProfileImage from '@/components/ProfileImage';
import AddPhotoIcon from '@/assets/icons/add_photo_alternate.svg?react';
import Input from '@/components/Input/Input';
import ModalWrapper from '@/components/Modal/ModalWrapper';
import Modal from '@/components/Modal/Modal';
import LoginModal from '@/components/Modal/LoginModal';
import SocialLoggIned from '@/pages/mypage/components/SocailLoggIned';
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  validateName,
  validateBirthdate,
  validateNickname,
  validateIntroduction,
} from '@/utils/validation';
import { ROUTES } from '@/const/routes';

const isSocialLoggIned = false; //! 테스트용

const SignUpMain = () => {
  const navigate = useNavigate();

  const [profileUrl, setProfileUrl] = useState<string | undefined>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [nickname, setNickname] = useState('');
  const [des, setDes] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);

  // 유효성 검사 에러
  const emailError = isSubmitted ? validateEmail(email) : null;
  const passwordError =
    isSubmitted && !isSocialLoggIned ? validatePassword(password) : null;
  const passwordConfirmError =
    isSubmitted && !isSocialLoggIned
      ? validatePasswordConfirm(password, passwordConfirm)
      : null;
  const nameError = isSubmitted ? validateName(name) : null;
  const birthdateError = isSubmitted ? validateBirthdate(birthdate) : null;
  const nicknameError = isSubmitted ? validateNickname(nickname) : null;
  const desError = isSubmitted ? validateIntroduction(des) : null;

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const signUpMutation = useMutation({
    mutationFn: async (payload: {
      email: string;
      password: string;
      nickname: string;
      name: string;
      birthDate: string;
      introduction: string;
      profilePicture?: string;
    }) => {
      const res = await axiosInstance.post('/auth/register', payload);
      return res.data;
    },
    onSuccess: () => {
      setShowSignUpModal(true);
    },
    onError: (error) => {
      console.error('회원가입 요청 실패:', error);
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    },
  });

  const handleUploadProfile = (file: File) => {
    const url = URL.createObjectURL(file);
    setProfileUrl(url);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);

    const isAllFilled = isSocialLoggIned
      ? !!(email.trim() && name.trim() && birthdate.trim() && nickname.trim())
      : !!(
          email.trim() &&
          name.trim() &&
          birthdate.trim() &&
          nickname.trim() &&
          password.trim() &&
          passwordConfirm.trim()
        );

    if (!isAllFilled) return;

    // 유효성 검사
    const hasErrors =
      emailError ||
      nameError ||
      birthdateError ||
      nicknameError ||
      desError ||
      (!isSocialLoggIned && (passwordError || passwordConfirmError));

    if (hasErrors) return;

    const payload = {
      email,
      password,
      nickname,
      name,
      birthDate: birthdate,
      introduction: des,
      profilePicture: profileUrl,
    };

    console.log('[DEBUG] origin', window.location.origin);
    console.log('[DEBUG] axios baseURL', axiosInstance.defaults.baseURL);
    console.log('[DEBUG] will POST to', '/auth/register');

    signUpMutation.mutate(payload);
  };

  return (
    <>
      <main className="relative mt-[70px] w-full h-screen flex flex-col">
        <section className="w-full flex flex-col items-center bg-gray-96 ">
          <Blank variant="32" />
          <div className="w-full max-w-[688px] min-w-mobile px-4 py-3 flex flex-col gap-3">
            <div className="w-full text-2xl font-medium text-black">
              회원가입
            </div>
            <div className="w-full text-sm font-light text-gray-20">
              가입을 위해 회원님의 정보를 입력해주세요.
            </div>
          </div>
          <Blank variant="20" />
        </section>
        <section className="w-full flex flex-col justify-center items-center ">
          <div className="w-full max-w-[688px] min-w-mobile h-fit flex flex-col">
            <Blank variant="32" />

            {/* 프로필 사진 */}
            <div className="w-full px-4 py-3 flex flex-col gap-4">
              <ProfileImage size="lg" src={profileUrl} />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUploadProfile(file);
                }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-fit px-2 py-1 flex items-center gap-1 text-gray-56 border border-gray-90 rounded-xs"
              >
                <AddPhotoIcon className="w-3.5 h-3.5" />
                <p className="font-normal text-xs">프로필 사진 추가</p>
              </button>
            </div>
            {/* 나머지 Input */}
            <div className="w-full flex flex-col justify-center">
              {isSocialLoggIned && <SocialLoggIned />}
              <Input
                value={email}
                variant="email"
                type="email"
                label="이메일"
                placeholder="이메일"
                onChange={(e) => setEmail(e)}
              />
              {emailError && (
                <p className="px-5.5 -mt-2 text-xs font-light text-negative">
                  {emailError}
                </p>
              )}

              {!isSocialLoggIned && (
                <>
                  <Input
                    variant="password"
                    type="password"
                    label="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e)}
                    placeholder="........"
                  />
                  {passwordError && (
                    <p className="px-5.5 -mt-2 text-xs font-light text-negative">
                      {passwordError}
                    </p>
                  )}

                  <Input
                    variant="passwordconfirm"
                    type="password"
                    label="비밀번호 확인"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e)}
                    placeholder="........"
                  />
                  {passwordConfirmError && (
                    <p className="px-5.5 -mt-2 text-xs font-light text-negative">
                      {passwordConfirmError}
                    </p>
                  )}
                </>
              )}
              <Input
                variant="name"
                type="text"
                label="이름"
                value={name}
                onChange={(e) => setName(e)}
                placeholder="이름"
              />
              {nameError && (
                <p className="px-5.5 -mt-2 text-xs font-light text-negative">
                  {nameError}
                </p>
              )}
              <Input
                variant="birthdate"
                type="text"
                label="생년월일"
                value={birthdate}
                onChange={setBirthdate}
                placeholder="YYYY-MM-DD"
              />
              {birthdateError && (
                <p className="px-5.5 -mt-2 text-xs font-light text-negative">
                  {birthdateError}
                </p>
              )}
              <Input
                label="닉네임"
                variant="nickname"
                type="text"
                value={nickname}
                onChange={setNickname}
                placeholder="닉네임"
              />
              {nicknameError && (
                <p className="px-5.5 -mt-2 text-xs font-light text-negative">
                  {nicknameError}
                </p>
              )}
              <Input
                label="한 줄 소개"
                variant="des"
                type="text"
                value={des}
                onChange={setDes}
                placeholder="한 줄 소개"
              />
              {desError && (
                <p className="px-5.5 -mt-2 text-xs font-light text-negative">
                  {desError}
                </p>
              )}

              <Blank variant="32" />
              <button
                onClick={handleSubmit}
                className="w-full mx-4 py-3 text-sm font-normal text-point border border-point rounded-3xl"
              >
                회원가입 완료
              </button>
              <Blank variant="64" />
            </div>
          </div>
        </section>
      </main>
      {showSignUpModal && (
        <ModalWrapper
          isOpen={showSignUpModal}
          onClose={() => navigate(ROUTES.HOME)}
        >
          <Modal
            type="login"
            color="auth"
            title="회원가입이 완료되었습니다!"
            onClose={() => navigate(ROUTES.HOME)}
            onLogin={() => {
              setShowSignUpModal(false);
              setShowLoginModal(true);
            }}
          />
        </ModalWrapper>
      )}
      {showLoginModal && (
        <ModalWrapper
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        >
          <LoginModal onClose={() => setShowLoginModal(false)} />
        </ModalWrapper>
      )}
    </>
  );
};

export default SignUpMain;
