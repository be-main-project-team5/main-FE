import { usePageNav } from '@/hooks/usePageNav';
import { useUserStore } from '@/stores/userStore';

export const useLogout = () => {
  const { logout } = useUserStore();
  const { navigateToLanding } = usePageNav();

  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      logout();
      navigateToLanding();
    }
  };

  return { handleLogout };
};
