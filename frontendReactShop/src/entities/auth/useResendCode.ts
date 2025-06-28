import { useMutation } from '@tanstack/react-query';
import { authApi } from './AuthApi';

export const useResend = () => {
  return useMutation({
    mutationFn: (data: { email: string }) => authApi.resend(data),
  });
};
