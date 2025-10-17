import ProfileImage from '../../../components/ProfileImage';
import useFormatCreatedAt from '../../../hooks/useFormatCreatedAt';

type postWriterProps = {
  profileUrl?: string;
  nickName: string;
  createdAt: string;
  commentCount?: number | undefined;
  showCreatedAt?: boolean;
  showCommentCount?: boolean;
};

const PostWriter = ({
  profileUrl,
  nickName,
  createdAt,
  commentCount,
  showCreatedAt = true,
  showCommentCount = true,
}: postWriterProps) => {
  const formattedCreatedAt = useFormatCreatedAt(createdAt);

  return (
    <section>
      <div className="w-fit h-fit px-4 py-3 flex items-center gap-1.5 text-xs leading-[160%]">
        <ProfileImage src={profileUrl} size="xs" />
        {/* 닉네임 */}
        <p className="text-gray-20 font-normal">{nickName}</p>
        {showCreatedAt && <p>{formattedCreatedAt}</p>}
        {showCommentCount && (
          <div className="flex gap-1.5 text-gray-56 font-light">
            <p>댓글</p>
            <p>{commentCount}</p>
          </div>
        )}
      </div>
    </section>
  );
};
export { PostWriter };
