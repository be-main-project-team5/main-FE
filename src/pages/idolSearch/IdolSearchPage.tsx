import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchBar from '@/components/common/SearchBar';
import { useDebounce } from '@/hooks/useDebounce';

import IdolSearchList from './IdolSearchList';
import {
  EmptySearchResult,
  ErrorMessage,
  LoadingSpinner,
} from './IdolSearchStates';
import { useIdolSearch } from './useIdolSearch';

export default function IdolSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const navigate = useNavigate();

  const {
    idolsToDisplay,
    isLoading,
    isError,
    shouldShowEmptyState,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isSearching,
  } = useIdolSearch(debouncedSearchQuery);

  return (
    <div className="mx-auto box-border flex min-h-[calc(100svh-21rem)] w-full max-w-7xl flex-col px-4 pt-16 pb-20 md:px-8 lg:px-12 xl:px-16">
      {/* 헤더 영역 */}
      <div className="mb-8 text-center md:mb-12">
        <h1 className="text-3xl font-bold md:text-4xl lg:mt-6 xl:mt-9">
          아이돌 스케줄 보기
        </h1>
        <div className="mx-auto mt-6 max-w-lg md:mt-8">
          <SearchBar
            inputValue={searchQuery}
            onInputChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        {!isSearching && (
          <p className="mt-6 text-sm text-gray-700 md:mt-8 md:text-base md:font-semibold">
            좋아하는 아이돌의 스케줄을 추가해보세요!
          </p>
        )}
      </div>

      {/* 본문 리스트 */}
      <div className="mb-9 flex-grow">
        {isLoading && <LoadingSpinner />}
        {isError && <ErrorMessage />}
        {shouldShowEmptyState && <EmptySearchResult />}

        {!isLoading && !isError && idolsToDisplay.length > 0 && (
          <IdolSearchList
            idols={idolsToDisplay}
            isSearching={isSearching}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onCardClick={id => navigate(`/idols/${id}`)}
          />
        )}
      </div>
    </div>
  );
}
