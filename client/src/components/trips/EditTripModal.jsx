import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Compass,
  MapPin,
  Calendar,
  DollarSign,
  Image as ImageIcon,
  Save,
  Sliders
} from 'lucide-react';
import Dialog from '../ui/Dialog';
import Input from '../ui/Input';
import Button from '../ui/Button';
import tripService from '../../services/tripService';
import { useToast } from '../../context/ToastContext';

const updateSchema = z.object({
  title: z.string().trim().min(3, 'Trip title must be at least 3 characters').max(100, 'Title cannot exceed 100 characters'),
  destination: z.string().trim().min(2, 'Destination is required'),
  description: z.string().trim().max(500, 'Description cannot exceed 500 characters').optional().or(z.literal('')),
  coverImage: z.string().optional().or(z.literal('')),
  startDate: z.string().optional().or(z.literal('')),
  endDate: z.string().optional().or(z.literal('')),
  currency: z.string().default('USD'),
  budget: z.coerce.number().min(0, 'Budget must be zero or positive').default(0),
  status: z.enum(['planning', 'confirmed', 'ongoing', 'completed', 'archived']).default('planning'),
}).refine((data) => {
  if (data.startDate && data.endDate) {
    return new Date(data.endDate) >= new Date(data.startDate);
  }
  return true;
}, {
  message: 'End date must be on or after start date',
  path: ['endDate'],
});

const coverPresets = [
  { name: 'Amalfi Coast', url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Kyoto Temple', url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Swiss Alps', url: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Patagonia', url: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Santorini', url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80' },
];

export function EditTripModal({ isOpen, onClose, trip, onTripUpdated }) {
  const [loading, setLoading] = useState(false);
  const [selectedCover, setSelectedCover] = useState(trip?.coverImage || '');
  const { toast } = useToast();

  const toInputDate = (d) => {
    if (!d) return '';
    const dateObj = new Date(d);
    return !isNaN(dateObj.getTime()) ? dateObj.toISOString().split('T')[0] : '';
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      title: trip?.title || '',
      destination: trip?.destination || '',
      description: trip?.description || '',
      coverImage: trip?.coverImage || '',
      startDate: toInputDate(trip?.startDate),
      endDate: toInputDate(trip?.endDate),
      currency: trip?.currency || 'USD',
      budget: trip?.budget || 0,
      status: trip?.status || 'planning',
    },
  });

  useEffect(() => {
    if (trip) {
      reset({
        title: trip.title || '',
        destination: trip.destination || '',
        description: trip.description || '',
        coverImage: trip.coverImage || '',
        startDate: toInputDate(trip.startDate),
        endDate: toInputDate(trip.endDate),
        currency: trip.currency || 'USD',
        budget: trip.budget || 0,
        status: trip.status || 'planning',
      });
      setSelectedCover(trip.coverImage || '');
    }
  }, [trip, reset]);

  const onSelectCover = (url) => {
    setSelectedCover(url);
    setValue('coverImage', url);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await tripService.updateTrip(trip._id, data);
      if (response.success && response.trip) {
        toast.success('Trip Updated!', `Saved changes for "${response.trip.title}".`);
        onClose();
        if (onTripUpdated) onTripUpdated(response.trip);
      }
    } catch (err) {
      toast.error('Could Not Update Trip', err.message || 'Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Trip Details"
      description="Update destinations, travel dates, status, or group budget."
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        <Input
          label="Trip Title"
          placeholder="e.g. Amalfi Coast Roadtrip"
          required
          leftIcon={<Compass className="w-4 h-4" />}
          error={errors.title?.message}
          {...register('title')}
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

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700">
              Trip Status
            </label>
            <select
              className="w-full bg-white text-charcoal-900 text-sm rounded-xl border border-ivory-300 hover:border-ivory-400 focus:border-forest-600 focus:ring-2 focus:ring-forest-100/80 h-10 px-3 transition-all outline-none capitalize"
              {...register('status')}
            >
              <option value="planning">Planning (Draft)</option>
              <option value="confirmed">Confirmed (Booked)</option>
              <option value="ongoing">Ongoing (In Progress)</option>
              <option value="completed">Completed (Wrap-up)</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Start Date"
            type="date"
            leftIcon={<Calendar className="w-4 h-4" />}
            error={errors.startDate?.message}
            {...register('startDate')}
          />

          <Input
            label="End Date"
            type="date"
            leftIcon={<Calendar className="w-4 h-4" />}
            error={errors.endDate?.message}
            {...register('endDate')}
          />

          <Input
            label="Planned Budget"
            type="number"
            leftIcon={<DollarSign className="w-4 h-4" />}
            error={errors.budget?.message}
            {...register('budget')}
          />
        </div>

        {/* Cover selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 flex items-center justify-between">
            <span>Cover Photo</span>
            <span className="text-[10px] text-charcoal-400 font-normal">Choose preset or custom URL</span>
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {coverPresets.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => onSelectCover(preset.url)}
                className={`relative h-14 rounded-xl overflow-hidden border-2 transition-all ${
                  selectedCover === preset.url
                    ? 'border-forest-600 ring-2 ring-forest-200'
                    : 'border-ivory-300 opacity-75 hover:opacity-100'
                }`}
              >
                <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <Input
          label="Custom Cover Image URL"
          placeholder="https://..."
          leftIcon={<ImageIcon className="w-4 h-4" />}
          error={errors.coverImage?.message}
          {...register('coverImage', {
            onChange: (e) => setSelectedCover(e.target.value),
          })}
        />

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700">
            Trip Notes & Description
          </label>
          <textarea
            rows={2}
            className="w-full bg-white text-charcoal-900 placeholder:text-charcoal-300 text-sm rounded-xl border border-ivory-300 hover:border-ivory-400 focus:border-forest-600 focus:ring-2 focus:ring-forest-100/80 p-3 transition-all outline-none"
            {...register('description')}
          />
        </div>

        <div className="pt-3 border-t border-ivory-200 flex items-center justify-end gap-3">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={loading}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Trip Changes
          </Button>
        </div>

      </form>
    </Dialog>
  );
}

export default EditTripModal;
