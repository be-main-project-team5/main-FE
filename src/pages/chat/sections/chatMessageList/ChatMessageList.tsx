import { useEffect, useMemo, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';

import { toDateKey, toFiveMinutesKey, toKstDate } from '@/utils/chat.utils';

import type {
  ChatTypes,
  GroupedChatListTypes,
  GroupedChatTypes,
} from '../../chat.types';
import { CHAT_EXAMPLES } from '../../chatSampleData';
import ChatMessageGroup from './ChatMessageGroup';
import DateDivider from './DateDivider';

const renderDataByTime = (
  _: number,
  [dKey, dValue]: [string, Record<string, GroupedChatTypes[]>],
) => (
  <div>
    <DateDivider dKey={dKey} />

    {Object.entries(dValue).map(([tKey, tValue]) => (
      <ChatMessageGroup key={`T-${dKey}-${tKey}`} tKey={tKey} tValue={tValue} />
    ))}
  </div>
);

function ChatMessageList() {
  const [atBottom, setAtBottom] = useState(true);

  const sortedChatData = [...CHAT_EXAMPLES].sort(
    (a, b) => new Date(a.sendAt).getTime() - new Date(b.sendAt).getTime(),
  );

  const groupedChatData = sortedChatData.reduce<GroupedChatListTypes>(
    (acc: GroupedChatListTypes, cur: ChatTypes): GroupedChatListTypes => {
      const kst = toKstDate(cur.sendAt);
      const dKey = toDateKey(kst);
      const tKey = toFiveMinutesKey(kst);

      acc[dKey] ??= {};
      acc[dKey][tKey] ??= [];
      const bucket = acc[dKey][tKey];

      const last = bucket.at?.(-1);

      if (last?.sender.id === cur.sender.id) {
        last.contents.push({ id: cur.id, text: cur.content });
      } else {
        bucket.push({
          id: cur.id,
          sender: cur.sender,
          contents: [{ id: cur.id, text: cur.content }],
        });
      }

      return acc;
    },
    {},
  );

  const dataEntries = useMemo(
    () => Object.entries(groupedChatData),
    [groupedChatData],
  );

  useEffect(() => {
    console.log(groupedChatData);
  }, []);

  return (
    <div className="h-full">
      <Virtuoso
        className="chat-scrollbar flex flex-col py-2 pe-2"
        data={dataEntries}
        computeItemKey={(_, [dKey]) => `D-${dKey}`}
        alignToBottom
        initialTopMostItemIndex={{ index: 'LAST', align: 'end' }}
        followOutput={atBottom ? 'smooth' : false}
        atBottomStateChange={setAtBottom}
        itemContent={renderDataByTime}
      />
    </div>
  );
}

export default ChatMessageList;
