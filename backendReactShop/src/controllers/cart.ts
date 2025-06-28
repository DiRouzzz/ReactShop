import mongoose from 'mongoose';
import { HttpError } from '../helpers/httpError';
import { Cart } from '../models/Cart';
import { Product } from '../models/Product';

export const getCart = async (userId: string) => {
  return Cart.findOne({ user: userId }).populate('products.product');
};

export const addToCart = async (
  userId: string,
  productId: string,
  size: string
) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new HttpError(400, 'Некорректный ID продукта');
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new HttpError(404, 'Продукт не найден');
  }

  if (!product.sizes.includes(size)) {
    throw new HttpError(
      400,
      `Недопустимый размер '${size}' для этого продукта`
    );
  }

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    const newCart = await Cart.create({
      user: userId,
      products: [{ product: productId, size, quantity: 1 }],
    });
    return newCart.populate('products.product');
  }

  const existing = cart.products.find(
    (item) => item.product.toString() === productId && item.size === size
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.products.push({ product: productId, size, quantity: 1 });
  }

  await cart.save();
  return cart.populate('products.product');
};

export const removeFromCartProduct = async (
  userId: string,
  productId: string,
  size: string,
  force?: boolean
) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) return null;

  const item = cart.products.find(
    (p) => p.product.toString() === productId && p.size === size
  );

  if (!item) return cart;

  if (item.quantity > 1 && !force) {
    item.quantity -= 1;
  } else {
    cart.products = cart.products.filter(
      (p) => !(p.product.toString() === productId && p.size === size)
    );
  }

  await cart.save();
  return cart.populate('products.product');
};

export const clearCart = async (userId: string) => {
  return Cart.findOneAndUpdate(
    { user: userId },
    { products: [] },
    { new: true }
  ).populate('products.product');
};
