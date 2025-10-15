import PencilIcon from '@/assets/icons/create.svg?react';
import clsx from 'clsx';

type sizeVariant = 'lg' | 'md';
type fontColorVariant = 'blue' | 'gray' | 'white';
type bgColorVariant = 'none' | 'blue' | 'white' | 'gray' | 'black';
type borderColorVariant = 'none' | 'blue' | 'gray';

const fontSizeMap: Record<sizeVariant, string> = {
  md: 'text-xs',
  lg: 'text-sm',
};

const fontColorMap: Record<fontColorVariant, string> = {
  blue: 'text-point',
  gray: 'text-gray-56',
  white: 'text-white',
};

const bgColorMap: Record<bgColorVariant, string> = {
  none: '',
  blue: 'bg-point',
  white: 'bg-white',
  gray: 'bg-gray-90',
  black: 'bg-black',
};

const borderColorMap: Record<borderColorVariant, string> = {
  none: '',
  blue: 'border-point border',
  gray: 'border-gray-56 border',
};

const iconSizeMap: Record<sizeVariant, string> = {
  md: 'w-3.5 h-3.5',
  lg: 'w-6 h-6',
};

interface gitLogButtonProps {
  text?: string;
  size?: sizeVariant;
  fontColor?: fontColorVariant;
  bgColor?: bgColorVariant;
  borderColor?: borderColorVariant;
  isBoxed?: boolean;
  onClick?: () => void;
}

const GitLogButton = ({
  text = '버튼',
  size = 'lg',
  fontColor = 'gray',
  bgColor = 'none',
  borderColor = 'none',
  isBoxed = false,
  onClick,
}: gitLogButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'w-fit h-10 flex justify-center items-center px-1 pt-1.5 pb-1 rounded-3xl cursor-pointer',
        bgColorMap[bgColor],
        borderColorMap[borderColor],
      )}
    >
      <div
        className={clsx(
          'w-fit h-[25px] flex items-center gap-1 px-2 pt-0.5 pb-1 rounded-xs',
          isBoxed && 'bg-gray-90',
        )}
      >
        <PencilIcon
          className={clsx('', iconSizeMap[size], fontColorMap[fontColor])}
        />
        <p
          className={clsx('w-fit', fontSizeMap[size], fontColorMap[fontColor])}
        >
          {text}
        </p>
      </div>
    </button>
  );
};

export default GitLogButton;
