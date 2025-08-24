import axiosInstance from './axiosInstance';

/**
 * 사용자 프로필 업데이트 API
 * @param formData - 업데이트할 프로필 정보를 담은 FormData (nickname, profile_image 등)
 */
export const updateUserProfile = async (formData: FormData) => {
  const response = await axiosInstance.patch('/users/mypage/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * 현재 비밀번호 확인 API
 * @param currentPassword - 사용자가 입력한 현재 비밀번호
 */
export const verifyCurrentPassword = async (currentPassword: string) => {
  const response = await axiosInstance.post('/password/verify/', {
    password: currentPassword,
  });
  return response.data;
};
