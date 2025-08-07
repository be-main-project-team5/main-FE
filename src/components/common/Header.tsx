import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Link } from 'react-router-dom';

type HeaderProps = {
  isLoggedIn: boolean;
  userName?: string;
  profileImageUrl?: string;
};

const Header = ({
  isLoggedIn,
  userName = 'abc',
  profileImageUrl = '/default-profile.png',
}: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
  const handleToggleDropdown = () => setIsDropdownOpen(prev => !prev);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between border-b border-gray-300 bg-white px-6">
      {/* 로고 */}
      <Link to="/" className="cursor-pointer pl-8 text-xl font-bold">
        DingDing
      </Link>

      {/* 데스크탑 메뉴 */}
      <nav className="hidden items-center space-x-3 pr-10 md:flex">
        {isLoggedIn ? (
          <div className="relative flex items-center">
            <button
              onClick={handleToggleDropdown}
              className="flex items-center"
            >
              <div className="mr-16 ml-auto h-9 w-9 rounded-full bg-blue-300" />
            </button>

            {isDropdownOpen && (
              <div className="fixed top-16 right-10 z-50 hidden w-52 border border-gray-200 bg-white p-4 shadow md:block">
                <div className="w-full py-1">
                  <div className="mb-8 flex flex-col items-center">
                    <div className="h-20 w-20 rounded-full bg-yellow-300" />
                    <div className="my-4 text-sm font-semibold">
                      {userName}님, 환영합니다
                    </div>
                  </div>
                  <button className="text-md w-full py-1 pl-2 text-left hover:font-semibold hover:text-fuchsia-500">
                    마이페이지
                  </button>
                  <hr className="mx-1 my-5 border border-gray-200" />
                  <button className="text-md w-full py-1 pl-2 text-left hover:font-semibold hover:text-fuchsia-500">
                    로그아웃
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
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

      {/* 모바일 메뉴 버튼 */}
      <div className="md:hidden">
        <button onClick={handleToggleMobileMenu} className="p-2">
          {/* 햄버거 메뉴 아이콘 (SVG) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 right-0 z-50 w-52 border border-gray-200 bg-white p-4 shadow md:hidden">
          {isLoggedIn ? (
            <div className="w-full py-1">
              <div className="mb-8 flex flex-col items-center">
                <div className="h-20 w-20 rounded-full bg-yellow-300" />
                <div className="my-3 text-sm font-semibold">
                  {userName}님, 환영합니다
                </div>
              </div>
              <button className="w-full py-2 pl-2 text-left text-sm hover:font-semibold hover:text-fuchsia-500">
                마이페이지
              </button>
              <hr className="mx-1 my-5 border border-gray-200" />
              <button className="w-full py-2 pl-2 text-left text-sm hover:font-semibold hover:text-fuchsia-500">
                로그아웃
              </button>
            </div>
          ) : (
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
    </header>
  );
};

export default Header;
