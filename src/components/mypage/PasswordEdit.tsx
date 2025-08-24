import { Button } from '@/components/common/Button';
import Input from '@/components/common/input';

interface PasswordEditProps {
  onCancelEdit: () => void;
}

export default function PasswordEdit({ onCancelEdit }: PasswordEditProps) {
  return (
    <div className="w-full flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-md md:p-10">
      <h2 className="mb-6 text-2xl font-semibold">비밀번호 수정</h2>
      <form className="flex flex-col gap-4">
        <Input type="password" label="현재 비밀번호" />
        <Input type="password" label="새 비밀번호" />
        <Input type="password" label="새 비밀번호 확인" />

        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onCancelEdit}>
            취소
          </Button>
          <Button type="submit">저장</Button>
        </div>
      </form>
    </div>
  );
}
