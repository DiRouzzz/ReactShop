import { useQuery } from '@tanstack/react-query';
import { jsonApiInstance } from '../api/api-instance';

export const useMaxPrice = () => {
  return useQuery({
    queryKey: ['maxPrice'],
    queryFn: () =>
      jsonApiInstance<{ maxPrice: number }>('/api/products/max/price'),
    select: (data) => data.maxPrice,
  });
};
