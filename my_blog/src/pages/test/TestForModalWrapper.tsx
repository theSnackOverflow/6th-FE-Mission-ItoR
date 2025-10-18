import { useState } from 'react';
import ModalWrapper from '../../components/ModalWrapper';

const TestForModalWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4 bg-[#E2DCFF]">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 text-white bg-indigo-500 rounded-md"
      >
        모달 열기
      </button>

      <ModalWrapper isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-lg font-semibold mb-3">테스트 모달</h2>
        <p className="mb-4 text-gray-600">이건 ModalWrapper 테스트입니다.</p>
        <button
          onClick={() => setIsOpen(false)}
          className="px-3 py-2 bg-gray-200 rounded-md"
        >
          닫기
        </button>
      </ModalWrapper>
    </main>
  );
};

export { TestForModalWrapper };
