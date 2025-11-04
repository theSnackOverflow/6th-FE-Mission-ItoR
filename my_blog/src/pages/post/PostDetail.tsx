import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Blank from '../../components/Blank';
import Text from '../../components/Text';
import { PostWriter } from '../main/components/PostWriter';
import Header from '../../components/Header';
import Devider from '../../components/Devider';
import CommentSection from './components/CommentSection';
import ProfileSection from '../../components/ProfileSection';
import ModalWrapper from '../../components/Modal/ModalWrapper';
import Modal from '../../components/Modal/Modal';

import Toast from '../../components/Toast';

import { getPostById, deletePost } from '@/api/postAPI';
import type { Post, Comment } from '@/types/post';

const PostDetail = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const [showDeletePostModal, setShowDeletePostModal] =
    useState<boolean>(false);
  const [showDeleteCommentModal, setShowDeleteCommentModal] =
    useState<boolean>(false);
  const [targetCommentId, setTargetCommentId] = useState<number | null>(null);

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [showToast, setShowToast] = useState(false);

  // todo 현재 로컬 상태(useState) 관리 -> 새로고침하면 파일 변화 X
  // todo 추후 api 연동할 때, zustand로 전역 상태 관리 예정

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
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
      navigate('/', { state: { showSuccess: true } });
    } catch (error) {
      console.error('Failed to delete post:', error);
      setShowDeletePostModal(false);
      setShowToast(true);
      // Optionally, you can show a different message for error
      // For now, reuse the success toast for simplicity
      setTimeout(() => setShowToast(false), 2500);
    }
  };

  const handleDeleteComment = (commentId: number) => {
    setComments((prev) => prev.filter((c) => c.commentId !== commentId));
    setShowDeleteCommentModal(false);
    setTargetCommentId(null);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <>
      {showToast && (
        <div className="fixed top-20 left-1/2 w-full flex justify-center -translate-x-1/2 z-[9999]">
          <Toast
            variant="success"
            message="삭제가 완료되었습니다!"
            onClose={() => setShowToast(false)}
          />
        </div>
      )}
      <Header
        type="detail"
        onDeleteClick={() => setShowDeletePostModal(true)}
      />
      <div className="mt-16  h-fit flex flex-col justify-center">
        <main className="w-full h-full flex justify-center">
          {!post ? (
            <article className="w-full h-fit flex justify-center py-10">
              <button
                className="mt-20 font-roboto flex flex-col items-center gap-5 text-gray-56"
                onClick={() => {
                  navigate('/');
                }}
              >
                <p className="text-4xl">404 ERROR</p>
                <p className="text-6xl">Not Found!</p>
              </button>
            </article>
          ) : (
            <article className="w-full max-w-[688px] min-w-mobile h-fit flex flex-col justify-between">
              <Blank variant="64" />
              {/* 제목 */}
              <header className="py-3">
                <Text titleVariant="32" title={post.title} />
                <Blank variant="32" />
                <PostWriter
                  nickName={post.nickName}
                  profileUrl={post.profileUrl}
                  createdAt={post.createdAt}
                  commentCount={comments.length || 0}
                />
              </header>
              {/* 내용 */}
              <article className="w-full max-w-[688px] min-w-mobile h-fit flex flex-col">
                <Blank variant="20" />

                {post.contents?.map((item) => {
                  if (item.contentType === 'TEXT') {
                    return (
                      <p
                        key={item.contentOrder}
                        className="min-w-mobile px-4 py-3 text-sm font-light text-gray-20 leading-[160%] whitespace-pre-line"
                      >
                        {item.content}
                      </p>
                    );
                  }
                  if (item.contentType === 'IMAGE') {
                    return (
                      <img
                        key={item.contentOrder}
                        src={item.content}
                        alt={`post-image-${item.contentOrder}`}
                        className="min-w-mobile px-4 py-3 w-full h-full"
                      />
                    );
                  }
                })}

                <Blank variant="20" />
              </article>
            </article>
          )}
        </main>

        <div className="w-full flex flex-col justify-center">
          <Devider />
          {/* 댓글 */}
          {post && (
            <CommentSection
              comments={comments}
              commentCount={comments.length}
              onDeleteComment={(commentId) => {
                setTargetCommentId(commentId);
                setShowDeleteCommentModal(true);
              }}
            />
          )}

          <ProfileSection />
        </div>
      </div>
      {showDeletePostModal && (
        <ModalWrapper
          isOpen={showDeletePostModal}
          onClose={() => setShowDeletePostModal(false)}
        >
          <Modal
            type="delete"
            color="delete"
            title={'해당 블로그를 삭제하시겠어요?'}
            des={'삭제된 블로그는 다시 확인할 수 없어요.'}
            onDelete={handleDeletePost}
            onClose={() => setShowDeletePostModal(false)}
          />
        </ModalWrapper>
      )}
      {showDeleteCommentModal && (
        <ModalWrapper
          isOpen={showDeleteCommentModal}
          onClose={() => setShowDeleteCommentModal(false)}
        >
          <Modal
            type="delete"
            color="delete"
            title={'댓글을 삭제하시겠어요?'}
            onDelete={() => {
              if (targetCommentId !== null)
                handleDeleteComment(targetCommentId);
            }}
            onClose={() => setShowDeleteCommentModal(false)}
          />
        </ModalWrapper>
      )}
    </>
  );
};

export default PostDetail;
