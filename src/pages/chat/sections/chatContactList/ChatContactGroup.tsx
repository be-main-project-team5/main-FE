import clsx from 'clsx';

import ChatContactItem from './ChatContactItem';

const CHAT_CONTACT_EXAMPLES = [
  {
    id: '001',
    name: '김ㅇㅇ 매니저',
    profileImage: undefined,
  },
  {
    id: '002',
    name: '멤버1',
    profileImage: undefined,
  },
  {
    id: '003',
    name: '멤버2',
    profileImage: undefined,
  },
  {
    id: '004',
    name: '멤버3',
    profileImage: undefined,
  },
];

function ChatContactGroup({ isVisible }: { isVisible: boolean }) {
  return (
    <div
      className={clsx(
        'w-full flex-1 overflow-y-auto p-4',
        isVisible ? 'block' : 'hidden',
      )}
    >
      <div className="flex flex-col gap-5 rounded-2xl bg-gray-50 p-6 shadow-[0_0_15px_3px_#00000015] lg:shadow-none">
        <h4 className="text-lg font-semibold">대화 상대</h4>
        <div className="flex flex-col gap-4">
          {CHAT_CONTACT_EXAMPLES.map(example => (
            <ChatContactItem
              isSelected={example.id === '001'}
              contactData={example}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatContactGroup;
