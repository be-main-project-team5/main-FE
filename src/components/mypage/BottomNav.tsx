import clsx from 'clsx';

const MYPAGE_BOTTOM_NAV = ['로그아웃', '회원 탈퇴'];

export default function BottomNav({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center gap-3 border-gray-200 py-10 text-xs md:items-start md:gap-6 md:border-t-1 md:text-sm',
        className,
      )}
    >
      {MYPAGE_BOTTOM_NAV.map(el => (
        <button key={el} type="button" className="mx-4">
          <p className="hover:underline">{el}</p>
        </button>
      ))}
    </div>
  );
}
