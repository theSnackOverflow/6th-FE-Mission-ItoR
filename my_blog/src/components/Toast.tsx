import { useEffect } from 'react';
import successIcon from '../assets/components/toast/success.png';
import errorIcon from '../assets/components/toast/error.png';

type ToastProps = {
  type?: 'success' | 'error';
  message: string;
  duration?: number;
  onClose: () => void;
};

export default function Toast({
  type = 'success',
  message,
  duration = 3000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const styles = {
    success: 'border-[#15DC5E] text-[#15DC5E]',
    error: 'border-[#FF3F3F] text-[#FF3F3F]',
  };

  const icons = {
    success: successIcon,
    error: errorIcon,
  };

  const sizeMap = {
    success: 'w-[147px] h-[40px]',
    error: 'w-[171px] h-[40px]',
  };

  return (
    <div
      className={`flex justify-center items-center gap-2 rounded-full border ${styles[type]} ${sizeMap[type]}`}
    >
      <img src={icons[type]} alt={type} className="w-6 h-6" />
      <span className="text-sm font-normal">{message}</span>
    </div>
  );
}
