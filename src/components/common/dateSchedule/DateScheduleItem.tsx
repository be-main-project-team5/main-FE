import {
  BellIcon as BellOutline,
  StarIcon as StarOutline,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {
  BellIcon as BellSolid,
  PencilIcon,
  StarIcon as StarSolid,
} from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useState } from 'react';

import type { DateScheduleItemProps } from './dateSchedule.types';
import { formatDateSlash } from './dateSchedule.utils';
import { getScheduleActions, type ActionIcon } from './getScheduleActions';

const iconSize = 'h-5 w-5 sm:h-6 sm:w-6';
const iconColor = 'text-fuchsia-600';
const iconBtn =
  'inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-md hover:bg-fuchsia-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400';

// 아이콘 타입을 실제 아이콘으로 렌더링 (예: 'star' → <StarIcon />)
function renderIcon(icon: ActionIcon) {
  switch (icon) {
    case 'star':
      return <StarOutline className={clsx(iconSize, iconColor)} />;
    case 'star-filled':
      return <StarSolid className={clsx(iconSize, iconColor)} />;
    case 'bell':
      return <BellOutline className={clsx(iconSize, iconColor)} />;
    case 'bell-filled':
      return <BellSolid className={clsx(iconSize, iconColor)} />;
    case 'edit':
      return <PencilIcon className={clsx(iconSize, iconColor)} />;
    case 'delete':
      return <TrashIcon className={clsx(iconSize, iconColor)} />;
    default:
      return null;
  }
}

export default function DateScheduleItem({
  item,
  role,
  onBookmarkToggle,
  onNotifyToggle,
  onEditClick,
  onDeleteClick,
}: DateScheduleItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleOpen = () => setIsOpen(prev => !prev);

  // 역할별 액션 버튼 정보
  const actionsInfo = getScheduleActions(role, item, {
    onBookmarkToggle,
    onNotifyToggle,
    onEditClick,
    onDeleteClick,
  });

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
          <div className="flex justify-end gap-1">
            {actionsInfo.map(action => (
              <button
                key={action.key}
                type="button"
                aria-label={action.ariaLabel}
                className={iconBtn}
                onClick={action.onClick}
                title={action.ariaLabel}
              >
                {renderIcon(action.icon)}
              </button>
            ))}
          </div>
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
