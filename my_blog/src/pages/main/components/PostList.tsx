import { useState, useEffect } from 'react';

import Blank from '@/components/Blank';
import Pagination from '@/components/Pagination/Pagination';
import { PostItem } from './PostItem';
import { getAllPosts } from '@/api/postAPI';
import type { Post } from '@/types/post';

const ITEMS_PER_PAGE = 10;

const PostList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [pageMax, setPageMax] = useState(1);

  useEffect(() => {
    getAllPosts(currentPage, ITEMS_PER_PAGE).then((data) => {
      setPosts(data.posts);
      setPageMax(data.pageMax);
    });
  }, [currentPage]);

  return (
    <section className="w-full max-w-[688px] min-w-mobile h-fit flex flex-col justify-between">
      <div>
        <Blank />
        {posts.map((post: Post) => (
          <PostItem
            key={post.postId}
            {...post}
            commentCount={
              Array.isArray(post.comments) ? post.comments.length : 0
            }
          />
        ))}
        <Blank variant="20" />
      </div>
      <div>
        <Pagination
          totalPages={pageMax}
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
