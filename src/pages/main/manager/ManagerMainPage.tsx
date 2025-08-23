import { PlusIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/common/Button';
import Calendar from '@/components/common/calendar/Calendar';
import DateScheduleList from '@/components/common/dateSchedule/DateScheduleList';
import Select from '@/components/common/Select';
import { CalendarScheduleLayout, Greeting } from '../shared';
import { useManagerMainData } from './hooks/useManagerMainData';
import UpsertScheduleModal from './modals/UpsertScheduleModal';
import DeleteScheduleModal from './modals/DeleteScheduleModal';
import { useManagerScheduleModals } from './hooks/useManagerScheduleModals';

export default function ManagerMainPage() {
  const {
    selectedDate,
    setSelectedDate,
    idols,
    currentIdolId,
    setCurrentIdolId,
    filteredSchedules,
    handleDeleteClick,
  } = useManagerMainData();

  const {
    createOpen,
    editOpen,
    deleteOpen,
    targetId,
    targetTitle,
    openCreate,
    closeCreate,
    openEdit,
    closeEdit,
    openDelete,
    closeDelete,
    resetTarget,
  } = useManagerScheduleModals();

  const rightAction = (
    <div className="mt-6 flex gap-3 lg:ml-6">
      <Button
        onClick={openCreate}
        shape="pill"
        size="lg"
        className="inline-flex min-w-[185px] items-center justify-center gap-2 bg-fuchsia-100 px-6 font-semibold whitespace-nowrap hover:bg-fuchsia-500 hover:text-white"
      >
        <PlusIcon className="h-6 w-6" />
        일정 등록
      </Button>

      <Button
        onClick={() => alert('아이돌과 채팅으로 이동')}
        variant="outline"
        shape="pill"
        size="lg"
        className="group inline-flex min-w-[185px] items-center justify-center gap-2 border-fuchsia-400 px-6 font-semibold whitespace-nowrap hover:bg-fuchsia-500 hover:text-white"
      >
        <ChatBubbleLeftRightIcon className="h-6 w-6 text-fuchsia-400 transition-colors group-hover:text-white" />
        아이돌과 채팅
      </Button>
    </div>
  );

  const handleOpenDelete = (id: number, title?: string) => {
    const safeTitle =
      title ?? filteredSchedules.find(s => s.id === id)?.title ?? '';
    openDelete(id, safeTitle);
  };

  return (
    <div className="mx-auto mb-16 max-w-screen-xl px-3 pt-12 md:px-8 lg:mb-24 lg:px-2 lg:pt-6">
      <Greeting
        userRole="manager"
        title="안녕하세요, 매니저 A님!"
        subtitle={
          <span className="inline-flex items-center gap-2">
            현재 담당 아이돌은
            <Select
              list={idols}
              value={currentIdolId}
              onChange={v => setCurrentIdolId(Number(v))}
              size="small"
              className="inline-block min-w-[100px] py-2 pr-7 pl-2 text-base leading-tight before:right-2"
            />
            입니다.
          </span>
        }
        rightAction={rightAction}
        subtitleClassName="mt-3 lg:mt-4"
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
            userRole="manager"
            selectedDate={selectedDate.format('YYYY-MM-DD')}
            schedules={filteredSchedules}
            onEditClick={id => openEdit(id)}
            onDeleteClick={handleOpenDelete}
          />
        }
      />

      <UpsertScheduleModal
        open={createOpen}
        mode="create"
        onClose={() => {
          closeCreate();
          resetTarget();
        }}
      />
      <UpsertScheduleModal
        open={editOpen}
        mode="edit"
        scheduleId={targetId}
        onClose={() => {
          closeEdit();
          resetTarget();
        }}
      />
      <DeleteScheduleModal
        open={deleteOpen}
        titleName={targetTitle}
        onClose={() => {
          closeDelete();
          resetTarget();
        }}
        onConfirm={() => {
          if (targetId == null) return;
          handleDeleteClick(targetId);
          closeDelete();
          resetTarget();
        }}
      />
    </div>
  );
}
