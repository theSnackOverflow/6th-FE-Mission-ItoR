import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Blank from '../../components/Blank';
import Header from '../../components/Header';

import ProfileImage from '@/components/ProfileImage';
import AddPhotoIcon from '../../assets/icons/add_photo_alternate.svg?react';
import Input from '../../components/Input/Input';
import ModalWrapper from '../../components/Modal/ModalWrapper';
import Modal from '../../components/Modal/Modal';
import LoginModal from '../../components/Modal/LoginModal';
import SocialLoggIned from '../mypage/components/SocailLoggIned';

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

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PASSWORD_RULE = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,16}$/;
  const BIRTHDATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const birth = new Date(birthdate);
  birth.setHours(0, 0, 0, 0);
  const isBirthValid =
    BIRTHDATE_REGEX.test(birthdate) && !isNaN(birth.getTime()) && birth < today;
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

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
    setShowSignUpModal(true);
  };

  return (
    <>
      <Header />
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
                className="w-fit px-2 py-1 flex items-ceter gap-1 text-gray-56 border border-gray-90 rounded-xs"
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
              {isSubmitted && email.length === 0 && (
                <p className="px-5.5 -mt-2 text-xs font-light text-negative">
                  *반드시 입력해야 하는 필수 사항입니다.
                </p>
              )}
              {isSubmitted && email.length > 0 && !EMAIL_REGEX.test(email) && (
                <p className="px-5.5 -mt-2 text-xs font-light text-negative">
                  *이메일 형식이 적합하지 않습니다.
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
                  {isSubmitted && password.length === 0 && (
                    <p className="px-5.5 -mt-2 text-xs font-light text-negative">
                      *반드시 입력해야 하는 필수 사항입니다.
                    </p>
                  )}
                  {isSubmitted &&
                    password.length > 0 &&
                    !PASSWORD_RULE.test(password) && (
                      <p className="px-5.5 -mt-2 text-xs font-light text-negative">
                        * 영문, 숫자, 특수문자를 포함하여 8~16자로 입력해주세요
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
                  {isSubmitted && passwordConfirm.length === 0 && (
                    <p className="px-5.5 -mt-2 text-xs font-light text-negative">
                      *반드시 입력해야 하는 필수 사항입니다.
                    </p>
                  )}
                  {isSubmitted &&
                    passwordConfirm.length > 0 &&
                    !(passwordConfirm === password) && (
                      <p className="px-5.5 -mt-2 text-xs font-light text-negative">
                        *비밀번호가 일치하지 않습니다
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
              {isSubmitted && name.length === 0 && (
                <p className="px-5.5 -mt-2 text-xs font-light text-negative">
                  *반드시 입력해야 하는 필수 사항입니다.
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
              {isSubmitted && birthdate.length === 0 && (
                <p className="px-5.5 -mt-2 text-xs font-light text-negative">
                  *반드시 입력해야 하는 필수 사항입니다.
                </p>
              )}

              {isSubmitted &&
                birthdate.length > 0 &&
                !BIRTHDATE_REGEX.test(birthdate) && (
                  <p className="px-5.5 -mt-2 text-xs font-light text-negative">
                    *YYYY-MM-DD 형식으로 입력해주세요.
                  </p>
                )}

              {isSubmitted &&
                birthdate.length > 0 &&
                BIRTHDATE_REGEX.test(birthdate) &&
                !isBirthValid && (
                  <p className="px-5.5 -mt-2 text-xs font-light text-negative">
                    *생일은 오늘 또는 미래 날짜일 수 없습니다.
                  </p>
                )}
              <Input
                label="닉네임"
                variant="name"
                type="text"
                value={nickname}
                onChange={setNickname}
                placeholder="닉네임"
              />
              {isSubmitted && nickname.length === 0 && (
                <p className="px-5.5 -mt-2 text-xs font-light text-negative">
                  *반드시 입력해야 하는 필수 사항입니다.
                </p>
              )}
              {isSubmitted && nickname.length > 0 && nickname.length > 20 && (
                <p className="px-5.5 -mt-2 text-xs font-light text-negative">
                  *닉네임은 최대 20글자입니다.
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
              {isSubmitted && des.length > 0 && des.length > 30 && (
                <p className="px-5.5 -mt-2 text-xs font-light text-negative">
                  *한 줄 소개는 최대 30글자입니다.
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
        <ModalWrapper isOpen={showSignUpModal} onClose={() => navigate('/')}>
          <Modal
            type="login"
            color="auth"
            title="회원가입이 완료되었습니다!"
            onClose={() => navigate('/')}
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
