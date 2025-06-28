import { formatDate } from './formatDate';
import { IUser } from '../models/User';

export interface IMappedUser {
  id: string;
  email: string;
  roleId: string;
  registeredAt: string;
}

export const mapUser = (user: IUser): IMappedUser => ({
  id: user.id,
  email: user.email,
  roleId: user.role,
  registeredAt: formatDate(user.createdAt),
});
