import { create } from 'zustand';

import type { FlattenChatTypes } from '@/pages/chat/chat.types';

interface ChatMessagesState {
  messages: FlattenChatTypes[] | null;
  setMessages: (data: FlattenChatTypes[]) => void;
  addMessage: (msg: FlattenChatTypes) => void;
  clearMessages: () => void;
}

export const useChatMessagesStore = create<ChatMessagesState>(set => ({
  messages: null,

  setMessages: data => set({ messages: data }),

  addMessage: msg => {
    set(state =>
      state.messages
        ? {
            ...state,
            msg,
          }
        : state,
    );
  },

  clearMessages: () => set({ messages: null }),
}));
