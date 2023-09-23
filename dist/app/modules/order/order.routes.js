'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.OrderRoutes = void 0
const express_1 = __importDefault(require('express'))
const order_controllers_1 = require('./order.controllers')
const validationRequest_1 = require('../../middleware/validationRequest')
const order_validation_1 = require('./order.validation')
const router = express_1.default.Router()
router.post(
  '/order-create',
  validationRequest_1.requestValidation.validateRequest(
    order_validation_1.OrderValidation.createOrderZodSchema
  ),
  order_controllers_1.OrderController.createOrders
)
router.get('/', order_controllers_1.OrderController.getAllOrders)
exports.OrderRoutes = router
