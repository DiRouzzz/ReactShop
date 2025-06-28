import { TYPE_PRODUCT } from '../constants/typeProduct';
import { IProduct } from '../models/Product';

export interface IMappedProduct {
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

export const mapProduct = (product: IProduct): IMappedProduct => ({
  id: product.id,
  brand: product.brand,
  name: product.name,
  typeProduct: product.typeProduct,
  sizes: product.sizes,
  price: product.price,
  description: product.description,
  features: product.features,
  brandHistory: product.brandHistory,
  image: product.image,
});
