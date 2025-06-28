import { Request, Response } from 'express';

export function checkUser(
  req: Request,
  res: Response
): req is Request & { user: NonNullable<Request['user']> } {
  if (!req.user) {
    res.send({ error: 'Пользователь не авторизован' });
    return false;
  }
  return true;
}
