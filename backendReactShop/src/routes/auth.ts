import express from 'express';
import { register, login, verify, resendCode } from '../controllers/user';
import { mapUser } from '../helpers/mapUser';

const router = express.Router({ mergeParams: true });

router.post(
  '/register',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { email, password } = req.body;
      const result = await register(email, password);
      res.send(result);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/verify',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { email, code } = req.body;
      const { token, user } = await verify(email, code);
      res
        .cookie('token', token, { httpOnly: true })
        .send({ user: mapUser(user) });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/resend',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { email } = req.body;
      const result = await resendCode(email);
      res.send(result);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/login',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { user, token } = await login(req.body.email, req.body.password);
      res
        .cookie('token', token, { httpOnly: true })
        .send({ error: null, user: mapUser(user) });
    } catch (err) {
      next(err);
    }
  }
);

router.post('/logout', (_, res: express.Response): void => {
  res.cookie('token', '', { httpOnly: true }).send({ error: null });
});

export default router;
