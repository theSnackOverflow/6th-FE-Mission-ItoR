/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

import Blank from '../../../components/Blank';
import Pagination from '../../../components/Pagination/Pagination';
import { PostItem } from './PostItem';

const ITEMS_PER_PAGE = 10;

//! 추후 api 연결 시 posts 관련 type 정의
const PostList = ({ posts }: any) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  return (
    <section className="w-full max-w-[688px] min-w-mobile h-fit flex flex-col justify-between">
      <div>
        <Blank />
        {currentPosts.map((post: any) => (
          <PostItem
            key={`${post.postId} - ${uuidv4()}`}
            {...post}
            commentCount={post.comments?.length || 0}
          />
        ))}
        <Blank variant="20" />
      </div>
      <div>
        <Pagination
          totalPages={totalPages}
          initialPage={1}
          onChange={(page) => {
            setCurrentPage(page);
          }}
        />
        <Blank variant="64" />
      </div>
    </section>
  );
};

export { PostList };
