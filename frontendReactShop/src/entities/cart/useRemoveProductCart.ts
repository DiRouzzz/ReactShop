import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartApi } from './cartApi';

export const useRemoveProductCart = () => {
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
      return cartApi.removeFromCart(productId, size, force);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
