import { ICart } from '../models/Cart';
import { IProduct } from '../models/Product';
import { mapProduct, IMappedProduct } from './mapProduct';

export interface IMappedCart {
  id: string;
  userId: string;
  products: {
    product: IMappedProduct;
    size: string;
    quantity: number;
  }[];
}

export const mapCart = (cart: ICart): IMappedCart => ({
  id: cart.id,
  userId: cart.user,
  products: cart.products.map((p) => ({
    product: mapProduct(p.product as IProduct),
    size: p.size,
    quantity: p.quantity ?? 1,
  })),
});
