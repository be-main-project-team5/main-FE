import { UserAvatarImage } from '@/components/common/UserAvatarImage';

import type { ChatParticipant } from '../../chat.types';

interface ChatContactItemTypes {
  contactData: ChatParticipant;
}

function ChatContactItem({ contactData }: ChatContactItemTypes) {
  const { nickname } = contactData;

  return (
    <div className="flex cursor-pointer items-center gap-3 rounded-2xl bg-fuchsia-200 px-3 py-2 hover:bg-fuchsia-300">
      <UserAvatarImage />
      <span>{nickname}</span>
    </div>
  );
}

export default ChatContactItem;
