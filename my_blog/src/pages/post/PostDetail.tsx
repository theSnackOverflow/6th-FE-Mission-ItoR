import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Blank from '../../components/Blank';
import Text from '../../components/Text';
import { PostWriter } from '../main/components/PostWriter';
import Header from '../../components/Header';
import Devider from '../../components/Devider';
import CommentSection from './components/CommentSection';
import Footer from '../../components/Footer';
import ModalWrapper from '../../components/ModalWrapper';

import { mockData } from '../../const/mockData';
import Modal from '../../components/Modal';

const PostDetail = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const [showDeletePostModal, setShowDeletePostModal] =
    useState<boolean>(false);
  const [showDeleteCommentModal, setShowDeleteCommentModal] =
    useState<boolean>(false);
  const [targetCommentId, setTargetCommentId] = useState<number | null>(null);

  const [posts, setPosts] = useState(mockData);

  const post = posts.find((item) => item.postId === postId);

  const [comments, setComments] = useState(post?.comments || []);

  // todo 현재 로컬 상태(useState) 관리 -> 새로고침하면 파일 변화 X
  // todo 추후 api 연동할 때, zustand로 전역 상태 관리 예정

  const handleDeletePost = () => {
    const updatedPosts = posts.filter((item) => item.postId !== postId);
    setPosts(updatedPosts);
    setShowDeletePostModal(false);
    navigate('/', { state: { showSuccess: true } });
  };

  const handleDeleteComment = (commentId: number) => {
    setComments((prev) => prev.filter((c) => c.commentId !== commentId));
    setShowDeleteCommentModal(false);
    setTargetCommentId(null);
  };

  return (
    <>
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
                  commentCount={post.commentCount || 0}
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
              commentCount={post?.commentCount}
              onDeleteComment={(commentId) => {
                setTargetCommentId(commentId);
                setShowDeleteCommentModal(true);
              }}
            />
          )}

          <Footer />
        </div>
      </div>
      {showDeletePostModal && (
        <ModalWrapper
          isOpen={showDeletePostModal}
          onClose={() => setShowDeletePostModal(false)}
        >
          <Modal
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
