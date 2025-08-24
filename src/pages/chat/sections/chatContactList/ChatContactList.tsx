import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useEffect } from 'react';

import { getChatRoomParticipantsAPI } from '@/api/chatApi';
import { useChatStore } from '@/stores/chatRoomIdStore';
import { showErrorToast } from '@/utils/toastUtils';

import type { ChatParticipant, PaginatedResponse } from '../../chat.types';
import ChatContactGroup from './ChatContactGroup';

interface ChatContactListProps {
  isVisible: boolean;
  onToggleList: () => void;
}

function ChatContactList({ isVisible, onToggleList }: ChatContactListProps) {
  const { roomId } = useChatStore();

  const participantsQuery = useQuery<PaginatedResponse<ChatParticipant>>({
    queryKey: ['getChatRoomParticipants', roomId],
    queryFn: () => getChatRoomParticipantsAPI(roomId!),
    enabled: !!roomId,
  });

  useEffect(() => {
    if (participantsQuery.isError) {
      showErrorToast('채팅방 참여자 명단 조회 에러 발생');
    }
  }, [participantsQuery.isError]);

  const handleRemoveAllMessages = () => {
    // *memo - 채팅 기록 초기화 로직 추가
  };

  return (
    <div className="flex h-full flex-col bg-white lg:bg-gray-50">
      <div className="p-5">
        <button
          type="button"
          className="block cursor-pointer lg:hidden"
          onClick={onToggleList}
        >
          <ChevronLeftIcon className="size-6" />
        </button>
        <button
          type="button"
          className="hidden cursor-pointer lg:ml-auto lg:block"
          onClick={onToggleList}
        >
          {isVisible ? (
            <ChevronDoubleLeftIcon className="size-6" />
          ) : (
            <ChevronDoubleRightIcon className="size-6" />
          )}
        </button>
      </div>
      <ChatContactGroup
        isVisible={isVisible}
        participants={participantsQuery.data}
      />
      <div className={clsx('mx-auto p-5', isVisible ? 'block' : 'hidden')}>
        <button
          type="button"
          className="cursor-pointer text-sm text-gray-500 hover:text-gray-800"
          onClick={handleRemoveAllMessages}
        >
          채팅 기록 초기화
        </button>
      </div>
    </div>
  );
}

export default ChatContactList;
