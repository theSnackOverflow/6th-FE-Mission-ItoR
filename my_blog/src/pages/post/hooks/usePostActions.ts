import { useNavigate, useParams } from 'react-router-dom';
import { deletePost } from '@/api/postAPI';
import { deleteComment } from '@/api/commentAPI';
import { useToast } from '@/context/ToastContext';
import type { Comment } from '@/types/post';

interface UsePostActionsParams {
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  closeDeletePostModal: () => void;
  closeDeleteCommentModal: () => void;
}

export const usePostActions = ({
  setComments,
  closeDeletePostModal,
  closeDeleteCommentModal,
}: UsePostActionsParams) => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { showToast } = useToast();

  const handleDeletePost = async () => {
    try {
      if (!postId) throw new Error('Post ID not found');
      await deletePost(postId);
      closeDeletePostModal();
      showToast({
        variant: 'success',
        message: '삭제가 완료되었습니다!',
      });
      navigate('/', { state: { showSuccess: true } });
    } catch (error) {
      console.error('Failed to delete post:', error);
      closeDeletePostModal();
      showToast({
        variant: 'error',
        message: '삭제 중 오류가 발생했습니다.',
      });
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      // call API to delete comment on server
      await deleteComment(commentId);
      // update local state after successful server deletion
      setComments((prev) => prev.filter((c) => c.commentId !== commentId));
      closeDeleteCommentModal();
      showToast({
        variant: 'success',
        message: '삭제가 완료되었습니다!',
      });
    } catch (error) {
      console.error('Failed to delete comment:', error);
      closeDeleteCommentModal();
      showToast({
        variant: 'error',
        message: '댓글 삭제 중 오류가 발생했습니다.',
      });
    }
  };

  return {
    handleDeletePost,
    handleDeleteComment,
  };
};
