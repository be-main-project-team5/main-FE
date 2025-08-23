import { UserAvatarImage } from '@/components/common/UserAvatarImage';

import type { ChatParticipant } from '../../chat.types';

interface ChatContactItemTypes {
  contactData: ChatParticipant;
}

function ChatContactItem({ contactData }: ChatContactItemTypes) {
  // const { profile_image: profileImage, nickname } = contactData;
  const { nickname } = contactData;

  const handleClickUser = () => {
    // 선택한 대화 상대 유저 정보 반환 로직 추가 예정
  };

  return (
    <button
      type="button"
      className="flex cursor-pointer items-center gap-3 rounded-2xl bg-fuchsia-200 px-3 py-2 hover:bg-fuchsia-300"
      onClick={handleClickUser}
    >
      <UserAvatarImage />
      <span>{nickname}</span>
    </button>
  );
}

export default ChatContactItem;
