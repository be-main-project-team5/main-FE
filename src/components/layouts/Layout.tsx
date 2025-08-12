import { Outlet } from 'react-router-dom';

import Footer from '../common/Footer';
import { Header } from '../common/header';

export default function Layout() {
  return (
    <>
      <Header isLoggedIn={false} />
      <main className="m-auto mt-16 max-w-screen-xl">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
