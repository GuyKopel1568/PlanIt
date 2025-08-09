import express from 'express';
import { createTrip } from '../controllers/tripController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
  getTripsByUserId,
  getTripById,
  updateTrip,
} from '../controllers/tripController.js';
const router = express.Router();

router.post('/', authMiddleware, createTrip);
router.get('/', authMiddleware, getTripsByUserId);
router.get('/:id', authMiddleware, getTripById);
router.put('/:id', authMiddleware, updateTrip);

export default router;
