import { createContext, useContext, useState, useCallback } from 'react';
import Toast from '@/components/Toast';

type ToastVariant = 'success' | 'error';

interface ToastConfig {
  message: string;
  variant?: ToastVariant;
}

interface ToastContextType {
  showToast: (config: ToastConfig) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastConfig | null>(null);

  const showToast = useCallback((config: ToastConfig) => {
    setToast(config);
  }, []);

  const handleClose = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="fixed top-20 left-1/2 w-full flex justify-center -translate-x-1/2 z-[60]">
          <Toast
            variant={toast.variant || 'success'}
            message={toast.message}
            onClose={handleClose}
          />
        </div>
      )}
    </ToastContext.Provider>
  );
};
