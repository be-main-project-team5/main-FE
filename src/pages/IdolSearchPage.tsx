export default function IdolSearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="my-8 text-3xl font-bold text-gray-800 md:text-4xl">
          아이돌 스케줄 보기
        </h1>

        <div className="mb-6">{/* SearchBar 컴포넌트가 들어갈 자리 */}</div>

        <p className="text-base font-semibold text-gray-600 md:text-lg">
          좋아하는 아이돌의 스케줄을 추가해보세요!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {/* 아이돌 카드들이 들어갈 자리 */}
      </div>
    </div>
  );
}
