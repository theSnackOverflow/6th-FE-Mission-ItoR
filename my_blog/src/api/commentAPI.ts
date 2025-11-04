import axiosInstance from './axiosInstance';
import { axiosPrivateInstance } from '@/api/axiosInstance';

export const createComment = async (postId: string, content: string) => {
  const response = await axiosInstance.post(`/comments/${postId}`, { content });
  return response.data;
};

export const deleteComment = async (commentId: number) => {
  try {
    const res = await axiosPrivateInstance.delete(`/comments/${commentId}`);
    return res.data;
  } catch (error) {
    console.error('Failed to delete comment:', error);
    throw error;
  }
};
