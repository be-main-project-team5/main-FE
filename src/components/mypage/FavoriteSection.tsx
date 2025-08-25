import Card from '@/components/common/card';
import { mediaQuery } from '@/constants/breakpoints';
import type { useDraggable } from '@/hooks/useDraggable';
import useMediaQuery from '@/hooks/useMediaQuery';

interface FavoriteSectionProps {
  title: string;
  emptyMessage: string;
  items: { id: number; name: string }[];
  containerRef: React.RefObject<HTMLDivElement | null>;
  events: ReturnType<typeof useDraggable>;
}

export default function FavoriteSection({
  title,
  emptyMessage,
  items,
  containerRef,
  events,
}: FavoriteSectionProps) {
  const isDesktop = useMediaQuery(mediaQuery.tablet);

  return (
    <div>
      <h3 className="pt-2 pb-4 text-center text-lg font-medium md:pt-0 md:text-start">
        {title}
      </h3>

      {items.length > 0 ? (
        <div
          className="flex w-full flex-col flex-wrap items-center gap-4 md:flex-row md:flex-nowrap md:overflow-x-scroll"
          ref={containerRef}
          {...(isDesktop ? events : {})}
        >
          {items.map(item => (
            <Card
              key={item.id}
              type="idol"
              title={item.name}
              className="flex-shrink-0"
              detail={{ idolGroup: '', position: '' }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">{emptyMessage}</div>
      )}
    </div>
  );
}
