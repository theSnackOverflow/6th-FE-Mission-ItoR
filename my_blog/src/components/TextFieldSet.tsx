import { useState } from 'react';
import type { fontSize, fieldState } from './types/text-field';
import TextField from './TextField';

interface textFieldSetProps {
  title: string;
  font?: fontSize;
  state?: fieldState;
  warningText?: string;
}

const TextFieldSet = ({
  title = '제목',
  font = '16',
  state = 'default',
  warningText = '* 주의 문구',
}: textFieldSetProps) => {
  const [input, setInput] = useState<string>('');
  const [showWarning, setShowWarning] = useState<boolean>(true);

  const onChangeInput = (e) => {
    console.log(e.target.value);
    setInput(e.target.value);
  };

  return (
    <section className="w-fit px-4 py-3 flex flex-col gap-3 bg-white">
      <div className="px-1.5">
        <p className="text-sm font-light text-[#909090] leading-[160%]">
          {title}
        </p>
      </div>
      <TextField
        value={input}
        font={font}
        state={state}
        onChange={() => onChangeInput}
      />

      {showWarning && (
        <div className="px-1.5">
          <p className="text-xs font-light text-[#C8C8C8] leading-[160%]">
            {warningText}
          </p>
        </div>
      )}
    </section>
  );
};

export default TextFieldSet;
