import axios from 'axios';
import { useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';

import {
  toFlattenChats,
  toGroupedChatMap,
  toSortedChats,
} from '@/utils/chat.utils';

import type { FlattenChatTypes } from '../../chat.types';
import ChatMessageGroup from './ChatMessageGroup';
import DateDivider from './DateDivider';

const renderDataByTime = (_: number, chatData: FlattenChatTypes) => {
  if (chatData.type === 'date') return <DateDivider dKey={chatData.dKey} />;

  return <ChatMessageGroup tKey={chatData.tKey} tValue={chatData.tValue} />;
};

function ChatMessageList() {
  const [atBottom, setAtBottom] = useState(true);
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const res = await axios.get(`/chats/rooms/chat-001/messages/`, {
          // headers: {
          //   Authorization: `Bearer qwer-tyui-op`,
          // },
        });
        const { data } = res;
        console.log(res);
        setChatData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchChatData();
  }, []);

  const sortedChatData = toSortedChats(chatData);

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
