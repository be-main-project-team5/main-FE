import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import {
  createNewChatRoomAPI,
  getChatMessageAPI,
  getChatRoomParticipantsAPI,
  getMyChatRoomListAPI,
} from '@/api/chatApi';

import type {
  ChatMessage,
  ChatParticipant,
  PaginatedResponse,
} from './chat.types';
import ChatComposer from './sections/chatComposer/ChatComposer';
import ChatContactList from './sections/chatContactList/ChatContactList';
import ChatMessageList from './sections/chatMessageList/ChatMessageList';

const GROUP_NAME_TEST = 'test';

function Chat() {
  const [roomId, setRoomId] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const queryClient = useQueryClient();

  const handleToggleConversationList = () => {
    setIsVisible(prev => !prev);
  };

  const { data: roomList } = useQuery({
    queryKey: ['getMyChatRoomList'],
    queryFn: getMyChatRoomListAPI,
  });

  const { mutate: createRoom } = useMutation({
    mutationFn: () => createNewChatRoomAPI(GROUP_NAME_TEST),
    onSuccess: newRoom => {
      console.log('새 방 생성됨 : ', newRoom);
      setRoomId(newRoom.id);
      queryClient.invalidateQueries({ queryKey: ['getMyChatRoomList'] });
    },
  });

  const { data: messages } = useQuery<PaginatedResponse<ChatMessage>>({
    queryKey: ['getChatMessage', roomId],
    queryFn: () => getChatMessageAPI(roomId!),
    enabled: !!roomId,
  });

  const { data: participants } = useQuery<PaginatedResponse<ChatParticipant>>({
    queryKey: ['getChatRoomParticipants', roomId],
    queryFn: () => getChatRoomParticipantsAPI(roomId!),
    enabled: !!roomId,
  });

  useEffect(() => {
    if (!roomList) return;

    if (roomList.count === 0) {
      createRoom();
    } else {
      setRoomId(roomList.results[0].id);
    }
  }, [createRoom, roomList]);

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
          participants={participants}
        />
      </aside>
      <article className="relative flex min-h-0 flex-3 flex-col px-4">
        <section className="min-h-0 flex-1 pt-4">
          <ChatMessageList messages={messages} />
        </section>
        <section className="shrink-0">
          <ChatComposer onToggleList={handleToggleConversationList} />
        </section>
      </article>
    </div>
  );
}

export default Chat;
