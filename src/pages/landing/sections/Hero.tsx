import { Button } from '@/components/common/Button';
import { usePageNav } from '@/hooks/usePageNav';

function Hero() {
  const { navigateToLogin } = usePageNav();

  return (
    <div className="bg-[url(@/assets/images/placeholder-lg.jpg)] bg-cover bg-center bg-no-repeat">
      <div className="flex flex-col items-center gap-8 bg-white/15 px-[2.5%] py-24 text-white md:p-24">
        <h1 className="flex flex-col gap-4 text-center text-4xl font-bold tracking-tight break-keep sm:text-5xl xl:flex-row xl:gap-0">
          <span className="hidden xl:block">최애 아이돌의 스케줄,&nbsp;</span>
          <span className="block xl:hidden">최애 아이돌의 스케줄</span>
          <span>딩딩이 알려드릴게요</span>
        </h1>
        <div className="text-center text-sm/7 font-medium sm:text-base/7">
          <p>최애 아이돌의 스케줄이 궁금하신가요?</p>
          <p>딩딩이 최애 아이돌의 공개 스케줄을 미리 알아보고</p>
          <p>놓치지 않도록 알림으로 알려드릴게요.</p>
        </div>
        <Button
          variant="primary"
          size="lg"
          shape="pill"
          onClick={navigateToLogin}
        >
          시작하기
        </Button>
      </div>
    </div>
  );
}

export default Hero;
