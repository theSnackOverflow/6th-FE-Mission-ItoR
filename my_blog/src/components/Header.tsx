import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MenuIcon from '../assets/icons/reorder.svg?react';
import PencleIcon from '../assets/icons/create.svg?react';
import CommentIcon from '../assets/icons/chat.svg?react';
import OthersIcon from '../assets/icons/more_vert.svg?react';
import AddPhotoIcon from '../assets/icons/add_photo_alternate.svg?react';

import AddFileIcon from '../assets/icons/folder_open.svg?react';
import DropdownMenu from './DropdownMenu';

type headerType = 'main' | 'detail' | 'write' | 'file';

interface HeaderProps {
  type?: headerType;
  addImg?: boolean;
  addFile?: boolean;
  children?: React.ReactNode;
  offsetTop?: number; //? 헤더 순서 지정
  onPost?: () => void;
  onAddImage?: () => void;
  onDeleteClick?: () => void;
}

const Header = ({
  type,
  addImg,
  addFile,
  children,
  offsetTop = 0,
  onAddImage,
  onPost,
  onDeleteClick,
}: HeaderProps) => {
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const menuItems = [
    { text: '수정하기', className: 'text-black', onClick: () => {} },
    {
      text: '삭제하기',
      className: 'text-negative',
      onClick: onDeleteClick,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const dropdown = document.querySelector('.dropdown-menu');
      const trigger = document.querySelector('.others-icon');
      if (
        dropdown &&
        !dropdown.contains(e.target as Node) &&
        trigger &&
        !trigger.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return type !== 'file' ? (
    <nav
      className="fixed top-0 left-0 right-0 px-3 py-4 bg-white opacity-90 border-b border-gray-96 backdrop-blur-[2px] min-w-mobile"
      style={{ zIndex: 50, top: offsetTop }}
    >
      <div className="relative flex justify-between items-center">
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
            onClick={() => {
              navigate('/post/new');
            }}
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
            <OthersIcon
              className="others-icon w-10 h-10 p-2"
              onClick={() => {
                setShowDropdown((prev) => !prev);
              }}
            />
          </button>
        )}
        {/* 드롭다운 */}
        {showDropdown && (
          <DropdownMenu
            className={'dropdown-menu top-10 right-1.5'}
            menuItems={menuItems}
          />
        )}
        {type === 'write' && (
          <div className="w-fit h-fit flex items-center">
            <button
              className="w-[76px] h-fit px-3 py-2 text-sm font-normal text-negative "
              onClick={() => {}}
            >
              삭제하기
            </button>
            <button
              className="w-[76px] h-fit px-3 py-2 text-sm font-normal text-black"
              onClick={onPost}
            >
              게시하기
            </button>
          </div>
        )}
      </div>
      {children}
    </nav>
  ) : (
    <nav
      className="fixed top-0 left-0 right-0 w-full h-fit px-4 py-3 flex justify-center items-center bg-white opacity-90 backdrop-blur-[2px]"
      style={{ zIndex: 50, top: offsetTop }}
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
          <button
            className="px-2 pt-0.5 pb-1 flex justify-center items-center gap-1 text-gray-56"
            onClick={() => {}}
          >
            <AddFileIcon className="w-3.5 h-3.5" />
            <p className="font-normal text-xs">파일 추가하기</p>
          </button>
        )}
      </div>
      {children}
    </nav>
  );
};

export default Header;
