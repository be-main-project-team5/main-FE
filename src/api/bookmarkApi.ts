import { type AxiosResponse } from 'axios';

import type {
  BookmarkGroup,
  BookmarkIdol,
  PaginatedResponse,
} from '@/types/bookmark';

import axiosInstance from './axiosInstance';

/**
 * 내가 북마크한 그룹 목록 전체 조회
 */
export const getBookmarkGroups = async () => {
  let allGroups: BookmarkGroup[] = [];
  let url: string | null = '/bookmarks/groups/';

  while (url) {
    const response: AxiosResponse = await axiosInstance.get<
      PaginatedResponse<BookmarkGroup>
    >(url!);
    allGroups = allGroups.concat(response.data.results);
    url = response.data.next;
  }

  return allGroups;
};

/**
 * 내가 북마크한 아이돌 목록 전체 조회
 */
export const getBookmarkIdols = async () => {
  let allIdols: BookmarkIdol[] = [];
  let url: string | null = '/bookmarks/idols/';

  while (url) {
    const response: AxiosResponse = await axiosInstance.get<
      PaginatedResponse<BookmarkIdol>
    >(url!);
    allIdols = allIdols.concat(response.data.results);
    url = response.data.next;
  }

  return allIdols;
};

/** 그룹 북마크 추가 */
export const addBookmarkGroup = async (groupId: number) => {
  await axiosInstance.post('/bookmarks/groups/', { group: groupId });
};

/** 그룹 북마크 제거 */
export const removeBookmarkGroup = async (bookmarkId: number) => {
  await axiosInstance.delete(`/bookmarks/groups/${bookmarkId}/`);
};

/** 아이돌 북마크 추가 */
export const addBookmarkIdol = async (idolId: number) => {
  await axiosInstance.post('/bookmarks/idols/', { idol: idolId });
};

/** 아이돌 북마크 제거 */
export const removeBookmarkIdol = async (bookmarkId: number) => {
  await axiosInstance.delete(`/bookmarks/idols/${bookmarkId}/`);
};
