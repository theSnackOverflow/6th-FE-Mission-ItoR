import { useState, useEffect } from 'react';
import { useToast } from '@/context/ToastContext';

import Blank from '@/components/Blank';
import Pagination from '@/components/Pagination/Pagination';
import { PostItem } from './PostItem';
import { getAllPosts } from '@/api/postAPI';
import type { Post } from '@/types/post';

const ITEMS_PER_PAGE = 10;

interface PostListProps {
  authorNickname?: string;
}

const PostList = ({ authorNickname }: PostListProps) => {
  const { showToast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [pageMax, setPageMax] = useState(1);
  // when authorNickname is provided we fetch a large page and filter client-side

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (authorNickname) {
          // fetch a large page to get user's posts then paginate client-side
          const data = await getAllPosts(1, 1000);
          if (!mounted) return;
          const filtered = data.posts.filter(
            (p) => p.nickName === authorNickname,
          );
          setPageMax(Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE)));
          const start = (currentPage - 1) * ITEMS_PER_PAGE;
          setPosts(filtered.slice(start, start + ITEMS_PER_PAGE));
        } else {
          const data = await getAllPosts(currentPage, ITEMS_PER_PAGE);
          if (!mounted) return;
          setPosts(data.posts);
          setPageMax(data.pageMax);
        }
      } catch {
        showToast?.({
          variant: 'error',
          message: '게시물을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
        });
      }
    })();

    return () => {
      mounted = false;
    };
  }, [currentPage, showToast, authorNickname]);

  return (
    <section className="w-full max-w-[688px] min-w-mobile h-fit flex flex-col justify-between">
      <div>
        <Blank />
        {posts.map((post: Post) => (
          <PostItem
            key={post.postId}
            {...post}
            commentCount={
              typeof post.commentCount === 'number'
                ? post.commentCount
                : Array.isArray(post.comments)
                  ? post.comments.length
                  : 0
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
