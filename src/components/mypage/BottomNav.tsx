const MYPAGE_BOTTOM_NAV = ['로그아웃', '회원 탈퇴'];

export default function BottomNav() {
  return (
    <div className="flex flex-col items-start gap-2 border-t-1 border-gray-200 py-10 text-sm">
      {MYPAGE_BOTTOM_NAV.map(el => (
        <button type="button" className="px-4 py-2">
          <p className="hover:underline">{el}</p>
        </button>
      ))}
    </div>
  );
}
