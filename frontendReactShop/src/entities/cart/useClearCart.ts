import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartApi } from './cartApi';
import { useAuth } from '@/app/AuthContext';

export const useClearCart = () => {
  const { userData } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!userData) throw new Error('Необходимо авторизоваться');
      return cartApi.clearCart();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
