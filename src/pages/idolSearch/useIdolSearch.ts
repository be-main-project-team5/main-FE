import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useMemo } from 'react';

import { getBookmarkIdols } from '@/api/bookmarkApi';
import { searchIdolsApi } from '@/api/idolApi';
import { useSyncArrayData } from '@/hooks/useSyncArrayData';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { avatarOf } from '@/utils/avatar';

export function useIdolSearch(debouncedSearchQuery: string) {
  const queryClient = useQueryClient();
  const { favorites, toggleFavorite } = useFavoritesStore();

  const { data: bookmarkedRaw, isLoading: isFavoritesLoading } = useQuery({
    queryKey: ['idols', 'favorites'],
    queryFn: getBookmarkIdols,
  });

  const favoriteIdols = useMemo(
    () =>
      (bookmarkedRaw ?? []).map(b => ({
        id: String(b.idol),
        name: b.idol_name,
        avatarUrl: avatarOf(b.idol_name),
      })),
    [bookmarkedRaw],
  );

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
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) =>
      searchIdolsApi(debouncedSearchQuery, pageParam),
    getNextPageParam: lastPage => lastPage.nextPage ?? undefined,
  });

  const { mutate: syncFavoritesWithServer } = useMutation({
    // TODO: 토글 API 교체 자리
    mutationFn: async () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['idols', 'favorites'] });
    },
  });

  useSyncArrayData<string>({
    serverData: favoriteIdols?.map(i => i.id),
    clientData: favorites,
    applyFn: toggleFavorite,
    onSync: () => {
      // TODO: 토글 API 붙으면 여기서 add/remove 호출
      syncFavoritesWithServer({} as any);
    },
  });

  const flatSearchIdols = useMemo(
    () => searchData?.pages.flatMap(page => page.items) ?? [],
    [searchData],
  );

  const isSearching = debouncedSearchQuery.trim().length > 0;
  const idolsToDisplay = isSearching ? flatSearchIdols : favoriteIdols;

  const hasFavorites = (favoriteIdols?.length ?? 0) > 0;
  const shouldShowEmptyFavorites =
    !isSearching && !isFavoritesLoading && (favoriteIdols?.length ?? 0) === 0;

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
    hasFavorites,
    shouldShowEmptyFavorites,
  };
}
