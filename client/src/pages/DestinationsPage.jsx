import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Users,
  IndianRupee,
  ArrowRight,
  Compass,
  Sparkles,
  Filter,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import { PAGE_SEO, getWebSiteSchema } from '../data/seoData';
import { DESTINATIONS } from '../data/destinationsData';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { formatINR } from '../utils/currency';
import { useAuth } from '../context/AuthContext';

export default function DestinationsPage() {
  const [filterState, setFilterState] = useState('all');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Destinations', url: '/destinations' },
  ];

  const filteredDestinations =
    filterState === 'all'
      ? DESTINATIONS
      : DESTINATIONS.filter((d) =>
          d.badge.toLowerCase().includes(filterState.toLowerCase())
        );

  return (
    <div className="min-h-screen bg-ivory-50 text-charcoal-900 selection:bg-forest-100 selection:text-forest-900">
      <SEO
        title={PAGE_SEO.destinations.title}
        description={PAGE_SEO.destinations.description}
        canonical={PAGE_SEO.destinations.canonical}
        keywords={PAGE_SEO.destinations.keywords}
        breadcrumbs={breadcrumbs}
        schema={getWebSiteSchema()}
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
                Destinations
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-forest-800 text-xs font-semibold mb-4">
              <Compass className="w-3.5 h-3.5 text-terracotta-500" />
              <span>India Travel Circuit Guides</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-900 leading-tight mb-4">
              Curated India Travel Guides &amp; Day-by-Day Itineraries
            </h1>

            <p className="text-base sm:text-lg text-charcoal-600 leading-relaxed mb-8">
              Explore battle-tested domestic travel itineraries created for friend circles, families, and road trippers. Realistic budgets in Indian Rupees, daily schedules, transit timing, and authentic tips.
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All Destinations' },
                { id: 'snow', label: 'Snow & Mountains' },
                { id: 'beach', label: 'Beaches & Coastal' },
                { id: 'royal', label: 'Royal Heritage' },
                { id: 'rafting', label: 'Weekend Adventure' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterState(f.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    filterState === f.id
                      ? 'bg-forest-800 text-ivory-50 shadow-soft'
                      : 'bg-white text-charcoal-700 border border-ivory-200 hover:bg-ivory-100'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest) => (
              <article
                key={dest.slug}
                className="bg-white rounded-3xl border border-ivory-200/90 overflow-hidden shadow-soft hover:shadow-soft-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Hero Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={dest.heroImage}
                      alt={dest.heroAlt}
                      width="800"
                      height="480"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <Badge variant="forest">{dest.badge}</Badge>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-xs uppercase font-medium text-ivory-200 tracking-wider">
                        {dest.state}
                      </span>
                      <h2 className="font-serif text-xl font-bold text-white leading-tight">
                        {dest.name}
                      </h2>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed mb-4">
                      {dest.overview}
                    </p>

                    <div className="p-3.5 rounded-xl bg-ivory-50 border border-ivory-200 space-y-2 mb-6">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-charcoal-600 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-forest-600" />
                          Duration:
                        </span>
                        <strong className="text-charcoal-900 font-mono">{dest.idealDuration}</strong>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-charcoal-600 flex items-center gap-1">
                          <IndianRupee className="w-3.5 h-3.5 text-forest-600" />
                          Group Budget:
                        </span>
                        <strong className="text-forest-800 text-sm font-mono">{formatINR(dest.estBudget)}</strong>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-charcoal-500 pt-1 border-t border-ivory-200">
                        <span>Best Time: {dest.bestTimeToVisit.split('(')[0]}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="p-6 pt-0">
                  <Link
                    to={`/destinations/${dest.slug}`}
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-ivory-100/70 hover:bg-forest-800 hover:text-ivory-50 text-charcoal-900 text-xs font-bold transition-all border border-ivory-200"
                  >
                    <span>View 5-Day Plan &amp; Budget Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest-900 text-ivory-50 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold mb-3">
            Want an Itinerary for Another Destination?
          </h2>
          <p className="text-sm text-forest-200 mb-6">
            Use TripTally’s AI Planner to generate custom schedules for any destination in India or worldwide.
          </p>
          <Button
            variant="accent"
            size="lg"
            onClick={() => navigate(isAuthenticated ? '/ai-trip-planner' : '/register')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Create with Gemini AI
          </Button>
        </div>
      </section>
    </div>
  );
}

