import { useState, useEffect, useRef } from 'react';

import CommentIcon from '../../assets/icons/chat.svg?react';
import OthersIcon from '../../assets/icons/more_vert.svg?react';
import BaseHeader from './BaseHeader';
import DropdownMenu from '../DropdownMenu';

interface DetailHeaderProps {
  offsetTop?: number;
  onLogout?: () => void;
  onEdit?: () => void;
  onDeleteClick?: () => void;
}

const DetailHeader = ({
  offsetTop,
  onLogout,
  onEdit,
  onDeleteClick,
}: DetailHeaderProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
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
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [showDropdown]);

  return (
    <BaseHeader offsetTop={offsetTop} onLogout={onLogout}>
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

      {showDropdown && (
        <div ref={dropdownRef}>
          <DropdownMenu
            className={'dropdown-menu top-10 right-1.5'}
            menuItems={menuItems}
          />
        </div>
      )}
    </BaseHeader>
  );
};

export default DetailHeader;
