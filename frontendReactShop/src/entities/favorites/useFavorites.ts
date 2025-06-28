import { useQuery } from '@tanstack/react-query';
import { favoritesApi, type IFavoriteDto } from './favoritesApi';
import { useAuth } from '@/app/AuthContext';

export const useFavorites = () => {
  const { userData } = useAuth();

  return useQuery<IFavoriteDto | null>({
    queryKey: ['favorites'],
    queryFn: async () => {
      if (!userData) return null;
      const response = await favoritesApi.getFavorites();
      return response.data;
    },
    enabled: !!userData,
  });
};
