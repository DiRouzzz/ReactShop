import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Product } from '@/components/shared/ProductForm/ProductForm';
import { productsListApi, type ProductsDto } from './productsListApi';

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: Product }) => {
      const response = await productsListApi.updateProduct(
        id,
        payload as ProductsDto
      );

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      console.error('Ошибка при редактировании товара:', error);
    },
  });
};
