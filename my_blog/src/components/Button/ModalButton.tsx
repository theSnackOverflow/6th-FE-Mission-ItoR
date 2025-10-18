import clsx from 'clsx';

type ModalButtonVariant = 'CANCEL' | 'DELETE';

interface ModalButtonProps {
  text: string;
  onClick?: () => void;
  variant?: ModalButtonVariant;
}

const ModalButton = ({ text, onClick, variant }: ModalButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'w-[141px] h-[38px] px-3 py-2 text-sm font-normal rounded-xs ',
        variant === 'CANCEL'
          ? 'text-black border border-gray-96'
          : 'text-white bg-negative',
      )}
    >
      {text}
    </button>
  );
};

export default ModalButton;
