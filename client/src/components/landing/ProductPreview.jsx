import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  ThumbsUp,
  DollarSign,
  PieChart,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Receipt,
  Share2,
  Plus
} from 'lucide-react';
import { ResponsiveContainer, PieChart as RechartsPie, Pie, Cell, Tooltip } from 'recharts';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { useToast } from '../../context/ToastContext';

export function ProductPreview() {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [activeDay, setActiveDay] = useState(1);
  const [votes, setVotes] = useState({ 1: 4, 2: 5, 3: 3 });
  const { toast } = useToast();

  const handleVote = (id) => {
    setVotes((prev) => {
      const next = { ...prev, [id]: prev[id] + 1 };
      toast.success('Vote Recorded', `You voted for this activity! Total votes: ${next[id]}`);
      return next;
    });
  };

  const itineraryDays = {
    1: [
      {
        id: 1,
        time: '11:30 AM',
        title: 'Check-in at Villa Cimbrone Cliffside',
        location: 'Ravello, Amalfi Coast',
        category: 'Lodging',
        badgeVariant: 'forest',
        cost: '$1,650 / 4 nights',
        assigned: ['Alex', 'Elena'],
      },
      {
        id: 2,
        time: '02:00 PM',
        title: 'Coastal Welcome Lunch & Limoncello Tasting',
        location: 'Trattoria da Gemma, Amalfi',
        category: 'Dining',
        badgeVariant: 'terracotta',
        cost: '$195 total',
        assigned: ['All 4'],
      },
      {
        id: 3,
        time: '06:30 PM',
        title: 'Sunset Terrace Walk & Golden Hour Photography',
        location: 'Villa Cimbrone Infinity Terrace',
        category: 'Activity',
        badgeVariant: 'neutral',
        cost: 'Free',
        assigned: ['Liam', 'Maya'],
      },
    ],
    2: [
      {
        id: 4,
        time: '09:00 AM',
        title: 'Private Gozzo Boat Charter to Capri Island',
        location: 'Marina Grande & Blue Grotto',
        category: 'Activity',
        badgeVariant: 'forest',
        cost: '$620 total',
        assigned: ['Alex', 'Maya'],
      },
      {
        id: 5,
        time: '01:30 PM',
        title: 'Seaside Seafood Lunch under Lemon Groves',
        location: 'Da Paolino, Capri',
        category: 'Dining',
        badgeVariant: 'terracotta',
        cost: '$310 total',
        assigned: ['All 4'],
      },
      {
        id: 6,
        time: '05:00 PM',
        title: 'Chairlift to Monte Solaro Panorama',
        location: 'Anacapri',
        category: 'Activity',
        badgeVariant: 'neutral',
        cost: '$56 total',
        assigned: ['Elena', 'Liam'],
      },
    ],
    3: [
      {
        id: 7,
        time: '08:30 AM',
        title: 'Path of the Gods (Sentiero degli Dei) Hike',
        location: 'Bomerano to Nocelle Trail',
        category: 'Activity',
        badgeVariant: 'forest',
        cost: 'Free',
        assigned: ['All 4'],
      },
      {
        id: 8,
        time: '01:00 PM',
        title: 'Panoramic Focaccia & Local Wine Recovery Lunch',
        location: 'Trattoria Santa Croce, Nocelle',
        category: 'Dining',
        badgeVariant: 'terracotta',
        cost: '$140 total',
        assigned: ['Liam'],
      },
      {
        id: 9,
        time: '07:30 PM',
        title: 'Farewell Dinner & Trip Settlement Tally',
        location: 'Le Sirenuse Terrace, Positano',
        category: 'Dining',
        badgeVariant: 'terracotta',
        cost: '$480 total',
        assigned: ['All 4'],
      },
    ],
  };

  const expenseBreakdown = [
    { name: 'Lodging & Villas', value: 1650, color: '#1B4332' },
    { name: 'Dining & Cafes', value: 1125, color: '#E07A5F' },
    { name: 'Activities & Boat', value: 676, color: '#2D6A4F' },
    { name: 'Transit & Ferries', value: 290, color: '#D4A373' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto rounded-3xl bg-white border border-ivory-300 shadow-soft-xl overflow-hidden">
      
      {/* Dashboard Top Header Bar */}
      <div className="bg-forest-900 text-ivory-50 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-forest-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs uppercase font-bold tracking-wider text-forest-200">
              Live Collaborative Board
            </span>
            <Badge variant="terracotta" size="sm">4 Friends Active</Badge>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Amalfi Coast Summer Adventure
          </h3>
          <p className="text-xs sm:text-sm text-forest-200/80 mt-1 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-terracotta-400" />
            Ravello • Positano • Capri • Jul 14 - Jul 21, 2026
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex p-1.5 rounded-2xl bg-forest-950/70 border border-forest-800">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'itinerary'
                ? 'bg-forest-600 text-white shadow-soft-sm'
                : 'text-forest-200 hover:text-white'
            }`}
          >
            Day-by-Day Itinerary
          </button>
          <button
            onClick={() => setActiveTab('tally')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'tally'
                ? 'bg-forest-600 text-white shadow-soft-sm'
                : 'text-forest-200 hover:text-white'
            }`}
          >
            Expense Tally & Splits
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'analytics'
                ? 'bg-forest-600 text-white shadow-soft-sm'
                : 'text-forest-200 hover:text-white'
            }`}
          >
            Budget Analytics
          </button>
        </div>
      </div>

      {/* Tab 1: Itinerary */}
      {activeTab === 'itinerary' && (
        <div className="p-6 sm:p-8 space-y-6">
          {/* Day Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {[1, 2, 3].map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-2 ${
                  activeDay === day
                    ? 'bg-forest-600 text-ivory-50 shadow-soft'
                    : 'bg-ivory-100 text-charcoal-700 hover:bg-ivory-200 border border-ivory-300'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Day {day}</span>
                <span className="text-[10px] opacity-75">
                  {day === 1 ? 'Arrival & Ravello' : day === 2 ? 'Capri Island Boat' : 'Path of the Gods'}
                </span>
              </button>
            ))}
          </div>

          {/* Timeline Cards */}
          <div className="space-y-4">
            {itineraryDays[activeDay]?.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-2xl border border-ivory-300 hover:border-forest-600/40 bg-ivory-50/40 hover:bg-white transition-all shadow-soft-sm gap-4 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-ivory-300 flex flex-col items-center justify-center shrink-0 shadow-soft-sm">
                    <Clock className="w-4 h-4 text-forest-600 mb-0.5" />
                    <span className="text-[10px] font-bold text-charcoal-700">
                      {item.time.split(' ')[0]}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm sm:text-base font-bold text-charcoal-900 font-display">
                        {item.title}
                      </h4>
                      <Badge variant={item.badgeVariant} size="sm">
                        {item.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-charcoal-500 mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-terracotta-500" />
                      {item.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-ivory-200">
                  <div className="text-right">
                    <span className="text-xs font-semibold text-charcoal-900 block font-mono">
                      {item.cost}
                    </span>
                    <span className="text-[10px] text-charcoal-400">
                      Organized by {item.assigned.join(', ')}
                    </span>
                  </div>

                  <button
                    onClick={() => handleVote(item.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-ivory-300 hover:border-forest-500 text-charcoal-700 hover:text-forest-700 text-xs font-semibold transition-all shadow-soft-sm active:scale-95"
                    title="Vote for this activity"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-forest-600" />
                    <span>{votes[item.id] || 4}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-forest-50/60 border border-forest-100 flex items-center justify-between flex-wrap gap-3">
            <span className="text-xs text-forest-800 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-forest-600" />
              All 4 members in sync. Changes save automatically to the cloud.
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.info('Activity Creator', 'Add activity dialog opens here.')}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Activity
            </Button>
          </div>
        </div>
      )}

      {/* Tab 2: Expense Tally & Splits */}
      {activeTab === 'tally' && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-ivory-300 shadow-soft-sm">
              <span className="text-xs text-charcoal-500">Total Group Spend</span>
              <p className="text-2xl font-bold text-forest-800 font-mono mt-1">$3,741.00</p>
              <span className="text-[11px] text-charcoal-400 mt-1 block">9 receipts logged across trip</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-ivory-300 shadow-soft-sm">
              <span className="text-xs text-charcoal-500">Equal Cost Per Person</span>
              <p className="text-2xl font-bold text-charcoal-900 font-mono mt-1">$935.25</p>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Within $1,000 budget target</span>
            </div>

            <div className="p-5 rounded-2xl bg-forest-50 border border-forest-200 shadow-soft-sm">
              <span className="text-xs text-forest-800 font-semibold">Smart Debt Minimization</span>
              <p className="text-2xl font-bold text-forest-900 font-mono mt-1">3 Transfers</p>
              <span className="text-[11px] text-forest-700 mt-1 block">Reduced down from 12 separate payments</span>
            </div>
          </div>

          {/* Settle Up Matrix */}
          <div className="bg-ivory-50/70 rounded-2xl border border-ivory-300 p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-600">
              Simplified Settlement Transfers
            </h4>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-ivory-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-forest-100 text-forest-800 text-xs font-bold flex items-center justify-center">
                    ER
                  </div>
                  <div>
                    <p className="text-xs font-bold text-charcoal-900">Elena Rivera</p>
                    <p className="text-[11px] text-charcoal-500">pays Alex Chen for Villa deposit</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-terracotta-600 font-mono">$412.50</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.success('Transfer Recorded', 'Elena paid $412.50 to Alex Chen.')}
                  >
                    Mark Paid
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-ivory-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-terracotta-100 text-terracotta-800 text-xs font-bold flex items-center justify-center">
                    LT
                  </div>
                  <div>
                    <p className="text-xs font-bold text-charcoal-900">Liam Thorne</p>
                    <p className="text-[11px] text-charcoal-500">pays Alex Chen for Boat Charter</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-terracotta-600 font-mono">$280.00</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.success('Transfer Recorded', 'Liam paid $280.00 to Alex Chen.')}
                  >
                    Mark Paid
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-ivory-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center">
                    MP
                  </div>
                  <div>
                    <p className="text-xs font-bold text-charcoal-900">Maya Patel</p>
                    <p className="text-[11px] text-charcoal-500">pays Elena Rivera for Dinner</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-terracotta-600 font-mono">$142.75</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.success('Transfer Recorded', 'Maya paid $142.75 to Elena Rivera.')}
                  >
                    Mark Paid
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Budget Analytics */}
      {activeTab === 'analytics' && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Donut Chart */}
            <div className="h-64 flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={expenseBreakdown}
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {expenseBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`$${value}`, 'Amount']}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #EAE3D6',
                      boxShadow: '0 4px 12px rgba(27,67,50,0.08)',
                    }}
                  />
                </RechartsPie>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-charcoal-400 font-medium">Total</span>
                <span className="text-lg font-bold text-charcoal-900 font-mono">$3,741</span>
              </div>
            </div>

            {/* Legend & Percentages */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-charcoal-900 font-display">
                Expense Distribution by Category
              </h4>
              <div className="space-y-3">
                {expenseBreakdown.map((item) => {
                  const percent = Math.round((item.value / 3741) * 100);
                  return (
                    <div key={item.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2 font-medium text-charcoal-700">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                          {item.name}
                        </span>
                        <span className="font-mono font-bold text-charcoal-900">
                          ${item.value} ({percent}%)
                        </span>
                      </div>
                      <div className="w-full bg-ivory-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${percent}%`, backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default ProductPreview;
