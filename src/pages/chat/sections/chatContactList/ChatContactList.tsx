import { ChevronLeftIcon } from '@heroicons/react/24/outline';

interface ChatContactListProps {
  onToggleList: () => void;
}

function ChatContactList({ onToggleList }: ChatContactListProps) {
  const handleRemoveAllMessages = () => {
    // *memo - 채팅 기록 초기화 로직 추가
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="p-5">
        <button
          type="button"
          className="block cursor-pointer lg:hidden"
          onClick={onToggleList}
        >
          <ChevronLeftIcon className="size-6" />
        </button>
      </div>

      <div className="mx-auto p-5">
        <button
          type="button"
          className="g:hidden block cursor-pointer"
          onClick={handleRemoveAllMessages}
        >
          채팅 기록 초기화
        </button>
      </div>
    </div>
  );
}

export default ChatContactList;
