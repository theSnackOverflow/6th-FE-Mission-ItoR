import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

import { PostWriter } from './PostWriter';
import Text from '@/components/Text';

import defaultImage from '@/assets/2ssac.svg';

interface PostItemProps {
  postId: string;
  title: string;
  nickName: string;
  profileUrl: string;
  createdAt: string;
  commentCount: number;
  imgSrc?: string;
}

const PostItem = ({
  postId,
  title,
  nickName,
  profileUrl,
  createdAt,
  commentCount,
  imgSrc,
}: PostItemProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleClick = () => {
    if (isAuthenticated) {
      navigate(`/post/${postId}`);
      return;
    }

    // not authenticated: request login modal and remember redirect
    try {
      sessionStorage.setItem('auth_redirect', `/post/${postId}`);
    } catch (e) {
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
          mainText="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt hic et, veniam reprehenderit magnam voluptatum omnis placeat. Praesentium, necessitatibus, voluptatum cupiditate nobis magnam iste, nihil tenetur quos reiciendis perferendis molestiae!"
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
          <img src={imgSrc || defaultImage} className="object-fill" />
        </div>
      </div>
    </article>
  );
};

export { PostItem };
