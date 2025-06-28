import { jsonApiInstance } from '../api/api-instance';

type TYPE_PRODUCT = 'MAN' | 'WOMAN';

interface IProduct {
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

export interface ICartDto {
  id: string;
  userId: string;
  products: {
    product: IProduct;
    size: string;
    quantity: number;
  }[];
}

export const cartApi = {
  baseKey: 'cart',
  getCart: () =>
    jsonApiInstance<{ data: ICartDto }>('/cart', {
      method: 'GET',
    }),

  addToCart: (productId: string, size: string) =>
    jsonApiInstance<{ data: ICartDto; error?: string }>(`/cart/${productId}`, {
      method: 'POST',
      json: { size },
    }),

  removeFromCart: (productId: string, size: string, force?: boolean) =>
    jsonApiInstance<{ data: ICartDto; error?: string }>(
      `/cart/${productId}?size=${encodeURIComponent(size)}${
        force ? '&force=true' : ''
      }`,
      {
        method: 'DELETE',
      }
    ),

  clearCart: () =>
    jsonApiInstance('/cart', {
      method: 'DELETE',
    }),
};
