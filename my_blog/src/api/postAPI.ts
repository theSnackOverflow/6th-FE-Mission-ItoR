import axiosInstance, { axiosPrivateInstance } from './axiosInstance';
import type { Post, PostData } from '@/types/post';

// 공통 응답 데이터 추출 함수
const extractData = <T>(response: { data: { data: T } }): T => {
  return response.data.data;
};

// 토큰 없이 게시물 조회
export const getPostById = async (postId: string): Promise<Post> => {
  const response = await axiosInstance.get('/posts', { params: { postId } });
  return extractData<Post>(response);
};

// 토큰으로 게시물 조회 (Private - 인증 필요)
export const getPostByToken = async (postId: string): Promise<Post> => {
  const response = await axiosPrivateInstance.get('/posts/token', {
    params: { postId },
  });
  return extractData<Post>(response);
};

// 게시물 생성 (Private - 인증 필요)
export const createPost = async (postData: PostData) => {
  const response = await axiosPrivateInstance.post('/posts', postData);
  return response.data;
};

// 게시물 삭제 (Private - 인증 필요)
export const deletePost = async (postId: string) => {
  const response = await axiosPrivateInstance.delete('/posts', {
    params: { postId },
  });
  return response.data;
};

// 게시물 수정 (Private - 인증 필요)
export const updatePost = async (postId: string, postData: PostData) => {
  const response = await axiosPrivateInstance.patch('/posts', postData, {
    params: { postId },
  });
  return response.data;
};

/**
 * 게시물 리스트 조회 (Public)
 * @param page 페이지 번호 (기본값: 1)
 * @param size 페이지당 항목 수 (기본값: 10, 스웨거 기준)
 */
export const getAllPosts = async (page: number, size: number) => {
  const response = await axiosInstance.get('/posts/all', {
    params: { page, size },
  });
  return extractData(response);
};

/**
 * 게시물 리스트 조회 (Private - 토큰 포함)
 * @param page 페이지 번호 (기본값: 1)
 * @param size 페이지당 항목 수 (기본값: 10, 스웨거 기준)
 */
export const getAllPostsWithToken = async (page: number, size: number) => {
  const response = await axiosPrivateInstance.get('/posts/all/token', {
    params: { page, size },
  });
  return extractData(response);
};
