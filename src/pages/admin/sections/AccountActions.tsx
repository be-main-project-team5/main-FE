import { Button } from '@/components/common/Button';

type Props = {
  onCreateIdol: () => void;
  onCreateManager: () => void;
};

export default function AccountActions({
  onCreateIdol,
  onCreateManager,
}: Props) {
  return (
    <section className="flex h-full min-h-0 flex-col items-center justify-center gap-4 rounded-2xl border-none bg-transparent p-6 shadow-none sm:p-8 md:min-h-[380px] md:justify-start md:gap-6 md:bg-gray-50 md:p-12 md:pt-16">
      <h3 className="mb-3 text-2xl font-medium whitespace-nowrap text-gray-900 md:mt-6 md:mb-6">
        아이돌/ 매니저 계정 생성
      </h3>
      <div className="flex w-full flex-col items-center gap-4 whitespace-nowrap">
        <Button variant="primary" shape="pill" size="lg" onClick={onCreateIdol}>
          아이돌 계정 생성
        </Button>
        <Button
          variant="primary"
          shape="pill"
          size="lg"
          onClick={onCreateManager}
        >
          매니저 계정 생성
        </Button>
      </div>
    </section>
  );
}
