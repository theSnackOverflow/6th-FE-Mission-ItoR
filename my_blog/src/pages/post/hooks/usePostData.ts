import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '@/api/postAPI';
import type { Post, Comment } from '@/types/post';

export const usePostData = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!postId) return;
    setLoading(true);
    getPostById(postId)
      .then((data) => {
        setPost(data);
        setComments(data?.comments || []);
      })
      .catch((error) => {
        console.error('Failed to fetch post:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [postId]);

  return {
    post,
    comments,
    loading,
    setComments,
  };
};
