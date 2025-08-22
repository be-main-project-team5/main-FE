import clsx from 'clsx';

import { UserAvatarImage } from '@/components/common/UserAvatarImage';

interface ChatContactItemTypes {
  isSelected: boolean;
  contactData: {
    id: string;
    profileImage: string | undefined;
    name: string;
  };
}

function ChatContactItem({ isSelected, contactData }: ChatContactItemTypes) {
  const { profileImage, name } = contactData;

  return (
    <div
      className={clsx(
        'flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2',
        isSelected
          ? 'bg-fuchsia-400 shadow-[0_0_10px_2px] shadow-fuchsia-400'
          : 'bg-fuchsia-200 hover:bg-fuchsia-300',
      )}
    >
      <UserAvatarImage profileImageUrl={profileImage} />
      <span>{name}</span>
    </div>
  );
}

export default ChatContactItem;
