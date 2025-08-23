import { useQueries } from '@tanstack/react-query';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import {
  createNewChatRoomAPI,
  deleteChatRoomAPI,
  getChatMessageAPI,
  getChatRoomParticipantsAPI,
  getMyChatRoomDetailAPI,
  getMyChatRoomListAPI,
  joinChatRoomAPI,
  leaveChatRoomAPI,
  patchChatRoomDetailAPI,
  putChatRoomDetailAPI,
} from '@/api/chatApi';

import ChatComposer from './sections/chatComposer/ChatComposer';
import ChatContactList from './sections/chatContactList/ChatContactList';
import ChatMessageList from './sections/chatMessageList/ChatMessageList';

const GROUP_NAME_TEST = '테스트 채팅방';

function Chat() {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleConversationList = () => {
    setIsVisible(prev => !prev);
  };

  // api cors 에러 해결 확인을 위해 일괄 테스트
  const apiTests = useQueries({
    queries: [
      { queryKey: ['getMyChatRoomList'], queryFn: getMyChatRoomListAPI },
      {
        queryKey: ['createNewChatRoomA'],
        queryFn: () => createNewChatRoomAPI(GROUP_NAME_TEST),
      },
      {
        queryKey: ['getMyChatRoomDetail'],
        queryFn: () => getMyChatRoomDetailAPI(0),
      },
      {
        queryKey: ['putChatRoomDetail'],
        queryFn: () => putChatRoomDetailAPI(0, '이름 put 수정된 채팅방'),
      },
      {
        queryKey: ['patchChatRoomDetail'],
        queryFn: () => patchChatRoomDetailAPI(0, '이름 patch 수정된 채팅방'),
      },
      {
        queryKey: ['deleteChatRoom'],
        queryFn: () => deleteChatRoomAPI(0),
      },
      {
        queryKey: ['joinChatRoom'],
        queryFn: () => joinChatRoomAPI(0, '채팅방'),
      },
      {
        queryKey: ['leaveChatRoom'],
        queryFn: () => leaveChatRoomAPI(0, '채팅방'),
      },
      {
        queryKey: ['getChatMessage'],
        queryFn: () => getChatMessageAPI(0),
      },
      {
        queryKey: ['getChatRoomParticipants'],
        queryFn: () => getChatRoomParticipantsAPI(0),
      },
    ],
  });

  useEffect(() => {
    apiTests.forEach((q, i) => {
      if (q.isSuccess) {
        console.log(`Query ${i} 성공`, q.data);
      }
      if (q.isError) {
        console.error(`Error ${i} 실패`, q.error);
      }
    });
  }, [apiTests]);

  return (
    <div className="relative flex h-[calc(100dvh-64px)]">
      <aside
        className={clsx(
          'h-full',
          isVisible
            ? 'absolute z-10 block w-full lg:static lg:w-auto lg:flex-1'
            : 'hidden lg:block',
        )}
      >
        <ChatContactList
          isVisible={isVisible}
          onToggleList={handleToggleConversationList}
        />
      </aside>
      <article className="relative flex min-h-0 flex-3 flex-col px-4">
        <section className="min-h-0 flex-1 pt-4">
          <ChatMessageList />
        </section>
        <section className="shrink-0">
          <ChatComposer onToggleList={handleToggleConversationList} />
        </section>
      </article>
    </div>
  );
}

export default Chat;
