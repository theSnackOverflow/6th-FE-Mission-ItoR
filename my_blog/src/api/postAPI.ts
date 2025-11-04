import axiosInstance from './axiosInstance';

// 토큰 없이 게시물 조회
export const getPostById = async (postId: number) => {
  const response = await axiosInstance.get('/posts', { params: { postId } });
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
