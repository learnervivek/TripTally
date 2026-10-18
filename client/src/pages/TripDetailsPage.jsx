import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Copy,
  Check,
  Share2,
  Receipt,
  Plus,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import tripService from '../services/tripService';
import { useToast } from '../context/ToastContext';

export function TripDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [trip, setTrip] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadTrip() {
      setLoading(true);
      setError(null);
      try {
        const res = await tripService.getTripById(id);
        if (res.success && res.trip) {
          setTrip(res.trip);
          setExpenses(res.expenses || []);
        } else {
          setError('Trip details not available.');
        }
      } catch (err) {
        setError(err.message || 'Could not load trip details.');
      } finally {
        setLoading(false);
      }
    }
    loadTrip();
  }, [id]);

  const copyInviteCode = () => {
    if (!trip?.inviteCode) return;
    navigator.clipboard.writeText(trip.inviteCode);
    setCopied(true);
    toast.success('Invite Code Copied!', `Share code "${trip.inviteCode}" with your travel companions.`);
    setTimeout(() => setCopied(false), 2500);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-64 rounded-3xl bg-ivory-200 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TripCardSkeleton />
          <TripCardSkeleton />
          <TripCardSkeleton />
        </div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-ivory-300 max-w-md mx-auto my-12 space-y-4 shadow-soft">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h3 className="text-lg font-bold text-charcoal-900 font-display">Trip Not Accessible</h3>
        <p className="text-xs text-charcoal-500">{error || 'You do not have permission to view this trip.'}</p>
        <Button variant="primary" size="sm" onClick={() => navigate('/dashboard')} leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const members = trip.members || [];
  const totalSpent = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

  return (
    <div className="space-y-8">
      
      {/* Back link */}
      <div>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-500 hover:text-forest-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </Link>
      </div>

      {/* Hero Banner */}
      <div className="relative rounded-3xl bg-charcoal-900 text-white overflow-hidden shadow-soft-xl border border-ivory-300">
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={trip.coverImage || 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80'}
            alt={trip.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />

          {/* Badges on top */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <Badge variant="forest" size="md" withDot>
              {trip.status.toUpperCase()}
            </Badge>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={copyInviteCode}
                leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              >
                {copied ? 'Copied' : `Invite Code: ${trip.inviteCode}`}
              </Button>
            </div>
          </div>

          {/* Hero Content */}
          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <p className="text-xs sm:text-sm font-semibold text-terracotta-300 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {trip.destination}
            </p>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              {trip.title}
            </h1>
            <p className="text-xs sm:text-sm text-ivory-200/80 flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {trip.startDate ? new Date(trip.startDate).toLocaleDateString() : 'Date TBD'} - {trip.endDate ? new Date(trip.endDate).toLocaleDateString() : 'Date TBD'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                {members.length} {members.length === 1 ? 'Traveler' : 'Companions'}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Details, Members & Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Itinerary & Expenses */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Trip Description */}
          {trip.description && (
            <Card variant="default" className="p-6 shadow-soft">
              <h3 className="text-sm font-bold text-charcoal-900 font-display mb-2">Trip Objectives & Notes</h3>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">{trip.description}</p>
            </Card>
          )}

          {/* Expenses Breakdown */}
          <Card variant="default" className="shadow-soft">
            <CardHeader className="border-b border-ivory-200 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-display">Trip Expenses & Tally</CardTitle>
                <CardDescription>Track receipts and calculate equal per-person shares.</CardDescription>
              </div>
              <Button variant="accent" size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={() => toast.info('Log Expense', 'Expense logger modal ready for your receipts.')}>
                Log Expense
              </Button>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-ivory-100 border border-ivory-200">
                  <span className="text-xs text-charcoal-500">Target Budget</span>
                  <p className="text-lg font-bold text-charcoal-900 font-mono mt-1">${trip.budget?.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-xl bg-ivory-100 border border-ivory-200">
                  <span className="text-xs text-charcoal-500">Total Spent</span>
                  <p className="text-lg font-bold text-forest-700 font-mono mt-1">${totalSpent.toFixed(2)}</p>
                </div>
                <div className="p-4 rounded-xl bg-ivory-100 border border-ivory-200 col-span-2 sm:col-span-1">
                  <span className="text-xs text-charcoal-500">Per Person Share</span>
                  <p className="text-lg font-bold text-terracotta-600 font-mono mt-1">
                    ${members.length > 0 ? (totalSpent / members.length).toFixed(2) : '0.00'}
                  </p>
                </div>
              </div>

              {expenses.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-ivory-50 border border-dashed border-ivory-300 text-xs text-charcoal-500">
                  No receipts added to this trip yet. Click "Log Expense" above to add flights, villas, or dinner bills.
                </div>
              ) : (
                <div className="divide-y divide-ivory-200 border border-ivory-200 rounded-xl overflow-hidden">
                  {expenses.map((exp) => (
                    <div key={exp._id} className="p-3.5 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-charcoal-900">{exp.title}</p>
                        <p className="text-[11px] text-charcoal-400">Paid by {exp.paidBy?.name}</p>
                      </div>
                      <span className="font-mono font-bold text-charcoal-900">${exp.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

        </div>

        {/* Right Column: Companions & Invite Box */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Invite Companions Box */}
          <Card variant="forest" className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-terracotta-400" />
              <h3 className="text-base font-bold text-white font-display">Invite Companions</h3>
            </div>
            <p className="text-xs text-forest-200 leading-relaxed">
              Anyone with this invite code can join your board and collaborate in real-time.
            </p>
            <div className="p-3 rounded-xl bg-forest-950 border border-forest-800 flex items-center justify-between">
              <span className="font-mono font-bold text-sm tracking-widest text-ivory-50">
                {trip.inviteCode}
              </span>
              <Button variant="accent" size="sm" onClick={copyInviteCode}>
                Copy
              </Button>
            </div>
          </Card>

          {/* Member Roster */}
          <Card variant="default" className="shadow-soft">
            <CardHeader className="border-b border-ivory-200">
              <CardTitle className="text-base font-display">Travel Companions ({members.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {members.map((m, idx) => {
                const memUser = m.user || {};
                const isOwner = trip.owner && trip.owner._id === memUser._id;
                const initials = memUser.name ? memUser.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase() : 'C';

                return (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-ivory-50/60 border border-ivory-200">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-forest-600 text-white font-bold text-xs flex items-center justify-center shrink-0 overflow-hidden">
                        {memUser.avatar ? (
                          <img src={memUser.avatar} alt={memUser.name} className="w-full h-full object-cover" />
                        ) : (
                          <span>{initials}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-charcoal-900 truncate">{memUser.name || 'Friend'}</p>
                        <p className="text-[10px] text-charcoal-400 font-mono truncate">{memUser.email}</p>
                      </div>
                    </div>
                    <Badge variant={isOwner ? 'terracotta' : 'forest'} size="sm">
                      {isOwner ? 'Organizer' : m.role || 'Member'}
                    </Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
}

export default TripDetailsPage;
