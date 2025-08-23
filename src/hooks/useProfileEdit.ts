import { useState } from 'react';

import axios from 'axios';
import { type ProfileEditFormValues } from '@/schemas/profileEditSchema';
import { useUserStore } from '@/stores/userStore';
import { showErrorToast, showSuccessToast } from '@/utils/toastUtils';
import { updateUserProfile } from '@/api/userApi';

interface UseProfileEditProps {
  onCancelEdit: () => void;
}

export const useProfileEdit = ({ onCancelEdit }: UseProfileEditProps) => {
  const { user, updateUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (data: ProfileEditFormValues) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('nickname', data.nickname);

      const responseData = await updateUserProfile(formData);

      const updatedUserData = responseData;

      updateUser({
        nickname: updatedUserData.nickname || user?.nickname,
        profile_image_url:
          updatedUserData.profile_image_url || user?.profile_image_url,
      });

      showSuccessToast(
        responseData.message || '프로필이 성공적으로 업데이트되었습니다!',
      );
      onCancelEdit();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        showErrorToast(error.response.data.message || '프로필 업데이트 실패');
      } else {
        showErrorToast('프로필 업데이트 중 네트워크 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, isLoading };
};
