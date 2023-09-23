import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'
import { gender } from './user.constants'

const userSchema = new Schema<IUser>(
  {
    role: { type: String, enum: ['seller', 'buyer'], required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    name: {
      type: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
      },
    },
    gender: { type: String, enum: gender },
    address: { type: String },
    budget: { type: Number },
    income: { type: Number },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const User = model<IUser, UserModel>('User', userSchema)
