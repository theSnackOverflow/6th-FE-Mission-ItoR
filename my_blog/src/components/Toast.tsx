import { useEffect, useState, type JSX } from 'react';
import DoneIcon from '@/assets/icons/components/toast/done.svg?react';
import ErrorIcon from '@/assets/icons/components/toast/error.svg?react';

type toastVariant = 'success' | 'error';
type toastSize = 'md' | 'lg';

interface ToastProps {
  variant?: toastVariant;
  size?: toastSize;
  duration?: number;
  message: string;
  onClose?: () => void;
}

const icons: Record<toastVariant, JSX.Element> = {
  success: <DoneIcon className="w-5 h-5" />,
  error: <ErrorIcon className="w-5 h-5" />,
};

const variantsStyles: Record<toastVariant, string> = {
  success: 'border-green-500 text-green-600 bg-green-50',
  error: 'border-red-500 text-red-600 bg-red-50',
};

const sizeStyles: Record<toastSize, string> = {
  md: 'w-[147px] h-[40px]',
  lg: 'w-[171px] h-[40px]',
};

export default function Toast({
  variant = 'success',
  size = 'md',
  message,
  duration = 3000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    if (!onClose) return;
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      const closeTimer = setTimeout(() => {
        onClose();
      }, 500);
      return () => clearTimeout(closeTimer);
    }, duration);
    return () => clearTimeout(hideTimer);
  }, [duration, onClose]);

  return (
    <div
      className={`flex justify-center items-center gap-1 bg-white rounded-full border px-3 py-2 shadow-sm transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${variantsStyles[variant]} ${sizeStyles[size]}`}
    >
      {icons[variant]}
      <span className="text-sm font-normal">{message}</span>
    </div>
  );
}
