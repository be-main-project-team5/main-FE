import clsx from 'clsx';

import { ChatMessageBubbleStyles } from '../../chat.styles';
import type { ChatMessageBubbleTypes } from '../../chat.types';

function ChatMessageBubble({ isMyChat, content }: ChatMessageBubbleTypes) {
  return (
    <div className={clsx(ChatMessageBubbleStyles({ myChat: isMyChat }))}>
      {content}
    </div>
  );
}

export default ChatMessageBubble;
