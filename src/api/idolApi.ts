import axiosInstance from '@/api/axiosInstance';

type DRFPage<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

type IdolServer = {
  id: number;
  name: string;
  user: number;
  group: number | null;
  created_at: string;
  updated_at: string;
  avatar_url?: string | null;
};

export type Idol = {
  id: string;
  name: string;
  groupName?: string;
  avatarUrl?: string;
  position?: '보컬' | '댄서' | '랩';
};

const toAbsolute = (url: string) => {
  if (/^https?:\/\//i.test(url)) return url;
  const base = (import.meta.env.VITE_API_TARGET_URL ?? '').replace(/\/+$/, '');
  const path = url.replace(/^\/+/, '');
  return `${base}/${path}`;
};

export async function searchIdolsApi(
  q: string,
  page: number,
): Promise<{ items: Idol[]; nextPage?: number }> {
  const res = await axiosInstance.get<DRFPage<IdolServer>>('/idols/', {
    params: { search: q, page },
  });

  const { results, next } = res.data;

  const items: Idol[] = results.map(it => {
    const raw = typeof it.avatar_url === 'string' ? it.avatar_url.trim() : '';
    const serverUrl = raw ? toAbsolute(raw) : undefined;
    const fallback = `https://api.dicebear.com/8.x/fun-emoji/svg?seed=${encodeURIComponent(
      it.name,
    )}`;

    return {
      id: String(it.id),
      name: it.name,
      avatarUrl: serverUrl ?? fallback,
      groupName: (it as any).group_name ?? '', // 아직 없어서 빈값
      position: (it as any).position ?? '', // 나중에 서버가 주면 자동 반영
    };
  });

  return {
    items,
    nextPage: next ? page + 1 : undefined,
  };
}
