import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

import CalendarDate from './CalendarDate';
import CalendarToolbar from './CalendarToolbar';
import CalendarWeekDays from './CalendarWeekDays';

function Calendar() {
  const [viewDate, setViewDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const viewDates = useMemo(() => {
    const firstDateOfMonth = viewDate.startOf('month');
    const startDay = firstDateOfMonth.startOf('week');
    const lastDateOfMonth = viewDate.endOf('month');
    const endDay = lastDateOfMonth.endOf('week');

    const dates: Dayjs[] = [];
    let day = startDay;

    while (day.isBefore(endDay) || day.isSame(endDay, 'day')) {
      dates.push(day);
      day = day.add(1, 'day');
    }

    return dates;
  }, [viewDate]);

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

  // *memo - 선택한 날짜 값 넘기는 로직 작성할 때 수정 후 사용
  useEffect(() => {
    // console.log(selectedDate);
  }, [selectedDate]);

  return (
    <div className="h-fit w-full rounded-md p-1 shadow-[0_0_20px_5px_#00000015]">
      <CalendarToolbar
        year={viewDate.year()}
        month={viewDate.month() + 1}
        handleMovePrevMonth={handleMovePrevMonth}
        handleMoveNextMonth={handleMoveNextMonth}
        handleMoveCurrentMonth={handleMoveCurrentMonth}
      />
      <div className="grid grid-cols-7">
        <CalendarWeekDays />
        {viewDates.map(date => (
          <CalendarDate
            key={date.format('YYYY-MM-DD')}
            date={date}
            viewDate={viewDate}
            selectedDate={selectedDate}
            handleClickDate={handleClickDate}
          />
        ))}
      </div>
    </div>
  );
}

export default Calendar;
