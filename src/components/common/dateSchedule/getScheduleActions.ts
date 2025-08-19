import type { Schedule } from '@/types/schedule';

import type { UserRole } from './dateSchedule.types';

export type ActionIcon =
  | 'star'
  | 'star-filled'
  | 'bell'
  | 'bell-filled'
  | 'edit'
  | 'delete';

export type ScheduleActionType =
  | 'bookmark'
  | 'notification'
  | 'edit'
  | 'delete';

export interface ScheduleActionInfo {
  key: ScheduleActionType;
  ariaLabel: string;
  icon: ActionIcon;
  onClick: () => void;
}

type Handlers = {
  onBookmarkToggle?: (id: number) => void;
  onNotifyToggle?: (id: number) => void;
  onEditClick?: (id: number) => void;
  onDeleteClick?: (id: number) => void;
};

export function getScheduleActions(
  role: UserRole,
  item: Schedule,
  { onBookmarkToggle, onNotifyToggle, onEditClick, onDeleteClick }: Handlers,
): ScheduleActionInfo[] {
  switch (role) {
    case 'fan':
      return [
        {
          key: 'bookmark',
          ariaLabel: '즐겨찾기',
          icon: item.isBookmarked ? 'star-filled' : 'star',
          onClick: () => onBookmarkToggle?.(item.id),
        },
      ];

    case 'favorites':
      return [
        {
          key: 'bookmark',
          ariaLabel: '즐겨찾기',
          icon: 'star-filled',
          onClick: () => onBookmarkToggle?.(item.id),
        },
        {
          key: 'notification',
          ariaLabel: '알림 설정',
          icon: item.isNotified ? 'bell-filled' : 'bell',
          onClick: () => onNotifyToggle?.(item.id),
        },
      ];

    case 'manager':
      return [
        {
          key: 'edit',
          ariaLabel: '수정',
          icon: 'edit',
          onClick: () => onEditClick?.(item.id),
        },
        {
          key: 'delete',
          ariaLabel: '삭제',
          icon: 'delete',
          onClick: () => onDeleteClick?.(item.id),
        },
      ];

    default:
      return [];
  }
}
