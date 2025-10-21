import { useEffect, useState, type JSX } from 'react';
import clsx from 'clsx';
import DoneIcon from '@/assets/icons/done.svg?react';
import ErrorIcon from '@/assets/icons/error_outline.svg?react';

type toastVariant = 'success' | 'error';
type toastSize = 'md' | 'lg';

const sizeMap: Record<toastSize, string> = {
  md: 'w-[147px] h-10',
  lg: 'w-[171px] h-10',
};

const icons: Record<toastVariant, JSX.Element> = {
  success: <DoneIcon className="w-5 h-5 text-positive cursor-pointer" />,
  error: <ErrorIcon className="w-5 h-5 text-negative cursor-pointer" />,
};

const variantMap: Record<toastVariant, string> = {
  success: 'border-positive text-positive bg-positive',
  error: 'border-negative text-negative bg-negative',
};

interface ToastProps {
  variant?: toastVariant;
  size?: toastSize;
  message: string;
  onClose?: () => void;
}

export default function Toast({
  variant = 'success',
  size = 'md',
  message,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    if (!onClose) return;

    const hideTimer = setTimeout(() => setIsVisible(false), 3000);
    const closeTimer = setTimeout(onClose, 3500);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  return (
    <div
      className={clsx(
        'flex justify-center items-center gap-1 bg-white rounded-full border px-3 py-2 shadow-sm transition-opacity duration-500',
        variantMap[variant],
        sizeMap[size],
        isVisible ? 'opacity-100' : 'opacity-0',
      )}
    >
      {icons[variant]}
      <span className="text-sm font-normal">{message}</span>
    </div>
  );
}
