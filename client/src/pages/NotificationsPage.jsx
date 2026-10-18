import React from 'react';
import { Bell, CheckCircle2, DollarSign, Calendar, Vote, MessageSquare } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { useToast } from '../context/ToastContext';

export function NotificationsPage() {
  const { toast } = useToast();

  const notifications = [
    {
      id: 1,
      type: 'expense',
      icon: DollarSign,
      title: 'New Expense Logged',
      desc: 'Alex added Villa Cimbrone ($1,650.00) in Amalfi Coast.',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 2,
      type: 'vote',
      icon: Vote,
      title: 'Activity Voted',
      desc: 'Elena upvoted "Private Gozzo Boat Charter to Capri".',
      time: '4 hours ago',
      unread: true,
    },
    {
      id: 3,
      type: 'itinerary',
      icon: Calendar,
      title: 'Itinerary Updated',
      desc: 'Day 3 timeline scheduled: Sentiero degli Dei Hike at 08:30 AM.',
      time: 'Yesterday',
      unread: false,
    },
    {
      id: 4,
      type: 'settlement',
      icon: CheckCircle2,
      title: 'Debt Settled Up',
      desc: 'Elena marked transfer of $412.50 to Alex Chen as completed.',
      time: '2 days ago',
      unread: false,
    },
  ];

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 font-display">
            Activity Notifications
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Real-time updates across all your group travel planning boards.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => toast.info('All Read', 'Notifications marked as read.')}>
          Mark All as Read
        </Button>
      </div>

      <Card variant="default" className="shadow-soft border border-ivory-300 divide-y divide-ivory-200 overflow-hidden">
        {notifications.map((n) => {
          const Icon = n.icon;
          return (
            <div
              key={n.id}
              className={`p-4 sm:p-5 flex items-start gap-4 transition-colors ${
                n.unread ? 'bg-forest-50/40 hover:bg-forest-50/60' : 'hover:bg-ivory-50/50'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-ivory-200 flex items-center justify-center shrink-0 shadow-soft-sm text-forest-700">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-charcoal-900 font-display flex items-center gap-2">
                    {n.title}
                    {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500" />}
                  </h4>
                  <span className="text-[10px] text-charcoal-400 whitespace-nowrap">{n.time}</span>
                </div>
                <p className="text-xs text-charcoal-600 mt-0.5 leading-relaxed">{n.desc}</p>
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}

export default NotificationsPage;
