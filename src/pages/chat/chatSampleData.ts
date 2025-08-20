import type { ChatTypes } from './chat.types';

const MANAGER_PROFILE_IMAGE =
  'https://placehold.co/300x300/orange/white?text=❤';

export const CHAT_EXAMPLES: ChatTypes[] = [
  // ── 과거(지난 날짜) ───────────────────────────────────────────────
  {
    id: 'm-000',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '이번 주 주요 일정 정리해서 공유드릴게요.',
    sendAt: '2025-08-01T03:20:00Z',
  },
  {
    id: 'm-000a',
    sender: {
      id: 'idol-01',
      nickname: '리즈',
      profile_image: undefined,
    },
    content: '네 감사합니다! 정리본 받으면 캘린더에 반영할게요.',
    sendAt: '2025-08-01T03:25:10Z',
  },

  // ── 어제(2025-08-18) ──────────────────────────────────────────────
  {
    id: 'm-000b',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '내일 팬사인회 사전 동선 다시 한 번 체크 부탁드려요.',
    sendAt: '2025-08-18T14:55:00Z',
  },
  {
    id: 'm-000c',
    sender: {
      id: 'idol-01',
      nickname: '리즈',
      profile_image: undefined,
    },
    content: '네, 리허설 포함해서 점검 목록 업데이트해둘게요.',
    sendAt: '2025-08-18T15:02:30Z',
  },

  // ── 오늘(원본 2025-08-19) ─────────────────────────────────────────
  {
    id: 'm-001',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '스케줄 확인 가능해요?',
    sendAt: '2025-08-19T05:59:10Z',
  },
  {
    id: 'm-002',
    sender: {
      id: 'idol-01',
      nickname: '리즈',
      profile_image: undefined,
    },
    content: '네, 지금 확인 중입니다!',
    sendAt: '2025-08-19T06:00:05Z',
  },
  {
    id: 'm-003',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '내일 팬사인회 장소가 변경됐어요.',
    sendAt: '2025-08-19T06:01:20Z',
  },
  {
    id: 'm-004',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content:
      '기존 A홀 → B홀(3층). 동선은 대기실→스테이지→포토월 순서고, 입장 10분 전에 리허설 한 번 잡을게요.',
    sendAt: '2025-08-19T06:01:20Z',
  },
  {
    id: 'm-005',
    sender: {
      id: 'idol-01',
      nickname: '리즈',
      profile_image: undefined,
    },
    content: 'B홀 3층 확인했습니다. 리허설 2시간 전 합류할게요.',
    sendAt: '2025-08-19T06:02:48Z',
  },
  {
    id: 'm-006',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '의상 컨펌도 부탁해요. 2번 안으로 가면 좋을 듯!',
    sendAt: '2025-08-19T06:05:00Z',
  },
  {
    id: 'm-007',
    sender: {
      id: 'idol-01',
      nickname: '리즈',
      profile_image: undefined,
    },
    content: '2번 찬성! 신발은 화이트로 갈게요.',
    sendAt: '2025-08-19T06:05:45Z',
  },
  {
    id: 'm-008',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content:
      '좋아요. 그리고 팬미팅 종료 후 바로 인터뷰 하나 있어요(로비 C구역). 이동 동선 겹치지 않도록 스태프 배치해 둘게요.',
    sendAt: '2025-08-19T06:08:12Z',
  },
  {
    id: 'm-009',
    sender: {
      id: 'idol-01',
      nickname: '리즈',
      profile_image: undefined,
    },
    content: '확인! 끝나고 바로 이동하겠습니다 🙌',
    sendAt: '2025-08-19T06:09:30Z',
  },
  {
    id: 'm-010',
    sender: {
      id: 'idol-01',
      nickname: '리즈',
      profile_image: undefined,
    },
    content: '스태프 분들께도 공지 부탁드려요. 고생 많으십니다!',
    sendAt: '2025-08-19T06:10:05Z',
  },

  // ── 내 메시지 연속 전송 케이스 추가 ────────────────────────────────
  {
    id: 'm-011',
    sender: {
      id: 'idol-01',
      nickname: '리즈',
      profile_image: undefined,
    },
    content: '의상 일정표에도 변경사항 표시해둘게요.',
    sendAt: '2025-08-19T06:10:25Z',
  },
  {
    id: 'm-012',
    sender: {
      id: 'idol-01',
      nickname: '리즈',
      profile_image: undefined,
    },
    content: 'B홀 출입 동선 도면 받으면 바로 공유 부탁드려요.',
    sendAt: '2025-08-19T06:10:40Z',
  },

  // ── 이후 상대 답장 ────────────────────────────────────────────────
  {
    id: 'm-013',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '도면 받았습니다. 곧 업로드해서 링크 전달드릴게요.',
    sendAt: '2025-08-19T06:11:30Z',
  },

  // ── 반복 데이터
  // ── 이후 상대 답장 (날짜만 다르게, id 고유) ─────────────────────────
  {
    id: 'm-014',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '도면 받았습니다. 곧 업로드해서 링크 전달드릴게요.',
    sendAt: '2025-08-20T06:11:30Z',
  },
  {
    id: 'm-015',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '도면 받았습니다. 곧 업로드해서 링크 전달드릴게요.',
    sendAt: '2025-08-21T06:11:30Z',
  },
  {
    id: 'm-016',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '도면 받았습니다. 곧 업로드해서 링크 전달드릴게요.',
    sendAt: '2025-08-22T06:11:30Z',
  },
  {
    id: 'm-017',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '도면 받았습니다. 곧 업로드해서 링크 전달드릴게요.',
    sendAt: '2025-08-23T06:11:30Z',
  },
  {
    id: 'm-018',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '도면 받았습니다. 곧 업로드해서 링크 전달드릴게요.',
    sendAt: '2025-08-24T06:11:30Z',
  },
  {
    id: 'm-019',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '도면 받았습니다. 곧 업로드해서 링크 전달드릴게요.',
    sendAt: '2025-08-25T06:11:30Z',
  },
  {
    id: 'm-020',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '도면 받았습니다. 곧 업로드해서 링크 전달드릴게요.',
    sendAt: '2025-08-26T06:11:30Z',
  },
  {
    id: 'm-021',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '도면 받았습니다. 곧 업로드해서 링크 전달드릴게요.',
    sendAt: '2025-08-27T06:11:30Z',
  },
  {
    id: 'm-022',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '도면 받았습니다. 곧 업로드해서 링크 전달드릴게요.',
    sendAt: '2025-08-28T06:11:30Z',
  },
  {
    id: 'm-023',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '도면 받았습니다. 곧 업로드해서 링크 전달드릴게요.',
    sendAt: '2025-08-29T06:11:30Z',
  },
  {
    id: 'm-024',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '도면 받았습니다. 곧 업로드해서 링크 전달드릴게요.',
    sendAt: '2025-08-30T06:11:30Z',
  },
  {
    id: 'm-025',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '도면 받았습니다. 곧 업로드해서 링크 전달드릴게요.',
    sendAt: '2025-08-31T06:11:30Z',
  },
  {
    id: 'm-026',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '도면 받았습니다. 곧 업로드해서 링크 전달드릴게요.',
    sendAt: '2025-09-01T06:11:30Z',
  },
  {
    id: 'm-027',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '도면 받았습니다. 곧 업로드해서 링크 전달드릴게요.',
    sendAt: '2025-09-02T06:11:30Z',
  },
  {
    id: 'm-028',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '도면 받았습니다. 곧 업로드해서 링크 전달드릴게요.',
    sendAt: '2025-09-03T06:11:30Z',
  },
  {
    id: 'm-029',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '도면 받았습니다. 곧 업로드해서 링크 전달드릴게요.',
    sendAt: '2025-09-04T06:11:30Z',
  },
  {
    id: 'm-030',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '도면 받았습니다. 곧 업로드해서 링크 전달드릴게요.',
    sendAt: '2025-09-05T06:11:30Z',
  },
  {
    id: 'm-031',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '도면 받았습니다. 곧 업로드해서 링크 전달드릴게요.',
    sendAt: '2025-09-06T06:11:30Z',
  },
  {
    id: 'm-032',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '도면 받았습니다. 곧 업로드해서 링크 전달드릴게요.',
    sendAt: '2025-09-07T06:11:30Z',
  },
  {
    id: 'm-033',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '도면 받았습니다. 곧 업로드해서 링크 전달드릴게요.',
    sendAt: '2025-09-08T06:11:30Z',
  },
  {
    id: 'm-034',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '도면 받았습니다. 곧 업로드해서 링크 전달드릴게요.',
    sendAt: '2025-09-09T06:11:30Z',
  },
  {
    id: 'm-035',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '도면 받았습니다. 곧 업로드해서 링크 전달드릴게요.',
    sendAt: '2025-09-10T06:11:30Z',
  },
  {
    id: 'm-036',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '도면 받았습니다. 곧 업로드해서 링크 전달드릴게요.',
    sendAt: '2025-09-11T06:11:30Z',
  },
  {
    id: 'm-037',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '도면 받았습니다. 곧 업로드해서 링크 전달드릴게요.',
    sendAt: '2025-09-12T06:11:30Z',
  },
  {
    id: 'm-038',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '도면 받았습니다. 곧 업로드해서 링크 전달드릴게요.',
    sendAt: '2025-09-13T06:11:30Z',
  },
  {
    id: 'm-039',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '도면 받았습니다. 곧 업로드해서 링크 전달드릴게요.',
    sendAt: '2025-09-14T06:11:30Z',
  },
  {
    id: 'm-040',
    sender: {
      id: 'manager-01',
      nickname: '김ㅇㅇ 매니저',
      profile_image: MANAGER_PROFILE_IMAGE,
    },
    content: '도면 받았습니다. 곧 업로드해서 링크 전달드릴게요.',
    sendAt: '2025-09-15T06:11:30Z',
  },
];
