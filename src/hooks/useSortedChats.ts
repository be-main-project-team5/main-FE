import { useMemo } from 'react';

import type { ChatTypes } from '@/pages/chat/chat.types';

export const useSortedChats = (rawData: ChatTypes[]) =>
  useMemo(
    () =>
      [...rawData].sort(
        (a, b) => new Date(a.sendAt).getTime() - new Date(b.sendAt).getTime(),
      ),
    [rawData],
  );
