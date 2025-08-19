import clsx from 'clsx';
import { useState } from 'react';

import ChatComposer from './sections/ChatComposer';
import ChatConversationList from './sections/ChatConversationList';
import ChatMessageList from './sections/ChatMessageList';

function Chat() {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleConversationList = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <div className="relative flex h-[calc(100dvh-64px)]">
      <aside
        className={clsx(
          'h-full flex-1 lg:block',
          isVisible ? 'absolute z-10 block w-full' : 'hidden',
        )}
      >
        <ChatConversationList onToggleList={handleToggleConversationList} />
      </aside>
      <article className="relative flex flex-3 flex-col gap-4 px-4">
        <section className="flex-1">
          <ChatMessageList />
        </section>
        <section>
          <ChatComposer onToggleList={handleToggleConversationList} />
        </section>
      </article>
    </div>
  );
}

export default Chat;
