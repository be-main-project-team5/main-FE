import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';

import Calendar from '@/components/common/calendar/Calendar';
import DateScheduleList from '@/components/common/dateSchedule/DateScheduleList';
import type { Schedule } from '@/types/schedule';

import { ALL_SCHEDULES } from '@/mocks/data';
import { MOCK_IDOLS } from '@/mocks/data/idols';

export default function FanMainPage() {
  const { idolId = '' } = useParams<{ idolId: string }>();
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
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
          선택 날짜: {selectedDate.format('YYYY-MM-DD')}
        </div>
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
  );
}
