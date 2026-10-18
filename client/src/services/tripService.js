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
   * Fetch authorized trips with optional status and search filtering
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
   * Join an existing trip with invite code
   */
  async joinTrip(inviteCode) {
    const response = await api.post(`/trips/join/${inviteCode}`);
    return response.data;
  },
};

export default tripService;
