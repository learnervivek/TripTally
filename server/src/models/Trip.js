import mongoose from 'mongoose';

const tripMemberSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    role: {
      type: String,
      enum: ['organizer', 'editor', 'viewer'],
      default: 'editor',
    },
    status: {
      type: String,
      enum: ['invited', 'accepted', 'declined'],
      default: 'accepted',
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const tripSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Trip title is required'],
      trim: true,
      maxlength: [100, 'Trip title cannot exceed 100 characters'],
    },
    destination: {
      type: String,
      required: [true, 'Destination is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    coverImage: {
      type: String,
      default: '',
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true,
    },
    budget: {
      type: Number,
      default: 0,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [tripMemberSchema],
    inviteCode: {
      type: String,
      unique: true,
      sparse: true,
    },
    status: {
      type: String,
      enum: ['planning', 'confirmed', 'ongoing', 'completed', 'archived'],
      default: 'planning',
    },
  },
  {
    timestamps: true,
  }
);

export const Trip = mongoose.model('Trip', tripSchema);
export default Trip;
