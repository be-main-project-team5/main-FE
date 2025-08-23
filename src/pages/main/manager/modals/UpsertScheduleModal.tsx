import ScheduleFormModal from '@/components/common/modal/ScheduleFormModal';

type Props = {
  open: boolean;
  mode: 'create' | 'edit';
  onClose: () => void;
  // 추후 API 연동시 사용 예정
  onSubmit?: (form: unknown) => Promise<void> | void;
  scheduleId?: number | null;
};

export default function UpsertScheduleModal({ open, mode, onClose }: Props) {
  const title = mode === 'create' ? '일정 등록' : '일정 수정';

  return <ScheduleFormModal isOpen={open} onClose={onClose} title={title} />;
}
