import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Product } from '@/components/shared/ProductForm/ProductForm';
import { productsListApi, type ProductsDto } from './productsListApi';

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Product) => {
      const response = await productsListApi.createProduct(
        payload as ProductsDto
      );

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      console.error('Ошибка при добавлении товара:', error);
    },
  });
};
