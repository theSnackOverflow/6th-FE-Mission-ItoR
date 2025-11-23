import NicknameInput from './NicknameInput';
import BirthdateInput from './BirthdateInput';
import BasicInput from './BasicInput';

type InputVariant =
  | 'nickname'
  | 'name'
  | 'des'
  | 'email'
  | 'password'
  | 'passwordconfirm'
  | 'birthdate';

type inputType = 'text' | 'password' | 'email';

interface inputProps {
  variant: InputVariant;
  type: inputType;
  label?: string;
  value?: string;
  isDisabled?: boolean;
  placeholder?: string;
  unChangeable?: boolean;
  onChange?: (value: string) => void;
}

const Input = ({
  variant,
  type,
  label,
  value,
  isDisabled = false,
  placeholder,
  unChangeable = false,
  onChange,
}: inputProps) => {
  switch (variant) {
    case 'nickname':
      return (
        <NicknameInput
          value={value}
          isDisabled={isDisabled}
          placeholder={placeholder}
          onChange={onChange}
        />
      );

    case 'birthdate':
      return (
        <BirthdateInput
          label={label}
          value={value}
          isDisabled={isDisabled}
          placeholder={placeholder}
          unChangeable={unChangeable}
          onChange={onChange}
        />
      );

    default:
      return (
        <BasicInput
          variant={variant}
          type={type}
          label={label}
          value={value}
          isDisabled={isDisabled}
          placeholder={placeholder}
          unChangeable={unChangeable}
          onChange={onChange}
        />
      );
  }
};

export default Input;
