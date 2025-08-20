import { Button } from '@/components/common/Button';

type Props = {
  onOpenMembers: () => void;
};

export default function MemberActions({ onOpenMembers }: Props) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-gray-200 bg-gray-50/60 p-8 shadow-sm sm:p-10 md:p-12">
      <h3 className="text-lg font-semibold text-gray-900">회원 관리</h3>
      <div className="flex w-full flex-col items-center gap-4">
        <Button
          variant="primary"
          shape="pill"
          size="lg"
          onClick={onOpenMembers}
        >
          회원 목록 조회
        </Button>
      </div>
    </section>
  );
}
