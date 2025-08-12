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

type ScheduleType = {
  title: string;
  startTime: Date;
  endTime: Date;
  description?: string;
  isPublic: boolean;
};

const SCHEDULE_EXAMPLES: ScheduleType[] = [
  {
    title: '2025 첫번째 콘서트',
    startTime: new Date('2025-08-24'),
    endTime: new Date('2025-08-24'),
    description: '올해 첫 콘서트. 설명설명 어쩌고저쩌고 설명설명.',
    isPublic: true,
  },
  {
    title: '2025 첫번째 콘서트',
    startTime: new Date('2025-08-27'),
    endTime: new Date('2025-08-27'),
    description: '올해 첫 콘서트. 설명설명 어쩌고저쩌고 설명설명.',
    isPublic: true,
  },
  {
    title: '2025 두번쨰 콘서트',
    startTime: new Date('2025-08-28'),
    endTime: new Date('2025-08-28'),
    description: '올해 첫 콘서트. 설명설명 어쩌고저쩌고 설명설명.',
    isPublic: true,
  },
  {
    title: '00동 사인회',
    startTime: new Date('2025-08-28'),
    endTime: new Date('2025-08-28'),
    description: '올해 첫 콘서트. 설명설명 어쩌고저쩌고 설명설명.',
    isPublic: true,
  },
  {
    title: '런닝맨 촬영',
    startTime: new Date('2025-08-28'),
    endTime: new Date('2025-08-28'),
    description: '올해 첫 콘서트. 설명설명 어쩌고저쩌고 설명설명.',
    isPublic: true,
  },
  {
    title: '뮤직뱅크 참여',
    startTime: new Date('2025-08-28'),
    endTime: new Date('2025-08-28'),
    description: '올해 첫 콘서트. 설명설명 어쩌고저쩌고 설명설명.',
    isPublic: true,
  },
  {
    title: '2025 세번째 콘서트',
    startTime: new Date('2025-08-29'),
    endTime: new Date('2025-08-29'),
    description: '올해 첫 콘서트. 설명설명 어쩌고저쩌고 설명설명.',
    isPublic: true,
  },
  {
    title: '2025 네번째 콘서트',
    startTime: new Date('2025-08-30'),
    endTime: new Date('2025-08-30'),
    description: '올해 첫 콘서트. 설명설명 어쩌고저쩌고 설명설명.',
    isPublic: true,
  },
];

type RbcEvent = {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: ScheduleType; // 원본 보관
};

const rbcEventsList = (list: ScheduleType[]): RbcEvent[] =>
  list.map(s => ({
    title: s.title,
    start: s.startTime,
    end: dayjs(s.endTime).endOf('day').toDate(),
    allDay: true,
    resource: s,
  }));

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
        events={rbcEventsList(SCHEDULE_EXAMPLES)}
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
