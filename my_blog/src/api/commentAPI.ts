import { axiosPrivateInstance } from './axiosInstance';

// 댓글 생성 (Private - 인증 필요)
export const createComment = async (postId: string, content: string) => {
  const response = await axiosPrivateInstance.post(`/comments/${postId}`, {
    content,
  });
  return response.data;
};

// 댓글 삭제 (Private - 인증 필요)
export const deleteComment = async (commentId: number) => {
  const response = await axiosPrivateInstance.delete(`/comments/${commentId}`);
  return response.data;
};

// 댓글 수정 (Private - 인증 필요)
export const updateComment = async (commentId: number, content: string) => {
  const response = await axiosPrivateInstance.patch(`/comments/${commentId}`, {
    content,
  });
  return response.data;
};
