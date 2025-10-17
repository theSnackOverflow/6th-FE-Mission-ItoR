import { useNavigate, useParams } from 'react-router-dom';
import { mockData } from '../main/components/mockData';

import Blank from '../../components/Blank';
import Text from '../../components/Text';
import { PostWriter } from '../main/components/PostWriter';
import Header from '../../components/Header';
import Devider from '../../components/Devider';
import CommentSection from './components/CommentSection';

const PostDetail = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const post = mockData.find((item) => item.postId === postId);
  return (
    <>
      <Header type="detail" />
      <main className="w-full flex justify-center">
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
                commentCount={post.commentCount}
              />
            </header>
            {/* 내용 */}
            <article></article>
          </article>
        )}
        {/* 댓글 */}
      </main>
      <Devider />
      {post && <CommentSection commentCount={post.commentCount} />}
    </>
  );
};

export default PostDetail;
