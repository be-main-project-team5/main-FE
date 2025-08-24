import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/common/Button';
import Input from '@/components/common/input';
import { usePasswordEdit } from '@/hooks/usePasswordEdit';
import {
  PasswordChangeSchema,
  type PasswordChangeFormValues,
} from '@/schemas/passwordSchema';
import { toastFormErrors } from '@/utils/toastUtils';

interface PasswordEditProps {
  onCancelEdit: () => void;
}

export default function PasswordEdit({ onCancelEdit }: PasswordEditProps) {
  const { submit, isLoading } = usePasswordEdit({ onCancelEdit });

  const form = useForm<PasswordChangeFormValues>({
    resolver: zodResolver(PasswordChangeSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const { register, handleSubmit } = form;

  return (
    <div className="w-full flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-md md:p-10">
      <h2 className="mb-6 text-2xl font-semibold">비밀번호 수정</h2>
      <form
        onSubmit={handleSubmit(submit, toastFormErrors)}
        className="flex flex-col gap-4"
      >
        <Input
          type="password"
          label="현재 비밀번호"
          {...register('currentPassword')}
        />
        <Input
          type="password"
          label="새 비밀번호"
          {...register('newPassword')}
        />
        <Input
          type="password"
          label="새 비밀번호 확인"
          {...register('confirmNewPassword')}
        />

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
