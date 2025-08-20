import { useState } from 'react';
import { Virtuoso } from 'react-virtuoso';

import {
  toFlattenChats,
  toGroupedChatMap,
  toSortedChats,
} from '@/utils/chat.utils';

import type { FlattenChatTypes } from '../../chat.types';
import { CHAT_EXAMPLES } from '../../chatSampleData';
import ChatMessageGroup from './ChatMessageGroup';
import DateDivider from './DateDivider';

const renderDataByTime = (_: number, chatData: FlattenChatTypes) => {
  if (chatData.type === 'date') return <DateDivider dKey={chatData.dKey} />;

  return <ChatMessageGroup tKey={chatData.tKey} tValue={chatData.tValue} />;
};

function ChatMessageList() {
  const [atBottom, setAtBottom] = useState(true);

  const sortedChatData = toSortedChats(CHAT_EXAMPLES);

  const groupedChatData = toGroupedChatMap(sortedChatData);

  const flattenChatData = toFlattenChats(groupedChatData);

  return (
    <div className="h-full">
      <Virtuoso
        className="chat-scrollbar flex flex-col py-2 pe-2"
        data={flattenChatData}
        computeItemKey={(_, chatData) => `D-${chatData.key}`}
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
