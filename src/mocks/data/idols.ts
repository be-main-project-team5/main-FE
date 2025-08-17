import type { Idol } from '@/pages/IdolSearchPage';

// 🎯 30명의 아이돌 데이터
const IDOLS: Idol[] = [
  // 뉴진스 5명
  {
    id: '1',
    name: '민지',
    groupName: '뉴진스',
    avatarUrl: 'https://picsum.photos/150/150?random=1',
    position: '보컬',
  },
  {
    id: '2',
    name: '하니',
    groupName: '뉴진스',
    avatarUrl: 'https://picsum.photos/150/150?random=2',
    position: '댄서',
  },
  {
    id: '3',
    name: '다니엘',
    groupName: '뉴진스',
    avatarUrl: 'https://picsum.photos/150/150?random=3',
    position: '랩',
  },
  {
    id: '4',
    name: '해린',
    groupName: '뉴진스',
    avatarUrl: 'https://picsum.photos/150/150?random=4',
    position: '보컬',
  },
  {
    id: '5',
    name: '혜인',
    groupName: '뉴진스',
    avatarUrl: 'https://picsum.photos/150/150?random=5',
    position: '댄서',
  },

  // 르세라핌 5명
  {
    id: '6',
    name: '채원',
    groupName: '르세라핌',
    avatarUrl: 'https://picsum.photos/150/150?random=6',
    position: '보컬',
  },
  {
    id: '7',
    name: '사쿠라',
    groupName: '르세라핌',
    avatarUrl: 'https://picsum.photos/150/150?random=7',
    position: '댄서',
  },
  {
    id: '8',
    name: '윤진',
    groupName: '르세라핌',
    avatarUrl: 'https://picsum.photos/150/150?random=8',
    position: '랩',
  },
  {
    id: '9',
    name: '카즈하',
    groupName: '르세라핌',
    avatarUrl: 'https://picsum.photos/150/150?random=9',
    position: '보컬',
  },
  {
    id: '10',
    name: '은채',
    groupName: '르세라핌',
    avatarUrl: 'https://picsum.photos/150/150?random=10',
    position: '댄서',
  },

  // 아이브 6명
  {
    id: '11',
    name: '유진',
    groupName: '아이브',
    avatarUrl: 'https://picsum.photos/150/150?random=11',
    position: '보컬',
  },
  {
    id: '12',
    name: '가을',
    groupName: '아이브',
    avatarUrl: 'https://picsum.photos/150/150?random=12',
    position: '댄서',
  },
  {
    id: '13',
    name: '레이',
    groupName: '아이브',
    avatarUrl: 'https://picsum.photos/150/150?random=13',
    position: '랩',
  },
  {
    id: '14',
    name: '원영',
    groupName: '아이브',
    avatarUrl: 'https://picsum.photos/150/150?random=14',
    position: '보컬',
  },
  {
    id: '15',
    name: '리즈',
    groupName: '아이브',
    avatarUrl: 'https://picsum.photos/150/150?random=15',
    position: '댄서',
  },
  {
    id: '16',
    name: '이서',
    groupName: '아이브',
    avatarUrl: 'https://picsum.photos/150/150?random=16',
    position: '랩',
  },

  // 에스파 4명
  {
    id: '17',
    name: '카리나',
    groupName: '에스파',
    avatarUrl: 'https://picsum.photos/150/150?random=17',
    position: '보컬',
  },
  {
    id: '18',
    name: '윈터',
    groupName: '에스파',
    avatarUrl: 'https://picsum.photos/150/150?random=18',
    position: '댄서',
  },
  {
    id: '19',
    name: '지젤',
    groupName: '에스파',
    avatarUrl: 'https://picsum.photos/150/150?random=19',
    position: '랩',
  },
  {
    id: '20',
    name: '닝닝',
    groupName: '에스파',
    avatarUrl: 'https://picsum.photos/150/150?random=20',
    position: '보컬',
  },

  // 레드벨벳 5명
  {
    id: '21',
    name: '아이린',
    groupName: '레드벨벳',
    avatarUrl: 'https://picsum.photos/150/150?random=21',
    position: '보컬',
  },
  {
    id: '22',
    name: '슬기',
    groupName: '레드벨벳',
    avatarUrl: 'https://picsum.photos/150/150?random=22',
    position: '댄서',
  },
  {
    id: '23',
    name: '웬디',
    groupName: '레드벨벳',
    avatarUrl: 'https://picsum.photos/150/150?random=23',
    position: '랩',
  },
  {
    id: '24',
    name: '조이',
    groupName: '레드벨벳',
    avatarUrl: 'https://picsum.photos/150/150?random=24',
    position: '보컬',
  },
  {
    id: '25',
    name: '예리',
    groupName: '레드벨벳',
    avatarUrl: 'https://picsum.photos/150/150?random=25',
    position: '댄서',
  },

  // 트와이스 5명 (일부만)
  {
    id: '26',
    name: '나연',
    groupName: '트와이스',
    avatarUrl: 'https://picsum.photos/150/150?random=26',
    position: '보컬',
  },
  {
    id: '27',
    name: '정연',
    groupName: '트와이스',
    avatarUrl: 'https://picsum.photos/150/150?random=27',
    position: '댄서',
  },
  {
    id: '28',
    name: '모모',
    groupName: '트와이스',
    avatarUrl: 'https://picsum.photos/150/150?random=28',
    position: '랩',
  },
  {
    id: '29',
    name: '사나',
    groupName: '트와이스',
    avatarUrl: 'https://picsum.photos/150/150?random=29',
    position: '보컬',
  },
  {
    id: '30',
    name: '지효',
    groupName: '트와이스',
    avatarUrl: 'https://picsum.photos/150/150?random=30',
    position: '댄서',
  },
];

// 💾 localStorage 키
const FAVORITES_KEY = 'idol-favorites';

// 💖 localStorage에서 찜 목록 가져오기
function getFavoritesFromStorage(): Set<string> {
  if (typeof window === 'undefined') return new Set();

  try {
    const saved = localStorage.getItem(FAVORITES_KEY);
    if (saved) {
      const favoriteIds = JSON.parse(saved);
      console.log('💾 저장된 찜 목록 불러옴:', favoriteIds);
      return new Set(favoriteIds);
    }
  } catch (error) {
    console.error('❌ 찜 목록 불러오기 실패:', error);
  }

  return new Set();
}

// 💾 localStorage에 찜 목록 저장하기
function saveFavoritesToStorage(favorites: Set<string>): void {
  if (typeof window === 'undefined') return;

  try {
    const favoriteIds = Array.from(favorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
    console.log('💾 찜 목록 저장됨:', favoriteIds);
  } catch (error) {
    console.error('❌ 찜 목록 저장 실패:', error);
  }
}

// 💖 찜한 아이돌 관리 (localStorage에서 초기화)
let favorites = getFavoritesFromStorage();

// 🎯 찜한 아이돌 조회
export async function fetchFavoriteIdols(): Promise<Idol[]> {
  await new Promise(resolve => setTimeout(resolve, 500));

  // localStorage에서 최신 데이터 다시 읽기 (다른 탭에서 변경될 수 있음)
  favorites = getFavoritesFromStorage();

  if (favorites.size === 0) {
    console.log('💔 찜한 아이돌이 없습니다.');
    return [];
  }

  const favoriteIdols = IDOLS.filter(idol => favorites.has(idol.id));
  console.log(`💖 찜한 아이돌 ${favoriteIdols.length}명 조회 완료`);
  return favoriteIdols;
}

// 🔍 아이돌 검색
export async function searchIdols(
  query: string,
  page: number,
  pageSize: number,
): Promise<{ items: Idol[]; nextPage: number | undefined }> {
  await new Promise(resolve => setTimeout(resolve, 300));

  if (!query.trim()) {
    return { items: [], nextPage: undefined };
  }

  const filtered = IDOLS.filter(
    idol => idol.name.includes(query) || idol.groupName.includes(query),
  );

  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;
  const items = filtered.slice(startIndex, endIndex);
  const nextPage = endIndex < filtered.length ? page + 1 : undefined;

  return { items, nextPage };
}

// 💖 찜하기 토글 (localStorage 저장 포함!)
export function toggleFavorite(idolId: string): boolean {
  const wasAdded = !favorites.has(idolId);

  if (favorites.has(idolId)) {
    favorites.delete(idolId);
    console.log(`💔 ${idolId}번 아이돌 찜 해제`);
  } else {
    favorites.add(idolId);
    console.log(`💖 ${idolId}번 아이돌 찜 추가`);
  }

  // 💾 localStorage에 즉시 저장!
  saveFavoritesToStorage(favorites);

  return wasAdded;
}

// 🧪 테스트용 함수들
export function addTestFavorites() {
  favorites.add('1'); // 민지
  favorites.add('11'); // 유진
  favorites.add('17'); // 카리나
  saveFavoritesToStorage(favorites);
  console.log('💖 테스트용 찜 3명 추가 및 저장:', Array.from(favorites));
}

export function clearFavorites() {
  favorites.clear();
  saveFavoritesToStorage(favorites);
  console.log('💔 모든 찜 목록 삭제 및 저장');
}

export function getCurrentFavorites() {
  return Array.from(favorites);
}

// 🗑️ localStorage 데이터 완전 삭제 (개발용)
export function clearStorage() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(FAVORITES_KEY);
    favorites.clear();
    console.log('🗑️ localStorage 찜 데이터 완전 삭제');
  }
}

// 브라우저 콘솔에서 테스트
if (typeof window !== 'undefined') {
  (window as any).favoriteTest = {
    addTestFavorites,
    clearFavorites,
    getCurrentFavorites,
    clearStorage, // 개발용 추가
  };
  console.log('🧪 콘솔 테스트:');
  console.log('  window.favoriteTest.addTestFavorites()');
  console.log('  window.favoriteTest.getCurrentFavorites()');
  console.log('  window.favoriteTest.clearStorage() - 완전 삭제');
}
