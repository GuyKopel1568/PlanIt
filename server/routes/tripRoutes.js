// routes/tripRoutes.js
import express from 'express';
import mongoose from 'mongoose';
import {
  createTrip,
  getTripsByUserId,
  getTripById,
  updateTrip,
  deleteTrip,
  getTopAttractions,
} from '../controllers/tripController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Quick health check
router.get('/ping', (_req, res) => res.json({ ok: true }));

// --- Public/specific routes FIRST ---
router.get('/top-attractions', getTopAttractions); // keep public (add auth if you want)

// --- Everything below requires auth ---
router.use(authMiddleware);

// Create & list for current user
router.post('/', createTrip);
router.get('/', getTripsByUserId);

// Validate Mongo ObjectId for any :id route
router.param('id', (req, res, next, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid id format' });
  }
  next();
});

// Item routes
router.get('/:id', getTripById);
router.put('/:id', updateTrip);
router.delete('/:id', deleteTrip);

export default router;
