import { useEffect, useState, useRef } from 'react';

import Blank from '../../../components/Blank';
import ProfileImage from '../../../components/ProfileImage';
import useFormatCreatedAt from '../../../hooks/useFormatCreatedAt';
import MenuIcon from '../../../assets/icons/more_vert.svg?react';
import DropdownMenu from '../../../components/DropdownMenu';

export interface CommentItemProps {
  commentId?: number;
  content?: string;
  nickName?: string;
  profileUrl?: string;
  createdAt: string;
  isOwner?: boolean;
  onDelete: (commentId?: number) => void;
}

const CommentItem = ({
  commentId,
  content,
  nickName,
  profileUrl,
  createdAt,
  onDelete,
}: CommentItemProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleDeleteComment = () => {
    onDelete(commentId);
    setShowDropdown(false);
  };

  const menuItems = [
    {
      text: '삭제하기',
      className: 'text-negative',
      onClick: handleDeleteComment,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        triggerRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <article
      key={commentId}
      className="relative w-full max-w-[688px] min-w-mobile flex flex-col justify-center"
    >
      <section className="pl-4 py-3 flex items-center">
        <div className="flex gap-2.5 flex-1">
          <div>
            <ProfileImage src={profileUrl} size="xs" />
            {/* 닉네임 */}
          </div>
          <div className="flex flex-col ">
            <p className="text-sm font-normal text-gray-20">{nickName}</p>
            <p className="text-xs font-light text-gray-56">
              {useFormatCreatedAt(createdAt)}
            </p>
          </div>
        </div>
        <button
          ref={triggerRef}
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown((prev) => !prev);
          }}
          className="w-10 h-10 p-2"
        >
          <MenuIcon className="others-icon text-gray-20" />
        </button>
      </section>
      <div className="ml-[26px] px-4 py-3 text-sm font-light text-gray-20 whitespace-pre-line leading-[160%]">
        {content}
      </div>

      <Blank variant="20" />
      {/* 드롭다운 */}
      {showDropdown && (
        <div ref={dropdownRef} className="dropdown-menu">
          <DropdownMenu className={'top-13 right-1.5'} menuItems={menuItems} />
        </div>
      )}
    </article>
  );
};
export default CommentItem;
