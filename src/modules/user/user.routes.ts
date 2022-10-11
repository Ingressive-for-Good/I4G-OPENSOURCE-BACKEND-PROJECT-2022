import {Router} from 'express'
import { createUser, getAllUsers, loginUser } from './user.controller'

const router = Router()

router.post('/', createUser)
        .get('/', getAllUsers)
        .post('/login', loginUser)
        

export default router;