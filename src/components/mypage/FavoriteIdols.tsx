import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import Card from '@/components/common/card';
import { mediaQuery } from '@/constants/breakpoints';
import { useDraggable } from '@/hooks/useDraggable';
import useMediaQuery from '@/hooks/useMediaQuery';

type Idol = {
  id: number;
  name: string;
  group: string;
  position: string;
  imageUrl?: string;
};

export default function FavoriteIdols() {
  const isDesktop = useMediaQuery(mediaQuery.tablet);
  const containerRef = useRef<HTMLDivElement>(null);
  const events = useDraggable(containerRef);

  const [idols, setIdols] = useState<Idol[]>([]);

  useEffect(() => {
    const fetchIdols = async () => {
      try {
        const response = await axios.get('/bookmark/idol');
        setIdols(response.data);
      } catch (error) {
        console.error('Failed to fetch idols:', error);
      }
    };
    fetchIdols();
  }, []);

  return (
    <section className="w-full">
      <h3 className="pt-2 pb-4 text-center text-lg font-medium md:pt-0 md:text-start">
        찜한 아이돌
      </h3>
      <div
        className="flex w-full flex-col flex-wrap items-center gap-4 md:flex-row md:flex-nowrap md:overflow-x-scroll"
        ref={containerRef}
        {...(isDesktop ? events : '')}
      >
        {idols.map(idol => (
          <Card
            key={idol.id}
            type="idol"
            title={idol.name}
            detail={{ idolGroup: idol.group, position: idol.position }}
            className="flex-shrink-0"
          />
        ))}
      </div>
    </section>
  );
}
