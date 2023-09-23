import express from 'express'
import { OrderController } from './order.controllers'
import { requestValidation } from '../../middleware/validationRequest'
import { OrderValidation } from './order.validation'
const router = express.Router()

router.post(
  '/order-create',
  requestValidation.validateRequest(OrderValidation.createOrderZodSchema),
  OrderController.createOrders
)
router.get('/', OrderController.getAllOrders)

export const OrderRoutes = router
