import { Request, Response, NextFunction } from 'express';
import { TOKEN } from '../helpers/token';
import { User } from '../models/User';
import { HttpError } from '../helpers/httpError';

export const authenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      throw new HttpError(401, 'Отсутствует токен аутентификации');
    }

    const tokenData = TOKEN.verify(token);
    if (!tokenData?.id) {
      throw new HttpError(403, 'Недействительный токен');
    }

    const user = await User.findById(tokenData.id);
    if (!user) {
      throw new HttpError(404, 'Пользователь не найден');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
