import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Clock,
  IndianRupee,
  Users,
  Compass,
  CheckCircle2,
  Calendar,
  MapPin,
  ChevronDown,
  Layers,
  HelpCircle,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import { PAGE_SEO, getFAQSchema, getSoftwareApplicationSchema } from '../data/seoData';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { trackEvent, AnalyticsEvents } from '../utils/analytics';
import { formatINR } from '../utils/currency';

const sampleItineraries = [
  {
    destination: 'Manali, Himachal Pradesh',
    duration: '3 Days / 2 Nights',
    budget: 24000,
    travelers: '4 Friends',
    days: [
      {
        day: 1,
        title: 'Old Manali Cafes & Cedar Trails',
        activities: [
          'Morning check-in at Old Manali homestay overlooking Beas River',
          'Hadimba Temple walk through centuries-old deodar cedar forest',
          'Cafe crawl tasting fresh river trout and hot apple pie',
        ],
      },
      {
        day: 2,
        title: 'Solang Valley Snow Heights & Atal Tunnel',
        activities: [
          'Scenic morning drive to Solang Valley for paragliding & zorbing',
          'Cross through Atal Tunnel (9.02 km) to Sissu waterfall in Lahaul Valley',
          'Hot sulphur spring relaxation in Vashisht village',
        ],
      },
      {
        day: 3,
        title: 'Jogini Waterfalls & Departure',
        activities: [
          'Gentle 3km hike to Jogini Waterfall with scenic pine views',
          'Local woollen souvenir shopping at Mall Road',
          'Evening Volvo departure to Delhi/Chandigarh',
        ],
      },
    ],
  },
  {
    destination: 'Goa Coastal Circuit',
    duration: '4 Days / 3 Nights',
    budget: 36000,
    travelers: '5 Friends',
    days: [
      {
        day: 1,
        title: 'North Goa Arrival & Sunset Fort Ramparts',
        activities: [
          'Pickup rental scooters / open Thar from airport',
          'Authentic Goan fish curry thali lunch at local tavern',
          'Sunset over the Arabian Sea from Chapora Fort ramparts',
        ],
      },
      {
        day: 2,
        title: 'Water Sports & Beach Shacks',
        activities: [
          'Morning jet ski & parasailing session at Calangute',
          'Afternoon chilled coconut water & seafood at Morjim shack',
          'Evening live music & coastal dining in Anjuna',
        ],
      },
      {
        day: 3,
        title: 'Fontainhas Heritage & Spice Plantations',
        activities: [
          'Heritage photography walk through pastel Portuguese quarter in Panaji',
          'Organic spice plantation guided tour with traditional Goan buffet',
          'Mandovi river twilight cruise',
        ],
      },
      {
        day: 4,
        title: 'Old Goa Churches & Return',
        activities: [
          'Visit UNESCO Basilica of Bom Jesus and Se Cathedral',
          'Bebinca and cashew souvenir pickups before airport drop-off',
        ],
      },
    ],
  },
];

const aiFaqs = [
  {
    question: 'How does the TripTally AI Itinerary Generator work?',
    answer:
      'TripTally leverages the Google Gemini 2.5 Flash API trained on travel planning workflows. You supply your destination, dates, budget in Indian Rupees (₹), group composition, and travel pace. The AI returns a structured day-by-day itinerary complete with timings, locations, estimated activity costs, and transit tips.',
  },
  {
    question: 'Can I customize the generated AI travel plan?',
    answer:
      'Yes! Unlike static PDF guides, every AI-generated plan in TripTally can be converted into an editable collaborative trip board with one click. You can reorder days, swap activities, adjust costs, and invite friends to vote on changes.',
  },
  {
    question: 'Does the AI calculate realistic budgets in Indian Rupees (₹)?',
    answer:
      'Yes. The generator specifically understands domestic Indian travel costs (cabs, homestays, meals, monument tickets, Volvo bus fares) and calculates budgets in INR according to your group size.',
  },
  {
    question: 'Is the AI Itinerary Generator completely free to use?',
    answer:
      'Yes. TripTally provides free access to AI itinerary generation for solo travellers and groups planning trips across India and international destinations.',
  },
];

export default function AiItineraryGeneratorPage() {
  const [selectedSample, setSelectedSample] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'AI Itinerary Generator', url: '/ai-itinerary-generator' },
  ];

  return (
    <div className="min-h-screen bg-ivory-50 text-charcoal-900 selection:bg-forest-100 selection:text-forest-900">
      <SEO
        title={PAGE_SEO.aiItineraryGenerator.title}
        description={PAGE_SEO.aiItineraryGenerator.description}
        canonical={PAGE_SEO.aiItineraryGenerator.canonical}
        keywords={PAGE_SEO.aiItineraryGenerator.keywords}
        breadcrumbs={breadcrumbs}
        schema={[getSoftwareApplicationSchema(), getFAQSchema(aiFaqs)]}
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
                AI Itinerary Generator
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-forest-800 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
              <span>Google Gemini AI Assistant</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-900 leading-tight mb-4">
              AI Itinerary Generator – Free Personalised Travel Plans in Seconds
            </h1>

            <p className="text-base sm:text-lg text-charcoal-600 leading-relaxed mb-8">
              Stop spending hours scouring fragmented blogs and generic travel lists. Tell TripTally where you want to go and your budget in INR, and get a tailored day-by-day itinerary ready to share with friends.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  trackEvent(AnalyticsEvents.AI_PLANNER_CLICK, { source: 'ai_landing_hero' });
                  navigate(isAuthenticated ? '/ai-trip-planner' : '/register');
                }}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Generate Free AI Itinerary
              </Button>
              <Link
                to="/destinations"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-ivory-300 bg-white hover:bg-ivory-100 text-charcoal-800 text-sm font-medium transition-colors"
              >
                <Compass className="w-4 h-4 text-forest-600" />
                <span>Explore Curated Destinations</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* How the AI Engine Works */}
      <section className="py-16 bg-white border-b border-ivory-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-serif text-3xl font-bold text-charcoal-900 mb-3">
              How TripTally Crafts Your Itinerary
            </h2>
            <p className="text-sm text-charcoal-600">
              Four simple inputs convert into a cohesive, realistic travel schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-ivory-50 border border-ivory-200">
              <span className="font-mono text-xs font-bold text-terracotta-600 block mb-2">01. DESTINATION</span>
              <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-2">Pick Any City or Circuit</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Choose domestic circuits like Manali, Goa, Kerala, Ladakh, or international spots.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-ivory-50 border border-ivory-200">
              <span className="font-mono text-xs font-bold text-terracotta-600 block mb-2">02. DURATION & DATES</span>
              <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-2">Set Your Travel Window</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                From a quick 2-day weekend break to an in-depth 7-day road trip.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-ivory-50 border border-ivory-200">
              <span className="font-mono text-xs font-bold text-terracotta-600 block mb-2">03. BUDGET IN RUPEES</span>
              <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-2">Tailored to Your Wallet</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Specify total or per-person budget in INR (₹) to guide stay and dining suggestions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-ivory-50 border border-ivory-200">
              <span className="font-mono text-xs font-bold text-terracotta-600 block mb-2">04. GROUP COMPANIONS</span>
              <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-2">Solo, Friends or Family</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Paces and activities adapt for college friend circles, couples, or multi-generation families.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Sample Itinerary Viewer */}
      <section className="py-16 bg-ivory-50 border-b border-ivory-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-forest-700 block mb-1">
              Sample AI Outputs
            </span>
            <h2 className="font-serif text-3xl font-bold text-charcoal-900 mb-2">
              Preview What TripTally AI Generates
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600">
              Click a destination tab to view real sample itineraries generated by our AI engine.
            </p>
          </div>

          {/* Sample Switcher Tabs */}
          <div className="flex justify-center gap-3 mb-8">
            {sampleItineraries.map((s, idx) => (
              <button
                key={s.destination}
                onClick={() => setSelectedSample(idx)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedSample === idx
                    ? 'bg-forest-800 text-ivory-50 shadow-soft'
                    : 'bg-white text-charcoal-700 border border-ivory-200 hover:bg-ivory-100'
                }`}
              >
                {s.destination}
              </button>
            ))}
          </div>

          {/* Sample Card */}
          <div className="bg-white rounded-3xl border border-ivory-200/90 p-6 sm:p-8 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-ivory-200">
              <div>
                <h3 className="font-serif text-2xl font-bold text-charcoal-900 mb-1">
                  {sampleItineraries[selectedSample].destination}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal-600">
                  <span className="flex items-center gap-1 font-mono font-bold text-forest-700">
                    <Calendar className="w-3.5 h-3.5" />
                    {sampleItineraries[selectedSample].duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-charcoal-500" />
                    {sampleItineraries[selectedSample].travelers}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-charcoal-900">
                    <IndianRupee className="w-3.5 h-3.5 text-forest-700" />
                    Estimated Budget: {formatINR(sampleItineraries[selectedSample].budget)}
                  </span>
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate(isAuthenticated ? '/ai-trip-planner' : '/register')}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Customize in Planner
              </Button>
            </div>

            {/* Days Breakdown */}
            <div className="space-y-6">
              {sampleItineraries[selectedSample].days.map((day) => (
                <div key={day.day} className="p-4 sm:p-5 rounded-2xl bg-ivory-50/70 border border-ivory-200/80">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-forest-100 text-forest-800 font-mono text-[11px] font-bold">
                      Day {day.day}
                    </span>
                    <h4 className="font-serif text-base font-bold text-charcoal-900">
                      {day.title}
                    </h4>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-charcoal-700">
                    {day.activities.map((act) => (
                      <li key={act} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white border-b border-ivory-200/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 mb-2">
              AI Itinerary Generator FAQs
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600">
              Clear answers about generating and editing AI travel plans.
            </p>
          </div>

          <div className="space-y-3">
            {aiFaqs.map((faq, idx) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-ivory-200/90 overflow-hidden bg-ivory-50/50"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-serif text-sm font-bold text-charcoal-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-forest-700 shrink-0 transition-transform ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 pt-1 text-xs text-charcoal-600 leading-relaxed border-t border-ivory-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-forest-900 text-ivory-50 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold mb-3">
            Generate Your Dream Travel Plan Now
          </h2>
          <p className="text-sm text-forest-200 mb-6">
            Get an instant custom itinerary for your upcoming holiday. 100% free with no credit card required.
          </p>
          <Button
            variant="accent"
            size="lg"
            onClick={() => navigate(isAuthenticated ? '/ai-trip-planner' : '/register')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Start Free AI Plan
          </Button>
        </div>
      </section>
    </div>
  );
}

