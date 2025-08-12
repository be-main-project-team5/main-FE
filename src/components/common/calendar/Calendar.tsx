import 'react-big-calendar/lib/css/react-big-calendar.css';

import clsx from 'clsx';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useMemo } from 'react';
import { Calendar as BigCalendar, dayjsLocalizer } from 'react-big-calendar';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Seoul');

interface CalendarProps
  extends Partial<React.ComponentProps<typeof BigCalendar>> {
  className?: string;
}

const djLocalizer = dayjsLocalizer(dayjs);

function Calendar({ className, ...rest }: CalendarProps) {
  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date(),
      views: { month: true },
    }),
    [],
  );

  return (
    <div className={clsx('aspect-square h-[75vh]', className)}>
      <BigCalendar
        defaultDate={defaultDate}
        localizer={djLocalizer}
        views={views}
        defaultView="month"
        {...rest}
      />
    </div>
  );
}

export default Calendar;
