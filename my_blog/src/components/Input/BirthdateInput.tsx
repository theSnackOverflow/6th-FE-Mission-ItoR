import clsx from 'clsx';

interface BirthdateInputProps {
  label?: string;
  value?: string;
  isDisabled?: boolean;
  placeholder?: string;
  unChangeable?: boolean;
  onChange?: (value: string) => void;
}

const BirthdateInput = ({
  label,
  value,
  isDisabled = false,
  placeholder,
  unChangeable = false,
  onChange,
}: BirthdateInputProps) => {
  const formatBirthdate = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 8);
    const yyyy = numbers.slice(0, 4);
    const mm = numbers.slice(4, 6);
    const dd = numbers.slice(6, 8);

    if (numbers.length <= 4) return yyyy;
    if (numbers.length <= 6) return `${yyyy}-${mm}`;
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <section className="px-4 py-3 w-full h-fit flex flex-col gap-3">
      {label && (
        <label
          htmlFor="birthdate"
          className="px-1.5 text-sm text-gray-56 font-light"
        >
          {label}
        </label>
      )}
      <input
        id="birthdate"
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
      />
    </section>
  );
};

export default BirthdateInput;
