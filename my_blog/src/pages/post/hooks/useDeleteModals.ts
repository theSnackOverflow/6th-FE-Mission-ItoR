import { useState } from 'react';

export const useDeleteModals = () => {
  const [showDeletePostModal, setShowDeletePostModal] = useState<boolean>(false);
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState<boolean>(false);
  const [targetCommentId, setTargetCommentId] = useState<number | null>(null);

  const openDeletePostModal = () => setShowDeletePostModal(true);
  const closeDeletePostModal = () => setShowDeletePostModal(false);

  const openDeleteCommentModal = (commentId: number) => {
    setTargetCommentId(commentId);
    setShowDeleteCommentModal(true);
  };
  const closeDeleteCommentModal = () => {
    setShowDeleteCommentModal(false);
    setTargetCommentId(null);
  };

  return {
    showDeletePostModal,
    showDeleteCommentModal,
    targetCommentId,
    openDeletePostModal,
    closeDeletePostModal,
    openDeleteCommentModal,
    closeDeleteCommentModal,
  };
};
