import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import DateScheduleList from '@/components/common/dateSchedule/DateScheduleList';
import { todayYmd } from '@/utils/date';
import type { Schedule } from '@/types/schedule';

import { ALL_SCHEDULES } from '@/mocks/data';
import { MOCK_IDOLS } from '@/mocks/data/idols';

export default function FanMainPage() {
  const { idolId = '' } = useParams<{ idolId: string }>();
  const [selectedDate, _setSelectedDate] = useState<string>(todayYmd());
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    const idol = MOCK_IDOLS.find(i => i.id === idolId) ?? null;
    const idolName = idol?.name ?? '';
    const idolGroupName = idol?.groupName ?? '';

    const filtered = ALL_SCHEDULES.filter(s => {
      const isSolo = 'idol' in s && s.idol?.name === idolName;
      const isGroup = 'group' in s && s.group?.name === idolGroupName;
      const isMemberListed =
        Array.isArray((s as any).members) &&
        (s as any).members.some((m: { name: string }) => m.name === idolName);
      return isSolo || isGroup || isMemberListed;
    });

    setSchedules(filtered);
  }, [idolId]);

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
