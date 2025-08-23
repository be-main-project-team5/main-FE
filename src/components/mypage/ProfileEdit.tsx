import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/common/Button';
import Input from '@/components/common/input';
import { UserAvatarImage } from '@/components/common/UserAvatarImage';
import {
  type ProfileEditFormValues,
  ProfileEditSchema,
} from '@/schemas/profileEditSchema';
import { useUserStore } from '@/stores/userStore';
import {
  showErrorToast,
  showSuccessToast,
  toastFormErrors,
} from '@/utils/toastUtils';

interface ProfileEditProps {
  onCancelEdit: () => void;
}

export default function ProfileEdit({ onCancelEdit }: ProfileEditProps) {
  const { user, accessToken, updateUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileEditFormValues>({
    resolver: zodResolver(ProfileEditSchema),
    defaultValues: {
      nickname: user?.nickname || '',
    },
  });

  const { register, handleSubmit } = form;

  const onSubmit = async (data: ProfileEditFormValues) => {
    setIsLoading(true);
    try {
      const token = accessToken || useUserStore.getState().accessToken;
      if (!token) {
        showErrorToast('로그인 정보가 없습니다. 다시 로그인해주세요.');
        setIsLoading(false);
        return;
      }

      const requestBody = { nickname: data.nickname };

      const response = await axios.patch('/users/mypage', requestBody, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedUserData = response.data.data;

      updateUser({
        nickname: updatedUserData.nickname || user?.nickname,
        profile_image_url:
          updatedUserData.profile_image_url || user?.profile_image_url,
      });

      showSuccessToast(
        response.data.message || '프로필이 성공적으로 업데이트되었습니다!',
      );
      onCancelEdit();
    } catch (error) {
      console.error('프로필 업데이트 중 오류 발생:', error);
      if (axios.isAxiosError(error) && error.response) {
        showErrorToast(error.response.data.message || '프로필 업데이트 실패');
      } else {
        showErrorToast('프로필 업데이트 중 네트워크 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-md md:p-10">
      <h2 className="mb-6 text-2xl font-semibold">프로필 수정</h2>
      <form
        onSubmit={handleSubmit(onSubmit, toastFormErrors)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col items-center gap-4">
          <UserAvatarImage
            profileImageUrl={user?.profile_image_url}
            altText="프로필 이미지 미리보기"
            avatarSize="xl"
            className="shadow-sm"
          />
        </div>

        <Input
          type="email"
          label="이메일"
          value={user?.email || ''}
          readOnly
          disabled
        />
        <Input type="text" label="닉네임" {...register('nickname')} />

        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancelEdit}
            disabled={isLoading}
          >
            취소
          </Button>
          <Button type="submit" disabled={isLoading}>
            저장
          </Button>
        </div>
      </form>
    </div>
  );
}
