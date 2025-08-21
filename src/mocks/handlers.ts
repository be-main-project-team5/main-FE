import { http, HttpResponse } from 'msw';

import { ALL_SCHEDULES } from './data';

interface SignUpRequestBody {
  email: string;
  nickname: string;
  password: string;
  userType: string;
}

interface SignInRequestBody {
  email: string;
  password: string;
  userType: string;
}

const users: {
  id: string;
  username: string;
  fullname: string;
  password: string;
  userType: string;
  image: string;
}[] = [];

export const handlers = [
  http.get('/bookmark/idol', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: '카리나',
        group: '에스파',
        position: '리더, 댄서',
      },
      {
        id: 2,
        name: '장원영',
        group: '아이브',
        position: '보컬',
      },
      {
        id: 3,
        name: '민지',
        group: '뉴진스',
        position: '보컬, 댄서',
      },
      {
        id: 4,
        name: '사쿠라',
        group: '르세라핌',
        position: '보컬',
      },
    ]);
  }),

  http.get('/schedules/my', ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');

    if (!date) {
      return HttpResponse.json(ALL_SCHEDULES); // 날짜가 없으면 모든 스케줄 반환
    }

    const schedulesForDate = ALL_SCHEDULES.filter(schedule =>
      schedule.startTime.startsWith(date),
    );
    return HttpResponse.json(schedulesForDate);
  }),

  http.post('/users/signup', async ({ request }) => {
    // console.log('MSW: Received sign-up request');
    let requestBody: SignUpRequestBody;
    try {
      requestBody = (await request.json()) as SignUpRequestBody;
      // console.log('MSW: Request body parsed:', requestBody);
    } catch (e) {
      // console.error('MSW: Error parsing request body:', e);
      return HttpResponse.json(
        { message: '잘못된 요청 바디입니다.' },
        { status: 400 },
      );
    }

    const { email, nickname, password } = requestBody;

    if (users.find(user => user.username === email)) {
      // console.log('MSW: Email already exists:', email);
      return HttpResponse.json(
        {
          message_code: 400,
          message: '이미 가입한 이메일 주소입니다.',
          data: null,
        },
        { status: 400 },
      );
    }

    const user = {
      id: Math.random().toString(36).substring(2, 10),
      username: email,
      fullname: nickname,
      password,
      userType: '일반',
      image: 'default-profile.jpg',
    };

    users.push(user);
    // console.log('MSW: User registered:', user);
    // console.log('MSW: Current users array:', users);

    return HttpResponse.json(
      {
        message_code: 201,
        message: '회원가입이 성공적으로 완료되었습니다.',
        data: user,
      },
      { status: 201 },
    );
  }),

  http.post('/users/login', async ({ request }) => {
    const { email, password, userType } =
      (await request.json()) as SignInRequestBody;
    const user = users.find(
      u =>
        u.username === email &&
        u.password === password &&
        u.userType === userType,
    );

    if (!user) {
      return HttpResponse.json(
        {
          message_code: 401,
          message: '이메일 또는 비밀번호가 일치하지 않습니다.',
          data: null,
        },
        { status: 401 },
      );
    }

    return HttpResponse.json(
      {
        message_code: 200,
        message: '성공적으로 로그인되었습니다.',
        data: {
          id: user.id,
          username: user.username,
          fullname: user.fullname,
          userType: user.userType,
          image: user.image,
        },
      },
      { status: 200 },
    );
  }),
];
