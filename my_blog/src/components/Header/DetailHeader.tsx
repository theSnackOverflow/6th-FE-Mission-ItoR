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
      <div className="relative flex items-center gap-2">
        <button
          aria-label="댓글로 이동"
          className="w-fit h-fit"
          onClick={(e) => {
            e.stopPropagation();
            const el = document.getElementById('comments');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        >
          <CommentIcon className="w-10 h-10 p-2" />
        </button>

        <div className="relative">
          <button
            ref={triggerRef}
            aria-haspopup="menu"
            aria-expanded={showDropdown}
            className="w-fit h-fit"
            onClick={(e) => {
              e.stopPropagation();
              setShowDropdown((prev) => !prev);
            }}
          >
            <OthersIcon className="w-10 h-10 p-2" />
          </button>

          {showDropdown && (
            <div ref={dropdownRef} className="absolute top-full right-40 z-50">
              <DropdownMenu className={'dropdown-menu'} menuItems={menuItems} />
            </div>
          )}
        </div>
      </div>
    </BaseHeader>
  );
};

export default DetailHeader;
