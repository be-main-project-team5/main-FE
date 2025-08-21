import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Calendar from '@/components/common/calendar/Calendar';
import DateScheduleList from '@/components/common/dateSchedule/DateScheduleList';

import { useFavoritesStore } from '@/stores/favoritesStore';
import type { Schedule } from '@/types/schedule';

import { ALL_SCHEDULES } from '@/mocks/data';
import { MOCK_IDOLS } from '@/mocks/data/idols';

import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

export default function FanMainPage() {
  const { idolId = '' } = useParams<{ idolId: string }>();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const isFavoritedFn = useFavoritesStore(s => s.isFavorited);
  const toggleFavorite = useFavoritesStore(s => s.toggleFavorite);

  const currentIdol = useMemo(
    () => MOCK_IDOLS.find(i => i.id === idolId) ?? null,
    [idolId],
  );

  const isFav = idolId ? isFavoritedFn(idolId) : false;

  useEffect(() => {
    const idolName = currentIdol?.name ?? '';
    const idolGroupName = currentIdol?.groupName ?? '';

    const filtered = ALL_SCHEDULES.filter(s => {
      const isSolo = 'idol' in s && s.idol?.name === idolName;
      const isGroup = 'group' in s && s.group?.name === idolGroupName;
      const isMemberListed =
        Array.isArray((s as any).members) &&
        (s as any).members.some((m: { name: string }) => m.name === idolName);
      return isSolo || isGroup || isMemberListed;
    });

    setSchedules(filtered);
  }, [currentIdol]);

  const handleFavoriteToggle = () => {
    if (idolId) toggleFavorite(idolId);
  };

  const handleSearchClick = () => {
    navigate('/search');
  };

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
        <div className="hidden items-center justify-between md:flex">
          <div className="flex items-center gap-3">
            <button
              onClick={handleFavoriteToggle}
              aria-pressed={isFav}
              aria-label={isFav ? '즐겨찾기 해제' : '즐겨찾기 추가'}
              className="transition-transform hover:scale-110"
            >
              {isFav ? (
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
            onClick={handleSearchClick}
            className="rounded-full bg-fuchsia-500 px-6 py-2 text-white transition-colors hover:bg-fuchsia-600"
          >
            아이돌 검색
          </button>
        </div>

        <div className="md:hidden">
          <div className="mb-4 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <button
                onClick={handleFavoriteToggle}
                aria-pressed={isFav}
                aria-label={isFav ? '즐겨찾기 해제' : '즐겨찾기 추가'}
                className="transition-transform hover:scale-110"
              >
                {isFav ? (
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
            schedules={schedules}
          />
        </div>

        <DateScheduleList
          role="fan"
          selectedDate={selectedDate.format('YYYY-MM-DD')}
          schedules={schedules}
        />
      </section>
    </div>
  );
}
