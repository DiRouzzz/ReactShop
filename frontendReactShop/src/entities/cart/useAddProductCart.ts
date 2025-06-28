import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartApi } from './cartApi';

export const useAddProductCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      size,
    }: {
      productId: string;
      size: string;
    }) => {
      const response = await cartApi.addToCart(productId, size);

      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      console.error('Ошибка при добавлении в корзину:', error);
    },
  });
};
