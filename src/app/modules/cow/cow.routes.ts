import express from 'express'
import { CowController } from './cow.controllers'
import { CowValidation } from './cow.validation'
import { requestValidation } from '../../middleware/validationRequest'
const router = express.Router()

router.post(
  '/cow-create',
  requestValidation.validateRequest(CowValidation.createCowZodSchema),
  CowController.createCow
)

router.get('/', CowController.getAllCows)
router.get('/:id', CowController.getSingleCow)
router.delete('/:id', CowController.deleteCow)
router.patch(
  '/:id',
  requestValidation.validateRequest(CowValidation.updateCowZodSchema),
  CowController.updateCow
)

export const CowRoutes = router
