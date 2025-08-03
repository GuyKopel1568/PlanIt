import express from 'express';
import { createTrip } from '../controllers/tripController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createTrip);

export default router;
