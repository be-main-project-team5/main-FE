import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

import { buttonHoverStyle, divHoverStyle } from './myCalendar.styles';
import MyCalendarToolbar from './MyCalendarToolbar';

const dateStyles = cva('flex justify-center aspect-2/3 text-center', {
  variants: {
    currentMonth: {
      true: 'text-gray-700',
      false: 'text-gray-300',
    },
  },
});

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
    const today = dayjs().startOf('day');
    setViewDate(today);
    setSelectedDate(today);
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
      <div className="h-fit w-full rounded-md p-1 shadow-[0_0_20px_5px_#00000015]">
        <MyCalendarToolbar
          year={viewDate.year()}
          month={viewDate.month() + 1}
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
            const isToday = date.isSame(dayjs(), 'day');

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
                  }),
                  buttonHoverStyle,
                )}
              >
                <div
                  className={clsx(
                    'flex h-full min-h-fit w-full flex-col justify-between',
                    divHoverStyle,
                  )}
                >
                  <div
                    className={clsx(
                      'py-1',
                      isToday && 'text-fuchsia-500',
                      isSelected && 'bg-fuchsia-300 font-semibold text-white',
                    )}
                  >
                    {date.date()}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1 p-1">
                    {visibleSchedules.map(schedule => (
                      <div
                        key={schedule.id}
                        className={clsx(
                          'truncate p-2 py-[0.25vh] text-[1.5vw] font-medium sm:py-[1vh] lg:text-base',
                          isSelected
                            ? 'hidden bg-fuchsia-300 text-fuchsia-400 md:block md:bg-white'
                            : 'bg-fuchsia-300 text-white',
                        )}
                      >
                        <span className="hidden md:inline">
                          {schedule.title}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="py-1 text-[2vw] text-fuchsia-300 md:text-sm">
                    <span className="hidden md:inline">
                      {hiddenCount > 0 && `+ ${hiddenCount} more`}
                    </span>
                    <span className={clsx('md:hidden', isSelected && 'hidden')}>
                      {hiddenCount > 0 && `+ ${hiddenCount}`}
                    </span>
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
