import type { Dayjs } from 'dayjs';

// *memo - 스케줄 타입은 api 연결할 때 명세서 참고해서 확정된 형식으로 수정 후 사용
export interface ScheduleTypes {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  description?: string;
  isPublic: boolean;
}

export interface CalendarDateHeaderProps {
  date: Dayjs;
  isToday: boolean;
  isSelected: boolean;
}

export interface CalendarScheduleProps {
  schedule: ScheduleTypes;
  isSelected: boolean;
}

export interface CalendarScheduleFooterProps {
  hiddenCount: number;
  isSelected: boolean;
}

export interface CalendarDateProps {
  date: Dayjs;
  viewDate: Dayjs;
  selectedDate: Dayjs;
  handleClickDate: (date: Dayjs) => void;
}

export interface CalendarToolbarProps {
  year: number;
  month: number;
  handleMovePrevMonth: () => void;
  handleMoveNextMonth: () => void;
  handleMoveCurrentMonth: () => void;
}
