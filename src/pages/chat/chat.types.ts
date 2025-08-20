export interface ChatTypes {
  id: string;
  sender: {
    id: string;
    nickname: string;
    profile_image: string | undefined;
  };
  content: string;
  sendAt: string;
}

export type GroupedChatTypes = Omit<ChatTypes, 'content' | 'sendAt'> & {
  contents: Array<{ id: string; text: string }>;
};

export type GroupedChatListTypes = Record<
  string,
  Record<string, GroupedChatTypes[]>
>;

export interface ChatMessageGroupTypes {
  tKey: string;
  tValue: GroupedChatTypes[];
}

export interface ChatMessageBubbleTypes {
  isMyChat: boolean;
  text: string;
}
