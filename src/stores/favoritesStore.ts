import { create } from 'zustand';

interface FavoritesState {
  favorites: string[];
  toggleFavorite: (idolId: string) => void;
  isFavorited: (idolId: string) => boolean;
  setFavorites: (ids: string[]) => void;
  clear: () => void;
}

export const useFavoritesStore = create<FavoritesState>()((set, get) => ({
  favorites: [],
  toggleFavorite: idolId =>
    set(s => ({
      favorites: s.favorites.includes(idolId)
        ? s.favorites.filter(id => id !== idolId)
        : [...s.favorites, idolId],
    })),
  isFavorited: idolId => get().favorites.includes(idolId),
  setFavorites: ids => set({ favorites: Array.from(new Set(ids)) }),
  clear: () => set({ favorites: [] }),
}));
