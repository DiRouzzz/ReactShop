import { useAuth } from '@/app/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartApi } from './cartApi';

export const useRemoveProductCart = () => {
  // const { userData } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      size,
      force = false,
    }: {
      productId: string;
      size: string;
      force?: boolean;
    }) => {
      // if (!userData) throw new Error('Необходимо авторизоваться');
      return cartApi.removeFromCart(productId, size, force);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
