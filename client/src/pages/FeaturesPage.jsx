import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Users,
  Split,
  PieChart,
  Luggage,
  Navigation,
  CheckCircle2,
  ArrowRight,
  IndianRupee,
  ShieldCheck,
  Smartphone,
  Layers,
  MapPin,
  Clock,
  Compass,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import { PAGE_SEO, getSoftwareApplicationSchema } from '../data/seoData';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { trackEvent, AnalyticsEvents } from '../utils/analytics';

const detailedFeatures = [
  {
    id: 'ai-itinerary',
    title: 'Google Gemini AI Itinerary Generator',
    subtitle: 'Day-by-day personalized schedules in seconds',
    tag: 'AI Powered',
    tagVariant: 'forest',
    icon: Sparkles,
    anchor: 'ai-planner',
    description:
      'Harness Google Gemini AI to build tailored travel schedules based on your exact budget in INR, group size, trip pace, and destination preferences. Receive curated timings, transit suggestions, and attraction estimates that you can convert into a group trip board in one click.',
    benefits: [
      'Day-by-day morning, afternoon, and evening activity flow',
      'Realistic budget allocation in Indian Rupees (₹)',
      'Custom travel styles: relaxed, family, budget adventure, luxury',
      'Instant conversion to collaborative group board',
    ],
    ctaText: 'Try AI Itinerary Generator',
    ctaLink: '/ai-itinerary-generator',
  },
  {
    id: 'group-collaboration',
    title: 'Collaborative Group Workspaces',
    subtitle: 'Co-plan with friends without messy WhatsApp threads',
    tag: 'Real-Time Sync',
    tagVariant: 'terracotta',
    icon: Users,
    anchor: 'group-workspace',
    description:
      'Centralize your group adventure. Invite travel companions via email or a 1-click WhatsApp link. Assign Organizer, Editor, or Viewer roles so everyone can suggest spots, vote on stops, and stay updated in real time.',
    benefits: [
      'Role-based permissions (Organizer, Editor, Viewer)',
      '1-Click WhatsApp invitation link sharing',
      'Activity voting and companion coordination',
      'Unified activity log for all trip updates',
    ],
    ctaText: 'Explore Group Trip Planner',
    ctaLink: '/group-trip-planner',
  },
  {
    id: 'expense-splitter',
    title: 'Fair Rupee Expense Splitting & Debt Minimization',
    subtitle: 'Zero awkward math, 100% transparency in INR',
    tag: 'Debt Minimization',
    tagVariant: 'forest',
    icon: Split,
    anchor: 'expense-splitter',
    description:
      'Log trip bills in Indian Rupees with equal or custom per-member splits. Our graph-based debt minimization algorithm collapses complicated multi-person IOUs into the minimum possible direct payments.',
    benefits: [
      'Multi-payer support with equal or custom share percentages',
      'Optimal debt settlement algorithm reduces transfer counts',
      'Instant settlement recording with UPI and verified receipts',
      'Full receipt uploads and audit trail for every rupee',
    ],
    ctaText: 'Explore Expense Splitter',
    ctaLink: '/travel-expense-splitter',
  },
  {
    id: 'budget-analytics',
    title: 'Real-Time Budget Analytics & Spending Alerts',
    subtitle: 'Keep group expenditure strictly under control',
    tag: 'Live Alerts',
    tagVariant: 'neutral',
    icon: PieChart,
    anchor: 'budget-tracking',
    description:
      'Establish total budget targets and categorize expenses across Lodging, Food, Transport, and Activities. Visual progress gauges and customizable alert thresholds alert you before your group overspends.',
    benefits: [
      'Category-level spending breakdown with visual charts',
      'Configurable alert thresholds (e.g. 80%, 90% of budget)',
      'Per-member contribution and spending metrics',
      'Exportable financial summaries for group records',
    ],
    ctaText: 'Explore Budget Planner',
    ctaLink: '/travel-budget-planner',
  },
  {
    id: 'packing-checklist',
    title: 'Smart Collaborative Packing Checklist',
    subtitle: 'Never forget emergency medicine, chargers, or jackets',
    tag: 'Zero Forgotten Gear',
    tagVariant: 'forest',
    icon: Luggage,
    anchor: 'packing-checklist',
    description:
      'Organize group and personal packing items across Clothing, Documents, Electronics, and Medical supplies. Assign items to specific companions so communal gear like first-aid kits and cameras are never duplicated.',
    benefits: [
      'Pre-categorized sections: Documents, Tech, Meds, Apparel',
      'Assign items to specific group members',
      'Real-time checklist progress bar',
      'Custom item additions with notes and quantities',
    ],
    ctaText: 'Start Planning a Trip',
    ctaLink: '/register',
  },
  {
    id: 'interactive-maps',
    title: 'Interactive OpenStreetMap Geographic Routes',
    subtitle: 'Visualize your daily travel path and pin drops',
    tag: 'Spatial Routing',
    tagVariant: 'terracotta',
    icon: Navigation,
    anchor: 'interactive-maps',
    description:
      'Visualize your stays, stops, cafes, and scenic points on interactive OpenStreetMap views with Leaflet. Understand travel distances and optimize daily route sequences to save travel time.',
    benefits: [
      'Interactive pin drops for every scheduled activity',
      'Geographic sequence overview to minimize backtracking',
      'Detailed address and coordinate tagging',
      'Fully responsive for on-the-go road navigation',
    ],
    ctaText: 'Explore Ready Itineraries',
    ctaLink: '/destinations',
  },
];

export default function FeaturesPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Features', url: '/features' },
  ];

  return (
    <div className="min-h-screen bg-ivory-50 text-charcoal-900 selection:bg-forest-100 selection:text-forest-900">
      <SEO
        title={PAGE_SEO.features.title}
        description={PAGE_SEO.features.description}
        canonical={PAGE_SEO.features.canonical}
        keywords={PAGE_SEO.features.keywords}
        breadcrumbs={breadcrumbs}
        schema={getSoftwareApplicationSchema()}
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-ivory-200/80 bg-gradient-to-b from-ivory-100/60 to-ivory-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-charcoal-500">
              <li>
                <Link to="/" className="hover:text-forest-700 transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="font-semibold text-charcoal-800" aria-current="page">
                Features
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-forest-800 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
              <span>Complete Product Suite</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-900 leading-tight mb-4">
              TripTally Features – Modern Tools for Collaborative Travel
            </h1>

            <p className="text-base sm:text-lg text-charcoal-600 leading-relaxed mb-8">
              Everything your travel group needs in one collaborative workspace: from Gemini AI-generated day plans to transparent rupee expense ledgers, UPI settlements, and interactive maps.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  trackEvent(AnalyticsEvents.CTA_CLICK, { location: 'features_hero' });
                  navigate(isAuthenticated ? '/ai-trip-planner' : '/register');
                }}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Start Free Trip Board
              </Button>
              <Link
                to="/ai-itinerary-generator"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-ivory-300 bg-white hover:bg-ivory-100 text-charcoal-800 text-sm font-medium transition-colors"
              >
                <Sparkles className="w-4 h-4 text-forest-600" />
                <span>Test AI Generator</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Deep Dive Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="space-y-16">
            {detailedFeatures.map((feat, index) => {
              const Icon = feat.icon;
              const isEven = index % 2 === 1;

              return (
                <div
                  key={feat.id}
                  id={feat.anchor}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 rounded-3xl bg-white border border-ivory-200/90 shadow-soft ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-700">
                        <Icon className="w-5 h-5" />
                      </div>
                      <Badge variant={feat.tagVariant}>{feat.tag}</Badge>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 mb-2">
                      {feat.title}
                    </h2>
                    
                    <p className="text-sm font-medium text-terracotta-600 mb-4">
                      {feat.subtitle}
                    </p>

                    <p className="text-sm text-charcoal-600 leading-relaxed mb-6">
                      {feat.description}
                    </p>

                    <div className="space-y-2.5 mb-8">
                      {feat.benefits.map((b) => (
                        <div key={b} className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal-700">
                          <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      to={feat.ctaLink}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-forest-700 hover:text-forest-900 transition-colors group"
                    >
                      <span>{feat.ctaText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : ''}`}>
                    <div className="p-6 rounded-2xl bg-ivory-100/70 border border-ivory-200 flex flex-col justify-center min-h-[260px] relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-forest-200/30 blur-2xl rounded-full pointer-events-none" />
                      
                      <div className="flex items-center gap-3 mb-4">
                        <span className="w-3 h-3 rounded-full bg-emerald-500" />
                        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-charcoal-500">
                          TripTally Live Module
                        </span>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-2">
                        {feat.title}
                      </h3>
                      
                      <p className="text-xs text-charcoal-600 mb-4 leading-relaxed">
                        Natively configured for Indian travellers with 100% INR currency handling and multi-device cloud synchronization.
                      </p>

                      <div className="pt-3 border-t border-ivory-200 flex items-center justify-between text-xs text-charcoal-500">
                        <span>Speed: Instant</span>
                        <span>Cost: 100% Free</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-forest-900 text-ivory-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
            Ready to Plan Your Next Indian Adventure?
          </h2>
          <p className="text-sm sm:text-base text-forest-200 mb-8 max-w-xl mx-auto">
            Create your free trip board in seconds. Invite friends, generate AI plans, and manage group expenses without stress.
          </p>
          <Button
            variant="accent"
            size="lg"
            onClick={() => navigate(isAuthenticated ? '/ai-trip-planner' : '/register')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Start Free Trip Board
          </Button>
        </div>
      </section>
    </div>
  );
}

