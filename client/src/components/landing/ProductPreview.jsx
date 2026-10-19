import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  ThumbsUp,
  PieChart,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Receipt,
  Share2,
  Plus,
  IndianRupee
} from 'lucide-react';
import { ResponsiveContainer, PieChart as RechartsPie, Pie, Cell, Tooltip } from 'recharts';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { useToast } from '../../context/ToastContext';
import { formatINR } from '../../utils/currency';

export function ProductPreview() {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [activeDay, setActiveDay] = useState(1);
  const [votes, setVotes] = useState({ 1: 4, 2: 4, 3: 3, 4: 4, 5: 3, 6: 4 });
  const { toast } = useToast();

  const handleVote = (id) => {
    setVotes((prev) => {
      const next = { ...prev, [id]: (prev[id] || 0) + 1 };
      toast.success('Vote Recorded', `You voted for this activity! Total votes: ${next[id]}`);
      return next;
    });
  };

  const itineraryDays = {
    1: [
      {
        id: 1,
        time: '08:30 AM',
        title: 'Arrival in Manali & Riverside Cottage Check-in',
        location: 'Old Manali, Beas River Banks',
        category: 'Lodging',
        badgeVariant: 'forest',
        cost: '₹12,000 / 4 nights',
        assigned: ['Rohan', 'Aarav'],
      },
      {
        id: 2,
        time: '01:30 PM',
        title: 'Himalayan Trout & Woodfired Pizza Lunch',
        location: 'Cafe 1947, Old Manali',
        category: 'Dining',
        badgeVariant: 'terracotta',
        cost: '₹2,400 total',
        assigned: ['All 4'],
      },
      {
        id: 3,
        time: '05:00 PM',
        title: 'Hadimba Devi Ancient Temple & Cedar Forest Stroll',
        location: 'Dhungri Forest, Manali',
        category: 'Activity',
        badgeVariant: 'neutral',
        cost: '₹200 entry',
        assigned: ['Priya', 'Ananya'],
      },
    ],
    2: [
      {
        id: 4,
        time: '07:30 AM',
        title: 'Solang Valley Paragliding & Snow Scooter Session',
        location: 'Solang Valley Adventure Grounds',
        category: 'Activity',
        badgeVariant: 'forest',
        cost: '₹6,000 total',
        assigned: ['Aarav', 'Rohan'],
      },
      {
        id: 5,
        time: '02:00 PM',
        title: 'Maggi, Siddu & Chai Mountain Shack Lunch',
        location: 'Solang Meadow Stalls',
        category: 'Dining',
        badgeVariant: 'terracotta',
        cost: '₹950 total',
        assigned: ['All 4'],
      },
      {
        id: 6,
        time: '06:00 PM',
        title: 'Atal Tunnel Scenic Drive & Sissu Waterfalls',
        location: 'Lahaul Valley North Portal',
        category: 'Travel',
        badgeVariant: 'neutral',
        cost: '₹2,200 cab fuel',
        assigned: ['Priya'],
      },
    ],
    3: [
      {
        id: 7,
        time: '09:00 AM',
        title: 'Jogini Waterfall Trek & Natural Springs',
        location: 'Vashisht Village Trail',
        category: 'Activity',
        badgeVariant: 'forest',
        cost: 'Free Trek',
        assigned: ['All 4'],
      },
      {
        id: 8,
        time: '02:30 PM',
        title: 'Vashisht Hot Water Springs & Traditional Baths',
        location: 'Vashisht Temple Complex',
        category: 'Activity',
        badgeVariant: 'neutral',
        cost: 'Free',
        assigned: ['Rohan', 'Aarav'],
      },
      {
        id: 9,
        time: '08:00 PM',
        title: 'Riverside Bonfire, Live Music & Dinner',
        location: 'The Lazy Dog Lounge, Old Manali',
        category: 'Dining',
        badgeVariant: 'terracotta',
        cost: '₹3,200 total',
        assigned: ['All 4'],
      },
    ],
  };

  // Indian demo trip budget: exact category breakdown totaling ₹40,000
  const expenseBreakdown = [
    { name: 'Accommodation (Cottage)', value: 12000, color: '#1B4332' },
    { name: 'Transport (Volvo & Cabs)', value: 10000, color: '#2D6A4F' },
    { name: 'Food & Mountain Cafes', value: 8000, color: '#E07A5F' },
    { name: 'Activities (Paragliding)', value: 6000, color: '#52B788' },
    { name: 'Miscellaneous & Souvenirs', value: 4000, color: '#D4A373' },
  ];

  const totalBudget = 40000;
  const perPersonCost = totalBudget / 4;

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
            Manali Adventure with Friends
          </h3>
          <p className="text-xs sm:text-sm text-forest-200/80 mt-1 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-terracotta-400" />
            Manali & Solang Valley • Himachal Pradesh • 5 Days
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
                  {day === 1 ? 'Old Manali Arrival' : day === 2 ? 'Solang & Atal Tunnel' : 'Jogini Falls Trek'}
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
                      Coordinated by {item.assigned.join(', ')}
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
              All 4 members in sync. Changes update automatically in real time.
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.info('Activity Creator', 'Add activity modal opens here.')}
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
              <p className="text-2xl font-bold text-forest-800 font-mono mt-1">
                {formatINR(totalBudget)}
              </p>
              <span className="text-[11px] text-charcoal-400 mt-1 block">8 verified bills across 4 members</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-ivory-300 shadow-soft-sm">
              <span className="text-xs text-charcoal-500">Equal Share Per Person</span>
              <p className="text-2xl font-bold text-charcoal-900 font-mono mt-1">
                {formatINR(perPersonCost)}
              </p>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Exact split • 4 friends</span>
            </div>

            <div className="p-5 rounded-2xl bg-forest-50 border border-forest-200 shadow-soft-sm">
              <span className="text-xs text-forest-800 font-semibold">Debt Simplification Ledger</span>
              <p className="text-2xl font-bold text-forest-900 font-mono mt-1">2 UPI Transfers</p>
              <span className="text-[11px] text-forest-700 mt-1 block">Simplified down from 12 round-robin payments</span>
            </div>
          </div>

          {/* Settle Up Matrix */}
          <div className="bg-ivory-50/70 rounded-2xl border border-ivory-300 p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-600">
              Direct Settlement Plan (Zero Mental Math)
            </h4>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-ivory-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-forest-100 text-forest-800 text-xs font-bold flex items-center justify-center">
                    AK
                  </div>
                  <div>
                    <p className="text-xs font-bold text-charcoal-900">Aarav Kapoor</p>
                    <p className="text-[11px] text-charcoal-500">pays Rohan Sharma for Cottage Booking</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-terracotta-600 font-mono">{formatINR(2000)}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.success('Transfer Recorded', 'Aarav paid ₹2,000 via UPI to Rohan.')}
                  >
                    Pay via UPI
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-ivory-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center">
                    AS
                  </div>
                  <div>
                    <p className="text-xs font-bold text-charcoal-900">Ananya Sen</p>
                    <p className="text-[11px] text-charcoal-500">pays Priya Verma for Volvo & Local Cabs</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-terracotta-600 font-mono">{formatINR(2000)}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.success('Transfer Recorded', 'Ananya paid ₹2,000 via UPI to Priya.')}
                  >
                    Pay via UPI
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-charcoal-500 flex items-center justify-between">
              <span>Recorded in Indian Rupees (₹) with integer paise precision</span>
              <span className="text-forest-700 font-semibold">100% Balanced Ledger</span>
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
                    formatter={(value) => [formatINR(value), 'Spend']}
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
                <span className="text-xs text-charcoal-400 font-medium">Total Spend</span>
                <span className="text-lg font-bold text-charcoal-900 font-mono">{formatINR(totalBudget)}</span>
              </div>
            </div>

            {/* Legend & Percentages */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-charcoal-900 font-display">
                  Budget Category Distribution
                </h4>
                <Badge variant="forest">Target: ₹40,000</Badge>
              </div>

              <div className="space-y-3">
                {expenseBreakdown.map((item) => {
                  const percent = Math.round((item.value / totalBudget) * 100);
                  return (
                    <div key={item.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2 font-medium text-charcoal-700">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                          {item.name}
                        </span>
                        <span className="font-mono font-bold text-charcoal-900">
                          {formatINR(item.value)} ({percent}%)
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
