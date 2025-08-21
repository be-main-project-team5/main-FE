import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import {
  RegisterSchema,
  type RegisterFormValues,
} from '@/schemas/registerSchema';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/common/Button';
import Input from '@/components/common/input';

export default function Register() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
    },
    mode: 'onBlur',
  });

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h1 className="mb-1 text-xl font-bold">회원가입</h1>
        <p>
          일반회원(팬) 전용 회원가입 페이지 입니다.
          <br />
          매니저, 아이돌 회원가입은
          <span className="cursor-pointer font-semibold hover:underline">
            dingding@oz.com
          </span>
          으로 문의 부탁드립니다.
        </p>
      </div>

      <FormProvider {...form}>
        <Input type="email" label="이메일" {...register('email')} />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}

        <Input type="password" label="비밀번호" {...register('password')} />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}

        <Input
          type="password"
          label="비밀번호 확인"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}

        <Input type="text" label="닉네임" {...register('nickname')} />
        {errors.nickname && (
          <p className="mt-1 text-sm text-red-600">{errors.nickname.message}</p>
        )}

        <Button size="lg" className="my-8 w-full font-semibold">
          회원가입
          <ChevronRightIcon className="ml-2 w-5 md:block" />
        </Button>
      </FormProvider>

      <p>
        이미 DingDing 회원이신가요?
        <Link
          to="/auth/login"
          className="block cursor-pointer font-semibold hover:underline md:ml-2 md:inline"
        >
          지금 로그인하세요.
        </Link>
      </p>
    </div>
  );
}
