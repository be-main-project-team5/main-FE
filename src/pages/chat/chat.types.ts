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

export interface GroupedChatTypes {
  id: string;
  sender: {
    id: string;
    nickname: string;
    profile_image: string | undefined;
  };
  contents: string[];
}

export type GroupedChatListTypes = Record<
  string,
  Record<string, GroupedChatTypes[]>
>;

export interface ChatMessageBubbleTypes {
  isMyChat: boolean;
  content: string;
}
