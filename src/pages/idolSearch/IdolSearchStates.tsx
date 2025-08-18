export function LoadingSpinner() {
  return <p className="text-center text-fuchsia-400">불러오는 중...</p>;
}

export function ErrorMessage() {
  return <p className="text-center text-fuchsia-800">에러가 발생했습니다.</p>;
}

export function EmptySearchResult() {
  return <p className="text-center text-fuchsia-400">검색 결과가 없습니다.</p>;
}
