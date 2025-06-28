import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orderApi } from './orderApi';

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await orderApi.createOrder();

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      console.error('Ошибка при оформление заказа:', error);
    },
  });
};
