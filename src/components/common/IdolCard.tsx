import { HeartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import React from 'react';

import Card from '@/components/common/card';

type IdolCardProps = {
  idolId?: string; // 클릭 이동 보류 중
  name: string;
  groupName: string;
  position: '보컬' | '댄서' | '랩';
  imageSrc: string;
  isFavorited: boolean;
  onToggleFavorite: () => void;
};

export default function IdolCard({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  idolId: _idolId, // 미사용 경고 회피
  name,
  groupName,
  position,
  imageSrc,
  isFavorited,
  onToggleFavorite,
}: IdolCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // 나중에 카드 클릭 이동 넣어도 충돌 없음
    onToggleFavorite();
  };

  return (
    <div className="group relative">
      {/* 공용 카드 그대로 (크기/룩은 여기서 결정) */}
      <Card
        type="idol"
        title={name}
        imageSrc={imageSrc}
        detail={{ idolGroup: groupName, position }}
      />

      {/* 하트: 공용 카드와 같은 톤/위치/호버 노출 */}
      <button
        type="button"
        onClick={handleFavoriteClick}
        className="absolute top-2.75 right-3 z-20 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100 focus:outline-none"
        aria-label={isFavorited ? '즐겨찾기 해제' : '즐겨찾기 추가'}
        aria-pressed={isFavorited}
        title={isFavorited ? '즐겨찾기 해제' : '즐겨찾기 추가'}
      >
        <HeartIcon
          className={clsx(
            'h-12 w-12',
            isFavorited
              ? 'fill-fuchsia-500 text-fuchsia-800'
              : 'fill-neutral-100 text-neutral-500',
          )}
        />
      </button>
    </div>
  );
}
