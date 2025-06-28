import { useAuth } from '@/app/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { authApi } from './AuthApi';
import { queryClient } from '../api/query-client';

export const useLogout = () => {
  const { setUserData } = useAuth();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      setUserData(null);
      sessionStorage.removeItem('userData');
      queryClient.removeQueries({ queryKey: ['favorites'] });
    },
  });
};
