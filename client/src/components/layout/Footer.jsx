import React from 'react';
import { Compass, Sparkles, MapPin, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-forest-950 text-forest-200 py-12 border-t border-forest-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-forest-700 flex items-center justify-center text-ivory-50 shadow-soft-sm">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-serif text-lg font-bold text-ivory-100 font-display">
                Trip<span className="text-terracotta-500">Tally</span>
              </span>
            </Link>
            <p className="text-xs text-forest-300 leading-relaxed mb-4 max-w-sm">
              The premier AI-powered collaborative workspace for Indian travellers. Plan day-by-day itineraries with Gemini AI, coordinate group adventures with friends, and split expenses transparently in Indian Rupees with UPI settlement.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-forest-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>100% Free Travel SaaS for Indian Groups</span>
            </div>
          </div>

          {/* Planning Tools */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ivory-100 mb-3">
              Planning Tools
            </h4>
            <ul className="space-y-2 text-xs text-forest-300">
              <li>
                <Link to="/ai-itinerary-generator" className="hover:text-ivory-100 transition-colors">
                  AI Itinerary Generator
                </Link>
              </li>
              <li>
                <Link to="/group-trip-planner" className="hover:text-ivory-100 transition-colors">
                  Group Trip Planner
                </Link>
              </li>
              <li>
                <Link to="/travel-expense-splitter" className="hover:text-ivory-100 transition-colors">
                  Travel Expense Splitter
                </Link>
              </li>
              <li>
                <Link to="/travel-budget-planner" className="hover:text-ivory-100 transition-colors">
                  Travel Budget Planner
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-ivory-100 transition-colors">
                  All Features &amp; Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Destination Guides */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ivory-100 mb-3">
              India Destination Guides
            </h4>
            <ul className="space-y-2 text-xs text-forest-300">
              <li>
                <Link to="/destinations/manali" className="hover:text-ivory-100 transition-colors">
                  Manali 5-Day Itinerary
                </Link>
              </li>
              <li>
                <Link to="/destinations/goa" className="hover:text-ivory-100 transition-colors">
                  Goa 4-Day Coastal Plan
                </Link>
              </li>
              <li>
                <Link to="/destinations/kerala" className="hover:text-ivory-100 transition-colors">
                  Kerala 6-Day Backwaters
                </Link>
              </li>
              <li>
                <Link to="/destinations/kashmir" className="hover:text-ivory-100 transition-colors">
                  Kashmir &amp; Gulmarg Guide
                </Link>
              </li>
              <li>
                <Link to="/destinations/jaipur" className="hover:text-ivory-100 transition-colors">
                  Jaipur &amp; Udaipur Circuit
                </Link>
              </li>
              <li>
                <Link to="/destinations/rishikesh" className="hover:text-ivory-100 transition-colors">
                  Rishikesh Weekend Getaway
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-ivory-100 font-semibold text-terracotta-400 transition-colors">
                  View All Destinations →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ivory-100 mb-3">
              Company &amp; Access
            </h4>
            <ul className="space-y-2 text-xs text-forest-300">
              <li>
                <Link to="/about" className="hover:text-ivory-100 transition-colors">
                  About TripTally
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-ivory-100 transition-colors">
                  Contact &amp; Support
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-ivory-100 transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-ivory-100 transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" className="hover:text-ivory-100 transition-colors">
                  XML Sitemap
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-forest-900 flex flex-col sm:flex-row items-center justify-between text-xs text-forest-400 gap-4">
          <p>© {new Date().getFullYear()} TripTally Travel Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-forest-200 transition-colors">Privacy Policy</span>
            <span className="hover:text-forest-200 transition-colors">Terms of Service</span>
            <Link to="/sitemap.xml" className="hover:text-forest-200 transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
