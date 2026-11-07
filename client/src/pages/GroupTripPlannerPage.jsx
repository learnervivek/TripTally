import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Share2,
  Calendar,
  Luggage,
  Sparkles,
  MessageSquare,
  HelpCircle,
  Smartphone,
  Check,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import { PAGE_SEO, getSoftwareApplicationSchema } from '../data/seoData';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { trackEvent, AnalyticsEvents } from '../utils/analytics';

const painPoints = [
  {
    before: '500+ unread WhatsApp messages arguing over dates and hotel links',
    after: 'Single clean collaborative dashboard with confirmed stops and dates',
  },
  {
    before: 'Someone forgets the first-aid kit or 3 people bring duplicate cameras',
    after: 'Shared packing checklist with assigned owners per companion',
  },
  {
    before: 'Awkward post-trip debates over who paid for cabs, petrol, or dinners',
    after: 'Real-time rupee expense ledger with debt-minimized UPI settlements',
  },
  {
    before: 'Scattered booking PDFs across multiple email inboxes and screenshots',
    after: 'Centralized itinerary timeline with addresses, notes, and maps',
  },
];

export default function GroupTripPlannerPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Group Trip Planner', url: '/group-trip-planner' },
  ];

  return (
    <div className="min-h-screen bg-ivory-50 text-charcoal-900 selection:bg-forest-100 selection:text-forest-900">
      <SEO
        title={PAGE_SEO.groupTripPlanner.title}
        description={PAGE_SEO.groupTripPlanner.description}
        canonical={PAGE_SEO.groupTripPlanner.canonical}
        keywords={PAGE_SEO.groupTripPlanner.keywords}
        breadcrumbs={breadcrumbs}
        schema={getSoftwareApplicationSchema()}
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-ivory-200/80 bg-gradient-to-b from-ivory-100/60 to-ivory-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-charcoal-500">
              <li>
                <Link to="/" className="hover:text-forest-700 transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="font-semibold text-charcoal-800" aria-current="page">
                Group Trip Planner
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-forest-800 text-xs font-semibold mb-4">
              <Users className="w-3.5 h-3.5 text-forest-700" />
              <span>Built for Friend Circles & Groups</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-900 leading-tight mb-4">
              Collaborative Group Trip Planner for Friends & Families
            </h1>

            <p className="text-base sm:text-lg text-charcoal-600 leading-relaxed mb-8">
              End the chaos of scattered WhatsApp chats and lost booking screenshots. TripTally gives your entire travel crew a single shared workspace to coordinate schedules, packing, and expenses.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  trackEvent(AnalyticsEvents.TRIP_CREATE_CLICK, { source: 'group_planner_hero' });
                  navigate(isAuthenticated ? '/trips' : '/register');
                }}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Create Group Trip Board
              </Button>
              <Link
                to="/travel-expense-splitter"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-ivory-300 bg-white hover:bg-ivory-100 text-charcoal-800 text-sm font-medium transition-colors"
              >
                <Share2 className="w-4 h-4 text-forest-600" />
                <span>Learn About Expense Splitting</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Before vs After Comparison */}
      <section className="py-16 bg-white border-b border-ivory-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-charcoal-900 mb-3">
              Why Indian Travel Groups Switch to TripTally
            </h2>
            <p className="text-sm text-charcoal-600">
              Transform chaotic planning into effortless group memories.
            </p>
          </div>

          <div className="space-y-4">
            {painPoints.map((pt, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-2xl bg-ivory-50 border border-ivory-200"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ✕
                  </span>
                  <div>
                    <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider block">Without TripTally</span>
                    <p className="text-xs text-charcoal-600 mt-1 leading-relaxed">{pt.before}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t md:border-t-0 md:border-l border-ivory-200 pt-3 md:pt-0 md:pl-4">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-forest-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <div>
                    <span className="text-[11px] font-bold text-forest-700 uppercase tracking-wider block">With TripTally Workspace</span>
                    <p className="text-xs text-charcoal-800 font-medium mt-1 leading-relaxed">{pt.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Core Collaborative Tools */}
      <section className="py-16 bg-ivory-50 border-b border-ivory-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-ivory-200 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-700 mb-4">
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-charcoal-900 mb-2">1-Click WhatsApp Invites</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed mb-4">
                Generate a secure invite link and drop it into your friend group WhatsApp chat. Companions join instantly without tedious invitation codes.
              </p>
              <ul className="space-y-1.5 text-xs text-charcoal-700">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-forest-600" /> WhatsApp & Email sharing
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-forest-600" /> Instant member onboarding
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-ivory-200 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-700 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-charcoal-900 mb-2">Granular Role Permissions</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed mb-4">
                Maintain structure with Organizer, Editor, and Viewer permissions. Prevent accidental deletions while allowing everyone to contribute ideas.
              </p>
              <ul className="space-y-1.5 text-xs text-charcoal-700">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-forest-600" /> Organizer (full control)
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-forest-600" /> Editor (itinerary & packing)
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-forest-600" /> Viewer (read-only itinerary)
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-ivory-200 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-700 mb-4">
                <Luggage className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-charcoal-900 mb-2">Shared Packing Checklist</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed mb-4">
                Coordinate communal and personal packing lists across Documents, Tech, Meds, and Clothing. Assign items so group gear is never left behind.
              </p>
              <ul className="space-y-1.5 text-xs text-charcoal-700">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-forest-600" /> Companion assignment
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-forest-600" /> Live completion progress
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest-900 text-ivory-50 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold mb-3">
            Start Planning Your Next Group Trip
          </h2>
          <p className="text-sm text-forest-200 mb-6">
            Create a trip board in seconds and invite your travel crew today. 100% free.
          </p>
          <Button
            variant="accent"
            size="lg"
            onClick={() => navigate(isAuthenticated ? '/trips' : '/register')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Create Group Trip Board
          </Button>
        </div>
      </section>
    </div>
  );
}

