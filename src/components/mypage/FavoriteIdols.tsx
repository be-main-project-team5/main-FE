import { useRef } from 'react';

import Card from '@/components/common/card';
import { useDraggable } from '@/hooks/useDraggable';

export default function FavoriteIdols() {
  const containerRef = useRef<HTMLDivElement>(null);
  const events = useDraggable(containerRef);

  return (
    <section className="w-full">
      <h3 className="pt-2 pb-4 text-center text-lg font-medium md:pt-0 md:text-start">
        찜한 아이돌
      </h3>
      <div
        className="flex w-full flex-col flex-wrap items-center gap-4 md:flex-row md:flex-nowrap md:overflow-x-scroll"
        ref={containerRef}
        {...events}
      >
        <Card
          type="idol"
          title="장원영"
          detail={{ idolGroup: '아이브', position: '보컬' }}
          className="flex-shrink-0"
        />
        <Card
          type="idol"
          title="장원영"
          detail={{ idolGroup: '아이브', position: '보컬' }}
          className="flex-shrink-0"
        />
        <Card
          type="idol"
          title="장원영"
          detail={{ idolGroup: '아이브', position: '보컬' }}
          className="flex-shrink-0"
        />
        <Card
          type="idol"
          title="장원영"
          detail={{ idolGroup: '아이브', position: '보컬' }}
          className="flex-shrink-0"
        />
        <Card
          type="idol"
          title="장원영"
          detail={{ idolGroup: '아이브', position: '보컬' }}
          className="flex-shrink-0"
        />
      </div>
    </section>
  );
}
