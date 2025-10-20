import clsx from 'clsx';

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
}

const Input = ({
  variant,
  type,
  label,
  value,
  isDisabled = false,
  placeholder,
  unChangeable = false,
}: inputProps) => {
  return variant === 'nickname' ? (
    <section className="w-full h-fit px-4 py-3 flex flex-col gap-1">
      <input
        type="text"
        value={value}
        className="w-full h-fit px-4 py-3 border border-gray-90 rounded-sm text-black text-2xl placeholder:text-gray-56 placeholder:font-medium leading-[160%]"
        placeholder={placeholder}
      ></input>
      <label
        htmlFor="nickname"
        className="px-1.5 text-xs font-light text-gray-78 "
      >
        * 20글자 이내
      </label>
    </section>
  ) : (
    <section className="px-4 py-3 w-full h-fit flex flex-col gap-3">
      {label && (
        <label
          htmlFor={variant}
          className="px-1.5 text-sm text-gray-56 font-light"
        >
          {label}
        </label>
      )}
      <input
        id={variant}
        type={type}
        value={value}
        className={clsx(
          'w-full h-fit px-4 py-3 border border-gray-90 rounded-sm text-sm placeholder:text-gray-78 placeholder:font-light leading-[160%]',
          unChangeable ? 'text-gray-56 bg-gray-90' : 'text-black',
        )}
        pattern="\d{4}-\d{2}-\d{2}"
        placeholder={placeholder}
        disabled={isDisabled}
      ></input>
    </section>
  );
};

export default Input;
