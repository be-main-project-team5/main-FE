import clsx from 'clsx';

// import { useUserStore } from '@/stores/userStore';
import { UserAvatarImage } from '@/components/common/UserAvatarImage';

import { ChatMessageItemStyles } from '../../chat.styles';
import type { GroupedChatTypes } from '../../chat.types';
import ChatMessageBubble from './ChatMessageBubble';

const USER_ID = 0;

function ChatMessageItem(data: GroupedChatTypes) {
  // const { user } = useUserStore();
  // const userId = user?.user_id;

  const { sender, contents } = data;
  const isMyChat = sender.id === USER_ID;
  const bubbles = contents.map(content => (
    <ChatMessageBubble
      key={content.id}
      isMyChat={isMyChat}
      text={content.text}
    />
  ));

  return (
    <div className={clsx(ChatMessageItemStyles({ myChat: isMyChat }))}>
      {isMyChat && bubbles}

      {!isMyChat && (
        <>
          <UserAvatarImage
          // profileImageUrl={sender.profile_image}
          />
          <div className="flex w-full flex-col">
            <span className="text-xs font-medium text-gray-900">
              {sender.nickname}
            </span>
            {bubbles}
          </div>
        </>
      )}
    </div>
  );
}

export default ChatMessageItem;
