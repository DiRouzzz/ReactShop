import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../helpers/httpError';

export const hasRole =
  (roles: string[]) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        return next(new HttpError(401, 'Пользователь не авторизован'));
      }

      if (!roles.includes(req.user.role)) {
        return next(new HttpError(403, 'Доступ запрещён'));
      }

      next();
    } catch (error) {
      next(error);
    }
  };
