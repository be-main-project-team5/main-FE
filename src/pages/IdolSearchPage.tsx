import React, { useMemo, useState } from 'react';
import {
  useInfiniteQuery,
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { VirtuosoGrid } from 'react-virtuoso';

import SearchBar from '@/components/common/SearchBar';
import IdolCard from '@/components/common/IdolCard';
import { useDebounce } from '@/hooks/useDebounce';
import {
  searchIdols,
  fetchFavoriteIdols,
  toggleFavorite as mockToggleFavorite,
} from '@/mocks/data/idols';

export type Idol = {
  id: string;
  name: string;
  groupName: string;
  avatarUrl: string;
  position: '보컬' | '댄서' | '랩';
};

const PAGE_SIZE = 6;

export default function IdolSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { data: favoriteIdols, isLoading: isFavoritesLoading } = useQuery({
    queryKey: ['idols', 'favorites'],
    queryFn: fetchFavoriteIdols, // 🚀 API 연결 시 교체
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
      return searchIdols(debouncedSearchQuery, pageParam, PAGE_SIZE); // 🚀 API 연결 시 교체
    },
    getNextPageParam: lastPage => lastPage.nextPage,
  });

  const flatSearchIdols: Idol[] = useMemo(
    () => searchData?.pages.flatMap(page => page.items) ?? [],
    [searchData],
  );

  const isSearching = debouncedSearchQuery.trim().length > 0;
  const idolsToDisplay = isSearching ? flatSearchIdols : (favoriteIdols ?? []);

  const isLoading = isSearching ? isSearchLoading : isFavoritesLoading;
  const isError = isSearching && isSearchError;

  const shouldShowEmptyState =
    isSearching &&
    !isSearchLoading &&
    !isSearchError &&
    idolsToDisplay.length === 0;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(event.target.value);

  const queryClient = useQueryClient();

  const { mutate: toggleFavorite } = useMutation<void, Error, string>({
    mutationFn: async idolId => {
      await Promise.resolve(mockToggleFavorite(idolId));
    }, // 🚀 API 연결 시 교체: await api.post/delete(`/bookmarks/bookmark/idol/${idolId}`)
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['idols', 'favorites'] });
    },
  });

  const favoriteIdSet = useMemo(
    () => new Set((favoriteIdols ?? []).map(i => i.id)),
    [favoriteIdols],
  );

  return (
    <div className="mx-auto box-border flex min-h-[calc(100svh-21rem)] w-full max-w-7xl flex-col px-4 pt-16 pb-20 md:px-8 lg:px-12 xl:px-16">
      <div className="mb-16 text-center">
        <h1 className="text-3xl font-bold md:text-4xl lg:mt-6 xl:mt-9">
          아이돌 스케줄 보기
        </h1>
        <div className="mx-auto mt-6 max-w-lg md:mt-8">
          <SearchBar
            inputValue={searchQuery}
            onInputChange={handleInputChange}
            onSearchClick={() => {}}
          />
        </div>
        {!isSearching && (
          <p className="mt-6 text-sm text-gray-600 md:mt-9 md:text-base md:font-semibold">
            좋아하는 아이돌의 스케줄을 추가해보세요!
          </p>
        )}
      </div>

      <div className="flex-grow">
        {isLoading && (
          <p className="text-center text-gray-500">불러오는 중...</p>
        )}
        {isError && (
          <p className="text-center text-red-500" aria-live="polite">
            에러가 발생했습니다.
          </p>
        )}
        {shouldShowEmptyState && (
          <p className="text-center text-gray-500" aria-live="polite">
            검색 결과가 없습니다.
          </p>
        )}

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
            components={{
              Footer: () =>
                isFetchingNextPage ? (
                  <p className="py-4 text-center text-gray-500">
                    불러오는 중...
                  </p>
                ) : null,
            }}
            listClassName="grid grid-cols-1 gap-x-2 gap-y-6 sm:grid-cols-2 md:gap-y-8 lg:grid-cols-3 lg:gap-y-10"
            itemContent={(_, idol) => (
              <div className="flex items-center justify-center p-2">
                <IdolCard
                  idolId={idol.id}
                  name={idol.name}
                  groupName={idol.groupName}
                  position={idol.position}
                  imageSrc={idol.avatarUrl}
                  isFavorited={favoriteIdSet.has(idol.id)}
                  onToggleFavorite={() => toggleFavorite(idol.id)}
                />
              </div>
            )}
          />
        )}
      </div>
    </div>
  );
}
