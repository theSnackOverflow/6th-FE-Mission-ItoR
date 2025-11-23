import clsx from 'clsx';

type inputType = 'text' | 'password' | 'email';

interface BasicInputProps {
  variant: 'name' | 'des' | 'email' | 'password' | 'passwordconfirm';
  type: inputType;
  label?: string;
  value?: string;
  isDisabled?: boolean;
  placeholder?: string;
  unChangeable?: boolean;
  onChange?: (value: string) => void;
}

const BasicInput = ({
  variant,
  type,
  label,
  value,
  isDisabled = false,
  placeholder,
  unChangeable = false,
  onChange,
}: BasicInputProps) => {
  return (
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
        onChange={(e) => onChange?.(e.target.value)}
        className={clsx(
          'w-full h-fit px-4 py-3 border border-gray-90 rounded-sm text-sm placeholder:text-gray-78 placeholder:font-light leading-[160%]',
          unChangeable
            ? 'text-gray-56 bg-gray-90'
            : isDisabled
              ? 'text-gray-78'
              : 'text-black',
        )}
        placeholder={placeholder}
        disabled={isDisabled}
      />
    </section>
  );
};

export default BasicInput;
