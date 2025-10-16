import { useNavigate } from 'react-router-dom';
import MenuIcon from '../assets/icons/reorder.svg?react';
import PencleIcon from '../assets/icons/create.svg?react';
import CommentIcon from '../assets/icons/chat.svg?react';
import OthersIcon from '../assets/icons/more_vert.svg?react';
import AddPhotoIcon from '../assets/icons/add_photo_alternate.svg?react';
import AddFileIcon from '../assets/icons/folder_open.svg?react';

type headerType = 'main' | 'detail' | 'write' | 'file';

interface HeaderProps {
  type?: headerType;
}

const Header = ({ type }: HeaderProps) => {
  const navigate = useNavigate();

  return type !== 'file' ? (
    <header className="w-[1366px] h-fit px-3 py-4 bg-white opacity-90 border-b border-gray-96 backdrop-blur-[2px]">
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center ">
          <MenuIcon
            className="w-10 h-10 p-2 cursor-pointer"
            onClick={() => {}}
          />
          <button
            className="text-xl font-smooch font-normal "
            onClick={() => {
              navigate('/');
            }}
          >
            GITLOG
          </button>
        </div>
        {type === 'main' && (
          <button
            className="w-fit h-fit px-3 py-2 flex items-center gap-1  text-gray-56 "
            onClick={() => {}}
          >
            <PencleIcon className="w-6 h-6" />
            <p className="text-sm font-normal">깃 로그 쓰기</p>
          </button>
        )}
        {type === 'detail' && (
          <button
            className="w-fit h-fit flex items-center gap-2 text-gray-20"
            onClick={() => {}}
          >
            <CommentIcon className="w-10 h-10 p-2" onClick={() => {}} />
            <OthersIcon className="w-10 h-10 p-2" onClick={() => {}} />
          </button>
        )}
        {type === 'write' && (
          <button className="w-fit h-fit flex items-center" onClick={() => {}}>
            <button
              className="w-[76px] h-fit px-3 py-2 text-sm font-normal text-negative "
              onClick={() => {}}
            >
              삭제하기
            </button>
            <button
              className="w-[76px] h-fit px-3 py-2 text-sm font-normal text-black"
              onClick={() => {}}
            >
              게시하기
            </button>
          </button>
        )}
      </div>
    </header>
  ) : (
    <header className="w-[1366px] h-fit px-4 py-3 flex justify-center items-center bg-white opacity-90 border-b border-gray-96 backdrop-blur-[2px]">
      <div className="flex gap-8">
        <button
          className="px-2 pt-0.5 pb-1 flex items-center gap-1 text-gray-56"
          onClick={() => {}}
        >
          <AddPhotoIcon className="w-3.5 h-3.5" />
          <p className="font-normal text-xs">사진 추가하기</p>
        </button>
        <button
          className="px-2 pt-0.5 pb-1 flex justify-center items-center gap-1 text-gray-56"
          onClick={() => {}}
        >
          <AddFileIcon className="w-3.5 h-3.5" />
          <p className="font-normal text-xs">파일 추가하기</p>
        </button>
      </div>
    </header>
  );
};

export default Header;
