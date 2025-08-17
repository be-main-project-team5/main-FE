import React from 'react';
import Card from '@/components/common/card';

type IdolCardProps = {
  idolId?: string; // 클릭 이동 보류 중. 나중에 쓸 예정이라 optional
  name: string;
  groupName: string;
  position: '보컬' | '댄서' | '랩';
  imageSrc: string;
  isFavorited: boolean;
  onToggleFavorite: () => void;
};

export default function IdolCard({
  idolId: _idolId, // eslint 미사용 경고 회피용 별칭
  name,
  groupName,
  position,
  imageSrc,
  isFavorited,
  onToggleFavorite,
}: IdolCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 추후 카드 전체 클릭 이동을 넣더라도 하트 클릭은 네비게이션 막기
    e.stopPropagation();
    onToggleFavorite();
  };

  return (
    <div className="group relative">
      {/* 공용 Card는 원본 그대로 */}
      <Card
        type="idol"
        title={name}
        imageSrc={imageSrc}
        detail={{ idolGroup: groupName, position }}
      />

      {/* 하트: 호버/포커스 시만 보이게 */}
      <button
        type="button"
        onClick={handleFavoriteClick}
        className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 opacity-0 shadow transition-opacity group-hover:opacity-100 focus:opacity-100 focus:outline-none"
        aria-label={isFavorited ? '즐겨찾기 해제' : '즐겨찾기 추가'}
        aria-pressed={isFavorited}
        title={isFavorited ? '즐겨찾기 해제' : '즐겨찾기 추가'}
      >
        {isFavorited ? (
          // 채워진 하트
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M11.645 20.91l-.007-.003-.024-.012a20.2 20.2 0 01-1.162-.637 22.08 22.08 0 01-3.432-2.41C4.353 16.04 2.25 13.602 2.25 10.5 2.25 7.876 4.3 5.75 6.75 5.75c1.54 0 2.882.73 3.75 1.878A4.77 4.77 0 0114.25 5.75c2.45 0 4.5 2.126 4.5 4.75 0 3.102-2.103 5.54-4.77 7.348a22.08 22.08 0 01-3.432 2.41 20.2 20.2 0 01-1.162.637l-.024.012-.007.003-.003.002a.75.75 0 01-.651 0l-.003-.002z" />
          </svg>
        ) : (
          // 외곽 하트
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
          >
            <path
              d="M21 10.5c0 3.5-3 6.5-9 10-6-3.5-9-6.5-9-10C3 8 4.8 6 7 6c1.6 0 3 .8 4 2 1-1.2 2.4-2 4-2 2.2 0 4 2 4 4.5z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
