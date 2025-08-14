import Card from '@/components/common/card';

function RoleCards() {
  return (
    <div className="m-auto flex max-w-screen-xl flex-col items-center gap-18 px-4 py-24">
      <h4 className="text-center text-2xl font-bold">
        팬·매니저·아이돌, 딩딩이 하나로 연결해 드려요
      </h4>
      <div className="flex scale-100 gap-8">
        <Card
          type="animation"
          title="팬"
          description="공개된 스케줄을 모아 중요 일정만 골라 알림을 받을 수 있어요."
        />
        <Card
          type="animation"
          title="팬"
          description="공개된 스케줄을 모아 중요 일정만 골라 알림을 받을 수 있어요."
        />
        <Card
          type="animation"
          title="팬"
          description="공개된 스케줄을 모아 중요 일정만 골라 알림을 받을 수 있어요."
        />
      </div>
    </div>
  );
}

export default RoleCards;
