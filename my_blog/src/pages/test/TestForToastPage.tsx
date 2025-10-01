import { useState } from 'react';
import Toast from '../../components/Toast';

export default function TestForToastPage() {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <button
        onClick={() => setShow(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Show Toast
      </button>

      {show && (
        <>
          <Toast
            variant="success"
            size="md"
            message="저장되었습니다!"
            duration={3000}
            onClose={() => setShow(false)}
          />
          <Toast
            variant="error"
            size="lg"
            message="내용을 입력해주세요"
            duration={3000}
            onClose={() => setShow(false)}
          />
        </>
      )}
    </div>
  );
}
