import { useQuery } from '@tanstack/react-query';
import { cartApi, type ICartDto } from './cartApi';
import { useAuth } from '@/app/AuthContext';

export const useCart = () => {
  const { userData } = useAuth();

  return useQuery<ICartDto | null>({
    queryKey: ['cart'],
    queryFn: async () => {
      if (!userData) return null;
      const response = await cartApi.getCart();
      return response.data;
    },
    enabled: !!userData,
  });
};
