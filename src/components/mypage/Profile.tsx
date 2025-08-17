import { Button } from '@/components/common/Button';
import { UserAvatarImage } from '@/components/common/UserAvatarImage';

export default function Profile() {
  return (
    <section className="my-6 flex items-center justify-between gap-6 rounded-3xl border-2 border-gray-200 p-6 md:my-25 md:flex-col md:border-none">
      <div className="flex items-center gap-6 md:flex-col">
        <div className="block grid items-center sm:hidden">
          <UserAvatarImage avatarSize="md" />
        </div>
        <div className="hidden sm:block md:hidden">
          <UserAvatarImage avatarSize="xl" />
        </div>
        <div className="hidden md:block">
          <UserAvatarImage avatarSize="2xl" />
        </div>

        <div>
          <p className="text-xs text-gray-500 sm:text-sm md:text-3xl md:text-black">
            안녕하세요, ooo님!
          </p>
          <p className="text-xl font-semibold md:hidden">(닉네임)</p>
        </div>
        <p className="hidden text-xs text-gray-500 md:block">
          가입일자: yyyy/mm/dd
        </p>
      </div>

      <div className="block sm:hidden">
        <Button shape="pill" variant="secondary" size="sm">
          프로필 수정
        </Button>
      </div>
      <div className="hidden sm:block">
        <Button shape="pill" variant="secondary" size="md">
          프로필 수정
        </Button>
      </div>
    </section>
  );
}
