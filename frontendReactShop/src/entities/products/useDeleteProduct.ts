import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productsListApi } from './productsListApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id: string) => productsListApi.deleteProduct(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Товар успешно удален');
      navigate('/');
    },

    onError: () => {
      toast.error('Ошибка при удалении товара');
    },
  });
};
