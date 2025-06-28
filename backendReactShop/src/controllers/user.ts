import bcrypt from 'bcrypt';
import { IUser, User } from '../models/User';
import { Verification } from '../models/Verification';
import { TOKEN } from '../helpers/token';
import { ROLE } from '../constants/roles';
import validator from 'validator';
import { VerificationService } from '../services/email.service';
import { HttpError } from '../helpers/httpError';

export const register = async (email: string, password: string) => {
  if (!validator.isEmail(email)) throw new HttpError(400, 'Некорректный email');
  if (!password) throw new HttpError(400, 'Пароль обязателен');

  let user = await User.findOne({ email });

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ email, password: hashedPassword });
  } else if (user.isVerified) {
    throw new HttpError(409, 'Пользователь уже зарегистрирован');
  }

  await VerificationService.generateAndSendCode(user.id, email, 'registration');

  return { message: 'Код отправлен на почту' };
};

export const verify = async (email: string, code: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new HttpError(404, 'Пользователь не найден');

  const isValid = await VerificationService.verifyCode(user.id, code);
  if (!isValid) throw new HttpError(400, 'Неверный или истекший код');

  user.isVerified = true;
  await user.save();
  await Verification.deleteMany({ userId: user.id });

  return {
    token: TOKEN.generate({ id: user.id }),
    user,
  };
};

export const resendCode = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new HttpError(404, 'Пользователь не найден');
  if (user.isVerified) throw new HttpError(409, 'Пользователь уже подтверждён');

  await VerificationService.generateAndSendCode(user.id, email, 'resend');

  return { message: 'Новый код отправлен на почту' };
};

export const login = async (
  email: string,
  password: string
): Promise<{ token: string; user: IUser }> => {
  if (!email || !password) {
    throw new HttpError(400, 'Не указан логин или пароль');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(404, 'Пользователь не найден');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new HttpError(401, 'Неверный пароль');
  }

  const token = TOKEN.generate({ id: user.id });
  return { token, user };
};

export const getUsers = () => User.find();

export const getRoles = () => [
  {
    id: ROLE.ADMIN,
    name: 'Admin',
  },
  {
    id: ROLE.USER,
    name: 'User',
  },
];

export const deleteUser = async (id: string) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new HttpError(404, 'Пользователь не найден');
  }
  return { message: 'Пользователь удален' };
};

export const updateUser = async (id: string, userData: Partial<IUser>) =>
  User.findByIdAndUpdate(id, userData, { returnDocument: 'after' });
