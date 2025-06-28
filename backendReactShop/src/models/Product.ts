import { TYPE_PRODUCT } from './../constants/typeProduct';
import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

export interface IProduct {
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
  createdAt: Date;
}

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    typeProduct: { type: String, required: true },
    sizes: { type: [String], required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    features: { type: [String], required: true },
    brandHistory: { type: String, required: true },
    image: {
      type: [String],
      required: true,
      validate: {
        validator: (value: string[]) =>
          value.every((url) => validator.isURL(url)),
        message: 'Image should be a valid URL',
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
