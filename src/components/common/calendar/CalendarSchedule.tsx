import clsx from 'clsx';

import type { CalendarScheduleProps } from './calendar.types';

function CalendarSchedule({ schedule, isSelected }: CalendarScheduleProps) {
  const { title } = schedule;

  return (
    <div
      className={clsx(
        'truncate p-2 py-[0.25vh] text-[1.5vw] font-medium sm:py-[1vh] lg:text-base',
        isSelected
          ? 'hidden bg-fuchsia-300 text-fuchsia-500 md:block md:bg-white'
          : 'bg-fuchsia-300 text-white',
      )}
    >
      <span className="hidden md:inline">{title}</span>
    </div>
  );
}

export default CalendarSchedule;
