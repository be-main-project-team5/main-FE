import { useNavigate } from 'react-router-dom';

export const usePageNav = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/auth/login');
  };

  const navigateToSignup = () => {
    navigate('/auth/register');
  };

  const navigateToSearch = () => {
    navigate('/search');
  };

  return { navigateToLogin, navigateToSignup, navigateToSearch };
};
