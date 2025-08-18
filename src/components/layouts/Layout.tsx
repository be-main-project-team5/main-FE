import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import { Outlet } from 'react-router-dom';

import Footer from '../common/Footer';
import { Header } from '../common/header';

const layoutStyle = cva('m-auto mt-16', {
  variants: {
    component: {
      default: 'max-w-[1360px] px-6 md:px-10',
      landing: '',
    },
  },
  defaultVariants: {
    component: 'default',
  },
});

interface LayoutProps {
  component?: 'default' | 'landing';
}

export default function Layout({ component }: LayoutProps) {
  return (
    <>
      <Header isLoggedIn={false} />
      <main className={clsx(layoutStyle({ component }))}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
