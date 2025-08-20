import { cva } from 'class-variance-authority';
import clsx from 'clsx';

import type { ChatMessageBubbleTypes } from '../../chat.types';

const ChatMessageBubbleStyles = cva(
  'w-fit max-w-[70%] rounded-2xl px-3 py-2 mt-2',
  {
    variants: {
      myChat: {
        true: 'bg-fuchsia-300',
        false: 'bg-fuchsia-100',
      },
    },
    defaultVariants: {
      myChat: false,
    },
  },
);

function ChatMessageBubble({ isMyChat, content }: ChatMessageBubbleTypes) {
  return (
    <div className={clsx(ChatMessageBubbleStyles({ myChat: isMyChat }))}>
      {content}
    </div>
  );
}

export default ChatMessageBubble;
