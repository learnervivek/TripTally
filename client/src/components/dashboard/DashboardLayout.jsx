import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  Compass,
  LayoutDashboard,
  MapPin,
  Mail,
  Bell,
  User,
  Plus,
  Search,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Settings,
  Sparkles
} from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useAuth } from '../../context/AuthContext';
import CreateTripModal from '../trips/CreateTripModal';
import tripService from '../../services/tripService';

export function DashboardLayout({ children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [createTripOpen, setCreateTripOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [invitationCount, setInvitationCount] = useState(0);

  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof tripService?.getMyInvitations === 'function') {
      tripService.getMyInvitations()
        .then((res) => {
          if (res?.success && typeof res.count === 'number') {
            setInvitationCount(res.count);
          }
        })
        .catch(() => {});
    }
  }, [location.pathname]);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Trips', href: '/trips', icon: MapPin },
    { name: 'Invitations', href: '/invitations', icon: Mail, badge: invitationCount > 0 ? String(invitationCount) : null },
    { name: 'Notifications', href: '/notifications', icon: Bell, indicator: true },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/trips?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'TT';

  return (
    <div className="min-h-screen bg-ivory-100 text-charcoal-900 flex flex-col md:flex-row">
      
      {/* 1. Desktop Persistent Sidebar */}
      <aside className="hidden md:flex md:w-64 lg:w-72 flex-col justify-between border-r border-ivory-300 bg-white/90 backdrop-blur-md p-6 sticky top-0 h-screen shrink-0">
        <div className="space-y-8">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 rounded-xl p-1">
            <div className="w-10 h-10 rounded-xl bg-forest-600 flex items-center justify-center text-ivory-50 shadow-soft group-hover:bg-forest-700 transition-colors">
              <Compass className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-forest-900 font-display">
                  Trip<span className="text-terracotta-500">Tally</span>
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-terracotta-500" />
              </div>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-charcoal-400 block">
                Travel & Tally Hub
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-forest-50 text-forest-800 border border-forest-200/80 shadow-soft-sm'
                      : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-forest-600' : 'text-charcoal-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <Badge variant={isActive ? 'forest' : 'neutral'} size="sm">
                      {item.badge}
                    </Badge>
                  )}
                  {item.indicator && (
                    <span className="w-2 h-2 rounded-full bg-terracotta-500" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer User Card */}
        <div className="pt-6 border-t border-ivory-200 space-y-3">
          <div className="flex items-center justify-between p-2 rounded-2xl bg-ivory-50 border border-ivory-200">
            <Link to="/profile" className="flex items-center gap-2.5 min-w-0 flex-1 hover:opacity-80 transition-opacity">
              <div className="w-9 h-9 rounded-xl bg-forest-600 text-white font-bold text-xs flex items-center justify-center shrink-0 overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-charcoal-900 truncate">{user?.name}</p>
                <p className="text-[10px] text-charcoal-400 font-mono truncate">{user?.email}</p>
              </div>
            </Link>
            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 text-charcoal-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* 2. Main Work Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 w-full border-b border-ivory-300/80 bg-white/90 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          
          {/* Mobile hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 rounded-xl text-charcoal-700 hover:bg-ivory-100"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-forest-600 flex items-center justify-center text-white text-xs">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-bold text-base font-display">TripTally</span>
            </Link>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search destinations, trips, or companions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-ivory-100 text-charcoal-900 placeholder:text-charcoal-400 text-xs rounded-xl border border-ivory-300 hover:border-ivory-400 focus:border-forest-600 focus:bg-white focus:ring-2 focus:ring-forest-100/80 h-9 pl-9 pr-3.5 transition-all outline-none"
            />
          </form>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3 ml-auto">
            
            {/* Notification bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-xl text-charcoal-600 hover:text-forest-800 hover:bg-ivory-100 transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-terracotta-500 animate-pulse" />
              </button>

              {notificationsOpen && (
                <div
                  className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-soft-xl border border-ivory-300 p-4 space-y-3 z-50 animate-fadeIn text-xs"
                  onMouseLeave={() => setNotificationsOpen(false)}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-ivory-200">
                    <span className="font-bold text-charcoal-900">Notifications</span>
                    <Badge variant="forest" size="sm">2 New</Badge>
                  </div>
                  <div className="space-y-2.5">
                    <div className="p-2 rounded-xl bg-ivory-50 border border-ivory-200">
                      <p className="font-semibold text-charcoal-800">Trip Invite from Maya</p>
                      <p className="text-[11px] text-charcoal-500 mt-0.5">Invited you to "Swiss Alps Hiking".</p>
                    </div>
                    <div className="p-2 rounded-xl bg-ivory-50 border border-ivory-200">
                      <p className="font-semibold text-charcoal-800">Expense Added</p>
                      <p className="text-[11px] text-charcoal-500 mt-0.5">Alex logged Villa deposit ($1,650).</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Create Trip Button */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => setCreateTripOpen(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              <span className="hidden sm:inline">Create Trip</span>
              <span className="sm:hidden">New</span>
            </Button>

            {/* User Avatar link */}
            <Link to="/profile" className="hidden sm:block">
              <div className="w-8 h-8 rounded-xl bg-forest-600 text-white font-bold text-xs flex items-center justify-center overflow-hidden border border-ivory-300 shadow-soft-sm">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
            </Link>

          </div>

        </header>

        {/* Page Content Slot */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children || <Outlet context={{ openCreateTrip: () => setCreateTripOpen(true) }} />}
        </main>

      </div>

      {/* 3. Mobile Navigation Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-charcoal-950/40 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-72 max-w-[80%] bg-white p-6 flex flex-col justify-between shadow-soft-xl border-r border-ivory-300 animate-slideRight">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-ivory-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-forest-600 text-white flex items-center justify-center text-xs">
                    <Compass className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-base text-forest-900 font-display">TripTally</span>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-charcoal-400 hover:bg-ivory-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                        isActive
                          ? 'bg-forest-50 text-forest-800 border border-forest-200'
                          : 'text-charcoal-600 hover:bg-ivory-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && <Badge variant="forest" size="sm">{item.badge}</Badge>}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-ivory-200">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-center text-rose-600 border-rose-200"
                onClick={() => {
                  setMobileSidebarOpen(false);
                  logout();
                }}
                leftIcon={<LogOut className="w-4 h-4" />}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create Trip Modal */}
      <CreateTripModal
        isOpen={createTripOpen}
        onClose={() => setCreateTripOpen(false)}
        onTripCreated={(newTrip) => {
          // If on dashboard, navigate to trips or trip details
          navigate(`/trips/${newTrip._id}`);
        }}
      />

    </div>
  );
}

export default DashboardLayout;
