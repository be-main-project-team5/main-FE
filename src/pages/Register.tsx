import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/common/Button';
import Input from '@/components/common/input';
import { useAuthNavigation } from '@/hooks/useAuthNavigation';

export default function Register() {
  const { navigateToLogin } = useAuthNavigation();

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h1 className="mb-1 text-xl font-bold">회원가입</h1>
        <p>
          일반회원(팬) 전용 회원가입 페이지 입니다.
          <br />
          매니저, 아이돌 회원가입은{' '}
          <span className="cursor-pointer font-semibold hover:underline">
            dingding@oz.com
          </span>
          으로 문의 부탁드립니다.
        </p>
      </div>
      <Input type="email" label="이메일" />
      <Input type="password" label="비밀번호" />
      <Input type="password" label="비밀번호 확인" />
      <Input type="text" label="닉네임" />
      <Button size="lg" className="my-8 w-full font-semibold">
        회원가입
        <ChevronRightIcon className="ml-2 w-5 md:block" />
      </Button>
      <p>
        이미 DingDing 회원이신가요?
        <span
          className="block cursor-pointer font-semibold hover:underline md:ml-2 md:inline"
          onClick={navigateToLogin}
        >
          지금 로그인하세요.
        </span>
      </p>
    </div>
  );
}
