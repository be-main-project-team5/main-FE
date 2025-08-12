import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'dayjs/locale/ko';

import clsx from 'clsx';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useState } from 'react';
import { Calendar as BigCalendar, dayjsLocalizer } from 'react-big-calendar';

import CalendarToolbar from './CalendarToolbar';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Seoul');
dayjs.locale('ko');

interface CalendarProps
  extends Partial<React.ComponentProps<typeof BigCalendar>> {
  className?: string;
}

const djLocalizer = dayjsLocalizer(dayjs);

function Calendar({ className, ...rest }: CalendarProps) {
  const defaultDate = new Date();
  const [date, setDate] = useState(defaultDate);

  const handleClickDate = (slotInfo: { start: Date }) => {
    const formattedDate = dayjs(slotInfo.start).format('YYYY-MM-DD');
    console.log('clicked : ', formattedDate);
  };

  return (
    <div
      className={clsx(
        'aspect-square h-[75vh] rounded-2xl p-5 shadow-[0_0_20px_5px_#00000015]',
        className,
      )}
    >
      <BigCalendar
        date={date}
        onNavigate={newDate => setDate(newDate)}
        components={{ toolbar: CalendarToolbar }}
        defaultDate={defaultDate}
        localizer={djLocalizer}
        views={{ month: true }}
        defaultView="month"
        formats={{ monthHeaderFormat: 'YYYY년 M월' }}
        selectable="ignoreEvents"
        onSelectSlot={handleClickDate}
        {...rest}
      />
    </div>
  );
}

export default Calendar;
