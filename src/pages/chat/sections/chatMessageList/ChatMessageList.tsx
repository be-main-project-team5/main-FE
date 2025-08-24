import { useState } from 'react';
import { Virtuoso } from 'react-virtuoso';

import {
  toFlattenChats,
  toGroupedChatMap,
  toSortedChats,
} from '@/utils/chat.utils';

import type {
  ChatMessage,
  FlattenChatTypes,
  PaginatedResponse,
} from '../../chat.types';
import ChatMessageGroup from './ChatMessageGroup';
import DateDivider from './DateDivider';

const renderDataByTime = (_: number, chatData: FlattenChatTypes) => {
  if (chatData.type === 'date') return <DateDivider dKey={chatData.dKey} />;

  return <ChatMessageGroup tKey={chatData.tKey} tValue={chatData.tValue} />;
};

interface ChatMessageListProps {
  messages?: PaginatedResponse<ChatMessage>;
}

function ChatMessageList({ messages }: ChatMessageListProps) {
  const [atBottom, setAtBottom] = useState(true);
  // const [chatData] = useState(messages);

  const sortedChatData = toSortedChats(messages?.results ?? []);

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
