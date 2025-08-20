import { useNavigate } from 'react-router-dom';

export const useAuthNavigation = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/auth/login');
  };

  const navigateToSignup = () => {
    navigate('/auth/register');
  };

  return { navigateToLogin, navigateToSignup };
};
