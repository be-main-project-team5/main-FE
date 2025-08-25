import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useMemo } from 'react';

import {
  addBookmarkIdol,
  getBookmarkIdols,
  removeBookmarkIdol,
} from '@/api/bookmarkApi';
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
    mutationFn: async ({
      added,
      removed,
    }: {
      added: number[];
      removed: number[];
    }) => {
      const promises = [
        ...added.map(id => addBookmarkIdol(id)),
        ...removed.map(id => {
          const bookmark = bookmarkedRaw?.find(fav => fav.idol === id);
          if (bookmark) {
            return removeBookmarkIdol(bookmark.id);
          }
          return Promise.resolve();
        }),
      ];
      await Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['idols', 'favorites'] });
      useFavoritesStore.getState().fetchFavorites();
    },
  });

  useSyncArrayData<number>({
    serverData: bookmarkedRaw?.map(b => b.idol),
    clientData: favorites,
    applyFn: toggleFavorite,
    onSync: (added, removed) => {
      syncFavoritesWithServer({ added, removed });
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
