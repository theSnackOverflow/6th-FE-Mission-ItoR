import BaseHeader from './BaseHeader';

interface WriteHeaderProps {
  offsetTop?: number;
  onLogout?: () => void;
  onPost?: () => void;
}

const WriteHeader = ({ offsetTop, onLogout, onPost }: WriteHeaderProps) => {
  return (
    <BaseHeader offsetTop={offsetTop} onLogout={onLogout}>
      <div className="w-fit h-fit flex items-center">
        <button className="w-[76px] px-3 py-2 text-sm text-negative">
          삭제하기
        </button>
        <button
          className="w-[76px] px-3 py-2 text-sm text-black"
          onClick={onPost}
        >
          게시하기
        </button>
      </div>
    </BaseHeader>
  );
};

export default WriteHeader;
