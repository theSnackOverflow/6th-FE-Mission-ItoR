import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

import { PostWriter } from './PostWriter';
import Text from '@/components/Text';

import defaultImage from '@/assets/2ssac.svg';
import type { PostContent } from '@/types/post';

interface PostItemProps {
  postId: string;
  title: string;
  nickName: string;
  profileUrl: string;
  createdAt: string;
  commentCount?: number;
  imgSrc?: string;
  contents?: PostContent[];
  introduction?: string;
}

const PostItem = ({
  postId,
  title,
  nickName,
  profileUrl,
  createdAt,
  commentCount = 0,
  imgSrc,
  contents,
  introduction,
}: PostItemProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleClick = () => {
    if (isAuthenticated) {
      navigate(`/post/${postId}`);
      return;
    }

    try {
      sessionStorage.setItem('auth_redirect', `/post/${postId}`);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event('open-login-modal'));
  };
  return (
    <article
      onClick={handleClick}
      key={postId}
      className="w-full max-w-[688px] min-w-mobile min-h-[150px] py-2 flex justify-between gap-4 border-b border-gray-96 bg-white"
    >
      {/* 제목, 내용, 닉네임, 작성일, 댓글 수 */}
      <div className="cursor-pointer flex-1">
        <Text
          title={title}
          titleVariant="16"
          mainText={
            introduction ||
            (Array.isArray(contents)
              ? (contents.find((c) => c.contentType === 'TEXT')?.content ?? '')
              : '')
          }
        />
        <PostWriter
          nickName={nickName}
          profileUrl={profileUrl}
          createdAt={createdAt}
          commentCount={commentCount}
        />
      </div>
      {/* image */}
      <div className="h-full bg-white">
        <div className="w-30 h-30 px-4 py-3">
          <img
            src={
              imgSrc ||
              (Array.isArray(contents)
                ? contents.find((c) => c.contentType === 'IMAGE')?.content
                : undefined) ||
              defaultImage
            }
            className="object-fill"
          />
        </div>
      </div>
    </article>
  );
};

export { PostItem };
