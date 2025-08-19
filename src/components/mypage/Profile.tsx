import { Button } from '@/components/common/Button';
import { UserAvatarImage } from '@/components/common/UserAvatarImage';
import { mediaQuery } from '@/constants/breakpoints';
import useMediaQuery from '@/hooks/useMediaQuery';

export default function Profile() {
  const isDesktop = useMediaQuery(mediaQuery.tablet);
  const isMobile = useMediaQuery(mediaQuery.mobile);

  const avatarSize = isDesktop ? '2xl' : isMobile ? 'md' : 'xl';
  const buttonSize = isMobile ? 'sm' : 'md';

  return (
    <section className="my-6 flex items-center justify-between gap-6 rounded-3xl border-2 border-gray-200 p-6 md:my-25 md:flex-col md:border-none">
      <div className="flex items-center gap-6 md:flex-col">
        <UserAvatarImage avatarSize={avatarSize} />

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

      <Button shape="pill" variant="secondary" size={buttonSize}>
        프로필 수정
      </Button>
    </section>
  );
}
