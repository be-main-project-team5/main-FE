import { ChevronRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Outlet, useLocation } from 'react-router-dom';

import { Button } from '@/components/common/Button';
import Footer from '@/components/common/Footer';
import { Header } from '@/components/common/header';

const MYPAGE_NAV = [
  { label: '내 프로필', path: '/mypage/myprofile' },
  { label: '즐겨찾기한 일정', path: '/mypage/myschedule' },
];

export default function MyPageLayout() {
  const location = useLocation();

  return (
    <>
      <Header isLoggedIn={false} />
      <div className="m-auto mt-16 flex max-w-[1360px] px-6 md:px-10">
        <aside className="w-55 pr-4">
          <h2 className="py-10 text-3xl font-semibold">마이페이지</h2>

          <nav className="items-strech flex flex-col pb-10">
            {MYPAGE_NAV.map(({ label, path }) => {
              const isActive = location.pathname === path;

              return (
                <Button
                  variant="secondary"
                  className={clsx(
                    'flex w-full !justify-between py-4',
                    isActive ? 'bg-gray-100 font-semibold' : 'bg-white',
                  )}
                >
                  <p>{label}</p>
                  <ChevronRightIcon className="w-5" />
                </Button>
              );
            })}
          </nav>

          <div className="flex flex-col items-start gap-2 border-t-1 border-gray-200 py-10 text-sm">
            <button type="button" className="px-4 py-2">
              <p className="hover:underline">로그아웃</p>
            </button>
            <button type="button" className="px-4 py-2">
              <p className="hover:underline">회원 탈퇴</p>
            </button>
          </div>
        </aside>

        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}
