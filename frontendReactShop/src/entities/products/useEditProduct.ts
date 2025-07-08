import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { jsonApiInstance } from '../api/api-instance';
import type { Product } from '@/components/shared/ProductForm/ProductForm';

export const useEditProduct = () => {
  const { id } = useParams();
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => jsonApiInstance(`/api/products/${id}`),
    enabled: !!id,
  });
};
