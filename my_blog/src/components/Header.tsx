import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import MenuIcon from '../assets/icons/reorder.svg?react';
import PencleIcon from '../assets/icons/create.svg?react';
import CommentIcon from '../assets/icons/chat.svg?react';
import OthersIcon from '../assets/icons/more_vert.svg?react';
import AddPhotoIcon from '../assets/icons/add_photo_alternate.svg?react';
import AddFileIcon from '../assets/icons/folder_open.svg?react';

import DropdownMenu from './DropdownMenu';
import ProfileSidebar from './ProfileSidebar';

type headerType =
  | 'main'
  | 'detail'
  | 'write'
  | 'file'
  | 'edit'
  | 'edit-profile';

interface HeaderProps {
  type?: headerType;
  addImg?: boolean;
  addFile?: boolean;
  children?: React.ReactNode;
  offsetTop?: number;
  onPost?: () => void;
  onAddImage?: () => void;
  onDeleteClick?: () => void;
  onEdit?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
  onLogout?: () => void;
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
  onEdit,
  onCancel,
  onSave,
  onLogout,
}: HeaderProps) => {
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const menuItems = [
    { text: '수정하기', className: 'text-black', onClick: onEdit },
    { text: '삭제하기', className: 'text-negative', onClick: onDeleteClick },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        showDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }

      if (
        showSidebar &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setShowSidebar(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [showDropdown, showSidebar]);

  return type !== 'file' ? (
    <div className="relative">
      <nav
        className="fixed top-0 left-0 right-0 pl-3 pr-4 py-4 bg-white opacity-90 border-b border-gray-96 backdrop-blur-[2px] min-w-mobile"
        style={{ zIndex: 40, top: offsetTop }}
      >
        <div className="relative flex justify-between items-center">
          <div className="flex gap-2 justify-center items-center">
            <MenuIcon
              className="w-10 h-10 p-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowSidebar(true);
              }}
            />
            <button
              className="text-xl font-smooch font-normal"
              onClick={() => navigate('/')}
            >
              GITLOG
            </button>
          </div>

          {type === 'main' && (
            <button
              className="w-fit h-fit px-3 py-2 flex items-center gap-1 text-gray-56"
              onClick={() => navigate('/post/new')}
            >
              <PencleIcon className="w-6 h-6" />
              <p className="text-sm font-normal">깃 로그 쓰기</p>
            </button>
          )}

          {type === 'detail' && (
            <button
              ref={triggerRef}
              className="w-fit h-fit flex items-center gap-2 text-gray-20"
            >
              <CommentIcon className="w-10 h-10 p-2" />
              <OthersIcon
                className="w-10 h-10 p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown((prev) => !prev);
                }}
              />
            </button>
          )}

          {showDropdown && (
            <div ref={dropdownRef}>
              <DropdownMenu
                className={'dropdown-menu top-10 right-1.5'}
                menuItems={menuItems}
              />
            </div>
          )}

          {type === 'edit-profile' && (
            <div className="flex gap-1 items-center text-sm font-normal">
              <button className="px-3 py-2 text-negative" onClick={onCancel}>
                취소하기
              </button>
              <button className="px-3 py-2 text-black" onClick={onSave}>
                저장하기
              </button>
            </div>
          )}

          {type === 'write' && (
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
          )}
        </div>

        {children}
      </nav>

      {showSidebar && (
        <aside ref={sidebarRef} className="fixed top-0 left-0 z-50">
          <ProfileSidebar isLoggedIn={true} onLogout={onLogout} />
        </aside>
      )}
    </div>
  ) : (
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

export default Header;
