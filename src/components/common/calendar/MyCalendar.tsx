import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

import MyCalendarToolbar from './MyCalendarToolbar';

const dateStyles = cva('py-1 flex justify-center aspect-5/6 text-center', {
  variants: {
    currentMonth: {
      true: 'text-gray-700',
      false: 'text-gray-300',
    },
    selected: {
      true: 'border border-3 border-fuchsia-500 hover:border-fuchsia-500',
      false: 'hover:bg-fuchsia-50',
    },
  },
});

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
                {date.date()}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MyCalendar;
