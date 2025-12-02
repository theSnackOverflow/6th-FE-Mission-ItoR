import clsx from 'clsx';

interface NicknameInputProps {
  value?: string;
  isDisabled?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const NicknameInput = ({
  value,
  isDisabled = false,
  placeholder,
  onChange,
}: NicknameInputProps) => {
  const isOverLimit = value && value.length > 20;

  return (
    <section className="w-full h-fit px-4 py-3 flex flex-col gap-1">
      <input
        type="text"
        value={value}
        className={clsx(
          'w-full h-fit px-4 py-3 border border-gray-90 rounded-sm text-2xl placeholder:text-gray-56 placeholder:font-medium leading-[160%]',
          isDisabled ? 'text-gray-78' : 'text-black',
        )}
        placeholder={placeholder}
        disabled={isDisabled}
        onChange={(e) => onChange?.(e.target.value)}
      />
      <label
        htmlFor="nickname"
        className={clsx(
          'px-1.5 text-xs font-light',
          isOverLimit ? 'text-negative' : 'text-gray-78',
        )}
      >
        {isOverLimit ? '* 20글자 이내로 작성해주세요' : '* 20글자 이내'}
      </label>
    </section>
  );
};

export default NicknameInput;
