import BaseHeader from './BaseHeader';

interface EditProfileHeaderProps {
  offsetTop?: number;
  onLogout?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
}

const EditProfileHeader = ({
  offsetTop,
  onLogout,
  onCancel,
  onSave,
}: EditProfileHeaderProps) => {
  return (
    <BaseHeader offsetTop={offsetTop} onLogout={onLogout}>
      <div className="flex gap-1 items-center text-sm font-normal">
        <button
          type="button"
          className="px-3 py-2 text-negative"
          onClick={() => {
            console.log('[EditProfileHeader] 취소 클릭');
            onCancel?.();
          }}
        >
          취소하기
        </button>
        <button
          type="button"
          className="px-3 py-2 text-black"
          onClick={() => {
            console.log('[EditProfileHeader] 저장 클릭');
            onSave?.();
          }}
        >
          저장하기
        </button>
      </div>
    </BaseHeader>
  );
};

export default EditProfileHeader;
