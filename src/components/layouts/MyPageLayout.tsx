import { Outlet } from 'react-router-dom';

import Footer from '@/components/common/Footer';
import { Header } from '@/components/common/header';
import BottomNav from '@/components/mypage/BottomNav';
import Nav from '@/components/mypage/Nav';

export default function MyPageLayout() {
  return (
    <>
      <Header isLoggedIn={false} />
      <div className="m-auto mt-16 flex max-w-[1360px] flex-col items-center px-6 md:flex-row md:items-stretch md:px-10">
        <aside className="hidden w-55 flex-col justify-between pr-4 md:flex">
          <div>
            <h2 className="py-10 text-3xl font-semibold">마이페이지</h2>
            <Nav />
          </div>
          <BottomNav className="hidden md:flex" />
        </aside>

        <Nav className="md:hidden" />

        <main className="w-full flex-1">
          <Outlet />
        </main>

        <BottomNav className="flex md:hidden" />
      </div>
      <Footer />
    </>
  );
}
