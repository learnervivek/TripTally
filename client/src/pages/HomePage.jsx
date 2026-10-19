import React, { useState, Suspense, lazy } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  Share2,
  Coins,
  ChevronDown,
  Globe2,
  Navigation,
  Check,
  Star,
  ExternalLink,
  Layers,
  HeartHandshake,
  Smartphone
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import ProductPreview from '../components/landing/ProductPreview';
import AuthModal from '../components/auth/AuthModal';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

// Lazy-load the 3D Travel Globe component for fast initial page load
const TravelGlobe = lazy(() => import('../components/3d/TravelGlobe'));

// Curated destinations with high-resolution photography
const featuredDestinations = [
  {
    id: 'amalfi',
    title: 'Amalfi Coast & Capri',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
    alt: 'Pastel cliffside houses overlooking the azure Mediterranean on the Amalfi Coast',
    days: '7 Days',
    travelers: '4 Friends',
    estBudget: '$1,350 / person',
    tag: 'Coastal Luxury',
    tagVariant: 'forest',
  },
  {
    id: 'kyoto',
    title: 'Kyoto & Tokyo Neon',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    alt: 'Traditional Japanese pagoda surrounded by vibrant autumn foliage in Kyoto',
    days: '10 Days',
    travelers: '5 Friends',
    estBudget: '$1,650 / person',
    tag: 'Cultural Trail',
    tagVariant: 'terracotta',
  },
  {
    id: 'swiss-alps',
    title: 'Swiss Alps Expedition',
    country: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    alt: 'Snowy peaks and lush alpine valleys of the Swiss Alps',
    days: '6 Days',
    travelers: '6 Friends',
    estBudget: '$1,200 / person',
    tag: 'Alpine Trek',
    tagVariant: 'forest',
  },
  {
    id: 'bali',
    title: 'Bali Island Sanctuary',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    alt: 'Lush tropical palm trees and emerald rice terraces in Bali',
    days: '9 Days',
    travelers: '4 Friends',
    estBudget: '$890 / person',
    tag: 'Tropical Escape',
    tagVariant: 'terracotta',
  },
  {
    id: 'patagonia',
    title: 'Torres del Paine',
    country: 'Chile',
    image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=800&q=80',
    alt: 'Granite peaks and turquoise glacial lakes in Patagonia',
    days: '8 Days',
    travelers: '4 Friends',
    estBudget: '$1,400 / person',
    tag: 'Wilderness',
    tagVariant: 'neutral',
  },
  {
    id: 'reykjavik',
    title: 'Reykjavík & Waterfalls',
    country: 'Iceland',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    alt: 'Dramatic waterfall and basalt cliffs in Iceland',
    days: '5 Days',
    travelers: '3 Friends',
    estBudget: '$1,250 / person',
    tag: 'Nordic Wonder',
    tagVariant: 'forest',
  },
];

const howItWorksSteps = [
  {
    step: '01',
    title: 'Create Your Shared Trip Board',
    description: 'Set your dates, destination, target budget, and select curated travel photography.',
    icon: Compass,
    color: 'forest',
  },
  {
    step: '02',
    title: 'Invite Companions with 1 Link',
    description: 'Collaborate via email invite or shareable 7-day tokens. Assign roles for Organizers, Editors, or Viewers.',
    icon: Users,
    color: 'terracotta',
  },
  {
    step: '03',
    title: 'Build Itineraries & Map Stops',
    description: 'Coordinate day-by-day schedules, activities, stays, and route lines plotted with OpenStreetMap.',
    icon: MapPin,
    color: 'forest',
  },
  {
    step: '04',
    title: 'Tally Expenses & Settle Easily',
    description: 'Log group expenses with equal or custom splits. Our ledger minimizes debts so nobody does mental math.',
    icon: Split,
    color: 'terracotta',
  },
];

const faqs = [
  {
    question: 'Is TripTally completely free to use?',
    answer:
      'Yes. TripTally is 100% free for friends and travel groups. You can create unlimited trips, invite unlimited collaborators, log shared expenses, and build collaborative itineraries without subscription fees or paywalls.',
  },
  {
    question: 'How does the debt simplification algorithm work?',
    answer:
      'Traditional group trips result in messy round-robin payments where everyone owes everyone else. TripTally calculates net creditor and debtor balances and finds the minimum number of direct transactions needed to settle all accounts with mathematical certainty.',
  },
  {
    question: 'Can I use TripTally on mobile devices?',
    answer:
      'Yes! TripTally is fully responsive with touch-optimized interfaces, smooth drawer navigation, mobile map views, and quick expense logging designed for use while traveling on the go.',
  },
  {
    question: 'How does online debt settlement work?',
    answer:
      'TripTally supports both manual settlements (Cash, UPI, Venmo, Bank Transfer) and online payment orders via Razorpay test mode, keeping your group ledger updated in real time.',
  },
];

export default function HomePage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [openFaq, setOpenFaq] = useState(0);

  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleOpenAuth = (mode = 'login') => {
    if (isAuthenticated) {
      navigate('/dashboard');
      return;
    }
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handlePlanDestination = (dest) => {
    if (isAuthenticated) {
      navigate('/trips');
    } else {
      toast.info('Start Your Trip', `Sign in to create your "${dest.name || dest.title}" trip board.`);
      handleOpenAuth('register');
    }
  };

  return (
    <div className="min-h-screen bg-ivory-50 text-charcoal-900 selection:bg-forest-100 selection:text-forest-900 overflow-x-hidden">
      
      {/* ---------------- 1. Immersive 3D Travel Hero Section ---------------- */}
      <section className="relative pt-6 pb-16 lg:pt-10 lg:pb-24 overflow-hidden border-b border-ivory-200/70">
        
        {/* Subtle Decorative Background Glows */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-forest-100/35 via-terracotta-100/20 to-transparent blur-3xl pointer-events-none rounded-full" />
        <div className="absolute -top-24 right-0 w-96 h-96 bg-forest-200/20 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Editorial Headline & Copy */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex flex-col items-start z-10 text-left"
            >
              {/* Trust Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-50 border border-forest-200/80 text-forest-800 text-xs font-semibold mb-6 shadow-soft-sm">
                <Sparkles className="w-3.5 h-3.5 text-terracotta-500 animate-spin-slow" />
                <span>Next-Gen Group Travel Management</span>
              </div>

              {/* Required Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal-900 leading-[1.12] tracking-tight mb-5">
                Plan Together. <br />
                <span className="italic font-normal text-forest-700">Travel Better.</span>
              </h1>

              {/* Required Supporting Text */}
              <p className="text-base sm:text-lg text-charcoal-600 leading-relaxed max-w-xl mb-8">
                Build unforgettable trips together. Plan itineraries, organize your group, and split expenses in one place.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => handleOpenAuth('register')}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="w-full sm:w-auto shadow-soft-lg"
                >
                  Start Planning Free
                </Button>
                <a
                  href="#features"
                  className="w-full sm:w-auto inline-flex items-center justify-center font-medium rounded-xl border border-ivory-300 hover:border-forest-600 bg-white hover:bg-ivory-100/70 text-charcoal-800 text-sm px-5 py-3 transition-all duration-200 shadow-soft-sm"
                >
                  Explore Features
                </a>
              </div>

              {/* Key Trust Highlights */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-ivory-200 w-full text-xs text-charcoal-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
                  <span>100% Free Forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
                  <span>No Spreadsheets</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
                  <span>Fair Split Ledger</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: 3D Travel Globe Canvas */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 relative flex items-center justify-center"
            >
              <div className="w-full relative rounded-3xl bg-gradient-to-b from-forest-950/5 via-forest-900/10 to-transparent p-2 sm:p-4 border border-ivory-200/60 shadow-soft-xl">
                <Suspense
                  fallback={
                    <div className="w-full h-[460px] sm:h-[540px] flex flex-col items-center justify-center text-center p-8 bg-forest-900/10 rounded-2xl animate-pulse">
                      <Compass className="w-10 h-10 text-forest-600 animate-spin-slow mb-3" />
                      <p className="text-sm font-medium text-forest-800">
                        Initializing 3D Travel Globe...
                      </p>
                    </div>
                  }
                >
                  <TravelGlobe onPlanTripClick={handlePlanDestination} />
                </Suspense>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ---------------- 3. Featured Destinations Section ---------------- */}
      <section id="destinations" className="py-20 bg-ivory-100/50 border-b border-ivory-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-terracotta-600 mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Curated Destinations</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
                Where will your group wander next?
              </h2>
            </div>
            <p className="text-sm text-charcoal-600 max-w-md mt-3 md:mt-0 leading-relaxed">
              From Italian coastal roads to Tokyo neon alleys, plan complete itineraries with real budgets and shared responsibilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDestinations.map((dest, idx) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group bg-white rounded-2xl border border-ivory-200 overflow-hidden shadow-soft hover:shadow-soft-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <Badge variant={dest.tagVariant}>{dest.tag}</Badge>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-medium text-ivory-200 uppercase tracking-wider">
                      {dest.country}
                    </p>
                    <h3 className="font-serif text-xl font-bold text-white drop-shadow-sm">
                      {dest.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-charcoal-600 mb-4 pb-3 border-b border-ivory-200">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-forest-600" />
                      {dest.days}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-forest-600" />
                      {dest.travelers}
                    </span>
                    <span className="font-semibold text-charcoal-800">
                      {dest.estBudget}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePlanDestination(dest)}
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    className="w-full justify-between hover:bg-forest-50 hover:text-forest-800 hover:border-forest-600"
                  >
                    Plan this Expedition
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ---------------- 4. How TripTally Works ---------------- */}
      <section id="how-it-works" className="py-20 bg-ivory-50 border-b border-ivory-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-forest-700 mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Effortless Collaboration</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 mb-4">
              How TripTally Keeps Groups in Sync
            </h2>
            <p className="text-base text-charcoal-600 leading-relaxed">
              No more 300-message chat threads or conflicting spreadsheets. Everything lives in one shared, beautiful board.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorksSteps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-ivory-200 shadow-soft hover:shadow-soft-lg transition-all relative"
                >
                  <span className="font-mono text-xs font-bold text-terracotta-600 mb-3 block">
                    STEP {item.step}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-700 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ---------------- 5. Core Features Deep Dive ---------------- */}
      <section id="features" className="py-20 bg-ivory-100/40 border-b border-ivory-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Feature 1: Daily Itinerary & Leaflet Maps */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-forest-700 mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Day-by-Day Precision</span>
              </div>
              <h3 className="font-serif text-3xl font-bold text-charcoal-900 mb-4">
                Collaborative Itineraries with Real Route Maps
              </h3>
              <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed mb-6">
                Organize every morning, afternoon, and evening. Categorize reservations, accommodations, and transit. Watch planned costs tally up automatically by day and total trip.
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-charcoal-700 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
                  <span>Free OpenStreetMap integration plots attractions and routes cleanly.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
                  <span>Timeline cards for Sightseeing, Food, Lodging, and Travel.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
                  <span>Custom time slots, duration, estimated costs, and member assignments.</span>
                </li>
              </ul>
              <Button
                variant="outline"
                size="md"
                onClick={() => handleOpenAuth('register')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Try the Itinerary Planner
              </Button>
            </div>

            <div className="glass-card bg-white p-5 rounded-3xl border border-ivory-200 shadow-soft-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-ivory-100/70 border border-ivory-200 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-forest-600" />
                    <strong className="text-charcoal-900">Day 1: Amalfi Coastal Arrival</strong>
                  </div>
                  <span className="font-semibold text-forest-800">$1,845 Planned</span>
                </div>
                <div className="p-4 rounded-xl border border-ivory-200 bg-white hover:border-forest-600 transition-colors">
                  <div className="flex justify-between text-xs text-charcoal-500 mb-1">
                    <span>11:30 AM • Ravello</span>
                    <Badge variant="forest">Lodging</Badge>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-charcoal-900">
                    Villa Cimbrone Cliffside Suites
                  </h4>
                  <p className="text-xs text-charcoal-600 mt-1">
                    Private terrace check-in overlooking the Gulf of Salerno.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-ivory-200 bg-white hover:border-forest-600 transition-colors">
                  <div className="flex justify-between text-xs text-charcoal-500 mb-1">
                    <span>02:00 PM • Amalfi Town</span>
                    <Badge variant="terracotta">Dining</Badge>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-charcoal-900">
                    Welcome Seafood Lunch & Limoncello
                  </h4>
                  <p className="text-xs text-charcoal-600 mt-1">
                    Handmade scialatielli pasta with clams at Trattoria da Gemma.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Group Expense Splitting & Debt Minimization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 glass-card bg-white p-6 rounded-3xl border border-ivory-200 shadow-soft-lg">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-ivory-200">
                <div className="flex items-center gap-2">
                  <Split className="w-4 h-4 text-terracotta-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-charcoal-900">
                    Debt Simplification Ledger
                  </span>
                </div>
                <Badge variant="success">Solved with 2 Payments</Badge>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-ivory-50 border border-ivory-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-charcoal-900">Marco</span>
                    <span className="text-charcoal-500"> pays </span>
                    <span className="font-semibold text-charcoal-900">Alex</span>
                  </div>
                  <span className="font-bold text-forest-700 text-sm">$185.00</span>
                </div>

                <div className="p-3 rounded-xl bg-ivory-50 border border-ivory-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-charcoal-900">Sofia</span>
                    <span className="text-charcoal-500"> pays </span>
                    <span className="font-semibold text-charcoal-900">Elena</span>
                  </div>
                  <span className="font-bold text-forest-700 text-sm">$142.50</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-ivory-200 flex items-center justify-between text-[11px] text-charcoal-500">
                <span>Stored authoritatively in integer minor units</span>
                <span className="text-forest-700 font-semibold">Zero Rounding Discrepancies</span>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-terracotta-600 mb-2">
                <Coins className="w-3.5 h-3.5" />
                <span>Zero Awkward Money Conversations</span>
              </div>
              <h3 className="font-serif text-3xl font-bold text-charcoal-900 mb-4">
                Group Expense Splitting with Mathematical Precision
              </h3>
              <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed mb-6">
                Log who paid, attach receipt photos or PDFs, and choose equal or custom splits. TripTally's debt simplification algorithm untangles the web of transactions so everyone pays what they truly owe.
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-charcoal-700 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
                  <span>Supports Equal splits and custom percentage or fixed shares.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
                  <span>5MB receipt photo uploads with protected storage.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
                  <span>Manual settlements via UPI, Cash, Venmo, or Razorpay online payments.</span>
                </li>
              </ul>
              <Button
                variant="primary"
                size="md"
                onClick={() => handleOpenAuth('register')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Split Expenses Now
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------- 6. Interactive Dashboard Preview ---------------- */}
      <section id="preview" className="py-20 bg-ivory-50 border-b border-ivory-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-forest-700 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
              <span>Interactive Workspace</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 mb-4">
              Test the TripTally Workspace Right Here
            </h2>
            <p className="text-base text-charcoal-600 leading-relaxed">
              Click through the interactive itinerary timeline, expense split ledger, and budget charts below.
            </p>
          </div>

          {/* Embedded Interactive ProductPreview Component */}
          <div className="bg-white rounded-3xl border border-ivory-200/90 shadow-soft-xl p-4 sm:p-8">
            <ProductPreview />
          </div>

        </div>
      </section>

      {/* ---------------- 7. Frequently Asked Questions ---------------- */}
      <section id="faq" className="py-20 bg-ivory-100/30 border-b border-ivory-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-forest-700 mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Got Questions?</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-charcoal-600">
              Everything you need to know about planning trips and splitting expenses with TripTally.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={faq.question}
                className="bg-white rounded-2xl border border-ivory-200/90 overflow-hidden shadow-soft-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-600"
                >
                  <span className="font-serif text-base font-bold text-charcoal-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-forest-700 shrink-0 transition-transform duration-300 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-charcoal-600 leading-relaxed border-t border-ivory-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ---------------- 8. Final Call to Action ---------------- */}
      <section className="py-20 bg-ivory-50 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="rounded-3xl bg-forest-900 text-ivory-50 p-8 sm:p-14 text-center relative overflow-hidden shadow-soft-xl border border-forest-800">
            <div className="absolute top-0 right-0 w-80 h-80 bg-forest-700/20 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-terracotta-500/10 blur-3xl rounded-full pointer-events-none" />

            <div className="max-w-2xl mx-auto relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-800/80 border border-forest-700 text-forest-200 text-xs font-semibold mb-6">
                <Globe2 className="w-3.5 h-3.5 text-terracotta-400" />
                <span>Ready for takeoff</span>
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ivory-100 mb-6 leading-tight">
                Start Planning Your Group Adventure Today
              </h2>

              <p className="text-sm sm:text-base text-forest-100/90 mb-8 leading-relaxed max-w-xl mx-auto">
                No credit cards. No paywalls. Just simple, beautiful collaborative trip planning for you and your favorite travel companions.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  variant="accent"
                  size="lg"
                  onClick={() => handleOpenAuth('register')}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="shadow-soft"
                >
                  Create Free Account
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleOpenAuth('login')}
                  className="bg-forest-800/60 hover:bg-forest-800 text-ivory-100 border-forest-700 hover:border-forest-600"
                >
                  Try Guest Demo
                </Button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------- Authentication Modal ---------------- */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />

    </div>
  );
}
