import { useRef } from 'react';

import Card from '@/components/common/card';
import { useDraggable } from '@/hooks/useDraggable';
import { useFavoritesStore } from '@/stores/favoritesStore';
import type { BookmarkGroup, BookmarkIdol } from '@/types/bookmark';
import { avatarOf } from '@/utils/avatar';

import FavoriteSection from './FavoriteSection';

export default function FavoriteIdols() {
  const groupsContainerRef = useRef<HTMLDivElement | null>(null);
  const idolsContainerRef = useRef<HTMLDivElement | null>(null);

  const groupsEvents = useDraggable(groupsContainerRef);
  const idolsEvents = useDraggable(idolsContainerRef);

  const { favoriteGroups, favoriteIdols, isLoading } = useFavoritesStore();

  if (isLoading) {
    return <div>찜한 아이돌을 불러오는 중...</div>;
  }

  if (favoriteGroups.length === 0 && favoriteIdols.length === 0) {
    return (
      <div className="text-center text-gray-500">
        찜한 아이돌/그룹이 없습니다.
      </div>
    );
  }

  const renderGroupCard = (group: BookmarkGroup) => (
    <Card
      key={group.id}
      type="idol"
      title={group.group_name}
      className="flex-shrink-0"
      detail={{ idolGroup: '', position: '' }}
      imageSrc={avatarOf(group.group_name)}
    />
  );

  const renderIdolCard = (idol: BookmarkIdol) => (
    <Card
      key={idol.id}
      type="idol"
      title={idol.idol_name}
      className="flex-shrink-0"
      detail={{ idolGroup: '', position: '' }}
      idolId={idol.idol}
      imageSrc={avatarOf(idol.idol_name)}
    />
  );

  return (
    <section className="flex w-full flex-col gap-8">
      <FavoriteSection<BookmarkGroup>
        title="찜한 그룹"
        emptyMessage="찜한 그룹이 없습니다."
        items={favoriteGroups}
        containerRef={groupsContainerRef}
        events={groupsEvents}
        renderItem={renderGroupCard}
      />

      <FavoriteSection<BookmarkIdol>
        title="찜한 아이돌"
        emptyMessage="찜한 아이돌이 없습니다."
        items={favoriteIdols}
        containerRef={idolsContainerRef}
        events={idolsEvents}
        renderItem={renderIdolCard}
      />
    </section>
  );
}
