import React, { useState } from 'react';
import SearchBar from '@/components/common/SearchBar';

export default function IdolSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    console.log('검색어:', searchQuery);
    // TODO: API 호출 또는 필터링 로직 추가
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="mb-7 text-3xl font-bold text-gray-800 md:text-4xl">
          아이돌 스케줄 보기
        </h1>

        <div className="mb-8">
          <SearchBar
            inputValue={searchQuery}
            onInputChange={handleInputChange}
            onSearchClick={handleSearch}
          />
        </div>

        <p className="text-base font-semibold text-gray-600 md:text-lg">
          좋아하는 아이돌의 스케줄을 추가해보세요!
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* 아이돌 카드들이 들어갈 자리 */}
      </div>
    </div>
  );
}
