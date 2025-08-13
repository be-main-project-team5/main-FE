import clsx from 'clsx';

import type { CalendarScheduleFooterProps } from './calendar.types';

function CalendarDateFooter({
  hiddenCount,
  isSelected,
}: CalendarScheduleFooterProps) {
  return (
    <div className="py-1 text-[2vw] text-fuchsia-300 md:text-sm">
      <span className="hidden md:inline">
        {hiddenCount > 0 && `+ ${hiddenCount} more`}
      </span>
      <span className={clsx('md:hidden', isSelected && 'hidden')}>
        {hiddenCount > 0 && `+ ${hiddenCount}`}
      </span>
    </div>
  );
}

export default CalendarDateFooter;
