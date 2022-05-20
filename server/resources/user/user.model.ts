import mongoose from "mongoose";
import bcrypt from "bcrypt"

export interface User {
  firstname: string;
  lastname: string;
  /** Virtual */ fullname: string;
  password: string;
  isAdmin: boolean;
  email: string;
  // createdAt: Date;
  // updatedAt: Date;
}

const UserSchema = new mongoose.Schema<User>( //? Stor bokstav och <User> 
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true, select: false },
    isAdmin: { type: Boolean, required: true, default: false },
    email: { type: String, required: true}
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.virtual("fullname").get(function (this: User) {
  return this.firstname + " " + this.lastname;
});

UserSchema.pre("save", encryptPassword);
UserSchema.pre("updateOne", encryptPassword);

async function encryptPassword(this: User, next: Function) {
  this.password = await bcrypt.hash(this.password, 10); // TODO: use bcrypt...
  next();
}

export const UserModel = mongoose.model("user", UserSchema);
