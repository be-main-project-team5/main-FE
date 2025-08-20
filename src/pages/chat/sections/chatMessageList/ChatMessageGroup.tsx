import clsx from 'clsx';

import { UserAvatarImage } from '@/components/common/UserAvatarImage';

import { ChatMessageGroupStyles } from '../../chat.styles';
import type { GroupedChatTypes } from '../../chat.types';
import ChatMessageBubble from './ChatMessageBubble';

// *memo - 로그인 시 전역 상태로 저장되는 userId 값이 존재한다고 가정
const USER_ID = 'idol-01';

function ChatMessageGroup(data: GroupedChatTypes) {
  const { sender, contents } = data;
  const isMyChat = sender.id === USER_ID;
  const bubbles = contents.map(content => (
    <ChatMessageBubble isMyChat={isMyChat} content={content} />
  ));

  return (
    <div className={clsx(ChatMessageGroupStyles({ myChat: isMyChat }))}>
      {isMyChat && bubbles}

      {!isMyChat && (
        <>
          <UserAvatarImage profileImageUrl={sender.profile_image} />
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

export default ChatMessageGroup;
