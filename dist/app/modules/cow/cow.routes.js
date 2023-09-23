'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.CowRoutes = void 0
const express_1 = __importDefault(require('express'))
const cow_controllers_1 = require('./cow.controllers')
const cow_validation_1 = require('./cow.validation')
const validationRequest_1 = require('../../middleware/validationRequest')
const router = express_1.default.Router()
router.post(
  '/cow-create',
  validationRequest_1.requestValidation.validateRequest(
    cow_validation_1.CowValidation.createCowZodSchema
  ),
  cow_controllers_1.CowController.createCow
)
router.get('/', cow_controllers_1.CowController.getAllCows)
router.get('/:id', cow_controllers_1.CowController.getSingleCow)
router.delete('/:id', cow_controllers_1.CowController.deleteCow)
router.patch(
  '/:id',
  validationRequest_1.requestValidation.validateRequest(
    cow_validation_1.CowValidation.updateCowZodSchema
  ),
  cow_controllers_1.CowController.updateCow
)
exports.CowRoutes = router
