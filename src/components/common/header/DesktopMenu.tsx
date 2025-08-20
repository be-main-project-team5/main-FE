import { useState } from 'react';

import { Button } from '@/components/common/Button';

import UserDropdown from './UserDropdown';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => setIsDropdownOpen(prev => !prev);

  const handleLogin = () => {
    navigate('/auth/login');
  };

  const handleSignup = () => {
    navigate('/auth/register');
  };

  return (
    <nav className="hidden items-center space-x-3 md:flex">
      {isLoggedIn ? (
        <UserDropdown
          userName={userName || '회원'}
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
