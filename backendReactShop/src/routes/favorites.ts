import express from 'express';
import {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
} from '../controllers/favorite';
import { authenticated } from '../middlewares/authenticated';
import { mapFavorite } from '../helpers/mapFavorite';
import { HttpError } from '../helpers/httpError';
import mongoose from 'mongoose';

const router = express.Router();

router.get(
  '/',
  authenticated,
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const favorites = await getFavorites(req.user!.id);
      res.send({ data: favorites ? mapFavorite(favorites) : null });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/:productId',
  authenticated,
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.productId)) {
        throw new HttpError(400, 'Некорректный ID продукта');
      }
      const updated = await addToFavorites(req.user!.id, req.params.productId);
      res.send({ data: mapFavorite(updated) });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:productId',
  authenticated,
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.productId)) {
        throw new HttpError(400, 'Некорректный ID продукта');
      }
      await removeFromFavorites(req.user!.id, req.params.productId);
      res.send({ error: null });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
