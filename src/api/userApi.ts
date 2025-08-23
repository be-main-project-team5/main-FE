import axiosInstance from './axiosInstance';

// 사용자 프로필 업데이트 API
export const updateUserProfile = async (formData: FormData) => {
  const response = await axiosInstance.patch('/users/mypage/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
