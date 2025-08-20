import { useMemo } from 'react';

import type { ChatTypes, GroupedChatListTypes } from '@/pages/chat/chat.types';
import { toDateKey, toFiveMinutesKey, toKstDate } from '@/utils/chat.utils';

export const useGroupedChatMap = (sortedData: ChatTypes[]) =>
  useMemo(
    () =>
      sortedData.reduce<GroupedChatListTypes>(
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
      ),
    [sortedData],
  );
