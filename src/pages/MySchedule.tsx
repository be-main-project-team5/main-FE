import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

import Calendar from '@/components/common/calendar/Calendar';
import DateScheduleList from '@/components/common/dateSchedule/DateScheduleList';
import type { Schedule } from '@/types/schedule';

export default function MySchedule() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [viewDate, setViewDate] = useState(dayjs());
  const [allSchedules, setAllSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    const fetchAllSchedules = async () => {
      try {
        const response = await fetch('/schedules/my');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Schedule[] = await response.json();
        setAllSchedules(data);
      } catch (error) {
        // console.error('Failed to fetch all schedules:', error);
        setAllSchedules([]);
      }
    };

    fetchAllSchedules();
  }, []);

  // Calendar에 전달할 월별 스케줄
  const monthlySchedules = useMemo(() => {
    return allSchedules.filter(schedule =>
      dayjs(schedule.startTime).isSame(viewDate, 'month'),
    );
  }, [allSchedules, viewDate]);

  // DateScheduleList에 전달할 일별 스케줄
  const dailySchedules = useMemo(() => {
    return allSchedules.filter(schedule =>
      dayjs(schedule.startTime).isSame(selectedDate, 'day'),
    );
  }, [allSchedules, selectedDate]);

  const handleCalendarDateChange = (date: Dayjs) => {
    setSelectedDate(date);
    if (!date.isSame(viewDate, 'month')) {
      setViewDate(date);
    }
  };

  return (
    <>
      <h3 className="mb-10 hidden py-4 text-center text-3xl md:block">
        즐겨찾기한 일정
      </h3>
      <Calendar
        selectedDate={selectedDate}
        onDateChange={handleCalendarDateChange}
        schedules={monthlySchedules}
      />
      <DateScheduleList
        userRole="favorites"
        selectedDate={selectedDate.format('YYYY-MM-DD')}
        schedules={dailySchedules}
      />
    </>
  );
}
