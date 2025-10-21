import { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import ModalWrapper from '../../components/Modal/ModalWrapper';
import { useNavigate } from 'react-router-dom';

const TestForModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleSignUp = () => navigate('/signup');

  return (
    <main className="relative flex flex-col items-center justify-center h-screen gap-4 bg-[#E2DCFF]">
      <button
        onClick={handleOpen}
        className="px-4 py-2 bg-white rounded-md shadow-md hover:bg-gray-100 transition"
      >
        테스트 버튼
      </button>

      {isOpen && (
        <ModalWrapper isOpen={isOpen} onClose={handleClose}>
          <Modal
            type="signup"
            color="auth"
            title="가입되지 않은 계정이에요"
            des="회원가입을 진행할까요?"
            onClose={handleClose}
            onSignUp={handleSignUp}
          />
        </ModalWrapper>
      )}
    </main>
  );
};

export { TestForModal };
