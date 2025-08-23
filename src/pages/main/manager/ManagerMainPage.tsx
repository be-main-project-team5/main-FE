import { PlusIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/common/Button';
import Calendar from '@/components/common/calendar/Calendar';
import DateScheduleList from '@/components/common/dateSchedule/DateScheduleList';
import Select from '@/components/common/Select';
import { CalendarScheduleLayout, Greeting } from '../shared';
import { useManagerMainData } from './hooks/useManagerMainData';

export default function ManagerMainPage() {
  const {
    selectedDate,
    setSelectedDate,
    idols,
    currentIdolId,
    setCurrentIdolId,
    filteredSchedules,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
  } = useManagerMainData();

  const rightAction = (
    <div className="mt-6 flex gap-3 lg:ml-6">
      <Button
        onClick={handleAddClick}
        shape="pill"
        size="lg"
        className="flex items-center gap-2 bg-fuchsia-100 px-5 font-semibold text-fuchsia-700 hover:bg-fuchsia-200"
      >
        <PlusIcon className="h-5 w-5" />
        일정 등록
      </Button>
      <Button
        onClick={() => alert('아이돌과 채팅으로 이동')}
        variant="outline"
        shape="pill"
        size="lg"
        className="group flex items-center gap-2 border-fuchsia-400 px-5 font-semibold text-fuchsia-600 hover:bg-fuchsia-400 hover:text-white"
      >
        <ChatBubbleLeftRightIcon className="h-5 w-5 text-fuchsia-400 transition-colors group-hover:text-white" />
        아이돌과 채팅
      </Button>
    </div>
  );

  return (
    <div className="mx-auto mb-16 max-w-screen-xl px-3 pt-12 md:px-8 lg:mb-24 lg:px-2 lg:pt-6">
      <Greeting
        userRole="manager"
        title="안녕하세요, 매니저 A님!"
        subtitle="오늘 담당 아티스트의 일정을 관리하세요."
        rightAction={rightAction}
      />

      <div className="mb-4 lg:mb-2">
        <span className="mr-2 text-gray-600">현재 담당 아이돌은</span>
        <Select
          list={idols}
          value={currentIdolId}
          onChange={v => setCurrentIdolId(Number(v))}
          size="small"
          className="inline-block min-w-[120px]"
        />
        <span className="ml-2 text-gray-600">입니다.</span>
      </div>

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
            userRole="manager"
            selectedDate={selectedDate.format('YYYY-MM-DD')}
            schedules={filteredSchedules}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        }
      />
    </div>
  );
}
