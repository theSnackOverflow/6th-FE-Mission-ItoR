import { useEffect } from 'react';
import clsx from 'clsx';

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnOutsideClick?: boolean;
}

export default function ModalWrapper({
  isOpen,
  onClose,
  children,
  closeOnOutsideClick = true,
}: ModalWrapperProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex justify-center items-center bg-white/10 backdrop-blur-[20px] transition-opacity',
      )}
      onClick={() => {
        if (closeOnOutsideClick) onClose();
      }}
    >
      {children}
    </div>
  );
}
