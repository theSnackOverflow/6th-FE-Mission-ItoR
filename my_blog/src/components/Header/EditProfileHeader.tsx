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
        <button className="px-3 py-2 text-negative" onClick={onCancel}>
          취소하기
        </button>
        <button className="px-3 py-2 text-black" onClick={onSave}>
          저장하기
        </button>
      </div>
    </BaseHeader>
  );
};

export default EditProfileHeader;
