import axiosInstance from './axiosInstance';

export const createComment = async (postId: string, content: string) => {
  const response = await axiosInstance.post(`/comments/${postId}`, { content });
  return response.data;
};
