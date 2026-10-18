import api from '../lib/api';

/**
 * Trip & Dashboard API Service Layer
 */
export const tripService = {
  /**
   * Fetch aggregated real-time dashboard data for authenticated user
   */
  async getDashboardData() {
    const response = await api.get('/trips/dashboard');
    return response.data;
  },

  /**
   * Fetch authorized trips with optional status, search, and pagination
   */
  async getTrips(params = {}) {
    const response = await api.get('/trips', { params });
    return response.data;
  },

  /**
   * Fetch single trip details by ID
   */
  async getTripById(id) {
    const response = await api.get(`/trips/${id}`);
    return response.data;
  },

  /**
   * Create a new collaborative trip
   */
  async createTrip(tripData) {
    const response = await api.post('/trips', tripData);
    return response.data;
  },

  /**
   * Update an existing trip
   */
  async updateTrip(id, updateData) {
    const response = await api.put(`/trips/${id}`, updateData);
    return response.data;
  },

  /**
   * Toggle or set archive status for a trip
   */
  async archiveTrip(id) {
    const response = await api.patch(`/trips/${id}/archive`);
    return response.data;
  },

  /**
   * Permanently delete a trip (owner only)
   */
  async deleteTrip(id) {
    const response = await api.delete(`/trips/${id}`);
    return response.data;
  },

  /**
   * Join an existing trip with invite code
   */
  async joinTrip(inviteCode) {
    const response = await api.post(`/trips/join/${inviteCode}`);
    return response.data;
  },

  /**
   * Send an invitation by email to a companion
   */
  async inviteMember(tripId, { email, role }) {
    const response = await api.post(`/trips/${tripId}/invitations`, { email, role });
    return response.data;
  },

  /**
   * Get all invitations for a trip
   */
  async getTripInvitations(tripId) {
    const response = await api.get(`/trips/${tripId}/invitations`);
    return response.data;
  },

  /**
   * Revoke a pending trip invitation
   */
  async revokeInvitation(tripId, invitationId) {
    const response = await api.delete(`/trips/${tripId}/invitations/${invitationId}`);
    return response.data;
  },

  /**
   * Remove a member from a trip
   */
  async removeMember(tripId, userId) {
    const response = await api.delete(`/trips/${tripId}/members/${userId}`);
    return response.data;
  },

  /**
   * Update a member's role on a trip
   */
  async updateMemberRole(tripId, userId, role) {
    const response = await api.patch(`/trips/${tripId}/members/${userId}/role`, { role });
    return response.data;
  },

  /**
   * Fetch current user's received pending invitations
   */
  async getMyInvitations() {
    const response = await api.get('/invitations/me');
    return response.data;
  },

  /**
   * Verify an invitation token
   */
  async getInvitationByToken(token) {
    const response = await api.get(`/invitations/token/${token}`);
    return response.data;
  },

  /**
   * Accept an invitation using token
   */
  async acceptInvitationByToken(token) {
    const response = await api.post(`/invitations/token/${token}/accept`);
    return response.data;
  },

  /**
   * Decline an invitation using token
   */
  async declineInvitationByToken(token) {
    const response = await api.post(`/invitations/token/${token}/decline`);
    return response.data;
  },

  /**
   * Accept an invitation by ID
   */
  async acceptInvitationById(id) {
    const response = await api.post(`/invitations/${id}/accept`);
    return response.data;
  },

  /**
   * Decline an invitation by ID
   */
  async declineInvitationById(id) {
    const response = await api.post(`/invitations/${id}/decline`);
    return response.data;
  },

  /**
   * Get all daily itinerary items for a trip
   */
  async getItinerary(tripId) {
    const response = await api.get(`/trips/${tripId}/itinerary`);
    return response.data;
  },

  /**
   * Create a new itinerary activity
   */
  async createItineraryItem(tripId, itemData) {
    const response = await api.post(`/trips/${tripId}/itinerary`, itemData);
    return response.data;
  },

  /**
   * Update an existing itinerary activity
   */
  async updateItineraryItem(tripId, itemId, itemData) {
    const response = await api.put(`/trips/${tripId}/itinerary/${itemId}`, itemData);
    return response.data;
  },

  /**
   * Delete an itinerary activity
   */
  async deleteItineraryItem(tripId, itemId) {
    const response = await api.delete(`/trips/${tripId}/itinerary/${itemId}`);
    return response.data;
  },

  /**
   * Reorder itinerary items
   */
  async reorderItineraryItems(tripId, items) {
    const response = await api.patch(`/trips/${tripId}/itinerary/reorder`, { items });
    return response.data;
  },
};

export default tripService;
