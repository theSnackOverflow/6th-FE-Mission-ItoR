import Blank from '@/components/Blank';
import Text from '@/components/Text';
import { PostWriter } from '@/pages/main/components/PostWriter';
import type { Post } from '@/types/post';

interface PostContentProps {
  post: Post;
  commentCount: number;
}

const PostContent = ({ post, commentCount }: PostContentProps) => {
  return (
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
          commentCount={commentCount}
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
  );
};

export default PostContent;
