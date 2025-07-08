import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { jsonApiInstance } from '../api/api-instance';

export type PaginatedResult<T> = {
  data: T[];
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
};

export type ProductsDto = {
  id: string;
  brand: string;
  name: string;
  typeProduct: 'MAN' | 'WOMAN';
  sizes: string[];
  price: number;
  description: string;
  features: string[];
  brandHistory: string;
  image: string[];
};

export const productsListApi = {
  getProductsListInfinityQueryOptions: (
    searchPhrase: string,
    typeProduct?: 'MAN' | 'WOMAN',
    priceFrom?: number,
    priceTo?: number
  ) => {
    return infiniteQueryOptions({
      queryKey: ['products', searchPhrase, typeProduct, priceFrom, priceTo],
      queryFn: (meta) => {
        const page = meta.pageParam || 1;
        const queryParams = new URLSearchParams();
        queryParams.set('_page', String(page));
        queryParams.set('_per_page', '12');
        queryParams.set('search', searchPhrase);
        if (typeProduct) queryParams.set('typeProduct', typeProduct);
        if (priceFrom !== undefined)
          queryParams.set('priceFrom', priceFrom.toString());
        if (priceTo !== undefined)
          queryParams.set('priceTo', priceTo.toString());

        return jsonApiInstance<PaginatedResult<ProductsDto>>(
          `/api/products?${queryParams.toString()}`,
          { signal: meta.signal }
        );
      },
      initialPageParam: 1,
      getNextPageParam: (result) => result.next,
      select: (result) => result.pages.flatMap((page) => page.data),
    });
  },

  getProductByIdQueryOptions: (id: string) => {
    return queryOptions({
      queryKey: ['products', id],
      queryFn: () => jsonApiInstance<ProductsDto>(`/api/products/${id}`),
    });
  },

  createProduct: (payload: ProductsDto) =>
    jsonApiInstance<{ data: ProductsDto; error?: string }>('/api/products', {
      method: 'POST',
      json: payload,
    }),

  updateProduct: (id: string, payload: ProductsDto) =>
    jsonApiInstance<{ data: ProductsDto; error?: string }>(`/api/products/${id}`, {
      method: 'PATCH',
      json: payload,
    }),

  deleteProduct: (id: string) =>
    jsonApiInstance<{ error: null }>(`/api/products/${id}`, {
      method: 'DELETE',
    }),
};
