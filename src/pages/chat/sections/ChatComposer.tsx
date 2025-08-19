interface ChatComposerProps {
  onToggleList: () => void;
}

function ChatComposer({ onToggleList }: ChatComposerProps) {
  return (
    <div className="flex justify-between bg-green-300">
      <span>ChatComposer</span>
      <button
        type="button"
        className="block bg-green-500 lg:hidden"
        onClick={onToggleList}
      >
        대화 상대
      </button>
    </div>
  );
}

export default ChatComposer;
