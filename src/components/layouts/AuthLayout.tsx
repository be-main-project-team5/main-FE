import { Link, Outlet } from 'react-router-dom';

import useMediaQuery from '@/hooks/useMediaQuery';
import { mediaQuery } from '@/constants/breakpoints';
import clsx from 'clsx';

export default function AuthLayout() {
  const isDesktop = useMediaQuery(mediaQuery.tablet);

  return (
    <div className="flex gap-4 p-4">
      <div className="flex w-full flex-col items-center justify-center py-15 md:w-[calc(50%-8px)] md:px-10">
        <div className="flex w-full max-w-[480px] flex-col items-center md:items-start">
          <Link to="/">
            <img
              className="mb-10 inline w-30 md:mb-0 md:w-24"
              src="/logo-text.png"
              alt="logo-text"
            />
          </Link>

          {isDesktop && (
            <div className="my-8 w-full border-t-1 border-gray-200" />
          )}

          <div className="w-full rounded-lg bg-[#fffeff99] p-6 md:p-0">
            <Outlet />
          </div>
        </div>
      </div>

      <div
        className={clsx(
          'fixed bg-[url(/auth-bg.png)] bg-cover bg-center',
          isDesktop
            ? 'top-4 right-4 h-[calc(100%-32px)] w-[calc(50%-24px)] rounded-xl'
            : 'inset-0 z-[-1]',
        )}
      >
        {isDesktop && (
          <div className="flex h-full flex-col items-center justify-center gap-2">
            <img
              className="animate-float animate-blink w-1/8"
              src="/logo-symbol.png"
              alt="logo-symbol"
            />
            <img className="w-1/4" src="/logo-text.png" alt="logo-text" />
          </div>
        )}
      </div>
    </div>
  );
}
