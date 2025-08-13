import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

import {
  buttonActiveStyle,
  buttonInactiveStyle,
  divActiveStyle,
  divInactiveStyle,
} from './myCalendar.styles';
import MyCalendarToolbar from './MyCalendarToolbar';

const dateStyles = cva(
  'relative py-1 flex justify-center aspect-5/6 text-center',
  {
    variants: {
      currentMonth: {
        true: 'text-gray-700',
        false: 'text-gray-300',
      },
      selected: {
        true: buttonActiveStyle,
        false: buttonInactiveStyle,
      },
    },
  },
);

const SCHEDULE_EXAMPLES = [
  {
    id: 0,
    title: '2025 부산 축제',
    startTime: new Date('2025-08-24'),
    endTime: new Date('2025-08-24'),
    description: '올해 첫 콘서트. 설명설명 어쩌고저쩌고 설명설명.',
    isPublic: true,
  },
  {
    id: 1,
    title: '2025 첫번째 콘서트',
    startTime: new Date('2025-08-27'),
    endTime: new Date('2025-08-27'),
    description: '올해 첫 콘서트. 설명설명 어쩌고저쩌고 설명설명.',
    isPublic: true,
  },
  {
    id: 2,
    title: '2025 두번째 콘서트',
    startTime: new Date('2025-08-28'),
    endTime: new Date('2025-08-28'),
    description: '올해 첫 콘서트. 설명설명 어쩌고저쩌고 설명설명.',
    isPublic: true,
  },
  {
    id: 3,
    title: '서울 팬사인회',
    startTime: new Date('2025-08-28'),
    endTime: new Date('2025-08-28'),
    description: '올해 첫 콘서트. 설명설명 어쩌고저쩌고 설명설명.',
    isPublic: true,
  },
  {
    id: 4,
    title: '예능 프로그램 촬영',
    startTime: new Date('2025-08-28'),
    endTime: new Date('2025-08-28'),
    description: '올해 첫 콘서트. 설명설명 어쩌고저쩌고 설명설명.',
    isPublic: true,
  },
  {
    id: 5,
    title: '뮤직뱅크 출연',
    startTime: new Date('2025-08-28'),
    endTime: new Date('2025-08-28'),
    description: '올해 첫 콘서트. 설명설명 어쩌고저쩌고 설명설명.',
    isPublic: true,
  },
  {
    id: 6,
    title: '2025 세번째 콘서트',
    startTime: new Date('2025-08-29'),
    endTime: new Date('2025-08-29'),
    description: '올해 첫 콘서트. 설명설명 어쩌고저쩌고 설명설명.',
    isPublic: true,
  },
  {
    id: 7,
    title: '2025 네번째 콘서트',
    startTime: new Date('2025-08-30'),
    endTime: new Date('2025-08-30'),
    description: '올해 첫 콘서트. 설명설명 어쩌고저쩌고 설명설명.',
    isPublic: true,
  },
];

function MyCalendar() {
  const [viewDate, setViewDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  // viewDate.year() -> 연도
  // viewDate.month() -> 월(0~11)
  const weekDays: string[] = ['일', '월', '화', '수', '목', '금', '토'];

  const firstDateOfMonth = viewDate.startOf('month'); // 해당 달의 1일
  const startDay = firstDateOfMonth.startOf('week'); // 해당 달의 달력 시작 날짜
  const lastDateOfMonth = viewDate.endOf('month'); // 해당 달의 마지막 날짜
  const endDay = lastDateOfMonth.endOf('week'); // 해당 달의 달력 마지막 날짜

  const viewDates = [];
  let day = startDay;

  while (day.isBefore(endDay) || day.isSame(endDay, 'day')) {
    viewDates.push(day);
    day = day.add(1, 'day');
  }

  const handleMovePrevMonth = () => {
    setViewDate(prev => prev.add(-1, 'month'));
  };

  const handleMoveNextMonth = () => {
    setViewDate(prev => prev.add(1, 'month'));
  };

  const handleMoveCurrentMonth = () => {
    setViewDate(dayjs());
  };

  const handleClickDate = (date: Dayjs) => {
    const clickedDate = date.startOf('day');
    setSelectedDate(clickedDate);

    if (!date.isSame(viewDate, 'month')) {
      setViewDate(clickedDate);
    }
  };

  console.log(viewDate);

  return (
    <div className="">
      <div className="h-fit w-full rounded-md shadow-[0_0_20px_5px_#00000015]">
        <MyCalendarToolbar
          label={`${viewDate.year()}년 ${viewDate.month() + 1}월`}
          handleMovePrevMonth={handleMovePrevMonth}
          handleMoveNextMonth={handleMoveNextMonth}
          handleMoveCurrentMonth={handleMoveCurrentMonth}
        />
        <div className="grid grid-cols-7">
          {weekDays.map(weekDay => (
            <div
              key={weekDay}
              className="font-regular py-4 text-center text-sm text-gray-500"
            >
              {weekDay}
            </div>
          ))}
          {viewDates.map(date => {
            const isCurrentMonth = date.month() === viewDate.month();
            const isSelected = date.isSame(selectedDate, 'day');

            const schedulesForDate = SCHEDULE_EXAMPLES.filter(schedule =>
              dayjs(schedule.startTime).isSame(date, 'day'),
            );
            const maxVisible = 3;
            const visibleSchedules = schedulesForDate.slice(0, maxVisible);
            const hiddenCount = schedulesForDate.length - maxVisible;

            return (
              <button
                type="button"
                key={date.format('YYYY-MM-DD')}
                onClick={() => handleClickDate(date)}
                className={clsx(
                  dateStyles({
                    currentMonth: isCurrentMonth,
                    selected: isSelected,
                  }),
                )}
              >
                <div
                  className={clsx(
                    'flex h-full w-full flex-col',
                    isSelected ? divActiveStyle : divInactiveStyle,
                  )}
                >
                  <div className="py-1">{date.date()}</div>
                  <div className="flex flex-1 flex-col justify-between p-1">
                    {visibleSchedules.map(schedule => (
                      <div
                        key={schedule.id}
                        className={clsx(
                          'truncate rounded-lg px-2 py-1 font-medium',
                          isSelected
                            ? 'bg-white text-fuchsia-400'
                            : 'bg-fuchsia-300 text-white',
                        )}
                      >
                        {schedule.title}
                      </div>
                    ))}
                  </div>
                  <div className="items-end py-1 text-fuchsia-200">
                    {hiddenCount > 0 && `+ ${hiddenCount} more`}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MyCalendar;
