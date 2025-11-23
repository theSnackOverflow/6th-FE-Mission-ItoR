import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLoginMutation } from '@/hooks/useLoginMutation';
import { ROUTES } from '@/const/routes';

import LoginButton from '../Button/LoginButton';
import LoginInput from '../Input/LoginInput';

import ClearIcon from '../../assets/icons/clear.svg?react';

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
        },
      }
    );
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <section className="absolute z-50 max-w-[782px] min-w-[358px] h-fit py-20 flex justify-between items-center bg-gray-7 rounded-[9px] max-[600px]:flex-col">
      <button onClick={onClose}>
        <ClearIcon className="absolute top-4 right-4 w-10 h-10 p-2 text-white" />
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
            type="EMAILOGIN"
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
          <LoginButton type="KAKAOLOGIN" text="카카오로 로그인" />
          <button
            onClick={() => navigate(ROUTES.AUTH.SIGNUP)}
            className="mt-1 px-2 pt-0.5 pb-1 text-xs font-normal text-gray-56"
          >
            또는 회원가입
          </button>
        </div>
      </div>
    </section>
  );
};

export default LoginModal;
