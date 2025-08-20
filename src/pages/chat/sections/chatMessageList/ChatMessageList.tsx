import { useEffect, useMemo, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';

import { useGroupedChatMap } from '@/hooks/useGroupedChatMap';
import { useSortedChats } from '@/hooks/useSortedChats';

import type { GroupedChatTypes } from '../../chat.types';
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

  const sortedChatData = useSortedChats(CHAT_EXAMPLES);

  const groupedChatData = useGroupedChatMap(sortedChatData);

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
