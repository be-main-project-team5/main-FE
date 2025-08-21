import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import Calendar from '@/components/common/calendar/Calendar';
import DateScheduleList from '@/components/common/dateSchedule/DateScheduleList';
import { Button } from '@/components/common/Button';
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

function scheduleHasIdol(
  s: Schedule,
): s is Schedule & { idol: { name: string } } {
  return (
    typeof (s as any).idol?.name === 'string' && (s as any).idol.name.length > 0
  );
}
function scheduleHasGroup(
  s: Schedule,
): s is Schedule & { group: { name: string } } {
  return (
    typeof (s as any).group?.name === 'string' &&
    (s as any).group.name.length > 0
  );
}
function scheduleHasMembers(
  s: Schedule,
): s is Schedule & { members: Member[] } {
  return Array.isArray((s as any).members);
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
    () => MOCK_IDOLS.find(i => i.id === idolId) ?? null,
    [idolId],
  );
  const isFavorite = useMemo(
    () => (idolId ? favoriteIds.includes(idolId) : false),
    [idolId, favoriteIds],
  );

  useEffect(() => {
    (async () => {
      try {
        const list = await fetchFavoriteIdols();
        setServerFavoriteIds(list.map(v => v.id));
      } catch (e) {
        console.error('즐겨찾기 초기 로드 실패:', e);
      }
    })();
  }, []);

  useSyncArrayData<string>({
    serverData: serverFavoriteIds,
    clientData: favoriteIds,
    applyFn: toggleFavorite,
    onSync: async (added, removed) => {
      try {
        await Promise.all([
          ...added.map(serverToggleFavorite),
          ...removed.map(serverToggleFavorite),
        ]);
        const list = await fetchFavoriteIdols();
        setServerFavoriteIds(list.map(v => v.id));
      } catch (e) {
        console.error('서버 동기화 실패:', e);
      }
    },
  });

  useEffect(() => {
    if (!currentIdol) return setFilteredSchedules([]);
    const { name: idolName, groupName } = currentIdol;
    const next = ALL_SCHEDULES.filter(s => {
      if (scheduleHasIdol(s) && s.idol.name === idolName) return true;
      if (scheduleHasGroup(s) && s.group.name === groupName) return true;
      if (scheduleHasMembers(s))
        return s.members.some((m: Member) => m.name === idolName);
      return false;
    });
    setFilteredSchedules(next);
  }, [currentIdol]);

  const handleFavoriteToggle = useCallback(() => {
    if (idolId) toggleFavorite(idolId);
  }, [idolId, toggleFavorite]);

  const handleSearchClick = useCallback(() => navigate('/search'), [navigate]);

  if (!currentIdol) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-gray-500">아이돌 정보를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="mx-auto mb-16 max-w-screen-xl px-3 pt-12 md:px-8 lg:mb-24 lg:px-2 lg:pt-6">
      <header className="mb-8">
        {/* Desktop (lg↑) */}
        <div className="hidden items-center justify-between gap-6 lg:flex">
          <div className="flex min-w-0 flex-1 items-center gap-3 pt-11 pb-16">
            <button
              type="button"
              onClick={handleFavoriteToggle}
              aria-pressed={isFavorite}
              aria-label={isFavorite ? '찜 해제' : '찜 추가'}
              className="transition-transform hover:scale-110"
            >
              {isFavorite ? (
                <HeartSolid className="h-12 w-12 fill-fuchsia-500 text-fuchsia-500" />
              ) : (
                <HeartOutline className="h-12 w-12 text-fuchsia-500" />
              )}
            </button>
            <h1 className="truncate text-4xl font-bold whitespace-nowrap">
              {currentIdol.name}의 일정을 확인해보세요
            </h1>
          </div>
          <Button
            onClick={handleSearchClick}
            variant="primary"
            shape="pill"
            size="lg"
            className="mt-6 shrink-0 px-6 whitespace-nowrap lg:ml-6"
          >
            아이돌 검색하기
          </Button>
        </div>

        {/* Mobile + Tablet (lg↓) */}
        <div className="lg:hidden">
          <div className="mb-4 text-center">
            <div className="mb-1 flex items-center justify-center gap-1">
              <button
                type="button"
                onClick={handleFavoriteToggle}
                aria-pressed={isFavorite}
                aria-label={isFavorite ? '찜 해제' : '찜 추가'}
                className="transition-transform hover:scale-110"
              >
                {isFavorite ? (
                  <HeartSolid className="h-8 w-8 fill-fuchsia-500 text-fuchsia-500" />
                ) : (
                  <HeartOutline className="h-8 w-8 text-fuchsia-500" />
                )}
              </button>
              <h1 className="text-3xl font-bold">
                {currentIdol.name}의 일정을
              </h1>
            </div>
            <h1 className="ml-2 text-3xl font-bold">확인해보세요</h1>
          </div>
          <div className="flex justify-center">
            <Button
              onClick={handleSearchClick}
              variant="primary"
              shape="pill"
              size="lg"
              className="my-2 px-8 whitespace-nowrap"
            >
              아이돌 검색하기
            </Button>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-10 md:gap-14 lg:mb-10 lg:grid-cols-[3fr_2fr] lg:items-start">
        <div className="w-full">
          <div className="w-full rounded-2xl bg-white text-sm">
            <Calendar
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              schedules={filteredSchedules}
            />
          </div>
        </div>
        <div className="w-full">
          <div className="w-full rounded-2xl bg-white">
            <DateScheduleList
              role="fan"
              selectedDate={selectedDate.format('YYYY-MM-DD')}
              schedules={filteredSchedules}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
