import { IOrder } from '../models/Order';
import { formatDate } from './formatDate';

export interface IMappedOrderProduct {
  id: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
}

export interface IMappedOrder {
  id: string;
  userId: string;
  total: number;
  products: IMappedOrderProduct[];
  registeredAt: string;
}

export const mapOrder = (order: IOrder): IMappedOrder => ({
  id: order.id,
  userId: order.user,
  total: order.total,
  registeredAt: formatDate(order.createdAt),
  products: order.products.map((item) => ({
    id: item.product,
    name: item.name,
    size: item.size,
    price: item.price,
    quantity: item.quantity,
  })),
});
