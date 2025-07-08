import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFavorites } from './useFavorites';
import { favoritesApi, type IFavoriteDto } from './favoritesApi';
import { checkProductInFavorites } from '@/utils/checkProductInFavorites';

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  const { data: favorites } = useFavorites();

  return useMutation({
    mutationFn: async (productId: string) => {
      const isFavorite = favorites?.products.some((p) => p.id === productId);

      if (isFavorite) {
        return favoritesApi.removeFromFavorites(productId);
      } else {
        return favoritesApi.addToFavorites(productId);
      }
    },

    onMutate: async (productId: string) => {
      await queryClient.cancelQueries({ queryKey: ['favorites'] });

      const previousFavorites = queryClient.getQueryData<IFavoriteDto>([
        'favorites',
      ]);

      if (previousFavorites) {
        queryClient.setQueryData<IFavoriteDto>(['favorites'], {
          ...previousFavorites,
          products: checkProductInFavorites(previousFavorites, productId)
            ? previousFavorites.products.filter((p) => p.id !== productId)
            : [...previousFavorites.products, { id: productId } as any],
        });
      }

      return { previousFavorites };
    },

    onError: (_err, _productId, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(['favorites'], context.previousFavorites);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
};
