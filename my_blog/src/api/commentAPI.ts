import axiosInstance from './axiosInstance';
import { axiosPrivateInstance } from './axiosInstance';

// 댓글 생성
export const createComment = async (postId: string, content: string) => {
  const response = await axiosInstance.post(`/comments/${postId}`, { content });
  return response.data;
};

// 댓글 삭제
export const deleteComment = async (commentId: number) => {
  try {
    const res = await axiosPrivateInstance.delete(`/comments/${commentId}`);
    return res.data;
  } catch (error) {
    console.error('Failed to delete comment:', error);
    throw error;
  }
};

// 댓글 수정

export const updateComment = async (commentId: number, content: string) => {
  try {
    const res = await axiosPrivateInstance.patch(`/comments/${commentId}`, {
      content,
    });
    return res.data;
  } catch (error) {
    console.error('Failed to update comment:', error);
    throw error;
  }
};
