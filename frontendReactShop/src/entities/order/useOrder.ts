import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/app/AuthContext';
import { orderApi, type IOrderDto } from './orderApi';

export const useOrder = () => {
  const { userData } = useAuth();

  return useQuery<IOrderDto[] | null>({
    queryKey: ['order'],
    queryFn: async () => {
      if (!userData) return [];
      const response = await orderApi.getOrders();
      return response.data;
    },
    enabled: !!userData,
  });
};
