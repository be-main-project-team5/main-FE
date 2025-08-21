import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import DateScheduleList from '@/components/common/dateSchedule/DateScheduleList';
import { todayYmd } from '@/utils/date';
import type { Schedule, IdolSchedule } from '@/types/schedule';

async function mockFetchDailySchedules(
  idolId: string,
  dateISO: string,
): Promise<Schedule[]> {
  const idolName = idolId || '알수없음';
  const items: IdolSchedule[] = [
    {
      id: 1,
      title: '뮤직뱅크 리허설',
      startTime: `${dateISO} 14:00`,
      endTime: `${dateISO} 15:00`,
      isPublic: true,
      idol: { id: 1, name: idolName },
    },
    {
      id: 2,
      title: '팬사인회',
      startTime: `${dateISO} 18:00`,
      endTime: `${dateISO} 19:00`,
      isPublic: true,
      idol: { id: 1, name: idolName },
    },
  ];
  return items;
}

export default function FanMainPage() {
  const { idolId = '' } = useParams<{ idolId: string }>();
  const [selectedDate, _setSelectedDate] = useState<string>(todayYmd());
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await mockFetchDailySchedules(idolId, selectedDate);
      if (mounted) setSchedules(data);
    })();
    return () => {
      mounted = false;
    };
  }, [idolId, selectedDate]);

  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr,1.3fr]">
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="mb-3 text-sm text-gray-500">
          선택 날짜: {selectedDate}
        </div>
        {/* TODO: 공용 캘린더 컴포넌트를 연결하고 onChange에서 setSelectedDate 호출 */}
      </div>

      <DateScheduleList
        role="fan"
        selectedDate={selectedDate}
        schedules={schedules}
      />
    </section>
  );
}
