import { http, HttpResponse } from 'msw';

import { ALL_SCHEDULES } from './data';

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
];
