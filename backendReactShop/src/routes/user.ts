import { mapUser } from './../helpers/mapUser';
import express from 'express';
import {
  getUsers,
  getRoles,
  updateUser,
  deleteUser,
} from '../controllers/user';
import { hasRole } from '../middlewares/hasRole';
import { authenticated } from '../middlewares/authenticated';
import { ROLE } from '../constants/roles';
import { HttpError } from '../helpers/httpError';

const router = express.Router({ mergeParams: true });

router.get(
  '/',
  authenticated,
  hasRole([ROLE.ADMIN]),
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const users = await getUsers();
      res.send({ data: users.map(mapUser) });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/roles',
  authenticated,
  hasRole([ROLE.ADMIN]),
  (req: express.Request, res: express.Response) => {
    const roles = getRoles();
    res.send({ data: roles });
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
      const newUser = await updateUser(req.params.id, {
        role: req.body.roleId,
      });
      if (!newUser) throw new HttpError(404, 'Пользователь не найден');
      res.send({ data: mapUser(newUser) });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  authenticated,
  hasRole([ROLE.ADMIN]),
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await deleteUser(req.params.id);
      res.send({ error: null });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
