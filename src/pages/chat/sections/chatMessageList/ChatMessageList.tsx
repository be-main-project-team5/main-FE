import { useEffect } from 'react';

import { UserAvatarImage } from '@/components/common/UserAvatarImage';

import type { GroupedChatListTypes } from '../../chat.types';
import { CHAT_EXAMPLES } from '../../chatSampleData';

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
        last.endAt = kst.toISOString();
      } else {
        bucket.push({
          sender: cur.sender,
          contents: [cur.content],
          startAt: kst.toISOString(),
          endAt: kst.toISOString(),
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
    <div className="chat-scrollbar flex h-full flex-col justify-end overflow-y-auto py-2 pe-2">
      {/* 상대 메시지 공간 */}
      <div className="flex gap-2">
        <UserAvatarImage />
        <div className="flex w-full flex-col gap-1">
          <span className="text-xs font-medium text-gray-900">000 매니저</span>
          <div className="w-fit max-w-[70%] rounded-2xl bg-fuchsia-100 px-3 py-2">
            메시지메시지메시지 내용내용내용 안녕하세요안녕하세요안녕하세요
            메시지칸테스트중
          </div>
          <div className="w-fit max-w-[70%] rounded-2xl bg-fuchsia-100 px-3 py-2">
            메시지메시지메시지
          </div>
          <span className="text-[10px] font-medium text-gray-500">15:00</span>
        </div>
      </div>

      {/* 내 메시지 공간 */}
      <div className="flex w-full flex-col items-end gap-1">
        <div className="w-fit max-w-[70%] rounded-2xl bg-fuchsia-300 px-3 py-2">
          메시지메시지메시지 내용내용내용 안녕하세요안녕하세요안녕하세요
          메시지칸테스트중
        </div>
        <div className="w-fit max-w-[70%] rounded-2xl bg-fuchsia-300 px-3 py-2">
          메시지메시지메시지
        </div>
        <span className="text-[10px] font-medium text-gray-500">15:02</span>
      </div>
    </div>
  );
}

export default ChatMessageList;
