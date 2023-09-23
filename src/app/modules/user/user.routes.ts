import express from 'express'
import { UserController } from './user.controllers'
import { UserValidation } from './user.validation'
import { requestValidation } from '../../middleware/validationRequest'
const router = express.Router()

router.post(
  '/user-create',
  requestValidation.validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
)
router.get('/', UserController.getAllUsers)
router.get('/:id', UserController.getSingleUser)
router.delete('/:id', UserController.deleteUser)
router.patch(
  '/:id',
  requestValidation.validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser
)
export const UserRoutes = router
