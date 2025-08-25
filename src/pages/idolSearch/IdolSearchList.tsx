import { VirtuosoGrid } from 'react-virtuoso';

import Card from '@/components/common/card';

import GridFooter from './components/GridFooter';
import type { Idol } from '@/api/idolApi';

type Props = {
  idols: Idol[];
  isSearching: boolean;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  onCardClick: (id: string) => void;
};

export default function IdolSearchList({
  idols,
  isSearching,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  onCardClick,
}: Props) {
  const renderItem = (_: number, idol: Idol) => (
    <div className="flex items-center justify-center p-2">
      <Card
        type="idol"
        idolId={idol.id}
        title={idol.name}
        imageSrc={idol.avatarUrl || ''}
        detail={{
          idolGroup: idol.groupName ?? '',
          position: idol.position ?? '',
        }}
        onClick={() => onCardClick(idol.id)}
      />
    </div>
  );

  return (
    <VirtuosoGrid
      useWindowScroll
      data={idols}
      computeItemKey={(_, idol) => idol.id}
      endReached={() => {
        if (isSearching && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      increaseViewportBy={{ top: 0, bottom: 100 }}
      overscan={2}
      components={{ Footer: GridFooter }}
      context={{ isFetchingNextPage }}
      listClassName="grid grid-cols-1 gap-x-2 gap-y-6 sm:grid-cols-2 md:gap-y-8 lg:grid-cols-3 lg:gap-y-10"
      itemContent={renderItem}
    />
  );
}
