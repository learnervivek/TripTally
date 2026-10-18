import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useOutletContext } from 'react-router-dom';
import {
  Compass,
  MapPin,
  Calendar,
  Users,
  Search,
  Plus,
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent, CardFooter } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Skeleton, { TripCardSkeleton } from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import tripService from '../services/tripService';

export function TripsListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const outletContext = useOutletContext();

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const res = await tripService.getTrips({
        status: statusFilter,
        search: searchQuery,
      });
      if (res.success && res.trips) {
        setTrips(res.trips);
      }
    } catch (err) {
      console.error('Failed to load trips', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchTrips();
  };

  const statusVariants = {
    planning: 'forest',
    confirmed: 'success',
    ongoing: 'terracotta',
    completed: 'neutral',
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ivory-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 font-display">
            My Collaborative Trips
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Browse all upcoming, active, and past itineraries you are a part of.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => outletContext?.openCreateTrip?.()}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Create New Trip
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Status filter tabs */}
        <div className="flex p-1 rounded-xl bg-ivory-200/70 border border-ivory-300 w-full sm:w-auto overflow-x-auto">
          {['all', 'planning', 'ongoing', 'confirmed', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all whitespace-nowrap ${
                statusFilter === status
                  ? 'bg-white text-forest-800 shadow-soft-sm'
                  : 'text-charcoal-600 hover:text-charcoal-900'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="w-full sm:w-72 relative">
          <Search className="w-3.5 h-3.5 text-charcoal-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search trips by destination..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-charcoal-900 text-xs rounded-xl border border-ivory-300 hover:border-ivory-400 focus:border-forest-600 h-9 pl-8 pr-3 outline-none"
          />
        </form>

      </div>

      {/* Trip Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TripCardSkeleton />
          <TripCardSkeleton />
          <TripCardSkeleton />
        </div>
      ) : trips.length === 0 ? (
        <EmptyState
          icon={Compass}
          title="No trips found"
          description={
            searchQuery || statusFilter !== 'all'
              ? 'No trips matched your search or status filter. Try resetting filters.'
              : 'You have not joined any trips yet. Create your first trip to get started!'
          }
          actionLabel="Create Trip"
          onAction={() => outletContext?.openCreateTrip?.()}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => {
            const memberList = trip.members || [];
            return (
              <Card
                key={trip._id}
                variant="interactive"
                className="flex flex-col justify-between group"
                onClick={() => navigate(`/trips/${trip._id}`)}
              >
                <div>
                  <div className="relative h-44 w-full bg-charcoal-900 overflow-hidden">
                    <img
                      src={trip.coverImage || 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80'}
                      alt={trip.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <Badge variant={statusVariants[trip.status] || 'forest'} size="sm" withDot>
                        {trip.status.toUpperCase()}
                      </Badge>
                      <span className="text-xs font-mono font-bold text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        ${trip.budget?.toLocaleString()} {trip.currency}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-[11px] font-semibold text-terracotta-300 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {trip.destination}
                      </p>
                      <h3 className="text-base font-bold text-white font-display truncate">
                        {trip.title}
                      </h3>
                    </div>
                  </div>

                  <CardContent className="pt-4 space-y-2">
                    <p className="text-xs text-charcoal-500 flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-forest-600" />
                      {trip.startDate ? new Date(trip.startDate).toLocaleDateString() : 'Dates flexible'}
                    </p>
                    {trip.description && (
                      <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed">
                        {trip.description}
                      </p>
                    )}
                  </CardContent>
                </div>

                <CardFooter className="bg-ivory-50/40">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-charcoal-500 font-medium">
                      {memberList.length} companions
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-forest-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Trip <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

    </div>
  );
}

export default TripsListPage;
