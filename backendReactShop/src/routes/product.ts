import express from 'express';
import {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from '../controllers/product';
import { hasRole } from '../middlewares/hasRole';
import { authenticated } from '../middlewares/authenticated';
import { ROLE } from '../constants/roles';
import { mapProduct } from '../helpers/mapProduct';
import { Product } from '../models/Product';
import { HttpError } from '../helpers/httpError';
import mongoose from 'mongoose';

const router = express.Router({ mergeParams: true });

router.get(
  '/',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const page = Number(req.query._page) || 1;
      const perPage = Number(req.query._per_page) || 12;
      const search = (req.query.search as string) || '';
      const offset = (page - 1) * perPage;
      const typeProduct = req.query.typeProduct as 'MAN' | 'WOMAN' | undefined;
      const priceFrom = Number(req.query.priceFrom);
      const priceTo = Number(req.query.priceTo);

      const { products, total } = await getProducts(
        perPage,
        offset,
        search,
        typeProduct,
        priceFrom,
        priceTo
      );

      const pages = Math.ceil(total / perPage);
      const next = page < pages ? page + 1 : null;
      const prev = page > 1 ? page - 1 : null;

      res.send({
        data: products.map(mapProduct),
        first: 1,
        items: total,
        last: pages,
        next,
        pages,
        prev,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/max/price',
  async (
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const result = await Product.findOne()
        .sort({ price: -1 })
        .select('price');
      res.send({ maxPrice: result?.price ?? 0 });
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id', async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      throw new HttpError(400, 'Некорректный ID продукта');
    }

    const product = await Product.findById(req.params.id);
    if (!product) throw new HttpError(404, 'Продукт не найден');

    res.send(mapProduct(product));
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  authenticated,
  hasRole([ROLE.ADMIN]),
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const product = await addProduct(req.body);
      res.send({ data: mapProduct(product) });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  authenticated,
  hasRole([ROLE.ADMIN]),
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const product = await updateProduct(req.params.id, req.body);

      if (!product) throw new HttpError(404, 'Продукт не найден');

      res.send({ data: mapProduct(product) });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  authenticated,
  hasRole([ROLE.ADMIN]),
  async (req, res, next) => {
    try {
      await deleteProduct(req.params.id);
      res.send({ error: null });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
