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

export type DateScheduleListProps = {
  role: UserRole;
  selectedDate: string;
  schedules: Schedule[];
  onBookmarkToggle?: (id: string) => void;
  onNotifyToggle?: (id: string) => void;
  onEditClick?: (id: string) => void;
  onDeleteClick?: (id: string) => void;
  className?: string;
};
