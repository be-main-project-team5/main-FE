import type { LoginFormValues } from '@/schemas/loginSchema';
import axiosInstance from './axiosInstance';
import { useUserStore } from '@/stores/userStore';

// 회원가입 API
export const signupUser = async (signupData: FormData) => {
  const response = await axiosInstance.post('/users/signup/', signupData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// 로그인 및 프로필 조회 API
export const loginUser = async (loginData: LoginFormValues) => {
  const loginResponse = await axiosInstance.post('/users/login/', loginData);

  const { access_token: accessToken, refresh_token: refreshToken } =
    loginResponse.data;

  if (!accessToken) {
    throw new Error('로그인에 실패했습니다. 토큰이 없습니다.');
  }

  const profileResponse = await axiosInstance.get('/users/mypage/', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return {
    user: profileResponse.data,
    accessToken,
    refreshToken,
  };
};

// 로그아웃 API
export const logoutUser = async () => {
  const { refreshToken } = useUserStore.getState();
  if (!refreshToken) return;

  await axiosInstance.post('/users/logout/', {
    refresh: refreshToken,
  });
};
