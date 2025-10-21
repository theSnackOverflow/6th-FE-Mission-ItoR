import clsx from 'clsx';

import Kakao from '../../assets/icons/kakao.svg?react';

type LoginButtonVariant = 'EMALLOGIN' | 'KAKOLOGIN';

interface loginButtonProps {
  type: LoginButtonVariant;
  text: string;
}

const varaintMap: Record<LoginButtonVariant, string> = {
  EMALLOGIN: 'text-white text-sm font-normal  bg-point',
  KAKOLOGIN: 'flex justify-center items-center gap-2 text-[15px] bg-kakao-bg',
};

const LoginButton = ({ type, text }: loginButtonProps) => {
  return (
    <button
      className={clsx('w-full h-11 px-3.5 rounded-md', varaintMap[type])}
      onClick={() => {}}
    >
      {type === 'KAKOLOGIN' && <Kakao className="w-4" />}
      {text}
    </button>
  );
};

export default LoginButton;
