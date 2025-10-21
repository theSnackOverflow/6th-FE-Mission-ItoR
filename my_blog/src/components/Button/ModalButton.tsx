import clsx from 'clsx';

type ModalButtonVariant = 'CANCEL' | 'DELETE' | 'LOGOUT';

interface ModalButtonProps {
  text: string;
  onClick?: () => void;
  variant: ModalButtonVariant;
}

const typeMap: Record<ModalButtonVariant, string> = {
  CANCEL: 'text-black border border-gray-96',
  DELETE: 'text-white bg-negative',
  LOGOUT: 'text-white bg-point font-normal',
};

const ModalButton = ({ text, onClick, variant }: ModalButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'w-[141px] h-[38px] px-3 py-2 text-sm font-normal rounded-xs ',
        typeMap[variant],
      )}
    >
      {text}
    </button>
  );
};

export default ModalButton;
