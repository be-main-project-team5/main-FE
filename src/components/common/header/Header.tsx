import { useState } from 'react';
import { Link } from 'react-router-dom';

import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';

export type HeaderProps = {
  isLoggedIn: boolean;
  userName?: string;
  profileImageUrl?: string;
};

function Header({ isLoggedIn, userName, profileImageUrl }: HeaderProps) {
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const handleToggleMobileMenu = () => {
    setIsMobileDropdownOpen(prev => !prev);
  };

  const displayUserName = userName?.trim() || '회원';

  return (
    <header className="fixed top-0 right-0 left-0 z-50 h-16 border-b border-gray-300 bg-white px-6 md:px-10">
      <div className="mx-auto flex h-full max-w-screen-xl items-center justify-between">
        <Link to="/" className="cursor-pointer text-xl font-bold">
          DingDing
        </Link>

        <DesktopMenu
          isLoggedIn={isLoggedIn}
          userName={displayUserName}
          profileImageUrl={profileImageUrl}
        />

        <MobileMenu
          isLoggedIn={isLoggedIn}
          userName={displayUserName}
          isDropdownOpen={isMobileDropdownOpen}
          onToggleDropdown={handleToggleMobileMenu}
          profileImageUrl={profileImageUrl}
        />
      </div>
    </header>
  );
}

export default Header;
