import mongoose, { Schema } from 'mongoose';
import { ROLE } from '../constants/roles';

export interface IUser {
  id: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  createdAt: Date;
}

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: ROLE.USER },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export const User = mongoose.model<IUser>('User', UserSchema);
