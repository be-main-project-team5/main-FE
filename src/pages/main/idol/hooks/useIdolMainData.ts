import { useEffect, useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import type { Schedule, IdolSchedule } from '@/types/schedule';

export function useIdolMainData() {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(() => dayjs());
  const [allSchedules, setAllSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    const iso = selectedDate.format('YYYY-MM-DD');

    // TODO: API 연동: GET /idol/me/schedules?date=iso
    const mock: IdolSchedule[] = [
      {
        id: 1,
        title: '라디오 출연',
        startTime: `${iso}T09:30:00`,
        endTime: `${iso}T10:30:00`,
        isPublic: true,
        idol: { id: 101, name: '아이돌 A' },
        description: 'SBS 파워FM 생방',
      },
      {
        id: 2,
        title: '안무 연습',
        startTime: `${iso}T14:00:00`,
        endTime: `${iso}T16:00:00`,
        isPublic: true,
        idol: { id: 101, name: '아이돌 A' },
      },
    ];

    setAllSchedules(mock as Schedule[]);
  }, [selectedDate]);

  const filteredSchedules = useMemo(() => allSchedules, [allSchedules]);

  return { selectedDate, setSelectedDate, filteredSchedules };
}
