import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

export interface User {
  email: string;
  password?: string;
  isAdmin: boolean;
  isModified?: any;
}

const UserSchema = new mongoose.Schema<User>( //? Stor bokstav och <User>
  {
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    // timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.pre('save', encryptPassword);
UserSchema.pre('updateOne', encryptPassword);

export async function encryptPassword(this: User, next: Function) {
 console.log('in crypt password')
 console.log(this)
  // if (!this.isModified('password')) {
  //   console.log('password is not modified');
  //   return next();
  // }
  
  this.password = await bcrypt.hash(this.password!, 10);
  next();
}

export const UserModel = mongoose.model('user', UserSchema);
