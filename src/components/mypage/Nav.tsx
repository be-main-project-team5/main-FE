import { ChevronRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';

import { Button } from '@/components/common/Button';

const MYPAGE_NAV = [
  { label: '내 프로필', path: '/mypage/myprofile' },
  { label: '즐겨찾기한 일정', path: '/mypage/myschedule' },
];

export default function Nav() {
  const location = useLocation();

  return (
    <nav className="items-strech flex flex-col pb-10">
      {MYPAGE_NAV.map(({ label, path }) => {
        const isActive = location.pathname === path;

        return (
          <Button
            variant="secondary"
            className={clsx(
              'flex w-full !justify-between py-4',
              isActive ? 'bg-gray-100 font-semibold' : 'bg-white',
            )}
          >
            <p>{label}</p>
            <ChevronRightIcon className="w-5" />
          </Button>
        );
      })}
    </nav>
  );
}
