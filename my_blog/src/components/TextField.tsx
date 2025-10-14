import clsx from 'clsx';
import type { FontSize, FieldState, InputType } from './types/text-field';

const fontMap: Record<FontSize, string> = {
  '16': 'text-sm font-light leading-[160%]',
  '32': 'text-2xl',
};

const stateMap: Record<FieldState, string> = {
  default: 'text-[#909090] border-[#E6E6E6]',
  input: 'text-black border-[#E6E6E6]',
  click: 'text-black border-[#555555] text-left cursor-pointer',
  disabled: 'text-[#909090] border-[#E6E6E6] bg-[#E6E6E6]',
};

interface TextfieldProps {
  type?: InputType;
  value?: string;
  font?: FontSize;
  state?: FieldState;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
  onClick?: () => void;
  onSubmit?: (value: string) => void;
}

const TextField = ({
  type = 'input',
  value,
  font = '16',
  state = 'default',
  disabled = false,
  placeholder = 'Text Field',
  onChange,
  onClick,
  onSubmit,
}: TextfieldProps) => {
  return (
    <input
      type={type}
      disabled={disabled}
      className={clsx(
        'w-[656px] h-fit px-4 py-3 rounded-sm border-[1px] ',
        fontMap[font],
        stateMap[state],
      )}
      onChange={(e) => onChange?.(e.target.value)}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          // ! useState 비동기로 인한 alert 두 번 호출되는 오류 해결
          // ! -> 리팩토링 할 때 다시 공부
          // ! -> e.currentTarget.value
          onSubmit?.(e.currentTarget.value);
        }
      }}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default TextField;
