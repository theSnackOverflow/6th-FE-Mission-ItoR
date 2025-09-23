import React from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText: string;
  cancelText: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  description,
  onCancel,
  onConfirm,
  confirmText,
  cancelText,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-sm shadow-[0_2px_8px_0_rgba(0,0,0,0.1)] w-[326px] flex flex-col items-start gap-6 px-4 pt-6 pb-4">
        <h2 className="text-sm font-normal mb-2 whitespace-pre-line">
          {title}
        </h2>
        {description && (
          <p className="mb-6 text-xs font-normal text-[#909090] whitespace-pre-line">
            {description}
          </p>
        )}
        <div className="w-full flex justify-between gap-3 text-sm font-normal">
          <button
            className="w-full h-[38px] px-3 py-2 border-[1px] border-[#F5F5F5] rounded-xs bg-white hover:bg-gray-100"
            onClick={onCancel}
            type="button"
          >
            {cancelText}
          </button>
          <button
            className="w-full h-[38px] px-3 py-2 rounded-xs bg-[#FF3F3F] text-white hover:bg-red-600"
            onClick={onConfirm}
            type="button"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
