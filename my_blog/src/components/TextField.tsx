import clsx from 'clsx';

type fontSize = '16' | '32';
type fieldState = 'default' | 'input' | 'click' | 'disabled';
type inputType = 'input' | 'button';

const fontMap: Record<fontSize, string> = {
  '16': 'text-sm font-light leading-[%160%] ',
  '32': 'text-2xl',
};

const stateMap: Record<fieldState, string> = {
  default: 'text-[#909090] border-[#E6E6E6]',
  input: 'text-black border-[#E6E6E6]',
  click: 'text-black border-[#555555] text-left cursor-pointer',
  disabled: 'text-[#909090] border-[#E6E6E6] bg-[#E6E6E6] ',
};

interface textfieldProps {
  type?: inputType;
  text?: string;
  font?: fontSize;
  state?: fieldState;
  disabled?: boolean;
  onClick?: () => void;
}

const TextField = ({
  type = 'input',
  text = 'Text Field',
  font = '32',
  state = 'default',
  disabled = false,
  onClick,
}: textfieldProps) => {
  return (
    <input
      type={type}
      disabled={disabled}
      className={clsx(
        'w-[656px] h-fit px-4 py-3 rounded-sm border-[1px] ',
        fontMap[font],
        stateMap[state],
      )}
      onClick={onClick}
      value={text}
      placeholder=""
    />
  );
};

export default TextField;
