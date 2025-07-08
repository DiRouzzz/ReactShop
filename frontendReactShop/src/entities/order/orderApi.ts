import { jsonApiInstance } from '../api/api-instance';

export interface IOrderProduct {
  product: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
}

export interface IOrderDto {
  id: string;
  user: string;
  products: IOrderProduct[];
  total: number;
  registeredAt: string;
}

export const orderApi = {
  baseKey: 'order',
  getOrders: () =>
    jsonApiInstance<{ data: IOrderDto[] }>('/api/orders', {
      method: 'GET',
    }),

  createOrder: () =>
    jsonApiInstance<{ data: IOrderDto; error?: string }>('/api/orders', {
      method: 'POST',
    }),
};
