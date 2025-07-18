import { Router } from 'express';

import { protectWithJWT } from '../middlewares/validateRegister.js';

import {
  deleteAllUsers,
  getAllUsers,
  deleteUserById,
  deleteUserByEmail,
  insertDemoUsers,
  getUserDetails,
} from '../controllers/userController.js';

const router = Router();

router.get('/', getAllUsers);
router.delete('/id/:id', deleteUserById);
router.delete('/email/:email', deleteUserByEmail);
router.delete('/delete-all-users', deleteAllUsers);
router.post('/insert-demo-users', insertDemoUsers);
router.get('/me', protectWithJWT, getUserDetails);

export default router;
