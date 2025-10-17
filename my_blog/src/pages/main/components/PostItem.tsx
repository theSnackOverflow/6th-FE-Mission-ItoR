import { useNavigate } from 'react-router-dom';

import { PostWriter } from './PostWriter';
import Text from '../../../components/Text';

interface postItemProps {
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
}: postItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${postId}`);
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
      {imgSrc && (
        <div className="h-full bg-white">
          <div className="w-30 h-30 px-4 py-3">
            <img src={imgSrc || '/public/2ssac.svg'} className="object-fill" />
          </div>
        </div>
      )}
    </article>
  );
};

export { PostItem };
