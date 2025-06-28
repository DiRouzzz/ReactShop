import mongoose, { Schema } from 'mongoose';

export interface IOrderProduct {
  product: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
}

export interface IOrder {
  id: string;
  user: string;
  products: IOrderProduct[];
  total: number;
  createdAt: Date;
}

const OrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        name: { type: String, required: true },
        size: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export const Order = mongoose.model<IOrder>('Order', OrderSchema);
