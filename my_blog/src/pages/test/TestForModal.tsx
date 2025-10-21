import { useState } from 'react';
import Modal from '../../components/Modal';

const TestForModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <main className="relative flex flex-col items-center justify-center h-screen gap-4 bg-[#E2DCFF]">
      <button
        onClick={handleOpen}
        className="px-4 py-2 bg-white rounded-md shadow-md hover:bg-gray-100 transition"
      >
        테스트 버튼
      </button>

      {isOpen && (
        <Modal
          title={`title 1\ntitle 2`}
          des={`des 1\ndes 2`}
          onClose={handleClose}
        />
      )}
    </main>
  );
};

export default TestForModal;
