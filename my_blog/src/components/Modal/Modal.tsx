import ModalButton, { type ModalButtonVariant } from '../Button/ModalButton';

type modalVariant = 'delete' | 'login' | 'logout' | 'signup';
type buttonColorVariant = 'delete' | 'auth';

const textMap: Record<modalVariant, string> = {
  delete: '삭제하기',
  login: '로그인하기',
  logout: '로그아웃',
  signup: '회원가입 하기',
};

const buttonColorMap: Record<buttonColorVariant, ModalButtonVariant> = {
  delete: 'DELETE',
  auth: 'AUTH',
};

interface ModalProps {
  type: modalVariant;
  title: string;
  color: buttonColorVariant;
  des?: string;
  onClose: () => void;
  onDelete?: () => void;
  onSignUp?: () => void;
  onLogin?: () => void;
  onLogout?: () => void;
}

const Modal = ({
  type,
  title,
  color,
  des,
  onClose,
  onDelete,
  onSignUp,
  onLogin,
  onLogout,
}: ModalProps) => {
  const handleConfirm = () => {
    const handlers: Record<modalVariant, (() => void) | undefined> = {
      delete: onDelete,
      logout: onLogout,
      login: onLogin,
      signup: onSignUp,
    };
    handlers[type]?.();
    onClose();
  };

  return (
    <section className="absolute z-50 w-[326px] h-fit pt-6 pb-4 px-4 bg-white rounded-sm shadow-xl">
      <div className="w-full h-full flex flex-col justify-between gap-6">
        {/* text box */}
        <div className="px-1 flex flex-col gap-2">
          {/* title */}
          <div className="text-sm font-normal leading-[160%] whitespace-pre-line">
            <div>{title}</div>
          </div>

          {/* descriptions */}
          {des && (
            <div className="text-xs text-gray-56 font-normal leading-[160%] whitespace-pre-line">
              {des}
            </div>
          )}
        </div>

        {/* buttons */}
        {/* 아직 onClick 정의 안 함 */}
        <div className="flex justify-around">
          {type === 'login' ? (
            <ModalButton text="확인" variant="CANCEL" onClick={onClose} />
          ) : (
            <ModalButton text="취소" variant="CANCEL" onClick={onClose} />
          )}
          <ModalButton
            text={textMap[type]}
            variant={buttonColorMap[color]}
            onClick={handleConfirm}
          />
        </div>
      </div>
    </section>
  );
};

export default Modal;
