'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.User = void 0
const mongoose_1 = require('mongoose')
const user_constants_1 = require('./user.constants')
const userSchema = new mongoose_1.Schema(
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
    gender: { type: String, enum: user_constants_1.gender },
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
exports.User = (0, mongoose_1.model)('User', userSchema)
