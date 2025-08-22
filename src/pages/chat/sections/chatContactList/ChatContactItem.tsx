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

  const handleClickUser = () => {
    // 선택한 대화 상대 유저 정보 반환 로직 추가 예정
  };

  return (
    <button
      type="button"
      className={clsx(
        'flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2',
        isSelected
          ? 'bg-fuchsia-400 shadow-[0_0_10px_2px] shadow-fuchsia-400'
          : 'bg-fuchsia-200 hover:bg-fuchsia-300',
      )}
      onClick={handleClickUser}
    >
      <UserAvatarImage profileImageUrl={profileImage} />
      <span>{name}</span>
    </button>
  );
}

export default ChatContactItem;
