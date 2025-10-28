import type { ChangeEvent } from 'react';

interface loginInputProps {
  placeholder?: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const LoginInput = ({
  type,
  value,
  placeholder,
  onChange,
  onKeyDown,
}: loginInputProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className="w-full h-12 px-4 pt-1 pb-2 text-sm font-light  bg-white border border-gray-90 rounded-sm placeholder:text-gray-78"
    />
  );
};
export default LoginInput;
