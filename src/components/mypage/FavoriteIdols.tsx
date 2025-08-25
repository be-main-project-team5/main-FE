import { useRef } from 'react';

import Card from '@/components/common/card';
import { mediaQuery } from '@/constants/breakpoints';
import { useDraggable } from '@/hooks/useDraggable';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useFavoritesStore } from '@/stores/favoritesStore';

export default function FavoriteIdols() {
  const isDesktop = useMediaQuery(mediaQuery.tablet);
  const groupsContainerRef = useRef<HTMLDivElement>(null);
  const idolsContainerRef = useRef<HTMLDivElement>(null);
  const groupsEvents = useDraggable(groupsContainerRef);
  const idolsEvents = useDraggable(idolsContainerRef);

  const { favoriteGroups, favoriteIdols, isLoading } = useFavoritesStore();

  if (isLoading) {
    return <div>찜한 아이돌을 불러오는 중...</div>;
  }

  return (
    <section className="flex w-full flex-col gap-8">
      <div>
        <h3 className="pt-2 pb-4 text-center text-lg font-medium md:pt-0 md:text-start">
          찜한 그룹
        </h3>

        {favoriteGroups.length > 0 ? (
          <div
            className="flex w-full flex-col flex-wrap items-center gap-4 md:flex-row md:flex-nowrap md:overflow-x-scroll"
            ref={groupsContainerRef}
            {...(isDesktop ? groupsEvents : {})}
          >
            {favoriteGroups.map(group => (
              <Card
                key={group.id}
                type="idol"
                title={group.group_name}
                className="flex-shrink-0"
                detail={{ idolGroup: '', position: '' }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">찜한 그룹이 없습니다.</div>
        )}
      </div>

      <div>
        <h3 className="pt-2 pb-4 text-center text-lg font-medium md:pt-0 md:text-start">
          찜한 아이돌
        </h3>

        {favoriteIdols.length > 0 ? (
          <div
            className="flex w-full flex-col flex-wrap items-center gap-4 md:flex-row md:flex-nowrap md:overflow-x-scroll"
            ref={idolsContainerRef}
            {...(isDesktop ? idolsEvents : {})}
          >
            {favoriteIdols.map(idol => (
              <Card
                key={idol.id}
                type="idol"
                title={idol.idol_name}
                className="flex-shrink-0"
                detail={{ idolGroup: '', position: '' }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            찜한 아이돌이 없습니다.
          </div>
        )}
      </div>
    </section>
  );
}
