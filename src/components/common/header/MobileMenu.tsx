import { Bars3Icon, UserIcon } from '@heroicons/react/24/outline';

import UserDropdown from './UserDropdown';

type MobileMenuProps = {
  isLoggedIn: boolean;
  userName?: string;
  isDropdownOpen: boolean;
  onToggleDropdown: () => void;
};

function MobileMenu({
  isLoggedIn,
  userName,
  isDropdownOpen,
  onToggleDropdown,
}: MobileMenuProps) {
  return (
    <>
      {/* 모바일 메뉴 버튼 */}
      <div className="md:hidden">
        <button onClick={onToggleDropdown} className="p-2">
          {isLoggedIn ? (
            <UserIcon className="h-6 w-6 text-gray-800" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-gray-800" />
          )}
        </button>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {isDropdownOpen && (
        <div className="absolute top-16 right-0 z-50 w-52 border border-gray-200 bg-white p-4 shadow md:hidden">
          {isLoggedIn ? (
            <UserDropdown
              userName={userName}
              isOpen
              onToggle={() => {}}
              isMobile
            />
          ) : (
            // 비로그인 시 로그인/회원가입 버튼 목록
            <div className="w-full py-1">
              <button className="w-full pl-2 text-left hover:font-semibold hover:text-fuchsia-500">
                로그인
              </button>
              <hr className="mx-1 my-5 border border-gray-200" />
              <button className="w-full pl-2 text-left hover:font-semibold hover:text-fuchsia-500">
                회원가입
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default MobileMenu;
