import { IFavorite } from '../models/Favorites';
import { IMappedProduct, mapProduct } from './mapProduct';

export interface IMappedFavorite {
  id: string;
  userId: string;
  products: IMappedProduct[];
}

export const mapFavorite = (favorite: IFavorite): IMappedFavorite => ({
  id: favorite.id,
  userId: favorite.user,
  products: favorite.products.map(mapProduct),
});
