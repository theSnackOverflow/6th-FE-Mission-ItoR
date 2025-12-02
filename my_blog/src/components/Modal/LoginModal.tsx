import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLoginMutation } from '@/hooks/useLoginMutation';
import { ROUTES } from '@/const/routes';

import LoginButton from '../Button/LoginButton';
// Note: we inline the Kakao redirect logic below instead of rendering the component
import LoginInput from '../Input/LoginInput';

import ClearIcon from '@/assets/icons/clear.svg?react';
import ModalWrapper from '@/components/Modal/ModalWrapper';

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showFailedModal, setShowFailedModal] = useState(false);

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isEmailValid = EMAIL_REGEX.test(email);

  const loginMutation = useLoginMutation();

  const handleSubmit = () => {
    if (!isEmailValid) {
      setIsErrorVisible(true);
      setErrorMessage('*이메일 형식이 적합하지 않습니다.');
      return;
    }
    loginMutation.mutate(
      { email, password },
      {
        onError: (error) => {
          const apiMessage =
            error.response?.data?.message ??
            error.response?.data?.error ??
            error.message ??
            '로그인 실패';
          setErrorMessage(apiMessage);
          setIsErrorVisible(true);
          // show a modal indicating login failure
          setShowFailedModal(true);
        },
        onSuccess: () => {
          // close modal and navigate to saved redirect (if any) or home
          // also notify any global listeners to ensure modal is closed
          try {
            window.dispatchEvent(new Event('close-login-modal'));
          } catch (e) {
            /* ignore */
          }
          onClose();
          const redirect = sessionStorage.getItem('auth_redirect');
          if (redirect) {
            sessionStorage.removeItem('auth_redirect');
            navigate(redirect);
          } else {
            navigate(ROUTES.HOME);
          }
        },
      },
    );
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      <section className="relative z-9999 max-w-[782px] min-w-[358px] h-fit py-20 flex justify-between items-center bg-gray-7 rounded-[9px] max-[600px]:flex-col">
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-4 right-4"
        >
          <ClearIcon className="w-10 h-10 p-2 text-white" />
        </button>
        <div className="w-96 h-fit flex flex-col justify-center items-center">
          <div className="h-40 px-4.5 flex items-center">
            <p className="text-[90px] text-white font-bold font-smooch max-[600px]:text-[82px]">
              GITLOG
            </p>
          </div>
          <div className="px-4 py-3">
            <p className="text-sm font-light text-gray-56">
              You can make anything by writing
            </p>
          </div>
        </div>
        <div className="flex-1 px-4 pt-8">
          <div className="px-4 py-2 flex flex-col gap-2">
            <LoginInput
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              onKeyDown={handleEnterKey}
              placeholder="이메일"
            />
            {isErrorVisible && !isEmailValid && (
              <p className="px-1.5 text-xs font-light text-negative">
                *이메일 형식이 적합하지 않습니다.
              </p>
            )}
            {isErrorVisible && isEmailValid && errorMessage && (
              <p className="px-1.5 text-xs font-light text-negative">
                {errorMessage}
              </p>
            )}
            <LoginInput
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              onKeyDown={handleEnterKey}
              placeholder="비밀번호"
            />
          </div>
          <div className="flex flex-col px-4">
            <LoginButton
              type="EMAILLOGIN"
              text="이메일로 로그인"
              onClick={handleSubmit}
            />
            <div className="w-full flex justify-center items-center">
              <div className="w-[123px] border border-gray-20 -ml-4"></div>
              <span className="px-2 pt-0.5 pb-1 text-xs text-gray-56 font-normal">
                SNS
              </span>
              <div className="w-[123px] border border-gray-20 -mr-4"></div>
            </div>
            {/* Use KakaoLogin handler so clicking redirects to backend Kakao auth */}
            <LoginButton
              type="KAKAOLOGIN"
              text="카카오로 로그인"
              onClick={() => {
                // Close the modal (notify global listeners and call onClose)
                try {
                  window.dispatchEvent(new Event('close-login-modal'));
                } catch (e) {
                  /* ignore */
                }
                try {
                  onClose();
                } catch (e) {
                  /* ignore */
                }

                // Then redirect to backend Kakao auth
                const backendBase =
                  (import.meta as any).env?.VITE_API_BASE_URL || '';
                const target = backendBase
                  ? `${backendBase}/auth/kakao`
                  : '/auth/kakao';
                window.location.href = target;
              }}
            />
            <button
              onClick={() => navigate(ROUTES.AUTH.SIGNUP)}
              className="mt-1 px-2 pt-0.5 pb-1 text-xs font-normal text-gray-56"
            >
              또는 회원가입
            </button>
          </div>
        </div>
      </section>
      {showFailedModal && (
        <ModalWrapper
          isOpen={showFailedModal}
          onClose={() => setShowFailedModal(false)}
        >
          <section className="absolute z-50 w-[326px] h-fit pt-6 pb-4 px-4 bg-white rounded-sm shadow-xl">
            <div className="w-full h-full flex flex-col justify-between gap-6">
              <div className="px-1 flex flex-col gap-2">
                <div className="text-sm font-normal leading-[160%] whitespace-pre-line">
                  <div>로그인에 실패했습니다</div>
                </div>
                {errorMessage && (
                  <div className="text-xs text-gray-56 font-normal leading-[160%] whitespace-pre-line">
                    {errorMessage}
                  </div>
                )}
              </div>
              <div className="flex justify-around">
                <button
                  className="px-4 py-2 bg-gray-96 rounded-sm"
                  onClick={() => setShowFailedModal(false)}
                >
                  확인
                </button>
              </div>
            </div>
          </section>
        </ModalWrapper>
      )}
    </>
  );
};

export default LoginModal;
