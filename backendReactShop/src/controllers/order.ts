import { Order } from '../models/Order';
import { Cart } from '../models/Cart';
import { HttpError } from '../helpers/httpError';

export const createOrder = async (userId: string) => {
  const cart = await Cart.findOne({ user: userId }).populate(
    'products.product'
  );

  if (!cart || cart.products.length === 0) {
    throw new HttpError(400, 'Корзина пуста');
  }

  const orderItems = cart.products.map((item) => {
    if (typeof item.product === 'string' || !item.product) {
      throw new HttpError(500, 'Ошибка товара в корзине');
    }

    return {
      product: item.product.id,
      name: item.product.name,
      size: item.size,
      price: item.product.price,
      quantity: item.quantity,
    };
  });

  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = await Order.create({
    user: userId,
    products: orderItems,
    total,
  });

  await Cart.findOneAndUpdate({ user: userId }, { products: [] });

  return order;
};

export const getOrders = async (userId: string) => {
  return Order.find({ user: userId }).populate('products');
};
