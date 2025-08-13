import clsx from 'clsx';

import type { CalendarDateHeaderProps } from './calendar.types';

function CalendarDateHeader({
  date,
  isToday,
  isSelected,
}: CalendarDateHeaderProps) {
  return (
    <div
      className={clsx(
        'py-1',
        isToday && 'text-fuchsia-500',
        isSelected && 'bg-fuchsia-300 font-semibold text-white',
      )}
    >
      {date.date()}
    </div>
  );
}

export default CalendarDateHeader;
