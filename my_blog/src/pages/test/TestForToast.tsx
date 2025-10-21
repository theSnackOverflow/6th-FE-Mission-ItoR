import { useState } from 'react';
import Toast from '../../components/Toast';

export default function TestForToastPage() {
  const [show, setShow] = useState(false);

  return (
    <main className="relative flex flex-col items-center justify-center h-screen gap-4 bg-[#E2DCFF]">
      <button
        onClick={() => setShow(true)}
        className="px-4 py-2 border rounded-md"
      >
        Show Toast
      </button>

      {show && (
        <>
          <Toast
            variant="success"
            size="md"
            message="저장되었습니다!"
            onClose={() => setShow(false)}
          />
          <Toast
            variant="error"
            size="lg"
            message="내용을 입력해주세요"
            onClose={() => setShow(false)}
          />
        </>
      )}
    </main>
  );
}
