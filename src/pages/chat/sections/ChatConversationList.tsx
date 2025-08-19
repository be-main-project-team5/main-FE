interface ChatConversationListProps {
  onToggleList: () => void;
}

function ChatConversationList({ onToggleList }: ChatConversationListProps) {
  return (
    <div className="h-full bg-blue-300">
      <span>ChatConversationList</span>
      <button
        type="button"
        className="block bg-blue-500 lg:hidden"
        onClick={onToggleList}
      >
        닫기
      </button>
    </div>
  );
}

export default ChatConversationList;
