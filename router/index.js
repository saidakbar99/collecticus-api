import { Router } from 'express';
import UserController from '../controllers/user-controller.js';

const router = Router();
// const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
// router.post('/delete', UserController.deleteUser)
// router.post('/block', UserController.blockUser)
// router.post('/unblock', UserController.unblockUser)
router.get('/users', UserController.getUsers)
//! dobavit middleware k /users

//! VVV error s /refresh VVV
// router.get('/refresh', UserController.refresh)

export default router
