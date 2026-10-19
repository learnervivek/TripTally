import React, { useState, useEffect } from 'react';
import { X, Handshake, ArrowRight, DollarSign, Calendar, CreditCard } from 'lucide-react';
import Button from '../ui/Button';
import tripService from '../../services/tripService';
import { useToast } from '../../context/ToastContext';

const PAYMENT_METHODS = [
  { value: 'cash', label: 'Cash' },
  { value: 'upi', label: 'UPI / Instant Pay' },
  { value: 'venmo', label: 'Venmo' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'other', label: 'Other' },
];

export function SettlementModal({
  isOpen,
  onClose,
  trip,
  members = [],
  prefill = null, // { fromUser, toUser, amountMinor }
  onSaved,
}) {
  const { toast } = useToast();
  const currency = trip?.currency || 'USD';

  const [payer, setPayer] = useState('');
  const [payee, setPayee] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Compile full members list
  const allMembers = React.useMemo(() => {
    const list = [];
    if (trip?.owner) {
      const ownerUser = trip.owner;
      list.push({
        _id: String(ownerUser._id || ownerUser),
        name: ownerUser.name || 'Trip Owner',
        email: ownerUser.email || '',
        avatar: ownerUser.avatar || '',
        isOwner: true,
      });
    }

    (members || []).forEach((m) => {
      const u = m.user || m;
      const uid = String(u._id || u.id || u);
      if (!list.some((existing) => existing._id === uid)) {
        list.push({
          _id: uid,
          name: u.name || 'Companion',
          email: u.email || '',
          avatar: u.avatar || '',
        });
      }
    });

    return list;
  }, [trip?.owner, members]);

  useEffect(() => {
    if (isOpen) {
      if (prefill) {
        setPayer(String(prefill.fromUser?._id || prefill.fromUser || ''));
        setPayee(String(prefill.toUser?._id || prefill.toUser || ''));
        if (prefill.amountMinor) {
          setAmountInput((prefill.amountMinor / 100).toFixed(2));
        } else {
          setAmountInput('');
        }
      } else {
        setPayer(allMembers[0]?._id || '');
        setPayee(allMembers[1]?._id || '');
        setAmountInput('');
      }
      setPaymentMethod('cash');
      setDate(new Date().toISOString().split('T')[0]);
      setNotes('');
      setErrors({});
    }
  }, [isOpen, prefill, allMembers]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!payer) errs.payer = 'Please select payer';
    if (!payee) errs.payee = 'Please select payee';
    if (payer && payee && payer === payee) {
      errs.payee = 'Payer and payee cannot be the same member';
    }
    if (!amountInput || parseFloat(amountInput) <= 0) {
      errs.amount = 'Amount must be greater than zero';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const amountMinor = Math.round(parseFloat(amountInput) * 100);
      const res = await tripService.createSettlement(trip._id, {
        payer,
        payee,
        amount: amountMinor,
        paymentMethod,
        date,
        notes: notes.trim(),
      });

      if (res.success) {
        toast.success('Settlement Recorded', `Payment of $${amountInput} has been logged.`);
        onSaved?.(res.settlement);
        onClose();
      }
    } catch (err) {
      toast.error('Failed to Settle', err.message || 'Could not record settlement.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-soft-2xl border border-ivory-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-ivory-200 bg-ivory-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-terracotta-600 text-white flex items-center justify-center shadow-soft-sm">
              <Handshake className="w-5 h-5 text-ivory-50" />
            </div>
            <div>
              <h3 className="text-base font-bold text-charcoal-900 font-display">Record Settlement</h3>
              <p className="text-xs text-charcoal-500">Log a payment made between companions.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-charcoal-400 hover:text-charcoal-900 hover:bg-ivory-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {/* Payer and Payee Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
            <div className="space-y-1">
              <label className="font-bold text-charcoal-700">Payer (Who paid) *</label>
              <select
                value={payer}
                onChange={(e) => setPayer(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-ivory-300 bg-white font-medium text-charcoal-900 outline-none focus:border-forest-500"
              >
                {allMembers.map((m) => (
                  <option key={m._id} value={m._id}>
                    {m.name} {m.isOwner ? '(Owner)' : ''}
                  </option>
                ))}
              </select>
              {errors.payer && <p className="text-[11px] text-rose-500">{errors.payer}</p>}
            </div>

            <div className="space-y-1">
              <label className="font-bold text-charcoal-700">Payee (Who received) *</label>
              <select
                value={payee}
                onChange={(e) => setPayee(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-ivory-300 bg-white font-medium text-charcoal-900 outline-none focus:border-forest-500"
              >
                {allMembers.map((m) => (
                  <option key={m._id} value={m._id}>
                    {m.name} {m.isOwner ? '(Owner)' : ''}
                  </option>
                ))}
              </select>
              {errors.payee && <p className="text-[11px] text-rose-500">{errors.payee}</p>}
            </div>
          </div>

          {/* Amount & Currency */}
          <div className="space-y-1">
            <label className="font-bold text-charcoal-700">Settlement Amount ({currency}) *</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-charcoal-400">
                {currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'INR' ? '₹' : currency}
              </span>
              <input
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
                className={`w-full pl-8 pr-3.5 py-2.5 rounded-xl border bg-white font-mono font-bold text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 ${
                  errors.amount ? 'border-rose-400' : 'border-ivory-300'
                }`}
              />
            </div>
            {errors.amount && <p className="text-[11px] text-rose-500">{errors.amount}</p>}
          </div>

          {/* Payment Method & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-charcoal-700">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-ivory-300 bg-white font-medium text-charcoal-800 outline-none focus:border-forest-500"
              >
                {PAYMENT_METHODS.map((pm) => (
                  <option key={pm.value} value={pm.value}>
                    {pm.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-charcoal-700">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-ivory-300 bg-white font-medium text-charcoal-800 outline-none focus:border-forest-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className="font-bold text-charcoal-700">Notes (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Venmo transaction #1234 or cash at hotel"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-ivory-300 text-xs outline-none focus:border-forest-500"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-ivory-200">
            <Button variant="ghost" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="accent" size="sm" type="submit" loading={loading}>
              Confirm Settlement
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SettlementModal;
