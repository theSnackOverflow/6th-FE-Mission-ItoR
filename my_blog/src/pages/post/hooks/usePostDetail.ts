import { usePostData } from './usePostData';
import { useDeleteModals } from './useDeleteModals';
import { usePostActions } from './usePostActions';

export const usePostDetail = () => {
  const { post, comments, loading, setComments } = usePostData();

  const {
    showDeletePostModal,
    showDeleteCommentModal,
    targetCommentId,
    openDeletePostModal,
    closeDeletePostModal,
    openDeleteCommentModal,
    closeDeleteCommentModal,
  } = useDeleteModals();

  const { handleDeletePost, handleDeleteComment } = usePostActions({
    setComments,
    closeDeletePostModal,
    closeDeleteCommentModal,
  });

  return {
    post,
    comments,
    loading,
    showDeletePostModal,
    showDeleteCommentModal,
    targetCommentId,
    handleDeletePost,
    handleDeleteComment,
    openDeletePostModal,
    closeDeletePostModal,
    openDeleteCommentModal,
    closeDeleteCommentModal,
  };
};
