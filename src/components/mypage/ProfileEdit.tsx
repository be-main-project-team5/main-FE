import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/common/Button';
import Input from '@/components/common/input';
import { UserAvatarImage } from '@/components/common/UserAvatarImage';
import { useUserStore } from '@/stores/userStore';

interface ProfileEditProps {
  onCancelEdit: () => void;
}

const profileEditSchema = z.object({
  nickname: z
    .string()
    .min(2, { message: '닉네임은 최소 2자 이상이어야 합니다.' })
    .max(10, { message: '닉네임은 최대 10자까지 가능합니다.' }),
});

type ProfileEditFormValues = z.infer<typeof profileEditSchema>;

export default function ProfileEdit({ onCancelEdit }: ProfileEditProps) {
  const { user, accessToken, refreshToken } = useUserStore();
  const [isLoading] = useState(false);

  console.log('ProfileEdit: user', user);
  console.log('ProfileEdit: accessToken', accessToken);
  console.log('ProfileEdit: refreshToken', refreshToken);

  const form = useForm<ProfileEditFormValues>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      nickname: user?.nickname || '',
    },
  });

  const { register } = form;

  return (
    <div className="w-full flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-md md:p-10">
      <h2 className="mb-6 text-2xl font-semibold">프로필 수정</h2>
      <form className="flex flex-col gap-4">
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
