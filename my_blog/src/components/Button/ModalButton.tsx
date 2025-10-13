type ModalButtonVariant = 'CANCLE' | 'DELETE';

interface ModalButtonProps {
  text: string;
  onClick?: () => void;
  variant?: ModalButtonVariant;
}

const ModalButton = ({ text, onClick }: ModalButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-[141px] h-[38px] px-3 py-2 rounded-xs "
    >
      {text}
    </button>
  );
};

export default ModalButton;
