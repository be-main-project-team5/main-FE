import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useMemo } from 'react';

import { searchIdolsApi } from '@/api/idolApi';
import { useSyncArrayData } from '@/hooks/useSyncArrayData';
import { toggleFavorite as mockToggleFavorite } from '@/mocks/data/idols';
import { fetchBookmarkedIdols } from '@/api/bookmarkApi';
import { useFavoritesStore } from '@/stores/favoritesStore';

export function useIdolSearch(debouncedSearchQuery: string) {
  const queryClient = useQueryClient();
  const { favorites, toggleFavorite } = useFavoritesStore();

  const { data: favoriteIdols, isLoading: isFavoritesLoading } = useQuery({
    queryKey: ['idols', 'favorites'],
    queryFn: fetchBookmarkedIdols,
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
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      return searchIdolsApi(debouncedSearchQuery, pageParam);
    },
    getNextPageParam: lastPage => lastPage.nextPage ?? undefined,
  });

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

  useSyncArrayData<string>({
    serverData: favoriteIdols?.map(i => i.id),
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
  const idolsToDisplay = isSearching ? flatSearchIdols : (favoriteIdols ?? []);

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
