import axiosInstance from './axiosInstance';

export const getPostById = async (postId: number) => {
  const response = await axiosInstance.get('/posts', { params: { postId } });
  return response.data.data;
};
