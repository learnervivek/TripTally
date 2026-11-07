import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  Users,
  IndianRupee,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  HeartHandshake,
  CheckCircle2,
  Code2,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import { PAGE_SEO, getOrganizationSchema } from '../data/seoData';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

export default function AboutPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ];

  return (
    <div className="min-h-screen bg-ivory-50 text-charcoal-900 selection:bg-forest-100 selection:text-forest-900">
      <SEO
        title={PAGE_SEO.about.title}
        description={PAGE_SEO.about.description}
        canonical={PAGE_SEO.about.canonical}
        keywords={PAGE_SEO.about.keywords}
        breadcrumbs={breadcrumbs}
        schema={getOrganizationSchema()}
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
                About TripTally
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-forest-800 text-xs font-semibold mb-4">
              <Compass className="w-3.5 h-3.5 text-terracotta-500" />
              <span>Our Mission &amp; Story</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-900 leading-tight mb-4">
              About TripTally – Smarter Group Travel Planning for India
            </h1>

            <p className="text-base sm:text-lg text-charcoal-600 leading-relaxed mb-8">
              We started TripTally to eliminate the friction that ruins group trips. From chaotic WhatsApp threads to post-holiday money disputes, we believe planning an adventure with friends should be as thrilling as the journey itself.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate(isAuthenticated ? '/trips' : '/register')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Start Free Trip Board
              </Button>
              <Link
                to="/features"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-ivory-300 bg-white hover:bg-ivory-100 text-charcoal-800 text-sm font-medium transition-colors"
              >
                <span>Explore Platform Features</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="py-16 bg-white border-b border-ivory-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-forest-700 block mb-2">
                Why We Built TripTally
              </span>
              <h2 className="font-serif text-3xl font-bold text-charcoal-900 mb-4 leading-snug">
                Built Specifically for How Indian Friends &amp; Families Travel
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed mb-4">
                Most international travel apps are built around dollar payments, solo flights, and rigid corporate agendas. But Indian travellers travel in vibrant groups—hiring Tempo Travellers for Himachal road trips, splitting villas in Goa, sharing Shikara rides in Srinagar, and booking houseboats in Alleppey.
              </p>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed mb-6">
                When one person pays for petrol, another books the Airbnb, and someone else covers dinner, spreadsheets fail. TripTally brings Indian Rupee (₹) handling, UPI payment verification, and mathematical debt minimization directly into your shared trip itinerary.
              </p>
              <div className="space-y-2 text-xs sm:text-sm text-charcoal-700 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-600" />
                  <span>100% Free with zero paywalls or subscriptions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-600" />
                  <span>Natively designed for Indian Rupees (₹) and UPI apps</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-600" />
                  <span>Powered by Google Gemini 2.5 Flash AI</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-ivory-100/70 border border-ivory-200 space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-1">
                  1. Collaborative First
                </h3>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  No single member should carry the burden of planning or calculating expenses alone. Everyone gets a voice.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-1">
                  2. Honest Financial Transparency
                </h3>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  Every bill, split share, and transfer is openly visible with receipts so group trust is preserved forever.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-1">
                  3. Privacy &amp; Data Security
                </h3>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  Private trips are protected by robust authorization. We never index user trip details or sell personal data.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Engineering & Technology */}
      <section className="py-16 bg-ivory-50 border-b border-ivory-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl font-bold text-charcoal-900 mb-3">
              Modern Full-Stack Architecture
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600">
              Built using enterprise-grade MERN stack principles for blazing performance and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-ivory-200 shadow-soft">
              <span className="font-mono text-xs font-bold text-forest-700 block mb-1">FRONTEND</span>
              <h3 className="font-serif text-base font-bold text-charcoal-900 mb-2">React 18 &amp; Vite</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Fast client-side hydration, route-based code splitting, Tailwind CSS styling, and Framer Motion micro-interactions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-ivory-200 shadow-soft">
              <span className="font-mono text-xs font-bold text-forest-700 block mb-1">BACKEND</span>
              <h3 className="font-serif text-base font-bold text-charcoal-900 mb-2">Node.js &amp; Express</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Stateless JWT authentication with secure HTTP-only cookies, robust rate-limiting, and structured JSON logging.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-ivory-200 shadow-soft">
              <span className="font-mono text-xs font-bold text-forest-700 block mb-1">DATABASE</span>
              <h3 className="font-serif text-base font-bold text-charcoal-900 mb-2">MongoDB &amp; Mongoose</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Indexed schemas, lean queries, atomic updates, and role-based access control for trip workspaces.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-ivory-200 shadow-soft">
              <span className="font-mono text-xs font-bold text-forest-700 block mb-1">AI ENGINE</span>
              <h3 className="font-serif text-base font-bold text-charcoal-900 mb-2">Google Gemini 2.5</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Low-latency, high-accuracy structured JSON itinerary generation tailored to destination constraints and budget.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest-900 text-ivory-50 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold mb-3">
            Join Thousands of Travellers Planning Smarter
          </h2>
          <p className="text-sm text-forest-200 mb-6">
            Get started today. Create your first group trip board in under two minutes.
          </p>
          <Button
            variant="accent"
            size="lg"
            onClick={() => navigate(isAuthenticated ? '/trips' : '/register')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Create Free Account
          </Button>
        </div>
      </section>
    </div>
  );
}

