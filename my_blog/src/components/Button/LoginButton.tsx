import clsx from 'clsx';

import KakaoIcon from '@/assets/icons/kakao.svg?react';

type LoginButtonVariant = 'EMAILOGIN' | 'KAKAOLOGIN';

interface loginButtonProps {
  type: LoginButtonVariant;
  text: string;
  onClick?: () => void;
}

const varaintMap: Record<LoginButtonVariant, string> = {
  EMAILOGIN: 'text-white text-sm font-normal  bg-point',
  KAKAOLOGIN: 'flex justify-center items-center gap-2 text-[15px] bg-kakao-bg',
};

const LoginButton = ({ type, text, onClick }: loginButtonProps) => {
  return (
    <button
      className={clsx('w-full h-11 my-1 px-3.5 rounded-md', varaintMap[type])}
      onClick={onClick}
    >
      {type === 'KAKAOLOGIN' && <KakaoIcon className="w-4" />}
      {text}
    </button>
  );
};

export default LoginButton;
