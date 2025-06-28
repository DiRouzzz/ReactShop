import { useMutation } from '@tanstack/react-query';
import { authApi } from './AuthApi';

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      authApi.register(data),
  });
};
