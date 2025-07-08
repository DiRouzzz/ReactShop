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

  const validPriceFrom =
    priceFrom !== undefined && !isNaN(priceFrom) ? priceFrom : undefined;
  const validPriceTo =
    priceTo !== undefined && !isNaN(priceTo) ? priceTo : undefined;

  if (validPriceFrom !== undefined || validPriceTo !== undefined) {
    query.price = {};
    if (validPriceFrom !== undefined) query.price.$gte = validPriceFrom;
    if (validPriceTo !== undefined) query.price.$lte = validPriceTo;
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
