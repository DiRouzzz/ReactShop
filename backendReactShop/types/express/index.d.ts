import { IUser } from '../../src/models/User.js';

declare global {
  namespace Express {
    interface Request {
      user?: IUser | undefined;
    }
  }
}
