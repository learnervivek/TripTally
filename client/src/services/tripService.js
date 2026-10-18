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
};

export default tripService;
