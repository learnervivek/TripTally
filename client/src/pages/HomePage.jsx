import React, { useState, Suspense, lazy } from 'react';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Users,
  Receipt,
  MapPin,
  Calendar,
  Sparkles,
  CheckCircle2,
  DollarSign,
  ChevronRight,
  Split,
  PieChart,
  HelpCircle,
  Vote,
  FileSpreadsheet,
  Share2,
  Coins,
  ChevronDown
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import DotGlobe from '../components/ui/DotGlobe';
import ProductPreview from '../components/landing/ProductPreview';
import AuthModal from '../components/auth/AuthModal';
import { useToast } from '../context/ToastContext';

// Curated high quality travel photography with proper Unsplash travel licenses
const destinations = [
  {
    id: 'amalfi',
    title: 'Amalfi Coast & Capri',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
    alt: 'Scenic pastel cliffside houses overlooking the deep blue sea on the Amalfi Coast of Italy',
    days: '7 Days',
    travelers: '4 Friends',
    estBudget: '$850 / person',
    tag: 'Coastal Escape',
    tagVariant: 'forest',
  },
  {
    id: 'kyoto',
    title: 'Kyoto & Tokyo Neon',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    alt: 'Traditional Japanese pagoda surrounded by autumn foliage in Kyoto',
    days: '10 Days',
    travelers: '5 Friends',
    estBudget: '$1,200 / person',
    tag: 'Cultural Trail',
    tagVariant: 'terracotta',
  },
  {
    id: 'swiss-alps',
    title: 'Swiss Alps Hiking',
    country: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    alt: 'Majestic snowy mountain peaks and lush alpine meadows in the Swiss Alps',
    days: '6 Days',
    travelers: '6 Friends',
    estBudget: '$950 / person',
    tag: 'Mountain Trek',
    tagVariant: 'forest',
  },
  {
    id: 'patagonia',
    title: 'Torres del Paine',
    country: 'Chile',
    image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=800&q=80',
    alt: 'Granite peaks and turquoise glacial lakes in Torres del Paine, Patagonia',
    days: '8 Days',
    travelers: '4 Friends',
    estBudget: '$1,100 / person',
    tag: 'Wilderness Adventure',
    tagVariant: 'neutral',
  },
];

const faqs = [
  {
    question: 'Is TripTally completely free to use?',
    answer:
      'Yes. TripTally is free for friends and travel groups. You can create unlimited trips, invite unlimited collaborators, log shared expenses, and build collaborative itineraries without any subscription fees or paywalls.',
  },
  {
    question: 'How does the debt minimization algorithm work?',
    answer:
      'Traditional group trips result in messy round-robin payments where everyone owes everyone else. TripTally calculates net creditor and debtor balances and finds the minimum number of direct transactions needed to settle all accounts with mathematical certainty.',
  },
  {
    question: 'Can friends contribute without creating a full account?',
    answer:
      'Yes! When you share your trip invite link, friends can view the complete itinerary, vote on activities, and check current tallies directly from any modern web or mobile browser.',
  },
  {
    question: 'Can an expense be split unevenly or among only specific people?',
    answer:
      'Absolutely. When adding an expense, you can split it equally across all members, allocate exact amounts, or select only the specific friends who participated in that meal, cab ride, or excursion.',
  },
  {
    question: 'Can we track expenses in different currencies during an international trip?',
    answer:
      'Yes. You can record expenses in the local currency (e.g. EUR, JPY, CHF, USD), and TripTally converts and consolidates them into your trip’s primary base currency for transparent balance tallying.',
  },
];

export function HomePage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signup');
  const [openFaq, setOpenFaq] = useState(null);
  const { toast } = useToast();

  const openAuth = (mode = 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleDestinationClick = (dest) => {
    toast.info('Trip Template Selected', `Opening preview for "${dest.title}". You can duplicate this itinerary into your account.`);
    openAuth('signup');
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-10 sm:pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Copy */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-50 border border-forest-200/80 text-forest-800 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-terracotta-500 animate-pulse" />
                <span>Collaborative Group Travel Platform</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-charcoal-900 tracking-tight leading-[1.1] font-display">
                Plan Together. <br />
                <span className="text-forest-600 underline decoration-terracotta-400 decoration-wavy decoration-2">
                  Travel Better.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-charcoal-600 max-w-xl leading-relaxed">
                Co-create multi-day itineraries, vote on places to visit, and split group expenses without the awkward spreadsheets or post-trip money math.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => openAuth('signup')}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Get Started Free
                </Button>
                <a href="#how-it-works">
                  <Button variant="secondary" size="lg">
                    See How It Works
                  </Button>
                </a>
              </div>

              {/* Trust & Spec Highlights */}
              <div className="pt-6 border-t border-ivory-300/80 flex flex-wrap items-center gap-6 text-xs text-charcoal-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
                  <span>100% Free for Friends</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
                  <span>Real-Time Cloud Sync</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
                  <span>Automated Debt Minimizer</span>
                </div>
              </div>
            </div>

            {/* Right Large Interactive Globe */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[460px] p-6 sm:p-8 rounded-3xl bg-white/80 border border-ivory-300 shadow-soft-xl backdrop-blur-md flex flex-col items-center">
                <div className="w-full flex items-center justify-between mb-2">
                  <Badge variant="forest" size="sm" withDot>
                    Worldwide Coordinates
                  </Badge>
                  <span className="text-[11px] text-charcoal-400 font-medium">
                    Drag to rotate
                  </span>
                </div>

                {/* Responsive Globe with static fallback & reduced motion support */}
                <DotGlobe size={380} />

                <div className="w-full mt-4 pt-4 border-t border-ivory-200/80 flex items-center justify-between text-xs text-charcoal-500">
                  <span className="font-semibold text-charcoal-800">
                    Interactive Trip Radar
                  </span>
                  <Badge variant="terracotta" size="sm">
                    Live Destinations
                  </Badge>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Destination Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <Badge variant="terracotta" size="sm">Curated Adventures</Badge>
            <h2 className="text-2xl sm:text-4xl font-bold text-charcoal-900 mt-2 font-display">
              Popular group trips planned on TripTally
            </h2>
            <p className="text-sm text-charcoal-500 mt-1 max-w-xl">
              Kickstart your friend getaway with pre-structured day-by-day itineraries and estimated expense budgets.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => openAuth('signup')}
            rightIcon={<ChevronRight className="w-4 h-4" />}
          >
            Create Custom Trip
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <Card
              key={dest.id}
              variant="interactive"
              className="flex flex-col h-full group"
              onClick={() => handleDestinationClick(dest)}
            >
              <div className="relative h-48 w-full overflow-hidden bg-charcoal-100">
                <img
                  src={dest.image}
                  alt={dest.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <Badge variant={dest.tagVariant} size="sm">
                    {dest.tag}
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-medium text-ivory-200">
                    {dest.country}
                  </span>
                  <h3 className="text-base font-bold text-white font-display leading-tight">
                    {dest.title}
                  </h3>
                </div>
              </div>

              <CardContent className="pt-4 flex-1 flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between text-xs text-charcoal-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-forest-600" />
                    {dest.days}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-forest-600" />
                    {dest.travelers}
                  </span>
                </div>

                <div className="pt-3 border-t border-ivory-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-charcoal-400 uppercase tracking-wider block">Est. Cost</span>
                    <span className="text-xs font-bold text-charcoal-900 font-mono">
                      {dest.estBudget}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-forest-700 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Use Itinerary <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. Feature Sections */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="forest" size="sm">Core Capabilities</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-900 mt-2 font-display">
            Built specifically for friend groups & travel crews
          </h2>
          <p className="text-sm sm:text-base text-charcoal-500 mt-2">
            Everything your group needs from initial destination voting to post-vacation bill settlements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Feature 1: Itinerary Planning */}
          <div className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-soft flex flex-col justify-between space-y-6 hover:shadow-soft-lg transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-600">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal-900 font-display">
                Co-Created Day-by-Day Itineraries
              </h3>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                Build flexible morning, afternoon, and evening timelines. Attach locations, reservations, and opening hours so no one asks "what are we doing today?" ever again.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-ivory-100/70 border border-ivory-200 text-xs space-y-2">
              <div className="flex items-center justify-between text-charcoal-700 font-semibold">
                <span className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-forest-600" />
                  Day 2: Coastal Hike & Wine Tasting
                </span>
                <Badge variant="forest" size="sm">Confirmed</Badge>
              </div>
              <p className="text-[11px] text-charcoal-400">
                Stops synced across all companion phones with offline access.
              </p>
            </div>
          </div>

          {/* Feature 2: Expense Splitting & Debt Minimization */}
          <div className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-soft flex flex-col justify-between space-y-6 hover:shadow-soft-lg transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-terracotta-50 border border-terracotta-100 flex items-center justify-center text-terracotta-600">
                <Split className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal-900 font-display">
                Smart Debt-Minimization Splitter
              </h3>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                Log who paid and who participated. Our graph settlement algorithm simplifies messy round-robin debts into the absolute minimum number of direct payments.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-ivory-100/70 border border-ivory-200 text-xs space-y-2">
              <div className="flex items-center justify-between text-charcoal-700 font-semibold">
                <span>Elena & Liam pay Alex directly</span>
                <span className="text-terracotta-600 font-mono font-bold">$412.50</span>
              </div>
              <p className="text-[11px] text-charcoal-400">
                12 circular IOUs simplified to just 2 direct transfers.
              </p>
            </div>
          </div>

          {/* Feature 3: Group Voting & Democracy */}
          <div className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-soft flex flex-col justify-between space-y-6 hover:shadow-soft-lg transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-600">
                <Vote className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal-900 font-display">
                Democratic Activity Voting
              </h3>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                Drop in restaurant links, boat tours, or museums and let the crew upvote their favorites. Resolve itinerary disagreements before you pack your bags.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-ivory-100/70 border border-ivory-200 flex items-center justify-between text-xs">
              <span className="font-semibold text-charcoal-800">
                Sunset Catamaran Tour (5 upvotes)
              </span>
              <Badge variant="success" size="sm" withDot>Unanimous</Badge>
            </div>
          </div>

          {/* Feature 4: Budget Analytics */}
          <div className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-soft flex flex-col justify-between space-y-6 hover:shadow-soft-lg transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-600">
                <PieChart className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal-900 font-display">
                Real-Time Spending Analytics
              </h3>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                Track how much has been spent on Lodging, Dining, Transit, and Activities. Stay within the group budget with visual category breakdowns.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-ivory-100/70 border border-ivory-200 flex items-center justify-between text-xs">
              <span className="font-semibold text-charcoal-800">
                Lodging (44%) • Dining (30%) • Activities (18%)
              </span>
              <span className="font-mono font-bold text-forest-700">$3,741 Total</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Simple Three-Step How It Works */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="terracotta" size="sm">Simple 3-Step Flow</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-900 mt-2 font-display">
            How TripTally works in practice
          </h2>
          <p className="text-sm text-charcoal-500 mt-2">
            From group chat ideation to post-vacation settlement in three frictionless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Step 1 */}
          <div className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-soft flex flex-col relative space-y-4">
            <div className="w-10 h-10 rounded-xl bg-forest-600 text-white font-bold flex items-center justify-center text-base font-mono shadow-soft-sm">
              01
            </div>
            <h3 className="text-xl font-bold text-charcoal-900 font-display">
              Create Trip & Invite Friends
            </h3>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              Set destination, travel dates, and default currency. Generate an instant invite link to drop in your WhatsApp, iMessage, or Slack group.
            </p>
            <div className="pt-2 text-xs font-semibold text-forest-700 flex items-center gap-1.5">
              <Share2 className="w-4 h-4" /> 1-Click Share Link
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-soft flex flex-col relative space-y-4">
            <div className="w-10 h-10 rounded-xl bg-terracotta-500 text-white font-bold flex items-center justify-center text-base font-mono shadow-soft-sm">
              02
            </div>
            <h3 className="text-xl font-bold text-charcoal-900 font-display">
              Co-Build Itinerary & Vote
            </h3>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              Pin must-see spots, add flights and hotel details, and vote on activities together. Everyone stays on the same page in real-time.
            </p>
            <div className="pt-2 text-xs font-semibold text-terracotta-600 flex items-center gap-1.5">
              <Vote className="w-4 h-4" /> Live Group Votes
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-soft flex flex-col relative space-y-4">
            <div className="w-10 h-10 rounded-xl bg-forest-900 text-white font-bold flex items-center justify-center text-base font-mono shadow-soft-sm">
              03
            </div>
            <h3 className="text-xl font-bold text-charcoal-900 font-display">
              Log Receipts & Settle
            </h3>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              Snap receipts and log expenses on the go. When the adventure wraps, settle with simplified direct transfers without calculating by hand.
            </p>
            <div className="pt-2 text-xs font-semibold text-forest-800 flex items-center gap-1.5">
              <Receipt className="w-4 h-4" /> Zero Awkward Math
            </div>
          </div>

        </div>
      </section>

      {/* 5. Product Preview Section */}
      <section id="preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="forest" size="sm">Interactive Demonstration</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-900 mt-2 font-display">
            Experience the live trip dashboard
          </h2>
          <p className="text-sm text-charcoal-500 mt-2">
            Switch between itinerary days, vote on activities, and preview simplified debt tallies below.
          </p>
        </div>

        <ProductPreview />
      </section>

      {/* 6. Frequently Asked Questions */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="forest" size="sm">Got Questions?</Badge>
          <h2 className="text-3xl font-bold text-charcoal-900 mt-2 font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-charcoal-500 mt-1">
            Everything you need to know about planning trips and tallying shared expenses.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-ivory-300 bg-white overflow-hidden shadow-soft-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-600"
                >
                  <span className="text-sm sm:text-base font-bold text-charcoal-900 font-display">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-charcoal-500 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'transform rotate-180 text-forest-700' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-charcoal-600 leading-relaxed border-t border-ivory-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Clear Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-forest-900 text-ivory-50 p-8 sm:p-16 overflow-hidden shadow-soft-xl border border-forest-800 text-center flex flex-col items-center">
          
          <div className="absolute inset-0 bg-[radial-gradient(#2D6A4F_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-6">
            <Badge variant="terracotta" size="sm">
              Ready for your next adventure?
            </Badge>

            <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-tight">
              Start planning your next friend trip today.
            </h2>

            <p className="text-sm sm:text-base text-forest-200/90 leading-relaxed max-w-xl mx-auto">
              Join thousands of friends traveling smarter. Free forever for collaborative trip planning and group expense tallies.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="accent"
                size="lg"
                onClick={() => openAuth('signup')}
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Create Your First Trip Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-forest-800"
                onClick={() => {
                  const previewEl = document.querySelector('#preview');
                  if (previewEl) previewEl.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore Live Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Modal Trigger */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        onAuthSuccess={() => {
          toast.success('Ready to Plan!', 'Account configured. You can now build and share trip boards.');
        }}
      />

    </div>
  );
}

export default HomePage;
