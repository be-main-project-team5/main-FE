import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useBookmarkSync } from '@/hooks/useBookmarkSync';
import { ALL_SCHEDULES } from '@/mocks/data';
import { MOCK_IDOLS } from '@/mocks/data/idols';
import type { Schedule } from '@/types/schedule';
import { isGroupSchedule, isIdolSchedule } from '@/types/schedule';

export function useFanMainData() {
  const { idolId = '' } = useParams<{ idolId: string }>();
  const parsedIdolId = useMemo(() => Number(idolId), [idolId]);

  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);

  const { favoriteIdols, toggleFavorite } = useBookmarkSync();

  const currentIdol = useMemo(
    () => MOCK_IDOLS.find(idol => idol.id === parsedIdolId) ?? null,
    [parsedIdolId],
  );

  const isFavorite = useMemo(
    () =>
      parsedIdolId
        ? favoriteIdols.some(fav => fav.idol === parsedIdolId)
        : false,
    [parsedIdolId, favoriteIdols],
  );

  useEffect(() => {
    if (!currentIdol) {
      setFilteredSchedules([]);
      return;
    }

    const { name: idolName, groupName } = currentIdol;

    const schedules = ALL_SCHEDULES.filter(schedule => {
      if (isIdolSchedule(schedule) && schedule.idol.name === idolName)
        return true;
      if (isGroupSchedule(schedule) && schedule.group.name === groupName)
        return true;
      if ('members' in schedule) {
        return schedule.members?.some(member => member.name === idolName);
      }
      return false;
    });

    setFilteredSchedules(schedules);
  }, [currentIdol]);

  const handleFavoriteToggle = useCallback(() => {
    if (parsedIdolId) toggleFavorite(parsedIdolId);
  }, [parsedIdolId, toggleFavorite]);

  return {
    idolId: parsedIdolId,
    selectedDate,
    setSelectedDate,
    filteredSchedules,
    currentIdol,
    isFavorite,
    handleFavoriteToggle,
  };
}
