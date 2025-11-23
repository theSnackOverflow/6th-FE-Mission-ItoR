import AddPhotoIcon from '../../assets/icons/add_photo_alternate.svg?react';
import AddFileIcon from '../../assets/icons/folder_open.svg?react';

interface FileHeaderProps {
  addImg?: boolean;
  addFile?: boolean;
  children?: React.ReactNode;
  offsetTop?: number;
  onAddImage?: () => void;
}

const FileHeader = ({
  addImg,
  addFile,
  children,
  offsetTop = 0,
  onAddImage,
}: FileHeaderProps) => {
  return (
    <nav
      className="fixed top-0 left-0 right-0 w-full h-fit px-4 py-3 flex justify-center items-center bg-white opacity-90 backdrop-blur-[2px] z-40"
      style={{ top: offsetTop }}
    >
      <div className="flex gap-8">
        {addImg && (
          <button
            className="px-2 pt-0.5 pb-1 flex items-center gap-1 text-gray-56"
            onClick={onAddImage}
          >
            <AddPhotoIcon className="w-3.5 h-3.5" />
            <p className="font-normal text-xs">사진 추가하기</p>
          </button>
        )}
        {addFile && (
          <button className="px-2 pt-0.5 pb-1 flex items-center gap-1 text-gray-56">
            <AddFileIcon className="w-3.5 h-3.5" />
            <p className="font-normal text-xs">파일 추가하기</p>
          </button>
        )}
      </div>
      {children}
    </nav>
  );
};

export default FileHeader;
