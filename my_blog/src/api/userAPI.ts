import { axiosPrivateInstance } from './axiosInstance';

// 내 정보 조회
export const getMyInfo = async () => {
  const response = await axiosPrivateInstance.get('/users/me');
  return response.data.data;
};

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

// 닉네임 수정
export const updateNickname = async (nickname: string) => {
  const response = await axiosPrivateInstance.patch('/users/nickname', {
    nickname,
  });
  return response.data;
};

// 비밀번호 수정
export const updatePassword = async (password: string) => {
  const response = await axiosPrivateInstance.patch('/users/password', {
    password,
  });
  return response.data;
};

// 프로필 사진 수정
export const updateProfilePicture = async (profilePicture: string) => {
  const response = await axiosPrivateInstance.patch('/users/picture', {
    profilePicture,
  });
  return response.data;
};
