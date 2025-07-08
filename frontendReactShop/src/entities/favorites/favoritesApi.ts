import { jsonApiInstance } from '../api/api-instance';

type TYPE_PRODUCT = 'MAN' | 'WOMAN';

interface IProduct {
  id: string;
  brand: string;
  name: string;
  typeProduct: TYPE_PRODUCT;
  sizes: string[];
  price: number;
  description: string;
  features: string[];
  brandHistory: string;
  image: string[];
}

export interface IFavoriteDto {
  id: string;
  userId: string;
  products: IProduct[];
}

export const favoritesApi = {
  baseKey: 'favorites',
  getFavorites: () =>
    jsonApiInstance<{ data: IFavoriteDto }>('/api/favorites', {
      method: 'GET',
    }),

  addToFavorites: (productId: string) =>
    jsonApiInstance<{ data: IFavoriteDto }>(`/api/favorites/${productId}`, {
      method: 'POST',
    }),

  removeFromFavorites: (productId: string) =>
    jsonApiInstance<{ data: IFavoriteDto; error?: string }>(
      `/api/favorites/${productId}`,
      {
        method: 'DELETE',
      }
    ),
};
