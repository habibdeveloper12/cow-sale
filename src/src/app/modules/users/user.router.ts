import { Router } from 'express'
import { useCreateUser } from './user.controller'
import { createUserZodSchema } from './user.velidation'
import validationRequest from '../../middleware/validationRequest'

const router = Router()

router.post(
  '/create-user',
  validationRequest(createUserZodSchema),
  useCreateUser
)

export default router
