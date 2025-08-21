import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useSyncArrayData } from '@/hooks/useSyncArrayData';
import { useFavoritesStore } from '@/stores/favoritesStore';
import type { Schedule } from '@/types/schedule';
import { ALL_SCHEDULES } from '@/mocks/data';
import {
  MOCK_IDOLS,
  fetchFavoriteIdols,
  toggleFavorite as serverToggleFavorite,
} from '@/mocks/data/idols';
import { isGroupSchedule, isIdolSchedule } from '@/types/schedule';

export function useFanMainData() {
  const { idolId = '' } = useParams<{ idolId: string }>();

  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const [serverFavoriteIds, setServerFavoriteIds] = useState<string[]>([]);

  const favoriteIds = useFavoritesStore(state => state.favorites);
  const toggleFavoriteLocal = useFavoritesStore(state => state.toggleFavorite);

  const currentIdol = useMemo(
    () => MOCK_IDOLS.find(idol => idol.id === idolId) ?? null,
    [idolId],
  );

  const isFavorite = useMemo(
    () => (idolId ? favoriteIds.includes(idolId) : false),
    [idolId, favoriteIds],
  );

  useEffect(() => {
    (async () => {
      try {
        const idols = await fetchFavoriteIdols();
        setServerFavoriteIds(idols.map(idol => idol.id));
      } catch (error) {
        console.error('즐겨찾기 초기 로드 실패:', error);
      }
    })();
  }, []);

  useSyncArrayData<string>({
    serverData: serverFavoriteIds,
    clientData: favoriteIds,
    applyFn: toggleFavoriteLocal,
    onSync: async (addedIds, removedIds) => {
      try {
        await Promise.all([
          ...addedIds.map(serverToggleFavorite),
          ...removedIds.map(serverToggleFavorite),
        ]);
        const idols = await fetchFavoriteIdols();
        setServerFavoriteIds(idols.map(idol => idol.id));
      } catch (error) {
        console.error('서버 동기화 실패:', error);
      }
    },
  });

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
    if (idolId) toggleFavoriteLocal(idolId);
  }, [idolId, toggleFavoriteLocal]);

  return {
    idolId,
    selectedDate,
    setSelectedDate,
    filteredSchedules,
    currentIdol,
    isFavorite,
    handleFavoriteToggle,
  };
}
