import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favorites: string[];
  toggleFavorite: (idolId: string) => void;
  isFavorited: (idolId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (idolId: string) =>
        set(state => ({
          favorites: state.favorites.includes(idolId)
            ? state.favorites.filter(id => id !== idolId)
            : [...state.favorites, idolId],
        })),
      isFavorited: (idolId: string) => get().favorites.includes(idolId),
    }),
    {
      name: 'favorites-storage',
    },
  ),
);
