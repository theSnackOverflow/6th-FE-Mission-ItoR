import ProfileImage from '../../../components/ProfileImage';
import Text from '../../../components/Text';

import formatCreatedAt from '../../../utils/formatCreatedAt';

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
  return (
    <article
      key={postId}
      className="w-full h-[150px] py-2 flex justify-between gap-4 border-b border-gray-96 bg-white"
    >
      {/* 제목, 내용, 닉네임, 작성일, 댓글 수 */}
      <div className="cursor-pointer">
        <Text
          title={title}
          titleVariant="16"
          mainText="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt hic et, veniam reprehenderit magnam voluptatum omnis placeat. Praesentium, necessitatibus, voluptatum cupiditate nobis magnam iste, nihil tenetur quos reiciendis perferendis molestiae!"
        />
        <div className="w-full px-4 py-3 flex items-center gap-1.5 text-xs leading-[160%]">
          <ProfileImage src={profileUrl} size="xs" />
          {/* 닉네임 */}
          <p className="text-gray-20 font-normal">{nickName}</p>
          <div className="flex gap-1.5 text-gray-56 font-light">
            <p>{formatCreatedAt(createdAt)}</p>
            <p>댓글</p>
            <p>{commentCount}</p>
          </div>
        </div>
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
