import express from 'express';
import { createOrder, getOrders } from '../controllers/order';
import { authenticated } from '../middlewares/authenticated';
import { mapOrder } from '../helpers/mapOrder';
import { HttpError } from '../helpers/httpError';

const router = express.Router();

router.post(
  '/',
  authenticated,
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    try {
      if (!req.user) {
        throw new HttpError(400, 'Пользователь не авторизован');
      }

      const order = await createOrder(req.user.id);
      res.send({ data: mapOrder(order) });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/',
  authenticated,
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      if (!req.user) {
        throw new HttpError(400, 'Пользователь не авторизован');
      }
      const orders = await getOrders(req.user.id);
      res.send({ data: orders.map(mapOrder) });
    } catch (error) {
      if (error instanceof Error) res.send({ error: error.message });
    }
  }
);

export default router;
