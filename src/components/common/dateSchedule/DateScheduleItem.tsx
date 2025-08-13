import { useMemo, useState } from 'react';
import {
  StarIcon as StarOutline,
  BellIcon as BellOutline,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {
  StarIcon as StarSolid,
  BellIcon as BellSolid,
  PencilIcon,
} from '@heroicons/react/24/solid';
import type { Schedule, UserRole } from './dateSchedule.types';
import { formatDateSlash } from './dateSchedule.utils';
import clsx from 'clsx';

type Props = {
  item: Schedule;
  role: UserRole;
  onBookmarkToggle?: (id: string) => void;
  onNotifyToggle?: (id: string) => void;
  onEditClick?: (id: string) => void;
  onDeleteClick?: (id: string) => void;
};

const iconSize = 'h-5 w-5 sm:h-6 sm:w-6';
const iconColor = 'text-fuchsia-600';
const iconBtn =
  'inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-md hover:bg-fuchsia-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400';

export default function DateScheduleItem({
  item,
  role,
  onBookmarkToggle,
  onNotifyToggle,
  onEditClick,
  onDeleteClick,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleOpen = () => setIsOpen(p => !p);
  const handleBookmark = () => onBookmarkToggle?.(item.id);
  const handleNotify = () => onNotifyToggle?.(item.id);
  const handleEdit = () => onEditClick?.(item.id);
  const handleDelete = () => onDeleteClick?.(item.id);

  const actions = useMemo(() => {
    switch (role) {
      case 'fan':
        return [
          <button
            key="bm"
            type="button"
            aria-label="즐겨찾기"
            className={iconBtn}
            onClick={handleBookmark}
          >
            {item.isBookmarked ? (
              <StarSolid className={clsx(iconSize, iconColor)} />
            ) : (
              <StarOutline className={clsx(iconSize, iconColor)} />
            )}
          </button>,
        ];
      case 'favorites':
        return [
          <button
            key="bm"
            type="button"
            aria-label="즐겨찾기"
            className={iconBtn}
            onClick={handleBookmark}
          >
            <StarSolid className={clsx(iconSize, iconColor)} />
          </button>,
          <button
            key="nf"
            type="button"
            aria-label="알림 설정"
            className={iconBtn}
            onClick={handleNotify}
          >
            {item.isNotified ? (
              <BellSolid className={clsx(iconSize, iconColor)} />
            ) : (
              <BellOutline className={clsx(iconSize, iconColor)} />
            )}
          </button>,
        ];
      case 'manager':
        return [
          <button
            key="ed"
            type="button"
            aria-label="수정"
            className={iconBtn}
            onClick={handleEdit}
          >
            <PencilIcon className={clsx(iconSize, iconColor)} />
          </button>,
          <button
            key="del"
            type="button"
            aria-label="삭제"
            className={iconBtn}
            onClick={handleDelete}
          >
            <TrashIcon className={clsx(iconSize, iconColor)} />
          </button>,
        ];
      default:
        return [];
    }
  }, [item.id, role, item.isBookmarked, item.isNotified]);

  return (
    <li className="rounded-2xl transition hover:bg-gray-50">
      <div className="flex min-h-[64px] items-center overflow-hidden rounded-lg bg-fuchsia-100 py-3 pr-8 pl-12 sm:min-h-[72px] sm:py-4 sm:pr-10 sm:pl-16 md:min-h-[80px] md:pr-12 md:pl-20">
        <button
          type="button"
          onClick={handleToggleOpen}
          aria-expanded={isOpen}
          aria-controls={`schedule-detail-${item.id}`}
          className="mr-2 shrink-0 basis-[100px] text-left sm:mr-3 sm:basis-[112px] md:mr-4 md:basis-[120px]"
        >
          <span className="text-base whitespace-nowrap text-gray-700 tabular-nums select-none sm:text-lg">
            {item.time}
          </span>
        </button>

        <button
          type="button"
          onClick={handleToggleOpen}
          aria-expanded={isOpen}
          aria-controls={`schedule-detail-${item.id}`}
          title={item.summary}
          className="min-w-0 flex-1 truncate pl-1 text-left sm:pl-2 md:pl-3"
        >
          <span className="block text-base text-gray-700 sm:text-lg">
            {item.summary}
          </span>
        </button>

        <div className="shrink-0 basis-[88px] sm:basis-[100px] md:basis-[108px]">
          <div className="flex justify-end gap-1">{actions}</div>
        </div>
      </div>

      {isOpen && (
        <div
          id={`schedule-detail-${item.id}`}
          className="rounded-xl bg-fuchsia-50 p-3 pl-[72px] text-sm text-gray-800 sm:p-4 sm:pl-[84px] sm:text-base md:pl-[96px]"
        >
          <p className="font-medium">{item.title}</p>
          <p className="mt-2">장소: {item.location}</p>
          <p>날짜: {formatDateSlash(item.dateISO)}</p>
          {item.participants.length > 0 && (
            <p>참여 아이돌: {item.participants.join(', ')}</p>
          )}
        </div>
      )}
    </li>
  );
}
