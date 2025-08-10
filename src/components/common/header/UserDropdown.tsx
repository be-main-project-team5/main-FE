import { UserIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { UserAvatarImage } from '@/components/common/UserAvatarImage';

type UserDropdownProps = {
  userName: string;
  isOpen: boolean;
  onToggle: () => void;
  isMobile: boolean;
  profileImageUrl?: string;
};

function UserDropdown({
  userName,
  isOpen,
  onToggle,
  isMobile,
  profileImageUrl,
}: UserDropdownProps) {
  const displayUserName = userName?.trim() || '회원';

  const userGreetingClass = clsx(
    'text-base font-medium text-gray-600',
    isMobile ? 'my-3' : 'my-4',
  );

  const dropdownItemClass = (extra?: string) =>
    clsx(
      'w-full pl-2 text-left font-semibold text-gray-700 hover:font-bold hover:text-fuchsia-500',
      extra,
    );

  const dropdownContent = (
    <div className="w-full py-1">
      <div className="mb-7 flex flex-col items-center">
        <UserAvatarImage
          profileImageUrl={profileImageUrl}
          altText={`${displayUserName} 프로필 이미지`}
          avatarSize="xl"
          className="shadow-sm"
        />
        <div className={userGreetingClass}>{displayUserName}님, 환영합니다</div>
      </div>

      <button
        type="button"
        className={dropdownItemClass(
          isMobile ? 'py-2 text-lg' : 'py-1 text-lg',
        )}
      >
        마이페이지
      </button>

      <hr className="mx-1 my-3 border border-gray-200" />

      <button
        type="button"
        className={dropdownItemClass(
          isMobile ? 'py-1 text-lg' : 'py-1 text-lg',
        )}
      >
        로그아웃
      </button>
    </div>
  );

  if (isMobile) return dropdownContent;

  return (
    <div className="relative flex items-center">
      <button
        type="button"
        onClick={onToggle}
        className="mr-14 ml-auto flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-gray-100"
        aria-label="사용자 드롭다운 열기"
      >
        <UserIcon className="h-6 w-6 text-gray-700" />
      </button>

      {isOpen && (
        <div className="fixed top-16 right-9 z-50 hidden w-52 border border-gray-200 bg-white p-4 shadow md:block">
          {dropdownContent}
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
