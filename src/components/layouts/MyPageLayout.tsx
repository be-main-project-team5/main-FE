import { Outlet } from 'react-router-dom';

import Footer from '@/components/common/Footer';
import { Header } from '@/components/common/header';
import BottomNav from '@/components/mypage/BottomNav';
import Nav from '@/components/mypage/Nav';

export default function MyPageLayout() {
  return (
    <>
      <Header isLoggedIn={false} />
      <div className="m-auto mt-16 flex max-w-[1360px] items-stretch px-6 md:px-10">
        <aside className="flex w-55 flex-col justify-between pr-4">
          <div>
            <h2 className="py-10 text-3xl font-semibold">마이페이지</h2>
            <Nav />
          </div>
          <BottomNav />
        </aside>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}
