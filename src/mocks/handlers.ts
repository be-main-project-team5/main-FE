import { http, HttpResponse } from 'msw';

import { ALL_SCHEDULES } from './data';
import { CHAT_EXAMPLES } from './data/chats';

const CHATS_BY_ROOM = {
  'chat-001': CHAT_EXAMPLES,
};

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

  http.get(`*/chats/rooms/:room_pk/messages/`, ({ request, params }) => {
    const auth =
      request.headers.get('Authorization') ??
      request.headers.get('authorization');
    const token = auth?.startsWith('Bearer ');

    if (!token) {
      return HttpResponse.json({ message: '인증 실패' }, { status: 401 });
    }

    const { room_pk } = params;

    const messages = CHATS_BY_ROOM[room_pk] ?? [];

    const sortedData = [...messages].sort(
      (a, b) => new Date(a.sendAt) - new Date(b.sendAt),
    );

    return HttpResponse.json(sortedData);
  }),
];
