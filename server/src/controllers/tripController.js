import crypto from 'crypto';
import * as z from 'zod';
import Trip from '../models/Trip.js';
import Expense from '../models/Expense.js';
import User from '../models/User.js';

// Trip Validation Schema
export const createTripSchema = z.object({
  title: z.string().trim().min(3, 'Trip title must be at least 3 characters').max(100, 'Title cannot exceed 100 characters'),
  destination: z.string().trim().min(2, 'Destination is required'),
  description: z.string().trim().max(500, 'Description cannot exceed 500 characters').optional().or(z.literal('')),
  coverImage: z.string().optional().or(z.literal('')),
  startDate: z.string().optional().or(z.literal('')),
  endDate: z.string().optional().or(z.literal('')),
  currency: z.string().default('USD'),
  budget: z.coerce.number().min(0, 'Budget must be zero or a positive number').default(0),
});

/**
 * @route   GET /api/trips/dashboard
 * @desc    Fetch aggregated dashboard metrics and authorized trips for current user
 * @access  Private
 */
export async function getDashboardData(req, res, next) {
  try {
    const userId = req.user._id;

    // Find all trips where current user is owner OR an accepted/invited member
    const userTrips = await Trip.find({
      $or: [
        { owner: userId },
        { 'members.user': userId },
      ],
    })
      .populate('owner', 'name email avatar')
      .populate('members.user', 'name email avatar')
      .sort({ createdAt: -1 });

    const now = new Date();

    // Categorize trips
    let upcomingCount = 0;
    let ongoingCount = 0;
    let totalBudget = 0;

    userTrips.forEach((trip) => {
      totalBudget += trip.budget || 0;

      const startDate = trip.startDate ? new Date(trip.startDate) : null;
      const endDate = trip.endDate ? new Date(trip.endDate) : null;

      if (trip.status === 'ongoing' || (startDate && endDate && startDate <= now && endDate >= now)) {
        ongoingCount++;
      } else if (trip.status === 'planning' || trip.status === 'confirmed' || (startDate && startDate > now)) {
        upcomingCount++;
      }
    });

    // Get trip IDs
    const tripIds = userTrips.map((t) => t._id);

    // Fetch recent expenses across user's trips
    const recentExpenses = await Expense.find({
      trip: { $in: tripIds },
    })
      .populate('paidBy', 'name avatar')
      .populate('trip', 'title destination currency')
      .sort({ createdAt: -1 })
      .limit(6);

    // Calculate total spend across these trips
    const expensesAggregation = await Expense.aggregate([
      { $match: { trip: { $in: tripIds } } },
      { $group: { _id: null, totalSpent: { $sum: '$amount' }, count: { $sum: 1 } } },
    ]);

    const totalSpent = expensesAggregation[0]?.totalSpent || 0;
    const expenseCount = expensesAggregation[0]?.count || 0;

    // Upcoming trips preview (max 6)
    const upcomingTrips = userTrips.filter((t) => t.status !== 'completed' && t.status !== 'archived').slice(0, 6);

    return res.status(200).json({
      success: true,
      data: {
        summary: {
          totalTrips: userTrips.length,
          upcomingCount,
          ongoingCount,
          totalBudget,
          totalSpent,
          expenseCount,
          pendingSettlementsCount: Math.max(0, expenseCount > 0 ? Math.ceil(expenseCount / 2) : 0),
        },
        upcomingTrips,
        recentExpenses,
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route   GET /api/trips
 * @desc    Get all trips user is authorized to access with optional query filtering
 * @access  Private
 */
export async function getTrips(req, res, next) {
  try {
    const userId = req.user._id;
    const { search, status } = req.query;

    const query = {
      $or: [{ owner: userId }, { 'members.user': userId }],
    };

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$and = [
        {
          $or: [
            { title: searchRegex },
            { destination: searchRegex },
            { description: searchRegex },
          ],
        },
      ];
    }

    const trips = await Trip.find(query)
      .populate('owner', 'name email avatar')
      .populate('members.user', 'name email avatar')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: trips.length,
      trips,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route   POST /api/trips
 * @desc    Create a new collaborative trip
 * @access  Private
 */
export async function createTrip(req, res, next) {
  try {
    const parseResult = createTripSchema.safeParse(req.body);
    if (!parseResult.success) {
      const errorMsg = parseResult.error.errors[0]?.message || 'Invalid trip parameters';
      return res.status(400).json({ success: false, message: errorMsg, errors: parseResult.error.flatten().fieldErrors });
    }

    const { title, destination, description, coverImage, startDate, endDate, currency, budget } = parseResult.data;

    // Generate unique 8-character invite code
    const inviteCode = crypto.randomBytes(4).toString('hex').toUpperCase();

    // Default travel stock cover if none provided
    const defaultCovers = [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    ];
    const finalCover = coverImage && coverImage.trim() ? coverImage.trim() : defaultCovers[Math.floor(Math.random() * defaultCovers.length)];

    const trip = await Trip.create({
      title,
      destination,
      description: description || '',
      coverImage: finalCover,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      currency: currency || 'USD',
      budget: budget || 0,
      owner: req.user._id,
      inviteCode,
      status: 'planning',
      members: [
        {
          user: req.user._id,
          role: 'organizer',
          status: 'accepted',
          joinedAt: new Date(),
        },
      ],
    });

    const populatedTrip = await Trip.findById(trip._id)
      .populate('owner', 'name email avatar')
      .populate('members.user', 'name email avatar');

    return res.status(201).json({
      success: true,
      message: 'Trip created successfully!',
      trip: populatedTrip,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route   GET /api/trips/:id
 * @desc    Get trip details by ID (authorized members only)
 * @access  Private
 */
export async function getTripById(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const trip = await Trip.findById(id)
      .populate('owner', 'name email avatar bio')
      .populate('members.user', 'name email avatar bio');

    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    // Check authorization: must be owner or member
    const isOwner = trip.owner._id.equals(userId);
    const isMember = trip.members.some((m) => m.user && m.user._id.equals(userId));

    if (!isOwner && !isMember) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to view this trip.',
      });
    }

    // Fetch expenses for this trip
    const expenses = await Expense.find({ trip: id })
      .populate('paidBy', 'name email avatar')
      .sort({ date: -1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      trip,
      expenses,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route   POST /api/trips/join/:inviteCode
 * @desc    Join an existing trip using invite code
 * @access  Private
 */
export async function joinTrip(req, res, next) {
  try {
    const { inviteCode } = req.params;
    const userId = req.user._id;

    if (!inviteCode) {
      return res.status(400).json({ success: false, message: 'Invite code is required' });
    }

    const trip = await Trip.findOne({ inviteCode: inviteCode.trim().toUpperCase() });
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Invalid trip invite code.' });
    }

    // Check if already a member
    const isAlreadyMember = trip.members.some((m) => m.user.equals(userId)) || trip.owner.equals(userId);
    if (isAlreadyMember) {
      return res.status(200).json({
        success: true,
        message: 'You are already a companion on this trip.',
        trip,
      });
    }

    trip.members.push({
      user: userId,
      role: 'editor',
      status: 'accepted',
      joinedAt: new Date(),
    });

    await trip.save();

    const populatedTrip = await Trip.findById(trip._id)
      .populate('owner', 'name email avatar')
      .populate('members.user', 'name email avatar');

    return res.status(200).json({
      success: true,
      message: `You successfully joined "${trip.title}"!`,
      trip: populatedTrip,
    });
  } catch (err) {
    next(err);
  }
}
