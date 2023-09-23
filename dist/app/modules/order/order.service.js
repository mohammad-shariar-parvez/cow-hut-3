'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.OrderService = void 0
const http_status_1 = __importDefault(require('http-status'))
const ApiError_1 = __importDefault(require('../../../errors/ApiError'))
const order_model_1 = require('./order.model')
const user_model_1 = require('../user/user.model')
const cow_model_1 = require('../cow/cow.model')
const mongoose_1 = __importDefault(require('mongoose'))
const createOrder = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    let newOrderData = null
    const { buyer, cow } = payload
    const budgetAmount = yield user_model_1.User.findById(buyer).select(
      'budget'
    )
    const cowDetails = yield cow_model_1.Cow.findById(cow).select(
      'price seller label'
    )
    if (!budgetAmount || !cowDetails) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        `something went wrong, buyer or cow not found !`
      )
    }
    if (cowDetails.label !== 'for sale') {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        `This cow is already sold out !`
      )
    }
    if (
      (budgetAmount === null || budgetAmount === void 0
        ? void 0
        : budgetAmount.budget) < cowDetails.price
    ) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        `haven't enough money to purchase`
      )
    }
    const session = yield mongoose_1.default.startSession()
    try {
      session.startTransaction()
      const buyerUpdate = yield user_model_1.User.findOneAndUpdate(
        { _id: buyer },
        { budget: budgetAmount.budget - cowDetails.price },
        {
          session,
        }
      )
      if (!buyerUpdate) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to buyer Update'
        )
      }
      const sellerInfo = yield user_model_1.User.findById(
        cowDetails.seller
      ).session(session)
      if (!sellerInfo) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to find seller information'
        )
      }
      const SellerUpdate = yield user_model_1.User.findOneAndUpdate(
        { _id: cowDetails.seller },
        { income: sellerInfo.income + cowDetails.price },
        {
          session,
        }
      )
      if (!SellerUpdate) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to Seller Update'
        )
      }
      const updateCow = yield cow_model_1.Cow.findOneAndUpdate(
        { _id: cow },
        { label: 'sold out' },
        {
          session,
        }
      )
      if (!updateCow) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to update Cow'
        )
      }
      const order = yield order_model_1.Order.create([payload], {
        session: session,
      })
      if (!order.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create order list'
        )
      }
      newOrderData = order[0]
      yield session.commitTransaction()
      yield session.endSession()
    } catch (error) {
      yield session.abortTransaction()
      yield session.endSession()
      throw error
    }
    return newOrderData
  })
const getAllOrders = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find().sort().populate('cow buyer')
    const total = yield order_model_1.Order.countDocuments()
    return {
      meta: {
        page: 1,
        limit: 2,
        total,
      },
      data: result,
    }
  })
exports.OrderService = {
  createOrder,
  getAllOrders,
}
