import axiosInstance from './axiosInstance';

// 토큰 없이 게시물 조회
export const getPostById = async (postId: string) => {
  const response = await axiosInstance.get('/posts', { params: { postId } });
  return response.data.data;
};

// 토큰으로 게시물 조회
export const getPostByToken = async (postId: string) => {
  const response = await axiosInstance.get('/posts/token', {
    params: { postId },
  });
  return response.data.data;
};

// 게시물 생성
export const createPost = async (postData: {
  title: string;
  contents: {
    contentOrder: number;
    content: string;
    contentType: 'TEXT' | 'IMAGE';
  }[];
}) => {
  const response = await axiosInstance.post('/posts', postData);
  return response.data;
};

// 게시물 삭제
export const deletePost = async (postId: string) => {
  const response = await axiosInstance.delete('/posts', { params: { postId } });
  return response.data;
};

// 게시물 수정
export const updatePost = async (
  postId: string,
  postData: {
    title: string;
    contents: {
      contentOrder: number;
      content: string;
      contentType: 'TEXT' | 'IMAGE';
    }[];
  },
) => {
  const response = await axiosInstance.patch('/posts', postData, {
    params: { postId },
  });
  return response.data;
};

// 게시물 리스트 조회
export const getAllPosts = async (page: number, size: number) => {
  const response = await axiosInstance.get('/posts/all', {
    params: { page, size },
  });
  return response.data.data;
};

export const getAllPostsWithToken = async (page: number, size: number) => {
  const response = await axiosInstance.get('/posts/all/token', {
    params: { page, size },
  });
  return response.data.data;
};
