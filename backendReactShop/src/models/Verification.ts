import mongoose, { Schema } from 'mongoose';

export interface IVerification {
  id: string;
  userId: string;
  code: string;
  createdAt: Date;
}

const VerificationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    code: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 600 },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export const Verification = mongoose.model<IVerification>(
  'Verification',
  VerificationSchema
);
