import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { updateComment } from '@/api/commentAPI';

import Blank from '@/components/Blank';
import ProfileImage from '@/components/ProfileImage';
import useFormatCreatedAt from '@/hooks/useFormatCreatedAt';
import MenuIcon from '@/assets/icons/more_vert.svg?react';
import DropdownMenu from '@/components/DropdownMenu';

export interface CommentItemProps {
  commentId: number;
  content?: string;
  nickName?: string;
  profileUrl?: string;
  createdAt: string;
  isOwner?: boolean;
  authorId?: number | string;
  onDelete: (commentId?: number) => void;
  onRefresh?: () => void;
}

const CommentItem = ({
  commentId,
  content,
  nickName,
  profileUrl,
  createdAt,
  isOwner,
  authorId,
  onDelete,
  onRefresh,
}: CommentItemProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(content || '');
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const formattedDate = useFormatCreatedAt(createdAt);
  const { user } = useAuth();

  const ownerFromServer =
    isOwner === true || String(isOwner) === 'true' || Number(isOwner) === 1;
  const ownerFromAuthorId =
    authorId != null &&
    user?.memberId != null &&
    String(authorId) === String(user.memberId);

  const owner =
    ownerFromServer ||
    ownerFromAuthorId ||
    (user?.nickName && nickName ? user.nickName === nickName : false);

  console.debug('[CommentItem] ownership', {
    commentId,
    isOwner,
    ownerFromServer,
    owner,
    userNick: user?.nickName,
    commentNick: nickName,
  });

  const handleDeleteComment = () => {
    onDelete(commentId);
    setShowDropdown(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setShowDropdown(false);
  };

  const handleUpdateComment = async () => {
    console.debug('[CommentItem] update start', { commentId, editContent });
    try {
      const res = await updateComment(commentId, editContent);

      console.debug('[CommentItem] update success', res);
      setIsEditing(false);
      onRefresh?.();
    } catch (error) {
      console.error('[CommentItem] 댓글 수정 실패:', error);
      onRefresh?.();
    }
  };

  const menuItems = [
    {
      text: '수정하기',
      onClick: handleEditClick,
    },
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
          </div>
          <div className="flex flex-col ">
            <p className="text-sm font-normal text-gray-20">{nickName}</p>
            <p className="text-xs font-light text-gray-56">{formattedDate}</p>
          </div>
        </div>
        <button
          ref={triggerRef}
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown((prev) => !prev);
          }}
          aria-haspopup="menu"
          aria-expanded={showDropdown}
          className="w-10 h-10 p-2"
        >
          <MenuIcon className="others-icon text-gray-20" />
        </button>
      </section>
      <div className="ml-[26px] px-4 py-3 text-sm font-light text-gray-20 whitespace-pre-line leading-[160%]">
        {isEditing ? (
          <>
            <textarea
              className="w-full border border-gray-300 rounded p-2 resize-none"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={4}
            />
            <div className="mt-2 flex gap-2">
              <button
                onClick={handleUpdateComment}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                저장
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                취소
              </button>
            </div>
          </>
        ) : (
          content
        )}
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
