import { useRef } from 'react';

import { useDraggable } from '@/hooks/useDraggable';
import { useFavoritesStore } from '@/stores/favoritesStore';
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

  return (
    <section className="flex w-full flex-col gap-8">
      <FavoriteSection
        title="찜한 그룹"
        emptyMessage="찜한 그룹이 없습니다."
        items={favoriteGroups.map(group => ({
          id: group.id,
          name: group.group_name,
        }))}
        containerRef={groupsContainerRef}
        events={groupsEvents}
      />

      <FavoriteSection
        title="찜한 아이돌"
        emptyMessage="찜한 아이돌이 없습니다."
        items={favoriteIdols.map(idol => ({
          id: idol.id,
          name: idol.idol_name,
        }))}
        containerRef={idolsContainerRef}
        events={idolsEvents}
      />
    </section>
  );
}
