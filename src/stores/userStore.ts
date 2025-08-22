import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: {
    user_id: string;
    email: string;
    nickname: string;
    profile_image_url: string;
    role: string;
  } | null;
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (
    user: {
      user_id: string;
      email: string;
      nickname: string;
      profile_image_url: string;
      role: string;
    },
    accessToken: string,
    refreshToken: string,
  ) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      user: null,
      isLoggedIn: false,
      accessToken: null,
      refreshToken: null,
      login: (user, accessToken, refreshToken) =>
        set({
          user,
          isLoggedIn: true,
          accessToken,
          refreshToken,
        }),
      logout: () =>
        set({
          user: null,
          isLoggedIn: false,
          accessToken: null,
          refreshToken: null,
        }),
    }),
    {
      name: 'user-storage',
    },
  ),
);
