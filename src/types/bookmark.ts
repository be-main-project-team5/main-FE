export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface BookmarkGroup {
  id: number;
  user: string;
  group: number;
  group_name: string;
  created_at: string;
}

export interface BookmarkIdol {
  id: number;
  user: string;
  idol: number;
  idol_name: string;
  created_at: string;
}
