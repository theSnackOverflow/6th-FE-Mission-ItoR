import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, type QueryObserverResult } from '@tanstack/react-query';
import { getPostById } from '@/api/postAPI';
import type { Post, Comment } from '@/types/post';

export const usePostData = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState<Comment[]>([]);

  const {
    data: post,
    isLoading: loading,
    refetch,
  } = useQuery<Post>({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId!),
    enabled: !!postId,
  });

  // post 데이터가 변경될 때 comments 상태 동기화
  useEffect(() => {
    if (post?.comments) {
      setComments(post.comments);
    }
  }, [post]);

  return {
    post: post || null,
    comments,
    loading,
    setComments,
    // expose refetch so consumers can trigger a refresh after mutations
    refresh: () => refetch() as Promise<QueryObserverResult<Post | undefined>>,
  };
};
