import { useState } from 'react';
import type { FontSize, FieldState } from '../types/text-field';
import TextField from './TextField';

interface TextFieldSetProps {
  title: string;
  font?: FontSize;
  state?: FieldState;
  warningText?: string;
}

const TextFieldSet = ({
  title = '제목',
  font = '16',
  state = 'default',
  warningText = '* 주의 문구',
}: TextFieldSetProps) => {
  const [input, setInput] = useState<string>('');
  const [showWarning, setShowWarning] = useState<boolean>(false);

  const onChangeInput = (value: string) => {
    setInput(value);
  };

  const onSubmitInput = () => {
    if (input.trim() === '') {
      setShowWarning(true);
    } else {
      setShowWarning(false);
      alert(`입력값: ${input}`);
      setInput('');
    }
  };

  return (
    <section className="w-fit px-4 py-3 flex flex-col gap-3 bg-white">
      <div className="px-1.5">
        <p className="text-sm font-light text-gray-56 leading-[160%]">
          {title}
        </p>
      </div>
      <TextField
        value={input}
        font={font}
        state={state}
        onChange={onChangeInput}
        onSubmit={onSubmitInput}
      />

      {showWarning && (
        <div className="px-1.5">
          <p className="text-xs font-light text-gray-78 leading-[160%]">
            {warningText}
          </p>
        </div>
      )}
    </section>
  );
};

export default TextFieldSet;
