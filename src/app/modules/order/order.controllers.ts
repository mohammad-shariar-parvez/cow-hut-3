import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { OrderService } from './order.service'
import { Request, Response } from 'express'
import { IOrder } from './order.interface'

const createOrders = catchAsync(async (req: Request, res: Response) => {
  const { ...order } = req.body
  const result = await OrderService.createOrder(order)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully!',
    data: result,
  })
})

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrders()

  sendResponse<IOrder[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully !',
    meta: result.meta,
    data: result.data,
  })
})
export const OrderController = {
  createOrders,
  getAllOrders,
}
