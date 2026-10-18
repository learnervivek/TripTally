import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import User from '../models/User.js';
import Trip from '../models/Trip.js';

describe('TripTally Backend Trip & Dashboard APIs', () => {
  let user1Cookie = '';
  let user2Cookie = '';
  let createdTripId = '';

  const user1 = {
    name: 'Marco Polo',
    email: `marco.${Date.now()}@example.com`,
    password: 'Password123!',
    confirmPassword: 'Password123!',
  };

  const user2 = {
    name: 'Ibn Battuta',
    email: `battuta.${Date.now()}@example.com`,
    password: 'Password123!',
    confirmPassword: 'Password123!',
  };

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/triptally');
    }

    // Register User 1
    const res1 = await request(app).post('/api/auth/register').send(user1);
    user1Cookie = res1.headers['set-cookie'].find((c) => c.startsWith('token=')).split(';')[0];

    // Register User 2
    const res2 = await request(app).post('/api/auth/register').send(user2);
    user2Cookie = res2.headers['set-cookie'].find((c) => c.startsWith('token=')).split(';')[0];
  });

  afterAll(async () => {
    await User.deleteMany({ email: { $in: [user1.email, user2.email] } });
    if (createdTripId) {
      await Trip.findByIdAndDelete(createdTripId);
    }
  });

  it('GET /api/trips/dashboard - rejects unauthorized access with 401', async () => {
    const res = await request(app).get('/api/trips/dashboard');
    expect(res.status).toBe(401);
  });

  it('POST /api/trips - creates a new collaborative trip with creator as organizer', async () => {
    const res = await request(app)
      .post('/api/trips')
      .set('Cookie', user1Cookie)
      .send({
        title: 'Silk Road Caravan Trek',
        destination: 'Samarkand, Uzbekistan',
        description: 'Exploring historic trading routes and desert oases.',
        budget: 3500,
        currency: 'USD',
        startDate: '2026-09-10',
        endDate: '2026-09-22',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.trip).toHaveProperty('_id');
    expect(res.body.trip.title).toBe('Silk Road Caravan Trek');
    expect(res.body.trip.inviteCode).toBeDefined();
    expect(res.body.trip.members).toHaveLength(1);
    expect(res.body.trip.members[0].role).toBe('organizer');

    createdTripId = res.body.trip._id;
  });

  it('GET /api/trips/dashboard - returns accurate real aggregated stats for authenticated user', async () => {
    const res = await request(app)
      .get('/api/trips/dashboard')
      .set('Cookie', user1Cookie);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('summary');
    expect(res.body.data.summary.totalTrips).toBeGreaterThanOrEqual(1);
    expect(res.body.data.summary.totalBudget).toBeGreaterThanOrEqual(3500);
    expect(res.body.data.upcomingTrips).toBeDefined();
    expect(res.body.data.upcomingTrips.some((t) => t._id === createdTripId)).toBe(true);
  });

  it('GET /api/trips/:id - rejects unauthorized users with 403 Forbidden', async () => {
    const res = await request(app)
      .get(`/api/trips/${createdTripId}`)
      .set('Cookie', user2Cookie); // user2 is NOT member

    expect(res.status).toBe(403);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/not authorized/i);
  });

  it('GET /api/trips/:id - allows member to view trip details', async () => {
    const res = await request(app)
      .get(`/api/trips/${createdTripId}`)
      .set('Cookie', user1Cookie);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.trip.title).toBe('Silk Road Caravan Trek');
    expect(res.body.trip.destination).toBe('Samarkand, Uzbekistan');
  });

  it('POST /api/trips/join/:inviteCode - allows user 2 to join with valid invite code', async () => {
    // Get invite code from trip
    const tripRes = await request(app).get(`/api/trips/${createdTripId}`).set('Cookie', user1Cookie);
    const code = tripRes.body.trip.inviteCode;

    const joinRes = await request(app)
      .post(`/api/trips/join/${code}`)
      .set('Cookie', user2Cookie);

    expect(joinRes.status).toBe(200);
    expect(joinRes.body.success).toBe(true);
    expect(joinRes.body.trip.members).toHaveLength(2);

    // Now user 2 should be able to view trip
    const viewRes = await request(app)
      .get(`/api/trips/${createdTripId}`)
      .set('Cookie', user2Cookie);

    expect(viewRes.status).toBe(200);
  });
});
