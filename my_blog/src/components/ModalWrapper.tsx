import { useEffect } from 'react';
import clsx from 'clsx';

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  closeOnOutsideClick?: boolean;
}

export default function ModalWrapper({
  isOpen,
  onClose,
  children,
  className,
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
      <div
        className={clsx(
          'bg-white rounded-md shadow-[0_2px_8px_0_rgba(0,0,0,0.10)] p-5 min-w-[320px] relative',
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
