import ModalButton from './Button/ModalButton';

interface ModalProps {
  type?: string;
  title: string;
  des?: string;
  onClose: () => void; //! 필요한가?
  onDelete?: () => void; //! 필요한가?
  onLogout?: () => void;
}

const Modal = ({
  type,
  title,
  des,
  onClose,
  onDelete,
  onLogout,
}: ModalProps) => {
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
          <ModalButton text="취소" variant="CANCEL" onClick={onClose} />
          {type === 'logout' ? (
            <ModalButton text="로그아웃" variant="LOGOUT" onClick={onLogout} />
          ) : (
            <ModalButton text="삭제하기" variant="DELETE" onClick={onDelete} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Modal;
