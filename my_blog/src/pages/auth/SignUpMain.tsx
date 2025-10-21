import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Blank from '../../components/Blank';
import Header from '../../components/Header';

import ProfileImage from '../../components/ProfileImage';
import AddPhotoIcon from '../../assets/icons/add_photo_alternate.svg?react';
import Input from '../../components/Input/Input';
import ModalWrapper from '../../components/Modal/ModalWrapper';
import Modal from '../../components/Modal/Modal';
import LoginModal from '../../components/Modal/LoginModal';

const SignUpMain = () => {
  const navigate = useNavigate();

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

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
              <p className="text-sm font-light text-gray-56">프로필 사진</p>
              <ProfileImage size="lg" />
              <button className="w-fit px-2 py-1 flex items-ceter gap-1 text-gray-56 border border-gray-90 rounded-xs">
                <AddPhotoIcon className="w-3.5 h-3.5" />
                <p className="font-normal text-xs">프로필 사진 추가</p>
              </button>
            </div>
            {/* 나머지 Input */}
            <div className="w-full flex flex-col justify-center">
              <Input
                variant="email"
                type="email"
                label="이메일"
                placeholder="이메일"
              />
              <Input
                variant="password"
                type="password"
                label="비밀번호"
                // value={password}
                // onChange={handlePasswordChange}
                placeholder="........"
              />
              {/* {password && passwordError && (
                  <p className="px-5.5 -mt-2 text-xs font-light text-negative">
                  {passwordError}
                  </p>
                  )} */}

              <Input
                variant="passwordconfirm"
                type="password"
                label="비밀번호 확인"
                // value={passwordConfirm}
                // onChange={handlePasswordConfirmChange}
                placeholder="........"
              />
              {/* {passwordConfirm && passwordConfirmError && (
                  <p className="px-5.5 -mt-2 text-xs font-light text-negative">
                  {passwordConfirmError}
                  </p>
                  )} */}
              <Input
                variant="name"
                type="text"
                label="이름"
                placeholder="이름"
              />
              <Input
                variant="birthdate"
                type="text"
                label="생년월일"
                // value={birthdate}
                // onChange={setBirthdate}
                placeholder="YYYY-MM-DD"
              />
              <Input
                label="닉네임"
                variant="name"
                type="text"
                // value={nickname}
                // onChange={setNickname}
                placeholder="닉네임"
              />
              <Input
                label="한 줄 소개"
                variant="des"
                type="text"
                placeholder="한 줄 소개"
              />
              <Blank variant="32" />
              <button
                onClick={() => setShowSignUpModal(true)}
                className="w-ful mx-4 py-3 text-sm font-normal text-point border border-point rounded-3xl"
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
