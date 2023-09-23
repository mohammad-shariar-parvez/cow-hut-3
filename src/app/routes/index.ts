import express from 'express'
import { UserRoutes } from '../modules/user/user.routes'
import { CowRoutes } from '../modules/cow/cow.routes'
import { OrderRoutes } from '../modules/order/order.routes'
const router = express.Router()

const moduleRoutes = [
  { path: '/users', route: UserRoutes },
  { path: '/cows', route: CowRoutes },
  { path: '/orders', route: OrderRoutes },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
