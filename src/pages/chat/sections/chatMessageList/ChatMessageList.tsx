import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';

import { getChatMessageAPI } from '@/api/chatApi';
import { useChatStore } from '@/stores/chatRoomIdStore';
import {
  toFlattenChats,
  toGroupedChatMap,
  toSortedChats,
} from '@/utils/chat.utils';
import { showErrorToast } from '@/utils/toastUtils';

import type { FlattenChatTypes } from '../../chat.types';
import ChatMessageGroup from './ChatMessageGroup';
import DateDivider from './DateDivider';

const renderDataByTime = (_: number, chatData: FlattenChatTypes) => {
  if (chatData.type === 'date') return <DateDivider dKey={chatData.dKey} />;

  return <ChatMessageGroup tKey={chatData.tKey} tValue={chatData.tValue} />;
};

function ChatMessageList() {
  const [atBottom, setAtBottom] = useState(true);
  const { roomId } = useChatStore();

  const messagesQuery = useQuery({
    queryKey: ['getChatMessage', roomId],
    queryFn: () => getChatMessageAPI(roomId!),
    enabled: !!roomId,
  });

  useEffect(() => {
    if (messagesQuery.isError) {
      showErrorToast('채팅방 메시지 조회 에러 발생');
    }
  }, [messagesQuery.isError]);

  const sortedChatData = toSortedChats(messagesQuery.data);

  const groupedChatData = toGroupedChatMap(sortedChatData);

  const flattenChatData = toFlattenChats(groupedChatData);

  return (
    <div className="h-full">
      <Virtuoso
        className="chat-scrollbar flex flex-col py-2 pe-2"
        data={flattenChatData}
        computeItemKey={(_, data) => `D-${data.key}`}
        alignToBottom
        initialTopMostItemIndex={{
          index: flattenChatData.length - 1,
          align: 'end',
        }}
        followOutput={atBottom ? 'smooth' : false}
        atBottomStateChange={setAtBottom}
        itemContent={renderDataByTime}
      />
    </div>
  );
}

export default ChatMessageList;
