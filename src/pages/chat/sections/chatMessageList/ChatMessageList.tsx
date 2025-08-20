import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import { useEffect } from 'react';

import type { GroupedChatListTypes } from '../../chat.types';
import { CHAT_EXAMPLES } from '../../chatSampleData';
import ChatMessageGroup from './ChatMessageGroup';

// *memo - 로그인 시 전역 상태로 저장되는 userId 값이 존재한다고 가정
const USER_ID = 'idol-01';

const ChatTimeStyles = cva('py-1 text-[10px] font-medium text-gray-500', {
  variants: {
    lastMsgMine: {
      true: 'pl-0 text-right',
      false: 'pl-12',
    },
  },
  defaultVariants: {
    lastMsgMine: false,
  },
});

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
    (acc, cur) => {
      const kst = toKstDate(cur.sendAt);
      const dKey = toDateKey(kst);
      const tKey = toFiveMinutesKey(kst);

      if (acc[dKey] === undefined) acc[dKey] = {};
      const day = acc[dKey];

      if (day[tKey] === undefined) day[tKey] = [];
      const bucket = day[tKey];

      const last = bucket.at?.(-1);

      if (last?.sender.id === cur.sender.id) {
        last.contents.push(cur.content);
      } else {
        bucket.push({
          id: cur.id,
          sender: cur.sender,
          contents: [cur.content],
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
          <div className="w-full py-4 text-center text-xs font-medium text-gray-500">
            {dKey}
          </div>

          {Object.entries(dValue).map(([tKey, tValue]) => {
            const isLastMsgMine = tValue.at(-1)?.sender.id === USER_ID;

            return (
              <div key={`T-${dKey}-${tKey}`}>
                {tValue.map(msg => (
                  <ChatMessageGroup key={msg.id} {...msg} />
                ))}

                {isLastMsgMine}
                <div
                  className={clsx(
                    ChatTimeStyles({ lastMsgMine: isLastMsgMine }),
                  )}
                >
                  {tKey}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default ChatMessageList;
