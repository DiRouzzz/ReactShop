import { IProduct, Product } from '../models/Product';

export const addProduct = async (product: IProduct) => {
  const newProduct = await Product.create(product);

  return newProduct;
};

export const getProducts = async (
  limit: number = 12,
  offset: number = 0,
  search: string = '',
  typeProduct?: 'MAN' | 'WOMAN',
  priceFrom?: number,
  priceTo?: number
) => {
  const query: any = {};

  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }

  if (typeProduct) {
    query.typeProduct = typeProduct;
  }

  if (priceFrom !== undefined || priceTo !== undefined) {
    query.price = {};
    if (priceFrom !== undefined) query.price.$gte = priceFrom;
    if (priceTo !== undefined) query.price.$lte = priceTo;
  }

  const products = await Product.find(query).skip(offset).limit(limit).exec();

  const total = await Product.countDocuments(query);

  return {
    products,
    total,
    hasMore: offset + limit < total,
    nextOffset: offset + limit,
  };
};

export const deleteProduct = async (id: string) => {
  const product = await Product.findByIdAndDelete(id);

  return product;
};

export const updateProduct = async (id: string, product: IProduct) => {
  const updatedProduct = await Product.findByIdAndUpdate(id, product, {
    new: true,
  });

  return updatedProduct;
};
