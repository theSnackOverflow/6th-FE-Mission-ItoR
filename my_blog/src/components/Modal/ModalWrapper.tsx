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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={clsx(
        'fixed inset-0 z-999 flex justify-center items-center bg-white/10 backdrop-blur-[2px] transition-opacity gap-2.5',
      )}
      onClick={() => {
        if (closeOnOutsideClick) onClose();
      }}
    >
      <div
        className="max-w-[90%] max-h-[90%] overflow-auto flex justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
