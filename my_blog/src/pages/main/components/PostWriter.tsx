import ProfileImage from '../../../components/ProfileImage';
import useFormatCreatedAt from '../../../hooks/useFormatCreatedAt';

type postWriterProps = {
  profileUrl?: string;
  nickName: string;
  createdAt: string;
  commentCount: number | undefined;
};

const PostWriter = ({
  profileUrl,
  nickName,
  createdAt,
  commentCount,
}: postWriterProps) => {
  return (
    <section>
      <div className="w-fit h-fit px-4 py-3 flex items-center gap-1.5 text-xs leading-[160%]">
        <ProfileImage src={profileUrl} size="xs" />
        {/* 닉네임 */}
        <p className="text-gray-20 font-normal">{nickName}</p>
        <div className="flex gap-1.5 text-gray-56 font-light">
          <p>{useFormatCreatedAt(createdAt)}</p>
          <p>댓글</p>
          <p>{commentCount}</p>
        </div>
      </div>
    </section>
  );
};
export { PostWriter };
