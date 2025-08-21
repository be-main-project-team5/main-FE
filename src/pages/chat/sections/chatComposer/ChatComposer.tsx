import { PaperAirplaneIcon, UsersIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

interface ChatComposerProps {
  onToggleList: () => void;
}

function ChatComposer({ onToggleList }: ChatComposerProps) {
  const [inputValue, setInputValue] = useState('');

  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    console.log(inputValue);
    setInputValue('');
  };

  const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 p-2">
      <input
        type="text"
        placeholder="메시지를 입력하세요..."
        value={inputValue}
        onChange={handleChangeInputValue}
        onKeyDown={handleEnterKeyDown}
        className="text-md placeholder:text-gray-7800 flex-1 rounded-[56px] bg-gray-100 py-3 pr-12.5 pl-4 font-medium text-gray-800 outline-gray-500"
      />
      {!inputValue && (
        <button
          type="button"
          className="group block aspect-square h-full w-fit cursor-pointer rounded-full p-1.5 hover:bg-fuchsia-500 lg:hidden"
          onClick={onToggleList}
        >
          <UsersIcon className="block size-8 text-gray-700 group-hover:text-fuchsia-200" />
        </button>
      )}

      {inputValue.trim() && (
        <button
          type="button"
          className="group aspect-square h-full w-fit cursor-pointer rounded-full bg-fuchsia-500 p-1.5 hover:bg-fuchsia-600"
          onClick={handleSendMessage}
        >
          <PaperAirplaneIcon className="size-8 text-fuchsia-200 group-hover:text-fuchsia-300" />
        </button>
      )}
    </div>
  );
}

export default ChatComposer;
