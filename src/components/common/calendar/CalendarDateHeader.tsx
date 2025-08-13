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
        isToday && 'text-fuchsia-600',
        isSelected && 'bg-fuchsia-400 font-semibold text-white',
      )}
    >
      {date.date()}
    </div>
  );
}

export default CalendarDateHeader;
