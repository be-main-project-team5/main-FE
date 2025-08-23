import { useEffect, useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

export function useIdolMainData() {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(() => dayjs());
  const [allSchedules, setAllSchedules] = useState<any[]>([]);

  useEffect(() => {
    const iso = selectedDate.format('YYYY-MM-DD');
    setAllSchedules([
      {
        id: 'a1',
        title: '라디오 출연',
        startTime: `${iso}T09:30:00`,
        idol: { name: '아이돌 A' },
      },
      {
        id: 'a2',
        title: '연습',
        startTime: `${iso}T14:00:00`,
        idol: { name: '아이돌 A' },
      },
    ]);
  }, [selectedDate]);

  const filteredSchedules = useMemo(() => allSchedules, [allSchedules]);
  return { selectedDate, setSelectedDate, filteredSchedules };
}
