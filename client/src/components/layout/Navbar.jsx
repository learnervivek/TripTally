import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Compass, Menu, X, ArrowRight, User, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import AuthModal from '../auth/AuthModal';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [currentUser, setCurrentUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/' + targetId);
    } else {
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const openAuth = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-ivory-300/80 bg-ivory-100/95 backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Brand Logo */}
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
                  Plan & Settle Together
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              <a
                href="#features"
                onClick={(e) => handleNavClick(e, '#features')}
                className="px-3.5 py-2 rounded-xl text-sm font-medium text-charcoal-600 hover:text-forest-800 hover:bg-ivory-200/60 transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={(e) => handleNavClick(e, '#how-it-works')}
                className="px-3.5 py-2 rounded-xl text-sm font-medium text-charcoal-600 hover:text-forest-800 hover:bg-ivory-200/60 transition-colors"
              >
                How It Works
              </a>
              <a
                href="#preview"
                onClick={(e) => handleNavClick(e, '#preview')}
                className="px-3.5 py-2 rounded-xl text-sm font-medium text-charcoal-600 hover:text-forest-800 hover:bg-ivory-200/60 transition-colors"
              >
                Product Preview
              </a>
              <a
                href="#faq"
                onClick={(e) => handleNavClick(e, '#faq')}
                className="px-3.5 py-2 rounded-xl text-sm font-medium text-charcoal-600 hover:text-forest-800 hover:bg-ivory-200/60 transition-colors"
              >
                FAQ
              </a>
              <Link
                to="/design-system"
                className="px-3.5 py-2 rounded-xl text-sm font-medium text-charcoal-600 hover:text-forest-800 hover:bg-ivory-200/60 transition-colors flex items-center gap-1.5"
              >
                <span>Design System</span>
                <Badge variant="forest" size="sm">UI</Badge>
              </Link>
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {currentUser ? (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-charcoal-800 bg-white border border-ivory-300 px-3 py-1.5 rounded-xl shadow-soft-sm">
                    {currentUser.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentUser(null)}
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openAuth('signin')}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => openAuth('signup')}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="p-2 rounded-xl text-charcoal-700 hover:bg-ivory-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-600"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-ivory-300 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
            <div className="flex flex-col space-y-1">
              <a
                href="#features"
                onClick={(e) => handleNavClick(e, '#features')}
                className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-charcoal-700 hover:bg-ivory-100"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={(e) => handleNavClick(e, '#how-it-works')}
                className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-charcoal-700 hover:bg-ivory-100"
              >
                How It Works
              </a>
              <a
                href="#preview"
                onClick={(e) => handleNavClick(e, '#preview')}
                className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-charcoal-700 hover:bg-ivory-100"
              >
                Product Preview
              </a>
              <a
                href="#faq"
                onClick={(e) => handleNavClick(e, '#faq')}
                className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-charcoal-700 hover:bg-ivory-100"
              >
                FAQ
              </a>
              <Link
                to="/design-system"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-charcoal-700 hover:bg-ivory-100 flex items-center justify-between"
              >
                <span>Design System Showcase</span>
                <Badge variant="forest" size="sm">Tokens</Badge>
              </Link>
            </div>

            <div className="pt-3 border-t border-ivory-200 flex flex-col gap-2">
              <Button
                variant="secondary"
                size="md"
                className="w-full justify-center"
                onClick={() => openAuth('signin')}
              >
                Sign In
              </Button>
              <Button
                variant="primary"
                size="md"
                className="w-full justify-center"
                onClick={() => openAuth('signup')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Get Started Free
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        onAuthSuccess={(user) => setCurrentUser(user)}
      />
    </>
  );
}

export default Navbar;
