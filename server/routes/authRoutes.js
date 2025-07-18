import { validateRegister } from '../middlewares/validateRegister.js';
import {
  register,
  login,
  google,
  facebook,
} from '../controllers/authController.js';

import { Router } from 'express';

const router = Router();

router.post('/login', login);
router.post('/register', validateRegister, register);
router.post('/google', google);
router.post('/facebook', facebook);

export default router;
