import type { IFavoriteDto } from '@/entities/favorites';

export const checkProductInFavorites = (
  favorites: IFavoriteDto | null | undefined,
  productId: string
) => {
  return !!favorites?.products.some((product) => product.id === productId);
};
