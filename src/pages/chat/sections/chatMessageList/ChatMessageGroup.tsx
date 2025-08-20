import clsx from 'clsx';

import { ChatTimeStyles } from '../../chat.styles';
import type { ChatMessageGroupTypes } from '../../chat.types';
import ChatMessageItem from './ChatMessageItem';

// *memo - 로그인 시 전역 상태로 저장되는 userId 값이 존재한다고 가정
const USER_ID = 'idol-01';

function ChatMessageGroup({ tKey, tValue }: ChatMessageGroupTypes) {
  const isLastMsgMine = tValue.at(-1)?.sender.id === USER_ID;

  return (
    <>
      {tValue.map(msg => (
        <ChatMessageItem key={msg.id} {...msg} />
      ))}

      {isLastMsgMine}
      <div className={clsx(ChatTimeStyles({ lastMsgMine: isLastMsgMine }))}>
        {tKey}
      </div>
    </>
  );
}

export default ChatMessageGroup;
