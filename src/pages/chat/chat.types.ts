export interface ChatTypes {
  id: string;
  sender: {
    id: string;
    nickname: string;
    profile_image: string | null;
  };
  content: string;
  sendAt: string;
}

interface GroupedChatTypes {
  sender: {
    id: string;
    nickname: string;
    profile_image: string | null;
  };
  contents: string[];
  startAt: string;
  endAt: string;
}

export type GroupedChatListTypes = Record<
  string,
  Record<string, GroupedChatTypes[]>
>;
