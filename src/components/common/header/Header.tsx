import { useState } from 'react';
import { Link } from 'react-router-dom';

import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';

export type HeaderProps = {
  isLoggedIn: boolean;
  userName?: string;
  profileImageUrl?: string;
};

function Header({
  isLoggedIn,
  userName = 'abc',
  profileImageUrl = '/default-profile.png',
}: HeaderProps) {
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const handleToggleMobileMenu = () => {
    setIsMobileDropdownOpen(prev => !prev);
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between border-b border-gray-300 bg-white px-6">
      <Link to="/" className="cursor-pointer pl-8 text-xl font-bold">
        DingDing
      </Link>

      <DesktopMenu isLoggedIn={isLoggedIn} userName={userName} />

      {/* 모바일 메뉴 (햄버거 or 사용자 아이콘, 드롭다운 포함) */}
      <MobileMenu
        isLoggedIn={isLoggedIn}
        userName={userName}
        isDropdownOpen={isMobileDropdownOpen}
        onToggleDropdown={handleToggleMobileMenu}
      />
    </header>
  );
}

export default Header;
