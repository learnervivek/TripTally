import React, { useState } from 'react';
import { Mail, Check, X, ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useToast } from '../context/ToastContext';
import tripService from '../services/tripService';
import { useNavigate } from 'react-router-dom';

export function InvitationsPage() {
  const [inviteCode, setInviteCode] = useState('');
  const [joining, setJoining] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleJoinTrip = async (e) => {
    e.preventDefault();
    if (!inviteCode.trim()) return;

    setJoining(true);
    try {
      const res = await tripService.joinTrip(inviteCode.trim());
      if (res.success && res.trip) {
        toast.success('Joined Trip!', `You are now a companion on "${res.trip.title}".`);
        navigate(`/trips/${res.trip._id}`);
      }
    } catch (err) {
      toast.error('Could Not Join', err.message || 'Invalid or expired invite code.');
    } finally {
      setJoining(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 font-display">
          Trip Invitations
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
          Join a friend's trip with an invite code or accept companion requests.
        </p>
      </div>

      {/* Join with code box */}
      <Card variant="default" className="p-6 shadow-soft border border-ivory-300">
        <h3 className="text-sm font-bold text-charcoal-900 font-display mb-1">
          Have a Trip Invite Code?
        </h3>
        <p className="text-xs text-charcoal-500 mb-4">
          Enter the 8-character code shared by your trip organizer to instantly join the board.
        </p>

        <form onSubmit={handleJoinTrip} className="flex flex-col sm:flex-row items-center gap-3 max-w-md">
          <Input
            placeholder="e.g. 7F438792"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
            leftIcon={<Mail className="w-4 h-4" />}
            className="uppercase font-mono tracking-wider"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={joining}
            className="w-full sm:w-auto shrink-0"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Join Board
          </Button>
        </form>
      </Card>

      {/* Pending Invites list */}
      <Card variant="default" className="shadow-soft border border-ivory-300">
        <CardHeader className="border-b border-ivory-200">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-display">Pending Travel Invites (2)</CardTitle>
            <Badge variant="terracotta" size="sm">Awaiting Response</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          
          <div className="p-4 rounded-xl bg-ivory-50/70 border border-ivory-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-forest-600 text-white flex items-center justify-center font-bold text-xs">
                MP
              </div>
              <div>
                <p className="text-xs font-bold text-charcoal-900">Swiss Alps Hut-to-Hut Trek</p>
                <p className="text-[11px] text-charcoal-500">Maya Patel invited you as an Editor • Sep 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => toast.success('Accepted', 'You joined the Swiss Alps Trek!')}
                leftIcon={<Check className="w-3.5 h-3.5" />}
              >
                Accept
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toast.info('Declined', 'Invite declined.')}
                leftIcon={<X className="w-3.5 h-3.5" />}
              >
                Decline
              </Button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-ivory-50/70 border border-ivory-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-terracotta-600 text-white flex items-center justify-center font-bold text-xs">
                AC
              </div>
              <div>
                <p className="text-xs font-bold text-charcoal-900">Kyoto & Tokyo Neon Adventure</p>
                <p className="text-[11px] text-charcoal-500">Alex Chen invited you as a Companion • Oct 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => toast.success('Accepted', 'You joined Kyoto & Tokyo!')}
                leftIcon={<Check className="w-3.5 h-3.5" />}
              >
                Accept
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toast.info('Declined', 'Invite declined.')}
                leftIcon={<X className="w-3.5 h-3.5" />}
              >
                Decline
              </Button>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}

export default InvitationsPage;
