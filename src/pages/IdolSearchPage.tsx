import { useEffect, useMemo, useRef, useState } from 'react';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { VirtuosoGrid } from 'react-virtuoso';

import Card from '@/components/common/card';
import SearchBar from '@/components/common/SearchBar';
import { useDebounce } from '@/hooks/useDebounce';
import { useFavoritesStore } from '@/stores/favoritesStore';
import {
  fetchFavoriteIdols,
  searchIdols,
  toggleFavorite as mockToggleFavorite,
} from '@/mocks/data/idols';

// 🚀 API 연결 시 실제 API 함수로 교체
// import { addBookmark, removeBookmark, fetchBookmarks, searchIdols } from '@/services/idolApi';

export type Idol = {
  id: string;
  name: string;
  groupName: string;
  avatarUrl: string;
  position: '보컬' | '댄서' | '랩';
};

const PAGE_SIZE = 6;

function LoadingSpinner() {
  return <p className="text-center text-fuchsia-400">불러오는 중...</p>;
}
function ErrorMessage() {
  return <p className="text-center text-fuchsia-800">에러가 발생했습니다.</p>;
}
function EmptySearchResult() {
  return <p className="text-center text-fuchsia-400">검색 결과가 없습니다.</p>;
}
function LoadingFooter() {
  return <p className="py-4 text-center text-fuchsia-400">불러오는 중...</p>;
}

export default function IdolSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const queryClient = useQueryClient();

  const { favorites, toggleFavorite } = useFavoritesStore();
  const prevFavoritesRef = useRef<string[]>(favorites);
  const hydratedRef = useRef(false);

  const { data: favoriteIdols, isLoading: isFavoritesLoading } = useQuery({
    queryKey: ['idols', 'favorites'],
    queryFn: fetchFavoriteIdols,
  });

  const {
    data: searchData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError: isSearchError,
    isLoading: isSearchLoading,
  } = useInfiniteQuery({
    queryKey: ['idols', 'search', debouncedSearchQuery],
    enabled: debouncedSearchQuery.trim().length > 0,
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return searchIdols(debouncedSearchQuery, pageParam, PAGE_SIZE);
    },
    getNextPageParam: lastPage => lastPage.nextPage,
  });

  const { mutate: syncFavoritesWithServer } = useMutation({
    mutationFn: async ({
      added,
      removed,
    }: {
      added: string[];
      removed: string[];
    }) => {
      // 🚀 addBookmark, removeBookmark로 교체
      const promises = [
        ...added.map(id => mockToggleFavorite(id)),
        ...removed.map(id => mockToggleFavorite(id)),
      ];
      await Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['idols', 'favorites'] });
    },
  });

  useEffect(() => {
    if (!favoriteIdols || hydratedRef.current) return;

    const serverIds = favoriteIdols.map(i => i.id);
    const clientSet = new Set(favorites);

    serverIds.forEach(id => {
      if (!clientSet.has(id)) toggleFavorite(id);
    });

    prevFavoritesRef.current = [...new Set([...favorites, ...serverIds])];
    hydratedRef.current = true;
  }, [favoriteIdols, favorites, toggleFavorite]);

  useEffect(() => {
    const prev = prevFavoritesRef.current;
    const curr = favorites;

    if (!hydratedRef.current) {
      prevFavoritesRef.current = curr;
      return;
    }

    const added = curr.filter(id => !prev.includes(id));
    const removed = prev.filter(id => !curr.includes(id));

    if (added.length > 0 || removed.length > 0) {
      syncFavoritesWithServer({ added, removed });
    }

    prevFavoritesRef.current = curr;
  }, [favorites, syncFavoritesWithServer]);

  const flatSearchIdols = useMemo(
    () => searchData?.pages.flatMap(page => page.items) ?? [],
    [searchData],
  );

  const isSearching = debouncedSearchQuery.trim().length > 0;
  const idolsToDisplay = isSearching ? flatSearchIdols : (favoriteIdols ?? []);

  const isLoading = isSearching ? isSearchLoading : isFavoritesLoading;
  const isError = isSearching && isSearchError;
  const shouldShowEmptyState =
    isSearching && !isSearchLoading && !isError && idolsToDisplay.length === 0;

  const footerComponent = isFetchingNextPage ? <LoadingFooter /> : null;

  function renderItem(_: number, idol: Idol) {
    return (
      <div className="flex items-center justify-center p-2">
        <Card
          type="idol"
          idolId={idol.id}
          title={idol.name}
          imageSrc={idol.avatarUrl}
          detail={{ idolGroup: idol.groupName, position: idol.position }}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto box-border flex min-h-[calc(100svh-21rem)] w-full max-w-7xl flex-col px-4 pt-16 pb-20 md:px-8 lg:px-12 xl:px-16">
      <div className="mb-8 text-center md:mb-12">
        <h1 className="text-3xl font-bold md:text-4xl lg:mt-6 xl:mt-9">
          아이돌 스케줄 보기
        </h1>
        <div className="mx-auto mt-6 max-w-lg md:mt-8">
          <SearchBar
            inputValue={searchQuery}
            onInputChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        {!isSearching && (
          <p className="mt-6 text-sm text-gray-700 md:mt-8 md:text-base md:font-semibold">
            좋아하는 아이돌의 스케줄을 추가해보세요!
          </p>
        )}
      </div>

      <div className="mb-9 flex-grow">
        {isLoading && <LoadingSpinner />}
        {isError && <ErrorMessage />}
        {shouldShowEmptyState && <EmptySearchResult />}

        {!isLoading && !isError && idolsToDisplay.length > 0 && (
          <VirtuosoGrid
            useWindowScroll
            data={idolsToDisplay}
            computeItemKey={(_, idol) => idol.id}
            endReached={() => {
              if (isSearching && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
            increaseViewportBy={{ top: 0, bottom: 100 }}
            overscan={2}
            components={{ Footer: () => footerComponent }}
            listClassName="grid grid-cols-1 gap-x-2 gap-y-6 sm:grid-cols-2 md:gap-y-8 lg:grid-cols-3 lg:gap-y-10"
            itemContent={renderItem}
          />
        )}
      </div>
    </div>
  );
}
