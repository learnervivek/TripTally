import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  IndianRupee,
  Users,
  Clock,
  CheckCircle2,
  ArrowRight,
  Luggage,
  Sparkles,
  ChevronDown,
  Navigation,
  Share2,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import { DESTINATIONS } from '../data/destinationsData';
import { getFAQSchema, SITE_CONFIG } from '../data/seoData';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { formatINR } from '../utils/currency';
import { useAuth } from '../context/AuthContext';

export default function DestinationDetailPage() {
  const { slug } = useParams();
  const [openFaq, setOpenFaq] = useState(0);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const destination = DESTINATIONS.find((d) => d.slug === slug);

  if (!destination) {
    return (
      <div className="min-h-screen bg-ivory-50 flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-900 mb-3">
            Destination Guide Not Found
          </h1>
          <p className="text-sm text-charcoal-600 mb-6">
            We couldn’t find the destination guide you were looking for.
          </p>
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-800 text-ivory-50 text-sm font-semibold"
          >
            Explore All India Destinations
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Destinations', url: '/destinations' },
    { name: destination.name, url: `/destinations/${destination.slug}` },
  ];

  // Schema.org TouristDestination & Trip structured data
  const touristDestinationSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: destination.name,
    description: destination.overview,
    image: destination.heroImage,
    touristType: ['Groups', 'Friends', 'Adventure Travel'],
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: destination.state,
      addressCountry: 'IN',
    },
    itinerary: {
      '@type': 'Trip',
      name: `${destination.name} Group Itinerary`,
      description: destination.metaDescription,
      numberOfDays: destination.itineraryDays.length,
      offers: {
        '@type': 'Offer',
        price: destination.estBudget.toString(),
        priceCurrency: 'INR',
      },
    },
  };

  const schemas = [
    touristDestinationSchema,
    getFAQSchema(destination.faqs || []),
  ];

  return (
    <div className="min-h-screen bg-ivory-50 text-charcoal-900 selection:bg-forest-100 selection:text-forest-900">
      <SEO
        title={destination.metaTitle}
        description={destination.metaDescription}
        canonical={`/destinations/${destination.slug}`}
        ogImage={destination.heroImage}
        keywords={destination.keywords}
        breadcrumbs={breadcrumbs}
        schema={schemas}
      />

      {/* Hero Section */}
      <section className="relative pt-8 pb-14 lg:pt-12 lg:pb-16 border-b border-ivory-200/80 bg-white">
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
              <li>
                <Link to="/destinations" className="hover:text-forest-700 transition-colors">
                  Destinations
                </Link>
              </li>
              <li>/</li>
              <li className="font-semibold text-charcoal-800" aria-current="page">
                {destination.name}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="forest">{destination.badge}</Badge>
                <span className="text-xs uppercase font-semibold text-terracotta-600 tracking-wider">
                  {destination.state}, India
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-900 leading-tight mb-4">
                {destination.name} {destination.idealDuration} Plan &amp; Budget Guide
              </h1>

              <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed mb-6">
                {destination.overview}
              </p>

              {/* Fast Fact Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-ivory-50 border border-ivory-200 mb-6 text-xs">
                <div>
                  <span className="text-charcoal-500 block mb-0.5">Ideal Duration:</span>
                  <strong className="text-charcoal-900 font-mono">{destination.idealDuration}</strong>
                </div>
                <div>
                  <span className="text-charcoal-500 block mb-0.5">Group Budget:</span>
                  <strong className="text-forest-800 font-mono text-sm">{formatINR(destination.estBudget)}</strong>
                </div>
                <div>
                  <span className="text-charcoal-500 block mb-0.5">Est. / Person:</span>
                  <strong className="text-forest-800 font-mono">{formatINR(destination.perPersonCost)}</strong>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate(isAuthenticated ? '/trips' : '/register')}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Create Trip for {destination.name.split('&')[0]}
                </Button>
                <Link
                  to="/ai-itinerary-generator"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-ivory-300 bg-white hover:bg-ivory-100 text-charcoal-800 text-xs sm:text-sm font-medium transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-forest-600" />
                  <span>Customize with Gemini AI</span>
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden shadow-soft-xl border border-ivory-200 relative h-72 sm:h-96">
                <img
                  src={destination.heroImage}
                  alt={destination.heroAlt}
                  width="1200"
                  height="800"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                  <span className="flex items-center gap-1 font-medium text-ivory-100">
                    <MapPin className="w-3.5 h-3.5 text-terracotta-400" />
                    Route: {destination.route}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Area: Itinerary Timeline & Budget Breakdown */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left 8 Cols: Day-by-Day Itinerary Schedule */}
            <div className="lg:col-span-8 space-y-8">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 mb-2">
                  Day-by-Day Itinerary Schedule
                </h2>
                <p className="text-xs sm:text-sm text-charcoal-600">
                  Curated timing and sequence designed to maximize sightseeing without exhaustion.
                </p>
              </div>

              <div className="space-y-6">
                {destination.itineraryDays.map((day) => (
                  <div
                    key={day.day}
                    className="p-6 rounded-3xl bg-white border border-ivory-200/90 shadow-soft"
                  >
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-ivory-200">
                      <span className="px-3 py-1 rounded-full bg-forest-800 text-ivory-50 font-mono text-xs font-bold">
                        Day {day.day}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-charcoal-900">
                        {day.title}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {day.schedule.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-xl bg-ivory-50/70 border border-ivory-200/60 text-xs sm:text-sm"
                        >
                          <span className="font-mono font-bold text-terracotta-600 whitespace-nowrap shrink-0 mt-0.5">
                            {item.time}
                          </span>
                          <span className="text-charcoal-700 leading-relaxed">
                            {item.activity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Packing Essentials */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-ivory-200/90 shadow-soft">
                <div className="flex items-center gap-2 mb-4">
                  <Luggage className="w-5 h-5 text-forest-700" />
                  <h3 className="font-serif text-xl font-bold text-charcoal-900">
                    Packing Essentials for {destination.name.split('&')[0]}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-charcoal-700">
                  {destination.packingEssentials.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Budget Breakdown & CTA */}
            <div className="lg:col-span-4 space-y-6 sticky top-24">
              
              {/* Budget Breakdown Card */}
              <div className="bg-white p-6 rounded-3xl border border-ivory-200/90 shadow-soft">
                <div className="flex items-center gap-2 mb-4">
                  <IndianRupee className="w-5 h-5 text-forest-700" />
                  <h3 className="font-serif text-lg font-bold text-charcoal-900">
                    Estimated Budget Breakdown
                  </h3>
                </div>

                <div className="space-y-3 mb-6">
                  {destination.budgetBreakdown.map((b) => (
                    <div key={b.category} className="p-3 rounded-xl bg-ivory-50 border border-ivory-200 text-xs">
                      <div className="flex justify-between font-medium text-charcoal-800 mb-1">
                        <span>{b.category}</span>
                        <strong className="font-mono text-charcoal-900">{formatINR(b.amount)}</strong>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-ivory-200 overflow-hidden">
                        <div
                          className="h-full bg-forest-600 rounded-full"
                          style={{ width: `${b.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-forest-50 border border-forest-200 text-xs mb-6">
                  <div className="flex justify-between font-bold text-forest-900 mb-1">
                    <span>Total Group Estimate:</span>
                    <span className="font-mono text-sm">{formatINR(destination.estBudget)}</span>
                  </div>
                  <span className="text-forest-700 text-[11px] block">
                    Based on {destination.recommendedTravelers}
                  </span>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate(isAuthenticated ? '/trips' : '/register')}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="w-full shadow-soft"
                >
                  Start This Trip Board
                </Button>

                <div className="mt-4 pt-4 border-t border-ivory-200 text-center">
                  <Link
                    to="/travel-expense-splitter"
                    className="text-xs font-semibold text-forest-700 hover:text-forest-900"
                  >
                    How to split this budget with friends →
                  </Link>
                </div>
              </div>

              {/* Best Season Card */}
              <div className="bg-ivory-100/70 p-5 rounded-2xl border border-ivory-200 text-xs text-charcoal-700">
                <span className="font-bold text-charcoal-900 block mb-1">🌤️ Best Time to Visit:</span>
                <p className="leading-relaxed">{destination.bestTimeToVisit}</p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Destination FAQs */}
      {destination.faqs && destination.faqs.length > 0 && (
        <section className="py-16 bg-white border-t border-ivory-200/80">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 mb-2">
                {destination.name} Trip FAQs
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-600">
                Frequently asked questions for travellers planning this circuit.
              </p>
            </div>

            <div className="space-y-3">
              {destination.faqs.map((faq, idx) => (
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
      )}

      {/* CTA */}
      <section className="py-16 bg-forest-900 text-ivory-50 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold mb-3">
            Plan Your {destination.name.split('&')[0]} Adventure
          </h2>
          <p className="text-sm text-forest-200 mb-6">
            Invite friends, customize day schedules, and keep your budget in check.
          </p>
          <Button
            variant="accent"
            size="lg"
            onClick={() => navigate(isAuthenticated ? '/trips' : '/register')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Create Trip Board
          </Button>
        </div>
      </section>
    </div>
  );
}

