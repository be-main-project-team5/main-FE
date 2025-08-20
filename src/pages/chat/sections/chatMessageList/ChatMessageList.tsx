import { useEffect } from 'react';

import type { ChatTypes, GroupedChatListTypes } from '../../chat.types';
import { CHAT_EXAMPLES } from '../../chatSampleData';
import ChatMessageGroup from './ChatMessageGroup';
import DateDivider from './DateDivider';

function ChatMessageList() {
  const toKstDate = (iso: string | Date): Date =>
    new Date(new Date(iso).getTime() + 9 * 60 * 60 * 1000);

  const toDateKey = (dt: Date) => {
    const year = dt.getUTCFullYear();
    const month = String(dt.getUTCMonth() + 1).padStart(2, '0');
    const day = String(dt.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const toFiveMinutesKey = (dt: Date) => {
    const hour = String(dt.getUTCHours()).padStart(2, '0');
    const minute = dt.getUTCMinutes();
    const flooredMinute = String(Math.floor(minute / 5) * 5).padStart(2, '0');
    return `${hour}:${flooredMinute}`;
  };

  const sortedChatData = [...CHAT_EXAMPLES].sort(
    (a, b) => new Date(a.sendAt).getTime() - new Date(b.sendAt).getTime(),
  );

  const groupedChatData = sortedChatData.reduce<GroupedChatListTypes>(
    (acc: GroupedChatListTypes, cur: ChatTypes): GroupedChatListTypes => {
      const kst = toKstDate(cur.sendAt);
      const dKey = toDateKey(kst);
      const tKey = toFiveMinutesKey(kst);

      if (acc[dKey] === undefined) acc[dKey] = {};
      const day = acc[dKey];

      if (day[tKey] === undefined) day[tKey] = [];
      const bucket = day[tKey];

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

  useEffect(() => {
    console.log(groupedChatData);
  }, []);

  return (
    <div className="chat-scrollbar flex h-full flex-col overflow-y-auto py-2 pe-2">
      <div className="mt-auto" />
      {Object.entries(groupedChatData).map(([dKey, dValue]) => (
        <div key={`D-${dKey}`}>
          <DateDivider dKey={dKey} />

          {Object.entries(dValue).map(([tKey, tValue]) => (
            <ChatMessageGroup
              key={`T-${dKey}-${tKey}`}
              tKey={tKey}
              tValue={tValue}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default ChatMessageList;
