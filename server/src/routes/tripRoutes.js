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
import {
  inviteMember,
  getTripInvitations,
  revokeInvitation,
  removeMember,
  updateMemberRole,
} from '../controllers/invitationController.js';
import {
  getItinerary,
  createItineraryItem,
  updateItineraryItem,
  deleteItineraryItem,
  reorderItineraryItems,
} from '../controllers/itineraryController.js';
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

// Trip Invitations & Members
router.post('/:id/invitations', inviteMember);
router.get('/:id/invitations', getTripInvitations);
router.delete('/:id/invitations/:invitationId', revokeInvitation);
router.delete('/:id/members/:userId', removeMember);
router.patch('/:id/members/:userId/role', updateMemberRole);

// Daily Itinerary Planner Endpoints
router.get('/:tripId/itinerary', getItinerary);
router.post('/:tripId/itinerary', createItineraryItem);
router.patch('/:tripId/itinerary/reorder', reorderItineraryItems);
router.put('/:tripId/itinerary/:itemId', updateItineraryItem);
router.delete('/:tripId/itinerary/:itemId', deleteItineraryItem);

export default router;
