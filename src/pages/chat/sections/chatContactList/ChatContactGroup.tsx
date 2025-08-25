import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useEffect } from 'react';

import { getChatRoomParticipantsAPI } from '@/api/chatApi';
import { useChatStore } from '@/stores/chatRoomIdStore';
import { showErrorToast } from '@/utils/toastUtils';

import type { ChatParticipant } from '../../chat.types';
import ChatContactItem from './ChatContactItem';

interface ChatContactGroupProps {
  isVisible: boolean;
}

function ChatContactGroup({ isVisible }: ChatContactGroupProps) {
  const { roomId } = useChatStore();

  const participantsQuery = useQuery<ChatParticipant[]>({
    queryKey: ['getChatRoomParticipants', roomId],
    queryFn: () => getChatRoomParticipantsAPI(roomId!),
    enabled: !!roomId,
  });

  useEffect(() => {
    if (participantsQuery.isError) {
      showErrorToast('채팅방 참여자 명단 조회 에러 발생');
    }
  }, [participantsQuery.data, participantsQuery.isError]);

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
          {participantsQuery.data?.map(participant => (
            <ChatContactItem key={participant.id} contactData={participant} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatContactGroup;
