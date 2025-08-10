import { useState } from 'react';

import { Button } from '@/components/common/Button';
import UserDropdown from './UserDropdown';

type DesktopMenuProps = {
  isLoggedIn: boolean;
  userName?: string;
  profileImageUrl?: string;
};

function DesktopMenu({
  isLoggedIn,
  userName,
  profileImageUrl,
}: DesktopMenuProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => setIsDropdownOpen(prev => !prev);

  const handleLogin = () => {
    console.log('로그인 페이지로 이동');
  };

  const handleSignup = () => {
    console.log('회원가입 페이지로 이동');
  };

  return (
    <nav className="hidden items-center space-x-3 pr-10 md:flex">
      {isLoggedIn ? (
        <UserDropdown
          userName={userName}
          isOpen={isDropdownOpen}
          onToggle={handleToggleDropdown}
          isMobile={false}
          profileImageUrl={profileImageUrl}
        />
      ) : (
        <>
          <Button
            variant="secondary"
            size="md"
            className="w-[96px]"
            onClick={handleLogin}
          >
            로그인
          </Button>
          <Button
            variant="primary"
            size="md"
            className="w-[96px]"
            onClick={handleSignup}
          >
            회원가입
          </Button>
        </>
      )}
    </nav>
  );
}

export default DesktopMenu;
