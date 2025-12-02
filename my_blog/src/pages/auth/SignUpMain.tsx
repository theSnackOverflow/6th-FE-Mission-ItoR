import { useState, useRef } from 'react';
import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '@/hooks/useRegisterMutation';

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

  // Input 필드 설정
  const inputFields = [
    {
      variant: 'email' as const,
      type: 'email' as const,
      label: '이메일',
      placeholder: '이메일',
      value: email,
      onChange: setEmail,
      error: emailError,
    },
    ...(!isSocialLoggIned
      ? [
          {
            variant: 'password' as const,
            type: 'password' as const,
            label: '비밀번호',
            placeholder: '........',
            value: password,
            onChange: setPassword,
            error: passwordError,
          },
          {
            variant: 'passwordconfirm' as const,
            type: 'password' as const,
            label: '비밀번호 확인',
            placeholder: '........',
            value: passwordConfirm,
            onChange: setPasswordConfirm,
            error: passwordConfirmError,
          },
        ]
      : []),
    {
      variant: 'name' as const,
      type: 'text' as const,
      label: '이름',
      placeholder: '이름',
      value: name,
      onChange: setName,
      error: nameError,
    },
    {
      variant: 'birthdate' as const,
      type: 'text' as const,
      label: '생년월일',
      placeholder: 'YYYY-MM-DD',
      value: birthdate,
      onChange: setBirthdate,
      error: birthdateError,
    },
    {
      variant: 'nickname' as const,
      type: 'text' as const,
      label: '닉네임',
      placeholder: '닉네임',
      value: nickname,
      onChange: setNickname,
      error: nicknameError,
    },
    {
      variant: 'des' as const,
      type: 'text' as const,
      label: '한 줄 소개',
      placeholder: '한 줄 소개',
      value: des,
      onChange: setDes,
      error: desError,
    },
  ];

  const signUpMutation = useRegisterMutation();

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
      // If profileUrl is a local blob (object URL), backend cannot access it — omit it.
      profilePicture:
        profileUrl && !profileUrl.startsWith('blob:') ? profileUrl : undefined,
    };

    signUpMutation.mutate(payload, {
      onSuccess: () => {
        setShowSignUpModal(true);
      },
      onError: (error: AxiosError<{ message?: string }>) => {
        const apiMessage =
          error?.response?.data?.message ||
          error?.message ||
          '회원가입 중 오류가 발생했습니다.';
        alert(apiMessage);
      },
    });
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
              {inputFields.map((field, index) => (
                <div key={index}>
                  <Input
                    variant={field.variant}
                    type={field.type}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={field.onChange}
                  />
                  {field.error && (
                    <p className="px-5.5 -mt-2 text-xs font-light text-negative">
                      {field.error}
                    </p>
                  )}
                </div>
              ))}

              <Blank variant="32" />
              <button
                onClick={handleSubmit}
                className="mx-4 py-3 text-sm font-normal text-point border border-point rounded-3xl"
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
