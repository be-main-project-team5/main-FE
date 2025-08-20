import { Link, Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="flex gap-4 p-4">
      <div className="flex w-[calc(50%-8px)] flex-col items-center justify-center px-10 py-15">
        <div className="w-full max-w-[480px]">
          <Link to="/">
            <img className="inline w-24" src="/logo-text.png" alt="logo-text" />
          </Link>
          <div className="my-8 w-full border-t-1 border-gray-200" />
          <Outlet />
        </div>
      </div>

      <div className="fixed top-4 right-4 h-[calc(100%-32px)] w-[calc(50%-24px)] rounded-xl bg-[url(/auth-bg.png)] bg-center">
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <img
            className="animate-float animate-blink w-1/8"
            src="/logo-symbol.png"
            alt="logo-symbol"
          />
          <img className="w-1/4" src="/logo-text.png" alt="logo-text" />
        </div>
      </div>
    </div>
  );
}
