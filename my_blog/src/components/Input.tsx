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
  const formatBirthdate = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 8);
    const yyyy = numbers.slice(0, 4);
    const mm = numbers.slice(4, 6);
    const dd = numbers.slice(6, 8);

    if (numbers.length <= 4) return yyyy;
    if (numbers.length <= 6) return `${yyyy}-${mm}`;
    return `${yyyy}-${mm}-${dd}`;
  };

  return variant === 'nickname' ? (
    <section className="w-full h-fit px-4 py-3 flex flex-col gap-1">
      <input
        type="text"
        value={value}
        className={clsx(
          'w-full h-fit px-4 py-3 border border-gray-90 rounded-sm  text-2xl placeholder:text-gray-56 placeholder:font-medium leading-[160%]',
          isDisabled ? 'text-gray-78' : 'text-black',
        )}
        placeholder={placeholder}
        disabled={isDisabled}
        onChange={(e) => onChange?.(e.target.value)}
      ></input>
      {value && value.length > 20 ? (
        <label
          htmlFor="nickname"
          className="px-1.5 text-xs font-light text-negative"
        >
          * 20글자 이내로 작성해주세요
        </label>
      ) : (
        <label
          htmlFor="nickname"
          className="px-1.5 text-xs font-light text-gray-78 "
        >
          * 20글자 이내
        </label>
      )}
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
      {variant === 'birthdate' ? (
        <input
          id={variant}
          type="text"
          inputMode="numeric"
          maxLength={10}
          value={value}
          onChange={(e) => {
            const formatted = formatBirthdate(e.target.value);
            onChange?.(formatted);
          }}
          placeholder={placeholder}
          disabled={isDisabled}
          className={clsx(
            'w-full h-fit px-4 py-3 border border-gray-90 rounded-sm text-sm placeholder:text-gray-78 placeholder:font-light leading-[160%]',
            unChangeable
              ? 'text-gray-56 bg-gray-90'
              : isDisabled
                ? 'text-gray-78'
                : 'text-black',
          )}
        ></input>
      ) : (
        <input
          id={variant}
          type={type}
          value={value}
          className={clsx(
            'w-full h-fit px-4 py-3 border border-gray-90 rounded-sm text-sm placeholder:text-gray-78 placeholder:font-light leading-[160%]',
            unChangeable
              ? 'text-gray-56 bg-gray-90'
              : isDisabled
                ? 'text-gray-78'
                : 'text-black',
          )}
          pattern="\d{4}-\d{2}-\d{2}"
          placeholder={placeholder}
          disabled={isDisabled}
        ></input>
      )}
    </section>
  );
};

export default Input;
