import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IGenericResponse } from '../../../interface/error'
import { IOrder } from './order.interface'
import { Order } from './order.model'
import { User } from '../user/user.model'
import { Cow } from '../cow/cow.model'
import mongoose from 'mongoose'

const createOrder = async (payload: IOrder): Promise<IOrder | null> => {
  let newOrderData = null
  const { buyer, cow } = payload
  const budgetAmount = await User.findById(buyer).select('budget')
  const cowDetails = await Cow.findById(cow).select('price seller label')

  if (!budgetAmount || !cowDetails) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `something went wrong, buyer or cow not found !`
    )
  }
  if (cowDetails.label !== 'for sale') {
    throw new ApiError(httpStatus.NOT_FOUND, `This cow is already sold out !`)
  }
  if (budgetAmount?.budget < cowDetails.price) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `haven't enough money to purchase`
    )
  }

  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    const buyerUpdate = await User.findOneAndUpdate(
      { _id: buyer },
      { budget: budgetAmount.budget - cowDetails.price },
      {
        session,
      }
    )
    if (!buyerUpdate) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to buyer Update')
    }
    const sellerInfo = await User.findById(cowDetails.seller).session(session)
    if (!sellerInfo) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to find seller information'
      )
    }

    const SellerUpdate = await User.findOneAndUpdate(
      { _id: cowDetails.seller },
      { income: sellerInfo.income + cowDetails.price },
      {
        session,
      }
    )
    if (!SellerUpdate) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Seller Update')
    }

    const updateCow = await Cow.findOneAndUpdate(
      { _id: cow },
      { label: 'sold out' },
      {
        session,
      }
    )
    if (!updateCow) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update Cow')
    }

    const order = await Order.create([payload], { session: session })
    if (!order.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create order list')
    }
    newOrderData = order[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  return newOrderData
}

const getAllOrders = async (): Promise<IGenericResponse<IOrder[]>> => {
  const result = await Order.find().sort().populate('cow buyer')
  const total = await Order.countDocuments()
  return {
    meta: {
      page: 1,
      limit: 2,
      total,
    },
    data: result,
  }
}

export const OrderService = {
  createOrder,
  getAllOrders,
}
