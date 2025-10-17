import { useState } from 'react';
import Blank from '../../../components/Blank';
import Pagination from '../../../components/Pagination/Pagination';
import { PostItem } from './PostItem';

import { mockData } from './mockData';

const ITEMS_PER_PAGE = 10;

const PostList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(mockData.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPosts = mockData.slice(startIndex, endIndex);

  return (
    <section className="w-full max-w-[688px] min-w-mobile h-fit flex flex-col justify-between">
      <div>
        <Blank />
        {currentPosts.map((post) => (
          <PostItem
            key={post.postId}
            {...post}
            commentCount={post.comments?.length || 0}
          />
        ))}
        <Blank variant="20" />
      </div>
      <div className="">
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
