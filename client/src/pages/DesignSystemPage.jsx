import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Compass,
  Sparkles,
  Layers,
  Send,
  Eye,
  CheckCircle2,
  AlertCircle,
  Calendar,
  MapPin,
  Users,
  Globe,
  Sliders,
  BellRing,
  FileText,
  CreditCard,
  Plus,
  IndianRupee
} from 'lucide-react';

import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import Dialog from '../components/ui/Dialog';
import Badge from '../components/ui/Badge';
import Skeleton, { TripCardSkeleton, TableRowSkeleton, StatSkeleton } from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import DotGlobe from '../components/ui/DotGlobe';
import { useToast } from '../context/ToastContext';

// Example Zod schema to demonstrate form validation
const demoSchema = z.object({
  tripTitle: z.string().min(3, 'Trip title must be at least 3 characters'),
  destination: z.string().min(2, 'Destination is required'),
  estimatedBudget: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Budget must be a valid positive number',
  }),
});

export function DesignSystemPage() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [showSkeletons, setShowSkeletons] = useState(false);

  // React Hook Form demo
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(demoSchema),
    defaultValues: {
      tripTitle: '',
      destination: '',
      estimatedBudget: '',
    },
  });

  const onFormSubmit = (data) => {
    toast.success('Form Validated!', `Successfully validated trip: "${data.tripTitle}" in ${data.destination}`);
    reset();
  };

  const toggleLoading = () => {
    setBtnLoading(true);
    setTimeout(() => {
      setBtnLoading(false);
      toast.info('Completed', 'Asynchronous action simulated successfully.');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="border-b border-ivory-300 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="forest" size="sm" withDot>
              Design System v1.0
            </Badge>
            <Badge variant="terracotta" size="sm">
              MERN Stack
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 tracking-tight font-display">
            TripTally Design System
          </h1>
          <p className="text-charcoal-500 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Crafted with warm ivory backgrounds, deep forest-green accents, terracotta highlights, and responsive components for collaborative group travel.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSkeletons(!showSkeletons)}
          >
            {showSkeletons ? 'Show Components' : 'Toggle Skeletons'}
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Sparkles className="w-4 h-4" />}
            onClick={() => setIsDialogOpen(true)}
          >
            Test Dialog Modal
          </Button>
        </div>
      </div>

      {/* 1. Color Palette Tokens */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-charcoal-900 font-display flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-forest-600" />
            1. Harmonious Color Palette
          </h2>
          <p className="text-xs text-charcoal-400 mt-1">
            Carefully curated HSL palette: warm ivory surfaces, forest accents, charcoal typography, and restrained terracotta.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          <div className="bg-ivory-100 p-4 rounded-2xl border border-ivory-300 shadow-soft-sm">
            <div className="h-12 w-full rounded-xl bg-ivory-100 border border-ivory-300 mb-2" />
            <p className="text-xs font-bold text-charcoal-900">Ivory Canvas</p>
            <p className="text-[11px] font-mono text-charcoal-400">#FAF8F5</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-ivory-300 shadow-soft-sm">
            <div className="h-12 w-full rounded-xl bg-forest-600 mb-2 shadow-soft-sm" />
            <p className="text-xs font-bold text-charcoal-900">Forest Primary</p>
            <p className="text-[11px] font-mono text-charcoal-400">#1B4332</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-ivory-300 shadow-soft-sm">
            <div className="h-12 w-full rounded-xl bg-forest-900 mb-2 shadow-soft-sm" />
            <p className="text-xs font-bold text-charcoal-900">Forest Deep</p>
            <p className="text-[11px] font-mono text-charcoal-400">#081C15</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-ivory-300 shadow-soft-sm">
            <div className="h-12 w-full rounded-xl bg-forest-100 mb-2 border border-forest-200" />
            <p className="text-xs font-bold text-charcoal-900">Forest Tint</p>
            <p className="text-[11px] font-mono text-charcoal-400">#DDF0E6</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-ivory-300 shadow-soft-sm">
            <div className="h-12 w-full rounded-xl bg-terracotta-500 mb-2 shadow-soft-sm" />
            <p className="text-xs font-bold text-charcoal-900">Terracotta Accent</p>
            <p className="text-[11px] font-mono text-charcoal-400">#E07A5F</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-ivory-300 shadow-soft-sm">
            <div className="h-12 w-full rounded-xl bg-charcoal-900 mb-2" />
            <p className="text-xs font-bold text-charcoal-900">Charcoal Dark</p>
            <p className="text-[11px] font-mono text-charcoal-400">#1A1D1C</p>
          </div>
        </div>
      </section>

      {/* 2. Interactive DotGlobe (Framer reference) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-charcoal-900 font-display flex items-center gap-2">
              <Globe className="w-5 h-5 text-forest-600" />
              2. Interactive Particle Dot-Globe (Wayfare & AISOL Reference)
            </h2>
            <p className="text-xs text-charcoal-400 mt-1">
              Interactive 3D particle sphere built with zero external paid libraries. Drag with mouse to rotate coordinates.
            </p>
          </div>
          <Badge variant="forest" size="sm">Free HTML5 Canvas</Badge>
        </div>

        <div className="relative rounded-3xl bg-white border border-ivory-300 shadow-soft overflow-hidden p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md space-y-4">
            <span className="text-xs font-semibold tracking-wider uppercase text-terracotta-600">
              Interactive Coordination
            </span>
            <h3 className="text-2xl font-bold text-charcoal-900 font-display">
              Pin trips, synchronize itineraries, balance tallies.
            </h3>
            <p className="text-sm text-charcoal-500 leading-relaxed">
              Every dot represents travel hubs and friend gatherings. Designed to provide instant depth and state-of-the-art elegance across the application.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Badge variant="forest" withDot>40+ Active Curated Trips</Badge>
              <Badge variant="terracotta" withDot>Live Coordinates</Badge>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <DotGlobe size={320} />
          </div>
        </div>
      </section>

      {/* 3. Reusable Buttons */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-charcoal-900 font-display flex items-center gap-2">
            <Sliders className="w-5 h-5 text-forest-600" />
            3. Buttons & Interactive States
          </h2>
          <p className="text-xs text-charcoal-400 mt-1">
            Variants, sizes, loading spinners, icons, active scaling, and accessible focus rings.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-ivory-300 p-6 sm:p-8 shadow-soft space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Primary Forest</Button>
            <Button variant="secondary">Secondary Ivory</Button>
            <Button variant="outline">Forest Outline</Button>
            <Button variant="accent">Terracotta Accent</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="danger">Danger</Button>
          </div>

          <div className="border-t border-ivory-200 pt-6 flex flex-wrap items-center gap-4">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large Hero</Button>
            <Button
              variant="primary"
              size="md"
              isLoading={btnLoading}
              onClick={toggleLoading}
            >
              {btnLoading ? 'Processing...' : 'Click for Loading State'}
            </Button>
            <Button
              variant="accent"
              size="md"
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Left Icon
            </Button>
            <Button variant="secondary" size="md" disabled>
              Disabled
            </Button>
          </div>
        </div>
      </section>

      {/* 4. Form Controls with Zod Validation */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-charcoal-900 font-display flex items-center gap-2">
            <FileText className="w-5 h-5 text-forest-600" />
            4. Inputs & React Hook Form + Zod Validation
          </h2>
          <p className="text-xs text-charcoal-400 mt-1">
            Fully accessible with aria labels, leading icons, error messaging, and reactive validation.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-ivory-300 p-6 sm:p-8 shadow-soft">
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5 max-w-xl">
            <Input
              label="Trip Name"
              placeholder="e.g. Amalfi Summer Adventure"
              required
              leftIcon={<Compass className="w-4 h-4" />}
              error={errors.tripTitle?.message}
              {...register('tripTitle')}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Destination"
                placeholder="Positano, Italy"
                required
                leftIcon={<MapPin className="w-4 h-4" />}
                error={errors.destination?.message}
                {...register('destination')}
              />

              <Input
                label="Estimated Group Budget (INR)"
                placeholder="40000"
                type="number"
                required
                leftIcon={<IndianRupee className="w-4 h-4" />}
                error={errors.estimatedBudget?.message}
                {...register('estimatedBudget')}
              />
            </div>

            <div className="pt-2 flex items-center gap-3">
              <Button type="submit" variant="primary" leftIcon={<Send className="w-4 h-4" />}>
                Validate & Submit Form
              </Button>
              <Button type="button" variant="ghost" onClick={() => reset()}>
                Reset
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* 5. Cards & Skeletons */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-charcoal-900 font-display flex items-center gap-2">
              <Layers className="w-5 h-5 text-forest-600" />
              5. Cards & Loading Skeletons
            </h2>
            <p className="text-xs text-charcoal-400 mt-1">
              Trip summary cards, dark forest accents, and corresponding skeleton loaders.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSkeletons(!showSkeletons)}
          >
            {showSkeletons ? 'Show Cards' : 'Preview Skeletons'}
          </Button>
        </div>

        {showSkeletons ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TripCardSkeleton />
            <TripCardSkeleton />
            <div className="space-y-4">
              <StatSkeleton />
              <div className="bg-white rounded-2xl border border-ivory-300 p-2 shadow-soft">
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Interactive Trip Card 1 */}
            <Card variant="interactive">
              <div className="relative h-44 w-full bg-forest-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(#2D6A4F_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
                <div className="absolute bottom-3 left-4 right-4 z-20 flex items-end justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-terracotta-400 uppercase tracking-wider">
                      Confirmed Itinerary
                    </span>
                    <h4 className="text-lg font-bold text-ivory-50 font-display">
                      Amalfi Coast Getaway
                    </h4>
                  </div>
                  <Badge variant="forest" size="sm">4 Travelers</Badge>
                </div>
              </div>
              <CardContent className="pt-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-charcoal-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-forest-600" />
                    Jul 14 - Jul 22
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold text-charcoal-800">
                    <IndianRupee className="w-3.5 h-3.5 text-terracotta-500" />
                    ₹2,80,000 Tallied
                  </span>
                </div>
                <p className="text-xs text-charcoal-500 leading-relaxed">
                  Villa reservations, boat tour to Capri, shared limoncello tasting, and scooter rentals.
                </p>
              </CardContent>
              <CardFooter>
                <span className="text-xs text-charcoal-400">All balances settled</span>
                <Badge variant="success" size="sm" withDot>In Sync</Badge>
              </CardFooter>
            </Card>

            {/* Dark Forest Card */}
            <Card variant="forest">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="dark" size="sm">Tally Summary</Badge>
                  <IndianRupee className="w-4 h-4 text-terracotta-400" />
                </div>
                <CardTitle className="text-ivory-50 text-xl mt-3 font-display">
                  Group Expense Pool
                </CardTitle>
                <CardDescription className="text-forest-200/80">
                  Automated debt-minimization algorithm
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl bg-forest-950/60 border border-forest-800">
                  <span className="text-xs text-forest-300">Total Group Spend</span>
                  <p className="text-2xl font-bold text-ivory-50 mt-1 font-mono">₹4,20,000</p>
                </div>
                <p className="text-xs text-forest-200/70">
                  Optimized settlements reduced 18 payments down to just 4 simple direct transfers.
                </p>
              </CardContent>
              <CardFooter className="border-forest-800">
                <span className="text-xs text-forest-300">Powered by TripTally Engine</span>
                <Button variant="accent" size="sm">View Splits</Button>
              </CardFooter>
            </Card>

            {/* Glass Card */}
            <Card variant="glass">
              <CardHeader>
                <Badge variant="terracotta" size="sm" withDot>Pending Review</Badge>
                <CardTitle className="text-charcoal-900 mt-2 font-display">
                  Manali Autumn Tour
                </CardTitle>
                <CardDescription>
                  Solang Valley & Rohtang Pass
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-charcoal-500">Resort Deposit</span>
                    <span className="font-semibold text-charcoal-800">₹35,000</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-charcoal-500">Volvo Bus Passes</span>
                    <span className="font-semibold text-charcoal-800">₹12,500</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <span className="text-xs text-charcoal-400">3 Friends Joined</span>
                <Button variant="outline" size="sm">Join Trip</Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </section>

      {/* 6. Badges & Status Indicators */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-charcoal-900 font-display flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-forest-600" />
            6. Status Badges & Category Tags
          </h2>
          <p className="text-xs text-charcoal-400 mt-1">
            Status indicators with dot indicators for travel and expense states.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-ivory-300 p-6 sm:p-8 shadow-soft flex flex-wrap items-center gap-3">
          <Badge variant="forest" size="md" withDot>Planning Phase</Badge>
          <Badge variant="terracotta" size="md" withDot>Awaiting Votes</Badge>
          <Badge variant="success" size="md" withDot>Settled Up</Badge>
          <Badge variant="warning" size="md" withDot>Payment Due</Badge>
          <Badge variant="danger" size="md" withDot>Overdue</Badge>
          <Badge variant="neutral" size="md">Lodging</Badge>
          <Badge variant="neutral" size="md">Dining & Food</Badge>
          <Badge variant="neutral" size="md">Activities</Badge>
          <Badge variant="outline" size="md">Custom Tag</Badge>
        </div>
      </section>

      {/* 7. Toast Notifications */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-charcoal-900 font-display flex items-center gap-2">
            <BellRing className="w-5 h-5 text-forest-600" />
            7. Toast Notifications
          </h2>
          <p className="text-xs text-charcoal-400 mt-1">
            Accessible non-intrusive alerts with auto-dismiss timers and clear visual hierarchy.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-ivory-300 p-6 sm:p-8 shadow-soft flex flex-wrap items-center gap-4">
          <Button
            variant="secondary"
            size="md"
            onClick={() => toast.success('Expense Added', 'Dinner in Old Delhi (₹4,800) split equally among 4 friends.')}
          >
            Trigger Success Toast
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={() => toast.error('Connection Lost', 'Unable to reach MongoDB Atlas cluster. Working in local dev mode.')}
          >
            Trigger Error Toast
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={() => toast.warning('Unbalanced Split', 'Total split sum does not match receipt total (₹450 difference).')}
          >
            Trigger Warning Toast
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={() => toast.info('New Collaborator', 'Sarah joined the "Swiss Alps Trek" planning board.')}
          >
            Trigger Info Toast
          </Button>
        </div>
      </section>

      {/* 8. Empty States */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-charcoal-900 font-display flex items-center gap-2">
            <Compass className="w-5 h-5 text-forest-600" />
            8. Empty States
          </h2>
          <p className="text-xs text-charcoal-400 mt-1">
            Warm, inviting illustrations and clear CTAs when lists or trips are empty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EmptyState
            icon={Compass}
            title="No upcoming trips planned"
            description="Invite your travel buddies and map out your next adventure together."
            actionLabel="Create First Trip"
            onAction={() => setIsDialogOpen(true)}
          />

          <EmptyState
            icon={IndianRupee}
            title="No expenses logged yet"
            description="Add flights, airbnb, or car rental receipts to calculate equal group tallies."
            actionLabel="Add Expense"
            onAction={() => toast.info('Expense Modal', 'Expense logger ready for Step 2.')}
          />
        </div>
      </section>

      {/* Dialog Modal Demo */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Plan New Group Adventure"
        description="Collaborate in real-time with friends and tally every expense."
        size="md"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setIsDialogOpen(false);
                toast.success('Trip Created!', 'New adventure initialized in TripTally.');
              }}
            >
              Confirm & Start
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Trip Destination"
            placeholder="e.g. Reykjavik, Iceland"
            leftIcon={<MapPin className="w-4 h-4" />}
          />
          <Input
            label="Approximate Travel Dates"
            placeholder="e.g. Sep 10 - Sep 18, 2026"
            leftIcon={<Calendar className="w-4 h-4" />}
          />
          <div className="p-3.5 rounded-xl bg-ivory-100 border border-ivory-200 text-xs text-charcoal-600">
            💡 Friends can be invited via unique share link once the trip is created.
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default DesignSystemPage;
