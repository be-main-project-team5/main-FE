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
    <section className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-gray-200 bg-gray-50/60 p-8 shadow-sm sm:p-10 md:p-12">
      <h3 className="text-lg font-semibold text-gray-900">
        아이돌/ 매니저 계정 생성
      </h3>
      <div className="flex w-full flex-col items-center gap-4">
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
