import { useState } from 'react';

import axios from 'axios';
import { showErrorToast, showSuccessToast } from '@/utils/toastUtils';
import { verifyCurrentPassword } from '@/api/userApi';
import { type PasswordChangeFormValues } from '@/schemas/passwordSchema'; // New schema

interface UsePasswordEditProps {
  onCancelEdit: () => void;
}

export const usePasswordEdit = ({ onCancelEdit }: UsePasswordEditProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (data: PasswordChangeFormValues) => {
    setIsLoading(true);
    try {
      const verifyResponse = await verifyCurrentPassword(data.currentPassword);
      showSuccessToast(verifyResponse.message || '현재 비밀번호 확인 성공!');

      onCancelEdit();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        let errorMessage = '비밀번호 변경 실패';
        if (errorData) {
          const errorKey = Object.keys(errorData)[0];
          if (errorKey && Array.isArray(errorData[errorKey])) {
            [errorMessage] = errorData[errorKey];
          } else if (errorData.detail) {
            errorMessage = errorData.detail;
          } else if (errorData.message) {
            errorMessage = errorData.message;
          }
        }
        showErrorToast(errorMessage);
      } else {
        showErrorToast('네트워크 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, isLoading };
};
