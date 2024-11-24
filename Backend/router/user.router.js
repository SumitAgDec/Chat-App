import { Router } from 'express'
import { allUsers, login, logout, signup } from '../controller/user.controller.js'
import secureRoutes from '../middleware/secureRoute.js'

const router = Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.get('/allUsers', secureRoutes, allUsers)

export default router