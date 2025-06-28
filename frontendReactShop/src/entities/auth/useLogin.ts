import { useMutation } from '@tanstack/react-query';
import { authApi } from './AuthApi';
import { useAuth, type LoginResponse } from '@/app/AuthContext';

export const useLogin = () => {
  const { setUserData } = useAuth();

  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      authApi.loginUser({ data }),

    onSuccess: (userData) => {
      setUserData(userData as LoginResponse);
      sessionStorage.setItem('userData', JSON.stringify(userData));
    },
  });
};
