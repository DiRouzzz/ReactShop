import mongoose, { Schema } from 'mongoose';
import { IProduct } from './Product';

export interface IFavorite {
  id: string;
  user: string;
  products: IProduct[];
}

const FavoriteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    products: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
      default: [],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export const Favorite = mongoose.model<IFavorite>('Favorite', FavoriteSchema);
