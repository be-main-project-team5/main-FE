import { UserIcon } from '@heroicons/react/24/outline';

type UserDropdownProps = {
  userName?: string;
  isOpen: boolean;
  onToggle: () => void;
  isMobile: boolean;
};

const UserDropdown = ({
  userName,
  isOpen,
  onToggle,
  isMobile,
}: UserDropdownProps) => {
  const dropdownContent = (
    <div className="w-full py-1">
      <div className="mb-8 flex flex-col items-center">
        <div className="h-20 w-20 rounded-full bg-yellow-300" />
        <div className={`my-${isMobile ? '3' : '4'} text-sm font-semibold`}>
          {userName}님, 환영합니다
        </div>
      </div>
      <button
        className={`w-full py-${isMobile ? '2' : '1'} pl-2 text-left ${isMobile ? 'text-sm' : 'text-md'} hover:font-semibold hover:text-fuchsia-500`}
      >
        마이페이지
      </button>
      <hr className="mx-1 my-5 border border-gray-200" />
      <button
        className={`w-full py-${isMobile ? '2' : '1'} pl-2 text-left ${isMobile ? 'text-sm' : 'text-md'} hover:font-semibold hover:text-fuchsia-500`}
      >
        로그아웃
      </button>
    </div>
  );

  // 모바일 환경: 버튼 없이 바로 콘텐츠만 렌더링
  if (isMobile) return dropdownContent;

  // 데스크탑 환경: 사용자 아이콘 버튼과 드롭다운 함께 렌더링
  return (
    <div className="relative flex items-center">
      <button
        onClick={onToggle}
        className="mr-14 ml-auto flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-gray-100"
        aria-label="사용자 드롭다운 열기"
      >
        <UserIcon className="h-6 w-6 text-gray-700" />
      </button>

      {isOpen && (
        <div className="fixed top-16 right-10 z-50 hidden w-52 border border-gray-200 bg-white p-4 shadow md:block">
          {dropdownContent}
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
