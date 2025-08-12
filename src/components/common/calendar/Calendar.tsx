import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'dayjs/locale/ko';
import './calendar.tw.css';

import clsx from 'clsx';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useEffect, useState } from 'react';
import {
  Calendar as BigCalendar,
  dayjsLocalizer,
  type SlotInfo,
} from 'react-big-calendar';

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
  const todayDate = new Date();
  const [selectedDate, setSelectedDate] = useState(todayDate);

  const handleClickDate = (slotInfo: SlotInfo) => {
    const { start } = slotInfo;
    // const formattedDate = dayjs(start).format('YYYY-MM-DD');
    // console.log('clicked : ', formattedDate);
    setSelectedDate(start);
  };

  const dayPropGetter = (date: Date) => {
    const isSelected = dayjs(date).isSame(selectedDate, 'day');
    return { className: isSelected ? 'is-selected' : undefined };
  };

  useEffect(() => {
    // console.log(selectedDate);
  }, [selectedDate]);

  return (
    <div
      data-calendar
      className={clsx(
        'aspect-square h-[75vh] rounded-2xl p-5 shadow-[0_0_20px_5px_#00000015]',
        className,
      )}
    >
      <BigCalendar
        date={selectedDate}
        onNavigate={newDate => setSelectedDate(newDate)}
        components={{ toolbar: CalendarToolbar }}
        defaultDate={todayDate}
        localizer={djLocalizer}
        views={{ month: true }}
        defaultView="month"
        formats={{ monthHeaderFormat: 'YYYY년 M월' }}
        selectable="ignoreEvents"
        onSelectSlot={handleClickDate}
        drilldownView={null}
        dayPropGetter={dayPropGetter}
        {...rest}
      />
    </div>
  );
}

export default Calendar;
