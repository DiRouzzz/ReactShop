export const getCartStats = (
  products: { quantity: number; product: { price: number } }[]
) => {
  return products.reduce(
    (acc, item) => {
      acc.totalCount += item.quantity;
      acc.totalPrice += item.quantity * item.product.price;
      return acc;
    },
    { totalCount: 0, totalPrice: 0 }
  );
};
