import { Router } from 'express';
import {
  getDashboardData,
  getTrips,
  createTrip,
  getTripById,
  joinTrip,
} from '../controllers/tripController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// All trip routes require authentication
router.use(protect);

router.get('/dashboard', getDashboardData);
router.get('/', getTrips);
router.post('/', createTrip);
router.get('/:id', getTripById);
router.post('/join/:inviteCode', joinTrip);

export default router;
