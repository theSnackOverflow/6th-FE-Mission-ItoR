import { axiosPrivateInstance } from './axiosInstance';

export const getPresignedUrl = async (fileName: string): Promise<string> => {
  try {
    const response = await axiosPrivateInstance.get('/images/presigned-url', {
      params: { fileName },
    });
    return response.data.data;
  } catch (error) {
    console.error('Presigned URL 요청 실패:', error);
    throw error;
  }
};
