import { Router } from 'express';
import {
  getDashboardData,
  getTrips,
  createTrip,
  getTripById,
  updateTrip,
  archiveTrip,
  deleteTrip,
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
router.put('/:id', updateTrip);
router.patch('/:id/archive', archiveTrip);
router.delete('/:id', deleteTrip);
router.post('/join/:inviteCode', joinTrip);

export default router;
