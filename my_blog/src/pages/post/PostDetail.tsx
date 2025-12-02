import { useEffect } from 'react';
import { usePostDetail } from './hooks/usePostDetail';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/const/routes';
import { DetailHeader } from '@/components/Header';
import Devider from '@/components/Devider';
import CommentSection from './components/CommentSection';
import ProfileSection from '@/components/ProfileSection';
import PostContent from './components/PostContent';
import PostNotFound from './components/PostNotFound';
import DeleteModals from './components/DeleteModals';

const PostDetail = () => {
  const {
    post,
    comments,
    loading,
    refresh,
    setComments,
    showDeletePostModal,
    showDeleteCommentModal,
    targetCommentId,
    handleDeletePost,
    handleDeleteComment,
    openDeletePostModal,
    closeDeletePostModal,
    openDeleteCommentModal,
    closeDeleteCommentModal,
  } = usePostDetail();

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // Request login modal and remember redirect target
      try {
        const redirectTo = window.location.pathname + window.location.search;
        sessionStorage.setItem('auth_redirect', redirectTo);
      } catch (e) {
        /* ignore */
      }
      window.dispatchEvent(new Event('open-login-modal'));
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>로딩 중...</p>
      </div>
    );
  }

  const handleEdit = () => {
    if (!post) return;
    navigate(`/post/${post.postId}/edit`);
  };

  return (
    <>
      <DetailHeader onDeleteClick={openDeletePostModal} onEdit={handleEdit} />
      <div className="mt-16 h-fit flex flex-col justify-center">
        <main className="w-full h-full flex justify-center">
          {!post ? (
            <PostNotFound />
          ) : (
            <PostContent post={post} commentCount={comments.length} />
          )}
        </main>

        <div className="w-full flex flex-col justify-center">
          <Devider />
          {post && (
            <CommentSection
              comments={comments}
              commentCount={comments.length}
              onDeleteComment={openDeleteCommentModal}
              onRefreshComments={refresh}
            />
          )}
          <ProfileSection />
        </div>
      </div>

      <DeleteModals
        showDeletePostModal={showDeletePostModal}
        showDeleteCommentModal={showDeleteCommentModal}
        onDeletePost={handleDeletePost}
        onDeleteComment={() => {
          if (targetCommentId !== null) handleDeleteComment(targetCommentId);
        }}
        onClosePostModal={closeDeletePostModal}
        onCloseCommentModal={closeDeleteCommentModal}
      />
    </>
  );
};

export default PostDetail;
