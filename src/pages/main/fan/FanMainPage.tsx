import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

import Calendar from '@/components/common/calendar/Calendar';
import DateScheduleList from '@/components/common/dateSchedule/DateScheduleList';

import { useSyncArrayData } from '@/hooks/useSyncArrayData';
import { useFavoritesStore } from '@/stores/favoritesStore';
import type { Schedule } from '@/types/schedule';

import { ALL_SCHEDULES } from '@/mocks/data';
import { MOCK_IDOLS } from '@/mocks/data/idols';
import {
  fetchFavoriteIdols,
  toggleFavorite as serverToggleFavorite,
} from '@/mocks/data/idols';

type Member = { id: number | string; name: string };
type IdolField = { idol?: { name?: string } };
type GroupField = { group?: { name?: string } };
type MembersField = { members?: Member[] };

function scheduleHasIdol(
  schedule: Schedule,
): schedule is Schedule & { idol: { name: string } } {
  const s = schedule as IdolField;
  return typeof s.idol?.name === 'string' && s.idol.name.length > 0;
}

function scheduleHasGroup(
  schedule: Schedule,
): schedule is Schedule & { group: { name: string } } {
  const s = schedule as GroupField;
  return typeof s.group?.name === 'string' && s.group.name.length > 0;
}

function scheduleHasMembers(
  schedule: Schedule,
): schedule is Schedule & { members: Member[] } {
  const s = schedule as MembersField;
  return Array.isArray(s.members);
}

export default function FanMainPage() {
  const { idolId = '' } = useParams<{ idolId: string }>();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const [serverFavoriteIds, setServerFavoriteIds] = useState<string[]>([]);

  const favoriteIds = useFavoritesStore(state => state.favorites);
  const toggleFavorite = useFavoritesStore(state => state.toggleFavorite);

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
        const favoritesFromServer = await fetchFavoriteIdols();
        setServerFavoriteIds(favoritesFromServer.map(item => item.id));
      } catch (err) {
        console.error('즐겨찾기 초기 로드 실패:', err);
      }
    })();
  }, []);

  useSyncArrayData<string>({
    serverData: serverFavoriteIds,
    clientData: favoriteIds,
    applyFn: toggleFavorite,
    onSync: async (added, removed) => {
      try {
        const requests = [
          ...added.map(id => serverToggleFavorite(id)),
          ...removed.map(id => serverToggleFavorite(id)),
        ];
        await Promise.all(requests);

        const refreshed = await fetchFavoriteIdols();
        setServerFavoriteIds(refreshed.map(item => item.id));
      } catch (err) {
        console.error('서버 동기화 실패:', err);
      }
    },
  });

  useEffect(() => {
    if (!currentIdol) {
      setFilteredSchedules([]);
      return;
    }

    const { name: idolName, groupName } = currentIdol;

    const next = ALL_SCHEDULES.filter(schedule => {
      if (scheduleHasIdol(schedule) && schedule.idol.name === idolName)
        return true;
      if (scheduleHasGroup(schedule) && schedule.group.name === groupName)
        return true;
      if (scheduleHasMembers(schedule)) {
        return schedule.members.some(
          (member: Member) => member.name === idolName,
        );
      }
      return false;
    });

    setFilteredSchedules(next);
  }, [currentIdol]);

  const handleFavoriteToggle = useCallback(() => {
    if (!idolId) return;
    toggleFavorite(idolId);
  }, [idolId, toggleFavorite]);

  const handleSearchClick = useCallback(() => {
    navigate('/search');
  }, [navigate]);

  if (!currentIdol) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-gray-500">아이돌 정보를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <header className="mb-8">
        {/* 데스크톱 */}
        <div className="hidden items-center justify-between md:flex">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleFavoriteToggle}
              aria-pressed={isFavorite}
              aria-label={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
              className="transition-transform hover:scale-110"
            >
              {isFavorite ? (
                <HeartSolid className="h-6 w-6 fill-fuchsia-600 text-fuchsia-600" />
              ) : (
                <HeartOutline className="h-6 w-6 text-fuchsia-600" />
              )}
            </button>
            <h1 className="text-2xl font-bold">
              {currentIdol.name}의 일정을 확인해보세요
            </h1>
          </div>

          <button
            type="button"
            onClick={handleSearchClick}
            className="rounded-full bg-fuchsia-500 px-6 py-2 text-white transition-colors hover:bg-fuchsia-600"
          >
            아이돌 검색
          </button>
        </div>

        {/* 모바일 */}
        <div className="md:hidden">
          <div className="mb-4 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={handleFavoriteToggle}
                aria-pressed={isFavorite}
                aria-label={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
                className="transition-transform hover:scale-110"
              >
                {isFavorite ? (
                  <HeartSolid className="h-6 w-6 fill-fuchsia-600 text-fuchsia-600" />
                ) : (
                  <HeartOutline className="h-6 w-6 text-fuchsia-600" />
                )}
              </button>
              <h1 className="text-xl font-bold">{currentIdol.name}의 일정을</h1>
            </div>
            <p className="text-lg font-medium">확인해보세요</p>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSearchClick}
              className="rounded-full bg-fuchsia-500 px-8 py-3 text-white transition-colors hover:bg-fuchsia-600"
            >
              아이돌 검색하기
            </button>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr,1.3fr]">
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <Calendar
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            schedules={filteredSchedules}
          />
        </div>

        <DateScheduleList
          role="fan"
          selectedDate={selectedDate.format('YYYY-MM-DD')}
          schedules={filteredSchedules}
        />
      </section>
    </div>
  );
}
