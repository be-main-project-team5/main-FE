import { Outlet } from 'react-router-dom';

import Footer from '@/components/common/Footer';
import { Header } from '@/components/common/header';
import Nav from '@/components/mypage/Nav';
import BottomNav from '@/components/mypage/BottomNav';

export default function MyPageLayout() {
  return (
    <>
      <Header isLoggedIn={false} />
      <div className="m-auto mt-16 flex max-w-[1360px] px-6 md:px-10">
        <aside className="w-55 pr-4">
          <h2 className="py-10 text-3xl font-semibold">마이페이지</h2>

          <Nav />
          <BottomNav />
        </aside>

        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}
