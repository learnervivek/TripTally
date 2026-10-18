import mongoose from 'mongoose';

const expenseSplitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    share: {
      type: Number,
      required: true,
      default: 1, // e.g. weight or direct amount
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    paid: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const expenseSchema = new mongoose.Schema(
  {
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Expense title is required'],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Expense amount is required'],
      min: [0.01, 'Amount must be greater than zero'],
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true,
    },
    category: {
      type: String,
      enum: ['lodging', 'dining', 'transport', 'activity', 'groceries', 'entertainment', 'other'],
      default: 'other',
    },
    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    splitType: {
      type: String,
      enum: ['equal', 'exact', 'percentage'],
      default: 'equal',
    },
    splits: [expenseSplitSchema],
    receiptUrl: {
      type: String,
      default: '',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
