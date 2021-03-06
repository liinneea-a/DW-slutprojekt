import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

export interface User {
  id: string;
  email: string;
  password?: string;
  isAdmin: boolean;
  adminRequest: boolean;
}

const UserSchema = new mongoose.Schema<User>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true, select: true },
    isAdmin: { type: Boolean, required: true, default: false },
    adminRequest: { type: Boolean, required: true, default: false }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.pre('save', encryptPassword);
UserSchema.pre('updateOne', encryptPassword);

export async function encryptPassword(this: User, next: Function) {
  this.password = await bcrypt.hash(this.password!, 10);
  next();
}

export const UserModel = mongoose.model('user', UserSchema);
