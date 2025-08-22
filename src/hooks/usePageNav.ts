import { useNavigate } from 'react-router-dom';

export const usePageNav = () => {
  const navigate = useNavigate();

  const navigateToLanding = () => {
    navigate('/');
  };

  const navigateToLogin = () => {
    navigate('/auth/login');
  };

  const navigateToSignup = () => {
    navigate('/auth/register');
  };

  const navigateToSearch = () => {
    navigate('/search');
  };

  const navigateToMypage = () => {
    navigate('/mypage/myprofile');
  };

  return {
    navigateToLanding,
    navigateToLogin,
    navigateToSignup,
    navigateToSearch,
    navigateToMypage,
  };
};
