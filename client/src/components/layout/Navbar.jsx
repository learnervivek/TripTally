import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Menu, X, Plus, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Trips', href: '/' },
    { name: 'Design System', href: '/design-system', badge: 'v1.0' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-ivory-300/80 bg-ivory-100/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 rounded-xl p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-forest-600 flex items-center justify-center text-ivory-50 shadow-soft group-hover:bg-forest-700 transition-colors">
              <Compass className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-forest-900 font-display">
                  Trip<span className="text-terracotta-500">Tally</span>
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-terracotta-500" />
              </div>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-charcoal-400">
                Group Travel & Expense
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 flex items-center gap-2',
                    active
                      ? 'bg-white text-forest-700 shadow-soft-sm font-semibold border border-ivory-300/60'
                      : 'text-charcoal-600 hover:text-forest-800 hover:bg-ivory-200/50'
                  )}
                >
                  {link.name}
                  {link.badge && (
                    <Badge variant={active ? 'forest' : 'neutral'} size="sm">
                      {link.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/design-system">
              <Button variant="ghost" size="sm" leftIcon={<Layers className="w-4 h-4" />}>
                UI Components
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => alert('Trip creation modal will launch in Step 2!')}
            >
              Plan Trip
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 rounded-xl text-charcoal-600 hover:bg-ivory-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-ivory-300 bg-white/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between',
                  isActive(link.href)
                    ? 'bg-forest-50 text-forest-800 font-semibold'
                    : 'text-charcoal-700 hover:bg-ivory-100'
                )}
              >
                <span>{link.name}</span>
                {link.badge && <Badge variant="forest" size="sm">{link.badge}</Badge>}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-ivory-200 flex flex-col gap-2">
            <Button
              variant="primary"
              size="md"
              className="w-full justify-center"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => {
                setMobileMenuOpen(false);
                alert('Trip creation modal will launch in Step 2!');
              }}
            >
              Plan New Trip
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
