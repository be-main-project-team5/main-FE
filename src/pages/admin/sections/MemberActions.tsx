import { Button } from '@/components/common/Button';

type Props = {
  onOpenMembers: () => void;
};

export default function MemberActions({ onOpenMembers }: Props) {
  return (
    <section className="flex h-full min-h-0 flex-col items-center justify-center gap-4 rounded-2xl border-none bg-transparent p-6 shadow-none sm:p-8 md:min-h-[380px] md:justify-start md:gap-6 md:bg-gray-50 md:p-12 md:pt-16">
      <h3 className="mb-2 text-2xl font-medium text-gray-900 md:mt-6">
        회원 관리
      </h3>
      <div className="flex w-full flex-col items-center gap-4 md:mt-10">
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
