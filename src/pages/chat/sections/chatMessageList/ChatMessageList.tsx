import { UserAvatarImage } from '@/components/common/UserAvatarImage';

function ChatMessageList() {
  return (
    <div className="chat-scrollbar flex h-full flex-col justify-end overflow-y-auto py-2 pe-2">
      <div className="w-full text-center text-xs font-medium text-gray-500">
        2025/08/19
      </div>

      {/* 상대 메시지 공간 */}
      <div className="flex gap-2">
        <UserAvatarImage />
        <div className="flex w-full flex-col gap-1">
          <span className="text-xs font-medium text-gray-900">000 매니저</span>
          <div className="w-fit max-w-[70%] rounded-2xl bg-fuchsia-100 px-3 py-2">
            메시지메시지메시지 내용내용내용 안녕하세요안녕하세요안녕하세요
            메시지칸테스트중
          </div>
          <div className="w-fit max-w-[70%] rounded-2xl bg-fuchsia-100 px-3 py-2">
            메시지메시지메시지
          </div>
          <span className="text-[10px] font-medium text-gray-500">15:00</span>
        </div>
      </div>

      {/* 내 메시지 공간 */}
      <div className="flex w-full flex-col items-end gap-1">
        <div className="w-fit max-w-[70%] rounded-2xl bg-fuchsia-300 px-3 py-2">
          메시지메시지메시지 내용내용내용 안녕하세요안녕하세요안녕하세요
          메시지칸테스트중
        </div>
        <div className="w-fit max-w-[70%] rounded-2xl bg-fuchsia-300 px-3 py-2">
          메시지메시지메시지
        </div>
        <span className="text-[10px] font-medium text-gray-500">15:02</span>
      </div>
    </div>
  );
}

export default ChatMessageList;
