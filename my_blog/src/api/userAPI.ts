import { axiosPrivateInstance } from './axiosInstance';

// 서버에서 반환하는 사용자 정보 DTO
export type MyInfoDTO = {
  nickname?: string;
  profilePicture?: string;
  introduction?: string;
  email?: string;
  name?: string;
  birthDate?: string;
  // various possible social id / provider fields the backend might return
  kakaoId?: number | string;
  oauthProvider?: string;
  provider?: string;
  socialType?: string;
  // possible id fields
  memberId?: number | string;
  id?: number | string;
  userId?: number | string;
};

// 내 정보 조회
export const getMyInfo = async (): Promise<MyInfoDTO> => {
  const response = await axiosPrivateInstance.get('/users/me');
  return response.data.data as MyInfoDTO;
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
