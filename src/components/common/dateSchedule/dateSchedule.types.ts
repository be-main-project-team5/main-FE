import type { Schedule } from '@/types/schedule';

export type UserRole = 'manager' | 'idol' | 'fan' | 'favorites';

// 일정에서 공통으로 쓰이는 버튼 동작(이벤트) 타입
type ScheduleActionHandler = (id: number) => void;

interface ScheduleActionProps {
  onBookmarkToggle?: ScheduleActionHandler;
  onNotifyToggle?: ScheduleActionHandler;
  onEditClick?: ScheduleActionHandler;
  onDeleteClick?: ScheduleActionHandler;
}

// 컴포넌트에 전달하는 Props 타입
export interface DateScheduleListProps extends ScheduleActionProps {
  role: UserRole;
  selectedDate: string;
  schedules: Schedule[];
  className?: string;
}

export interface DateScheduleItemProps extends ScheduleActionProps {
  item: Schedule;
  role: UserRole;
}

// 아이콘 버튼 컴포넌트 Props 타입
export interface IconButtonProps {
  ariaLabel: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}
