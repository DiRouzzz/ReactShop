import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const sign = process.env.JWT_SECRET;

if (!sign) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export const TOKEN = {
  generate(data: object): string {
    return jwt.sign(data, sign, { expiresIn: '30d' });
  },
  verify<T extends object = JwtPayload>(token: string): T {
    return jwt.verify(token, sign) as T;
  },
};
