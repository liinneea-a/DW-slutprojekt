import mongoose, { Types } from "mongoose";
import bcrypt from "bcrypt";

export interface User {
  email: string;
  password: string;
  isAdmin: boolean;
}

const UserSchema = new mongoose.Schema<User>( //? Stor bokstav och <User>
  {
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.pre("save", encryptPassword);
UserSchema.pre("updateOne", encryptPassword);

async function encryptPassword(this: User, next: Function) {
  this.password = await bcrypt.hash(this.password, 10); // TODO: use bcrypt...
  next();
}

export const UserModel = mongoose.model("user", UserSchema);
