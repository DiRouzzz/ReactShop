import express from 'express';
import {
  getCart,
  addToCart,
  removeFromCartProduct,
  clearCart,
} from '../controllers/cart';
import { authenticated } from '../middlewares/authenticated';
import { mapCart } from '../helpers/mapCart';
import { HttpError } from '../helpers/httpError';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', authenticated, async (req, res, next) => {
  try {
    const cart = await getCart(req.user!.id);
    res.send({ data: cart ? mapCart(cart) : null });
  } catch (error) {
    next(error);
  }
});

router.post('/:productId', authenticated, async (req, res, next) => {
  try {
    const { size } = req.body;
    if (!size) throw new HttpError(400, 'Нужно выбрать размер');

    const updated = await addToCart(req.user!.id, req.params.productId, size);
    res.send({ data: mapCart(updated) });
  } catch (error) {
    next(error);
  }
});

router.delete('/:productId', authenticated, async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.productId)) {
      throw new HttpError(400, 'Некорректный ID товара');
    }

    const { size, force } = req.query;

    if (!size || typeof size !== 'string') {
      throw new HttpError(400, 'Нужно указать размер для удаления');
    }

    await removeFromCartProduct(
      req.user!.id,
      req.params.productId,
      size,
      force === 'true'
    );

    res.status(200).send({ error: null });
  } catch (error) {
    next(error);
  }
});

router.delete('/', authenticated, async (req, res, next) => {
  try {
    await clearCart(req.user!.id);
    res.status(200).send({ data: null });
  } catch (error) {
    next(error);
  }
});

export default router;
