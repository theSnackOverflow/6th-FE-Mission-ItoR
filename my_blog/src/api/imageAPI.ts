import axios from 'axios';
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

/**
 * 이미지를 S3에 업로드하고 URL을 반환
 * @param file 업로드할 파일
 * @returns S3에 저장된 이미지 URL
 */
export const uploadImageToS3 = async (file: File): Promise<string> => {
  // 1. Presigned URL 받기
  const presignedUrl = await getPresignedUrl(file.name);

  // 2. S3에 직접 업로드
  await axios.put(presignedUrl, file, {
    headers: { 'Content-Type': file.type },
  });

  // 3. 쿼리 파라미터 제거한 실제 URL 반환
  const imageUrl = presignedUrl.split('?')[0];
  return imageUrl;
};
