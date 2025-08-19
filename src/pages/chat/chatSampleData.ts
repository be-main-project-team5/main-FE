interface ChatTypes {
  id: string;
  conversationId: string;
  author: 'me' | 'other';
  authorName?: string;
  text: string;
  createdAt: string;
}

export const CHAT_EXAMPLES: ChatTypes[] = [
  {
    id: 'm-001',
    conversationId: 'idol-01',
    author: 'other',
    authorName: '김ㅇㅇ 매니저',
    text: '스케줄 확인 가능해요?',
    createdAt: '2025-08-19T05:59:10Z',
  },
  {
    id: 'm-002',
    conversationId: 'idol-01',
    author: 'me',
    text: '네, 지금 확인 중입니다!',
    createdAt: '2025-08-19T06:00:05Z',
  },
  {
    id: 'm-003',
    conversationId: 'idol-01',
    author: 'other',
    authorName: '김ㅇㅇ 매니저',
    text: '내일 팬사인회 장소가 변경됐어요.',
    createdAt: '2025-08-19T06:01:20Z',
  },
  {
    id: 'm-004',
    conversationId: 'idol-01',
    author: 'other',
    authorName: '김ㅇㅇ 매니저',
    text: '기존 A홀 → B홀(3층). 동선은 대기실→스테이지→포토월 순서고, 입장 10분 전에 리허설 한 번 잡을게요.',
    createdAt: '2025-08-19T06:01:20Z',
  },
  {
    id: 'm-005',
    conversationId: 'idol-01',
    author: 'me',
    text: 'B홀 3층 확인했습니다. 리허설 2시간 전 합류할게요.',
    createdAt: '2025-08-19T06:02:48Z',
  },
  {
    id: 'm-006',
    conversationId: 'idol-01',
    author: 'other',
    authorName: '김ㅇㅇ 매니저',
    text: '의상 컨펌도 부탁해요. 2번 안으로 가면 좋을 듯!',
    createdAt: '2025-08-19T06:05:00Z',
  },
  {
    id: 'm-007',
    conversationId: 'idol-01',
    author: 'me',
    text: '2번 찬성! 신발은 화이트로 갈게요.',
    createdAt: '2025-08-19T06:05:45Z',
  },
  {
    id: 'm-008',
    conversationId: 'idol-01',
    author: 'other',
    authorName: '김ㅇㅇ 매니저',
    text: '좋아요. 그리고 팬미팅 종료 후 바로 인터뷰 하나 있어요(로비 C구역). 이동 동선 겹치지 않도록 스태프 배치해 둘게요.',
    createdAt: '2025-08-19T06:08:12Z',
  },
  {
    id: 'm-009',
    conversationId: 'idol-01',
    author: 'me',
    text: '확인! 끝나고 바로 이동하겠습니다 🙌',
    createdAt: '2025-08-19T06:09:30Z',
  },
  {
    id: 'm-010',
    conversationId: 'idol-01',
    author: 'me',
    text: '스태프 분들께도 공지 부탁드려요. 고생 많으십니다!',
    createdAt: '2025-08-19T06:10:05Z',
  },
];
