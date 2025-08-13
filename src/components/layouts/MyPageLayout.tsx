import { Outlet } from 'react-router-dom';

import Footer from '@/components/common/Footer';
import { Header } from '@/components/common/header';
import Nav from '@/components/mypage/Nav';

export default function MyPageLayout() {
  return (
    <>
      <Header isLoggedIn={false} />
      <div className="m-auto mt-16 flex max-w-[1360px] px-6 md:px-10">
        <aside className="w-55 pr-4">
          <h2 className="py-10 text-3xl font-semibold">마이페이지</h2>

          <Nav />

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
