import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Plane
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import DotGlobe from '../components/ui/DotGlobe';
import api from '../lib/api';

export function HomePage() {
  const [apiStatus, setApiStatus] = useState({ loading: true, status: 'checking', message: '' });

  // Test backend connectivity
  useEffect(() => {
    api.get('/health')
      .then((res) => {
        setApiStatus({
          loading: false,
          status: 'online',
          message: res.data.message || 'Backend API connected',
          db: res.data.database,
        });
      })
      .catch((err) => {
        setApiStatus({
          loading: false,
          status: 'offline',
          message: 'Backend server starting or offline',
        });
      });
  }, []);

  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-50 border border-forest-200/80 text-forest-800 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-terracotta-500 animate-pulse" />
                <span>Next-Gen Travel Planning & Tallying</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-charcoal-900 tracking-tight leading-[1.1] font-display">
                Plan memorable journeys. <br />
                <span className="text-forest-600 underline decoration-terracotta-400 decoration-wavy decoration-2">
                  Tally expenses
                </span> together.
              </h1>

              <p className="text-base sm:text-lg text-charcoal-600 max-w-xl leading-relaxed">
                TripTally brings friends together to organize multi-day itineraries, track shared expenses in real-time, and eliminate awkward post-vacation money math.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/design-system">
                  <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    Explore Design System
                  </Button>
                </Link>
                <a href="#featured-trips">
                  <Button variant="secondary" size="lg">
                    Preview Sample Trips
                  </Button>
                </a>
              </div>

              {/* Status Indicator Bar */}
              <div className="pt-6 border-t border-ivory-300/80 flex flex-wrap items-center gap-6 text-xs text-charcoal-500">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      apiStatus.status === 'online' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  />
                  <span>
                    API Status: <strong className="text-charcoal-800 capitalize">{apiStatus.status}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-forest-600" />
                  <span>MERN Stack Architecture</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-forest-600" />
                  <span>Secure JWT & Cookies</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Globe Visualizer */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative p-6 rounded-3xl bg-white/70 border border-ivory-300 shadow-soft-xl backdrop-blur-md flex flex-col items-center">
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <Badge variant="forest" size="sm" withDot>Interactive 3D Coordinates</Badge>
                </div>
                <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
                  <Badge variant="terracotta" size="sm">Drag to Rotate</Badge>
                </div>
                <DotGlobe size={340} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="forest" size="sm">Smart Group Logistics</Badge>
          <h2 className="text-3xl font-bold text-charcoal-900 mt-2 font-display">
            Designed for frictionless friend trips
          </h2>
          <p className="text-sm text-charcoal-500 mt-2">
            No spreadsheets. No forgotten dinner bills. Just seamless collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-soft space-y-4 hover:shadow-soft-lg transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-600">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-charcoal-900 font-display">
              Collaborative Itinerary
            </h3>
            <p className="text-sm text-charcoal-500 leading-relaxed">
              Vote on stays, map activities day-by-day, and pin locations so everyone always knows the next adventure stop.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-soft space-y-4 hover:shadow-soft-lg transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-terracotta-50 border border-terracotta-100 flex items-center justify-center text-terracotta-600">
              <Split className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-charcoal-900 font-display">
              Smart Debt Simplification
            </h3>
            <p className="text-sm text-charcoal-500 leading-relaxed">
              Our graph settlement algorithm minimizes round-robin payments. Pay one person instead of five.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-ivory-300 p-8 shadow-soft space-y-4 hover:shadow-soft-lg transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-600">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-charcoal-900 font-display">
              Group Roles & Invites
            </h3>
            <p className="text-sm text-charcoal-500 leading-relaxed">
              Share a secure link to invite friends. Set trip organizers, view real-time changes, and store offline backups.
            </p>
          </div>
        </div>
      </section>

      {/* Sample Trips Preview */}
      <section id="featured-trips" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="terracotta" size="sm">Sample Itineraries</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-charcoal-900 mt-2 font-display">
              Curated Trips Ready for Planning
            </h2>
          </div>
          <Link to="/design-system" className="text-sm font-semibold text-forest-700 hover:text-forest-800 flex items-center gap-1">
            See Design System <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Trip 1 */}
          <Card variant="interactive">
            <div className="h-44 bg-forest-800 relative p-4 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#2D6A4F_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
              <div className="flex justify-between items-start relative z-10">
                <Badge variant="forest" size="sm">Italy</Badge>
                <span className="text-xs font-bold text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  $3,420
                </span>
              </div>
              <div className="relative z-10">
                <h4 className="text-lg font-bold text-white font-display">Amalfi Coast Roadtrip</h4>
                <p className="text-xs text-forest-200">Rome → Positano → Capri</p>
              </div>
            </div>
            <CardContent className="pt-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-charcoal-500">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> 8 Days</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> 5 Friends</span>
              </div>
              <p className="text-xs text-charcoal-600 line-clamp-2">
                Shared cliffside villa, private boat hire to Capri, and vintage convertible rental split evenly.
              </p>
            </CardContent>
            <CardFooter>
              <Badge variant="success" size="sm" withDot>Tallies Settled</Badge>
              <Button variant="ghost" size="sm">Open Board</Button>
            </CardFooter>
          </Card>

          {/* Trip 2 */}
          <Card variant="interactive">
            <div className="h-44 bg-charcoal-900 relative p-4 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#E07A5F_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
              <div className="flex justify-between items-start relative z-10">
                <Badge variant="terracotta" size="sm">Japan</Badge>
                <span className="text-xs font-bold text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  $4,890
                </span>
              </div>
              <div className="relative z-10">
                <h4 className="text-lg font-bold text-white font-display">Kyoto & Tokyo Neon Trail</h4>
                <p className="text-xs text-terracotta-200">Shinjuku → Gion → Hakone</p>
              </div>
            </div>
            <CardContent className="pt-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-charcoal-500">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> 11 Days</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> 4 Friends</span>
              </div>
              <p className="text-xs text-charcoal-600 line-clamp-2">
                Onsen ryokan reservations, Shinkansen bullet train passes, and group tasting menus.
              </p>
            </CardContent>
            <CardFooter>
              <Badge variant="warning" size="sm" withDot>1 Balance Pending</Badge>
              <Button variant="ghost" size="sm">Open Board</Button>
            </CardFooter>
          </Card>

          {/* Trip 3 */}
          <Card variant="interactive">
            <div className="h-44 bg-forest-900 relative p-4 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#D8F3DC_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
              <div className="flex justify-between items-start relative z-10">
                <Badge variant="forest" size="sm">Switzerland</Badge>
                <span className="text-xs font-bold text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  $2,910
                </span>
              </div>
              <div className="relative z-10">
                <h4 className="text-lg font-bold text-white font-display">Swiss Alps Hut-to-Hut</h4>
                <p className="text-xs text-forest-200">Grindelwald → Zermatt</p>
              </div>
            </div>
            <CardContent className="pt-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-charcoal-500">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> 6 Days</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> 6 Friends</span>
              </div>
              <p className="text-xs text-charcoal-600 line-clamp-2">
                Mountain cable cars, fondue dinners, mountain hut lodging, and gear rentals.
              </p>
            </CardContent>
            <CardFooter>
              <Badge variant="forest" size="sm" withDot>Active Planning</Badge>
              <Button variant="ghost" size="sm">Open Board</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

    </div>
  );
}

export default HomePage;
