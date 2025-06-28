import { Favorite } from '../models/Favorites';

export const getFavorites = async (userId: string) => {
  return Favorite.findOne({ user: userId }).populate('products');
};

export const addToFavorites = async (userId: string, productId: string) => {
  const favorite = await Favorite.findOneAndUpdate(
    { user: userId },
    { $addToSet: { products: productId } },
    { upsert: true, new: true }
  ).populate('products');
  return favorite;
};

export const removeFromFavorites = async (
  userId: string,
  productId: string
) => {
  const favorite = await Favorite.findOneAndUpdate(
    { user: userId },
    { $pull: { products: productId } },
    { new: true }
  ).populate('products');
  return favorite;
};
