import { http, HttpResponse } from 'msw';

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
];
