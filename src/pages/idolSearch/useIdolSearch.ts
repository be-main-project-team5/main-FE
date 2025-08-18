import { useEffect, useMemo, useRef } from 'react';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { useFavoritesStore } from '@/stores/favoritesStore';
import {
  fetchFavoriteIdols,
  searchIdols,
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

export function useIdolSearch(debouncedSearchQuery: string) {
  const queryClient = useQueryClient();
  const { favorites, toggleFavorite } = useFavoritesStore();
  const prevFavoritesRef = useRef<string[]>(favorites);
  const hydratedRef = useRef(false);

  // 즐겨찾기 패칭
  const { data: favoriteIdols, isLoading: isFavoritesLoading } = useQuery({
    queryKey: ['idols', 'favorites'],
    queryFn: fetchFavoriteIdols,
  });

  // 검색 API
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

  // 서버 동기화
  const { mutate: syncFavoritesWithServer } = useMutation({
    mutationFn: async ({
      added,
      removed,
    }: {
      added: string[];
      removed: string[];
    }) => {
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

  // 초기 즐겨찾기 동기화
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

  // 클라이언트 → 서버 동기화
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

  // 결과 데이터
  const flatSearchIdols = useMemo(
    () => searchData?.pages.flatMap(page => page.items) ?? [],
    [searchData],
  );

  const isSearching = debouncedSearchQuery.trim().length > 0;
  const idolsToDisplay = isSearching ? flatSearchIdols : (favoriteIdols ?? []);

  return {
    idolsToDisplay,
    isLoading: isSearching ? isSearchLoading : isFavoritesLoading,
    isError: isSearching && isSearchError,
    shouldShowEmptyState:
      isSearching &&
      !isSearchLoading &&
      !isSearchError &&
      idolsToDisplay.length === 0,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isSearching,
  };
}
