import { useState } from 'react';

import { Button } from '@/components/common/Button';

import UserDropdown from './UserDropdown';

type DesktopMenuProps = {
  isLoggedIn: boolean;
  userName?: string;
};

function DesktopMenu({ isLoggedIn, userName }: DesktopMenuProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => setIsDropdownOpen(prev => !prev);

  return (
    <nav className="hidden items-center space-x-3 pr-10 md:flex">
      {/* 로그인 상태: 사용자 드롭다운 */}
      {isLoggedIn ? (
        <UserDropdown
          userName={userName}
          isOpen={isDropdownOpen}
          onToggle={handleToggleDropdown}
          isMobile={false}
        />
      ) : (
        // 비로그인 상태: 로그인 / 회원가입 버튼
        <>
          <Button variant="secondary" size="md" className="w-[96px]">
            로그인
          </Button>
          <Button variant="primary" size="md" className="w-[96px]">
            회원가입
          </Button>
        </>
      )}
    </nav>
  );
}

export default DesktopMenu;
