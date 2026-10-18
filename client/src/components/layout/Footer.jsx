import React from 'react';
import { Compass, Heart, Github, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-ivory-300 bg-white/70 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-forest-600 flex items-center justify-center text-ivory-50 shadow-soft-sm">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-sm text-forest-900 font-display">
                Trip<span className="text-terracotta-500">Tally</span>
              </p>
              <p className="text-xs text-charcoal-400">
                Collaborative group travel planning & expense balancing.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-charcoal-500 font-medium">
            <Link to="/" className="hover:text-forest-700 transition-colors">
              Trips
            </Link>
            <Link to="/design-system" className="hover:text-forest-700 transition-colors">
              Design System Showcase
            </Link>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-forest-50 border border-forest-200/60 text-forest-800 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-600 animate-pulse" />
              MERN Stack Dev Ready
            </span>
          </div>

          <p className="text-xs text-charcoal-400">
            © {new Date().getFullYear()} TripTally. Designed with warm ivory & forest aesthetics.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
