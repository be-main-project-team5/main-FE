export type UserRole = 'manager' | 'idol' | 'fan' | 'favorites';

export type Schedule = {
  id: string;
  dateISO: string;
  time: string;
  summary: string;
  title: string;
  location: string;
  participants: string[];
  isBookmarked?: boolean;
  isNotified?: boolean;
};

export interface IconButtonProps {
  ariaLabel: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

// 공통 핸들러 타입
type ScheduleActionHandler = (id: string) => void;

// 공통 Props
interface ScheduleActionProps {
  onBookmarkToggle?: ScheduleActionHandler;
  onNotifyToggle?: ScheduleActionHandler;
  onEditClick?: ScheduleActionHandler;
  onDeleteClick?: ScheduleActionHandler;
}

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
