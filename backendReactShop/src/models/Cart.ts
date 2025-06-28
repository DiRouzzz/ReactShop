import mongoose, { Schema } from 'mongoose';
import { IProduct } from './Product';

export interface ICart {
  id: string;
  user: string;
  products: {
    product: string | IProduct;
    size: string;
    quantity: number;
  }[];
}

const CartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        size: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export const Cart = mongoose.model<ICart>('Cart', CartSchema);
