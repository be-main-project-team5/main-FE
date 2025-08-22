import type { GreetingProps } from '../types';

function Greeting({ title, subtitle, leftIcon, rightAction }: GreetingProps) {
  return (
    <header className="mb-8">
      {/* Desktop (lg 이상) */}
      <div className="hidden items-center justify-between gap-6 lg:flex">
        <div className="flex min-w-0 flex-1 items-center gap-3 pt-11 pb-16">
          {leftIcon}
          <div className="min-w-0">
            <h1 className="truncate text-4xl font-bold whitespace-nowrap text-gray-900">
              {title}
            </h1>
            {subtitle && <p className="mt-1 text-gray-500">{subtitle}</p>}
          </div>
        </div>
        {rightAction}
      </div>

      {/* Mobile + Tablet */}
      <div className="lg:hidden">
        <div className="mb-1 text-center">
          <div className="mb-2 flex flex-col items-center justify-center gap-2">
            {leftIcon}
            <h1 className="text-3xl leading-snug font-bold whitespace-pre-line">
              {title}
            </h1>
          </div>
          {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
        </div>
        {rightAction && (
          <div className="flex justify-center">{rightAction}</div>
        )}
      </div>
    </header>
  );
}

export default Greeting;
