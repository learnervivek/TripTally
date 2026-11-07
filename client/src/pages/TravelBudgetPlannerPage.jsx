import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PieChart,
  IndianRupee,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Users,
  Compass,
  Sliders,
  Bell,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import { PAGE_SEO, getFAQSchema, getSoftwareApplicationSchema } from '../data/seoData';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { formatINR } from '../utils/currency';

const destinationRates = {
  manali: { name: 'Manali & Solang Valley (Himachal)', basePerDay: 2000, stayPct: 40, travelPct: 30, foodPct: 20, actPct: 10 },
  goa: { name: 'Goa Coastal Circuit', basePerDay: 2200, stayPct: 42, travelPct: 20, foodPct: 28, actPct: 10 },
  kerala: { name: 'Kerala Backwaters & Munnar', basePerDay: 2500, stayPct: 35, travelPct: 25, foodPct: 25, actPct: 15 },
  kashmir: { name: 'Kashmir & Gulmarg Valley', basePerDay: 2800, stayPct: 38, travelPct: 28, foodPct: 20, actPct: 14 },
  jaipur: { name: 'Jaipur & Udaipur (Rajasthan)', basePerDay: 2000, stayPct: 44, travelPct: 28, foodPct: 18, actPct: 10 },
  rishikesh: { name: 'Rishikesh & Haridwar', basePerDay: 1600, stayPct: 44, travelPct: 25, foodPct: 16, actPct: 15 },
};

const budgetFaqs = [
  {
    question: 'How does the TripTally Travel Cost Calculator estimate expenses?',
    answer:
      'Our calculator combines real-world domestic benchmarks across popular Indian circuits for accommodation (homestays, hotels, resorts), local transit (cab hires, Volvo buses, rentals), food and dining, and activities (rafting, entry tickets, snow gear). The estimate adapts dynamically to group size, duration, and chosen travel style.',
  },
  {
    question: 'Can I set budget alerts for individual categories like food or stays?',
    answer:
      'Yes. In your TripTally trip board, you can assign target budget amounts to Lodging, Transport, Food, and Activities. You can enable alert thresholds (e.g. at 85% of budget) to notify you before an overrun occurs.',
  },
  {
    question: 'Does travel in larger groups lower per-person costs in India?',
    answer:
      'Significantly! Major expenses such as private cabs (Innova, Tempo Traveller), villa rentals, and private houseboats are divided across 4 to 8 travellers, reducing the per-person cost by 35% to 50% compared to solo or couple travel.',
  },
];

export default function TravelBudgetPlannerPage() {
  const [selectedDest, setSelectedDest] = useState('manali');
  const [travelers, setTravelers] = useState(4);
  const [days, setDays] = useState(5);
  const [styleMultiplier, setStyleMultiplier] = useState(1); // 0.75 budget, 1 moderate, 1.6 premium
  const [openFaq, setOpenFaq] = useState(0);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Dynamic Calculation
  const destInfo = destinationRates[selectedDest];
  const calculatedTotal = Math.round(destInfo.basePerDay * days * travelers * styleMultiplier);
  const perPerson = Math.round(calculatedTotal / travelers);

  const stayAmount = Math.round((calculatedTotal * destInfo.stayPct) / 100);
  const travelAmount = Math.round((calculatedTotal * destInfo.travelPct) / 100);
  const foodAmount = Math.round((calculatedTotal * destInfo.foodPct) / 100);
  const actAmount = calculatedTotal - stayAmount - travelAmount - foodAmount;

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Travel Budget Planner', url: '/travel-budget-planner' },
  ];

  return (
    <div className="min-h-screen bg-ivory-50 text-charcoal-900 selection:bg-forest-100 selection:text-forest-900">
      <SEO
        title={PAGE_SEO.travelBudgetPlanner.title}
        description={PAGE_SEO.travelBudgetPlanner.description}
        canonical={PAGE_SEO.travelBudgetPlanner.canonical}
        keywords={PAGE_SEO.travelBudgetPlanner.keywords}
        breadcrumbs={breadcrumbs}
        schema={[getSoftwareApplicationSchema(), getFAQSchema(budgetFaqs)]}
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
                Travel Budget Planner
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-forest-800 text-xs font-semibold mb-4">
              <PieChart className="w-3.5 h-3.5 text-forest-700" />
              <span>Real-Time Group Cost Estimator</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-900 leading-tight mb-4">
              Travel Budget Planner &amp; Trip Cost Calculator for India
            </h1>

            <p className="text-base sm:text-lg text-charcoal-600 leading-relaxed mb-8">
              Estimate realistic group trip expenses across premier Indian destinations. Adjust companions, duration, and style to calculate category allocations for lodging, transit, food, and activities.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate(isAuthenticated ? '/trips' : '/register')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Track Live Trip Budget
              </Button>
              <Link
                to="/destinations"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-ivory-300 bg-white hover:bg-ivory-100 text-charcoal-800 text-sm font-medium transition-colors"
              >
                <Compass className="w-4 h-4 text-forest-600" />
                <span>Explore Destination Guides</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Travel Cost Calculator Widget */}
      <section className="py-16 bg-white border-b border-ivory-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-terracotta-600 block mb-1">
              Interactive Estimator
            </span>
            <h2 className="font-serif text-3xl font-bold text-charcoal-900 mb-2">
              Indian Trip Cost Calculator
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600">
              Select destination and adjust sliders to calculate your realistic budget in INR.
            </p>
          </div>

          <div className="bg-ivory-50 rounded-3xl border border-ivory-200 p-6 sm:p-10 shadow-soft">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Controls Column */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Destination Dropdown */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-2">
                    Select Destination Circuit
                  </label>
                  <select
                    value={selectedDest}
                    onChange={(e) => setSelectedDest(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-ivory-300 bg-white text-sm font-medium text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-600"
                  >
                    {Object.entries(destinationRates).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Travelers Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-charcoal-700 mb-2">
                    <span>Number of Travellers:</span>
                    <span className="text-sm text-forest-700 font-mono">{travelers} {travelers === 1 ? 'Person' : 'People'}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    className="w-full accent-forest-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-charcoal-400 mt-1">
                    <span>Solo (1)</span>
                    <span>Small Group (4)</span>
                    <span>Large Group (8)</span>
                  </div>
                </div>

                {/* Days Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-charcoal-700 mb-2">
                    <span>Trip Duration:</span>
                    <span className="text-sm text-forest-700 font-mono">{days} Days</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="w-full accent-forest-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-charcoal-400 mt-1">
                    <span>Weekend (2d)</span>
                    <span>Standard (5d)</span>
                    <span>Extended (10d)</span>
                  </div>
                </div>

                {/* Travel Style Buttons */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-2">
                    Travel Pace &amp; Comfort
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Backpacker', mult: 0.75 },
                      { label: 'Comfortable', mult: 1.0 },
                      { label: 'Luxury Villa', mult: 1.6 },
                    ].map((s) => (
                      <button
                        key={s.label}
                        type="button"
                        onClick={() => setStyleMultiplier(s.mult)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                          styleMultiplier === s.mult
                            ? 'bg-forest-800 text-ivory-50 border-forest-800'
                            : 'bg-white text-charcoal-700 border-ivory-300 hover:bg-ivory-100'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Output Results Column */}
              <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border-2 border-forest-600/30 shadow-soft">
                
                <span className="text-[11px] font-mono uppercase tracking-wider text-charcoal-400 block mb-1">
                  Estimated Total Group Budget
                </span>
                <div className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-900 mb-1">
                  {formatINR(calculatedTotal)}
                </div>
                <div className="text-xs text-forest-700 font-semibold mb-6">
                  ~ {formatINR(perPerson)} per person ({travelers} travellers)
                </div>

                {/* Category Allocations */}
                <div className="space-y-3 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500 block mb-2">
                    Category Breakdown:
                  </span>

                  <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-ivory-50 border border-ivory-200">
                    <span className="font-medium text-charcoal-800">🏨 Lodging &amp; Stays</span>
                    <strong className="font-mono text-charcoal-900">{formatINR(stayAmount)}</strong>
                  </div>

                  <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-ivory-50 border border-ivory-200">
                    <span className="font-medium text-charcoal-800">🚗 Transit &amp; Cabs</span>
                    <strong className="font-mono text-charcoal-900">{formatINR(travelAmount)}</strong>
                  </div>

                  <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-ivory-50 border border-ivory-200">
                    <span className="font-medium text-charcoal-800">🍽️ Food &amp; Dining</span>
                    <strong className="font-mono text-charcoal-900">{formatINR(foodAmount)}</strong>
                  </div>

                  <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-ivory-50 border border-ivory-200">
                    <span className="font-medium text-charcoal-800">🎟️ Sightseeing &amp; Activities</span>
                    <strong className="font-mono text-charcoal-900">{formatINR(actAmount)}</strong>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate(isAuthenticated ? '/trips' : '/register')}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="w-full"
                >
                  Create Trip with this Budget
                </Button>

                <p className="text-[10px] text-charcoal-400 text-center mt-3">
                  * Estimates based on domestic seasonal averages. Subject to peak travel periods and advance booking.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white border-b border-ivory-200/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 mb-2">
              Budget Planning FAQs
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600">
              Tips for managing group funds, setting alert thresholds, and saving in India.
            </p>
          </div>

          <div className="space-y-3">
            {budgetFaqs.map((faq, idx) => (
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

      {/* CTA */}
      <section className="py-16 bg-forest-900 text-ivory-50 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold mb-3">
            Track Every Rupee with Total Clarity
          </h2>
          <p className="text-sm text-forest-200 mb-6">
            Stay on budget and eliminate money arguments on your next holiday.
          </p>
          <Button
            variant="accent"
            size="lg"
            onClick={() => navigate(isAuthenticated ? '/trips' : '/register')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Start Budget Planner
          </Button>
        </div>
      </section>
    </div>
  );
}

