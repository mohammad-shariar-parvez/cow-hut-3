'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.UserRoutes = void 0
const express_1 = __importDefault(require('express'))
const user_controllers_1 = require('./user.controllers')
const user_validation_1 = require('./user.validation')
const validationRequest_1 = require('../../middleware/validationRequest')
const router = express_1.default.Router()
router.post(
  '/user-create',
  validationRequest_1.requestValidation.validateRequest(
    user_validation_1.UserValidation.createUserZodSchema
  ),
  user_controllers_1.UserController.createUser
)
router.get('/', user_controllers_1.UserController.getAllUsers)
router.get('/:id', user_controllers_1.UserController.getSingleUser)
router.delete('/:id', user_controllers_1.UserController.deleteUser)
router.patch(
  '/:id',
  validationRequest_1.requestValidation.validateRequest(
    user_validation_1.UserValidation.updateUserZodSchema
  ),
  user_controllers_1.UserController.updateUser
)
exports.UserRoutes = router
