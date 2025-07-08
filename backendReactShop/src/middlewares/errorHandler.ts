import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { HttpError } from '../helpers/httpError';

export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof HttpError) {
    res.status(err.status).send({ error: err.message });
    return;
  }

  if (err instanceof Error) {
    console.error('[Internal Error]', err.message);
    res.status(500).send({ error: 'Внутренняя ошибка сервера' });
    return;
  }

  res.status(500).send({ error: 'Неизвестная ошибка' });
};
