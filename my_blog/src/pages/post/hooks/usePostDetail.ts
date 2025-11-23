import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById, deletePost } from '@/api/postAPI';
import type { Post, Comment } from '@/types/post';
import { useToast } from '@/context/ToastContext';

export const usePostDetail = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { showToast } = useToast();

  const [showDeletePostModal, setShowDeletePostModal] = useState<boolean>(false);
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState<boolean>(false);
  const [targetCommentId, setTargetCommentId] = useState<number | null>(null);

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!postId) return;
    setLoading(true);
    getPostById(postId)
      .then((data) => {
        setPost(data);
        setComments(data?.comments || []);
      })
      .catch((error) => {
        console.error('Failed to fetch post:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [postId]);

  const handleDeletePost = async () => {
    try {
      if (!postId) throw new Error('Post ID not found');
      await deletePost(postId);
      setShowDeletePostModal(false);
      showToast({
        variant: 'success',
        message: '삭제가 완료되었습니다!',
      });
      navigate('/', { state: { showSuccess: true } });
    } catch (error) {
      console.error('Failed to delete post:', error);
      setShowDeletePostModal(false);
      showToast({
        variant: 'error',
        message: '삭제 중 오류가 발생했습니다.',
      });
    }
  };

  const handleDeleteComment = (commentId: number) => {
    setComments((prev) => prev.filter((c) => c.commentId !== commentId));
    setShowDeleteCommentModal(false);
    setTargetCommentId(null);
    showToast({
      variant: 'success',
      message: '삭제가 완료되었습니다!',
    });
  };

  const openDeletePostModal = () => setShowDeletePostModal(true);
  const closeDeletePostModal = () => setShowDeletePostModal(false);

  const openDeleteCommentModal = (commentId: number) => {
    setTargetCommentId(commentId);
    setShowDeleteCommentModal(true);
  };
  const closeDeleteCommentModal = () => setShowDeleteCommentModal(false);

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
