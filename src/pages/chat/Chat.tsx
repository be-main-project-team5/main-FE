import clsx from 'clsx';
import { useState } from 'react';

import ChatComposer from './sections/chatComposer/ChatComposer';
import ChatContactList from './sections/chatContactList/ChatContactList';
import ChatMessageList from './sections/chatMessageList/ChatMessageList';

function Chat() {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleConversationList = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <div className="relative flex h-[calc(100dvh-64px)]">
      <aside
        className={clsx(
          'h-full',
          isVisible
            ? 'absolute z-10 block w-full lg:static lg:w-auto lg:flex-1'
            : 'hidden lg:block',
        )}
      >
        <ChatContactList
          isVisible={isVisible}
          onToggleList={handleToggleConversationList}
        />
      </aside>
      <article className="relative flex min-h-0 flex-3 flex-col px-4">
        <section className="min-h-0 flex-1 pt-4">
          <ChatMessageList />
        </section>
        <section className="shrink-0">
          <ChatComposer onToggleList={handleToggleConversationList} />
        </section>
      </article>
    </div>
  );
}

export default Chat;
