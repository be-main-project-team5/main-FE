import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import { useCallback } from 'react';

import { Button } from '@/components/common/Button';
import Calendar from '@/components/common/calendar/Calendar';
import DateScheduleList from '@/components/common/dateSchedule/DateScheduleList';

import { CalendarScheduleLayout, Greeting } from '../shared';
import { useIdolMainData } from './hooks/useIdolMainData';

export default function IdolMainPage() {
  const { selectedDate, setSelectedDate, filteredSchedules } =
    useIdolMainData();

  const handleChatClick = useCallback(() => {
    // TODO: 실제 라우팅 연결 (예: navigate('/chat'))
  }, []);

  const rightAction = (
    <Button
      onClick={handleChatClick}
      variant="outline"
      shape="pill"
      size="lg"
      className="group mt-6 flex items-center gap-2 border-fuchsia-400 px-6 font-bold whitespace-nowrap text-fuchsia-600 hover:bg-fuchsia-400 hover:text-white lg:ml-6"
    >
      <ChatBubbleLeftRightIcon className="h-5 w-5 text-fuchsia-500 transition-colors group-hover:text-white" />
      매니저와 채팅
    </Button>
  );

  return (
    <div className="mx-auto mb-16 max-w-screen-xl px-3 pt-12 md:px-8 lg:mb-24 lg:px-2 lg:pt-6">
      <Greeting
        userRole="idol"
        title="안녕하세요, 카리나님!"
        subtitle="오늘의 스케줄을 확인해보세요."
        rightAction={rightAction}
      />

      <CalendarScheduleLayout
        dailyMinWidth={420}
        calendar={
          <Calendar
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            schedules={filteredSchedules}
          />
        }
        daily={
          <DateScheduleList
            userRole="idol"
            selectedDate={selectedDate.format('YYYY-MM-DD')}
            schedules={filteredSchedules}
          />
        }
      />
    </div>
  );
}
