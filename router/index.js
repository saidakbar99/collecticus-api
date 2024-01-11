import { Router } from 'express';

import UserController from '../controllers/user-controller.js';
import CollectionController from '../controllers/collection-controller.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = Router();
// const authMiddleware = require('../middleware/authMiddleware')

//! vvv sdelat' best practise kak v collections vvv
router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.post('/delete', UserController.deleteUser)
router.post('/block', UserController.blockUser)
router.post('/unblock', UserController.unblockUser)
router.post('/admin', UserController.makeAdmin)
router.post('/unadmin', UserController.unmakeAdmin)
router.get('/users', authMiddleware, UserController.getUsers)

router.get('/collections', CollectionController.getAll)
router.get('/collections-last', CollectionController.getLast)
router.get('/collection/:id', CollectionController.getOne)
router.post('/collection', CollectionController.create)
// router.delete('/collections', CollectionController.remove)
// router.patch('/collections', CollectionController.update)

//! VVV error s /refresh VVV
// router.get('/refresh', UserController.refresh)

export default router
