import { axiosPrivateInstance } from './axiosInstance';

// 유저 정보 수정
export const updateUser = async (userData: {
  email?: string;
  nickname?: string;
  profilePicture?: string;
  birthDate?: string;
  name?: string;
  introduction?: string;
}) => {
  const response = await axiosPrivateInstance.patch('/users', userData);
  return response.data;
};
