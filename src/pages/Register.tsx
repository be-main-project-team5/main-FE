import 'react-toastify/dist/ReactToastify.css';

import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import axiosInstance from '@/api/axiosInstance';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Button } from '@/components/common/Button';
import Input from '@/components/common/input';
import { usePageNav } from '@/hooks/usePageNav';
import {
  type RegisterFormValues,
  RegisterSchema,
} from '@/schemas/registerSchema';
import {
  showErrorToast,
  showSuccessToast,
  toastFormErrors,
} from '@/utils/toastUtils';
import axios from 'axios';

export default function Register() {
  const { navigateToLogin } = usePageNav();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
    },
  });

  const { register } = form;

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      formData.append('email', data.email);
      formData.append('nickname', data.nickname);
      formData.append('password', data.password);
      formData.append('password_confirm', data.confirmPassword);

      const response = await axiosInstance.post('/users/signup/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      showSuccessToast(response.data.message || '회원가입 성공!');

      navigateToLogin();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        let errorMessage = '회원가입 실패';

        if (errorData) {
          const errorKey = Object.keys(errorData)[0];
          if (errorKey && Array.isArray(errorData[errorKey])) {
            [errorMessage] = errorData[errorKey];
          } else if (errorData.message) {
            errorMessage = errorData.message;
          }
        }

        showErrorToast(errorMessage);
      } else {
        showErrorToast('회원가입 중 네트워크 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

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

      <form
        onSubmit={form.handleSubmit(onSubmit, toastFormErrors)}
        className="flex flex-col gap-2"
      >
        <Input type="email" label="이메일" {...register('email')} />
        <Input type="password" label="비밀번호" {...register('password')} />
        <Input
          type="password"
          label="비밀번호 확인"
          {...register('confirmPassword')}
        />
        <Input type="text" label="닉네임" {...register('nickname')} />

        <Button
          type="submit"
          size="lg"
          className="my-8 w-full font-semibold"
          disabled={isLoading}
        >
          회원가입
          <ChevronRightIcon className="ml-2 w-5 md:block" />
        </Button>
      </form>

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
