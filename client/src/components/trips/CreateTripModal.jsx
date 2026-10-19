import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Compass,
  Calendar,
  MapPin,
  Image as ImageIcon,
  Check,
  Sparkles,
  Info,
  IndianRupee
} from 'lucide-react';
import Dialog from '../ui/Dialog';
import Input from '../ui/Input';
import Button from '../ui/Button';
import tripService from '../../services/tripService';
import { useToast } from '../../context/ToastContext';

const tripSchema = z.object({
  title: z.string().trim().min(3, 'Trip title must be at least 3 characters').max(100, 'Title cannot exceed 100 characters'),
  destination: z.string().trim().min(2, 'Destination is required'),
  description: z.string().trim().max(500, 'Description cannot exceed 500 characters').optional().or(z.literal('')),
  coverImage: z.string().optional().or(z.literal('')),
  startDate: z.string().optional().or(z.literal('')),
  endDate: z.string().optional().or(z.literal('')),
  currency: z.string().default('INR'),
  budget: z.coerce.number().min(0, 'Budget must be zero or positive').default(40000),
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
  {
    name: 'Manali & Solang',
    url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Goa Beaches',
    url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Jaipur & Udaipur',
    url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Kerala Backwaters',
    url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
  },
];

export function CreateTripModal({ isOpen, onClose, onTripCreated }) {
  const [loading, setLoading] = useState(false);
  const [selectedCover, setSelectedCover] = useState(coverPresets[0].url);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      title: '',
      destination: '',
      description: '',
      coverImage: coverPresets[0].url,
      startDate: '',
      endDate: '',
      currency: 'INR',
      budget: 40000,
    },
  });

  const onSelectPresetCover = (url) => {
    setSelectedCover(url);
    setValue('coverImage', url);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await tripService.createTrip(data);
      if (response.success && response.trip) {
        toast.success('Trip Created!', `"${response.trip.title}" is ready for planning.`);
        reset();
        onClose();
        if (onTripCreated) {
          onTripCreated(response.trip);
        }
      } else {
        toast.error('Failed to create trip', response.message || 'Please check the form inputs.');
      }
    } catch (err) {
      toast.error('Error', err.response?.data?.message || err.message || 'Could not save trip.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Trip Board"
      description="Start an Indian itinerary board, set your budget in rupees, and invite your travel group."
      size="xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        <Input
          label="Trip Title"
          placeholder="e.g. Manali Adventure with Friends"
          error={errors.title?.message}
          {...register('title')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Destination"
            placeholder="e.g. Manali, Himachal Pradesh"
            leftIcon={<MapPin className="w-4 h-4" />}
            error={errors.destination?.message}
            {...register('destination')}
          />

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700">
              Trip Currency
            </label>
            <select
              className="w-full bg-white text-charcoal-900 text-sm rounded-xl border border-ivory-300 hover:border-ivory-400 focus:border-forest-600 focus:ring-2 focus:ring-forest-100/80 h-10 px-3 transition-all outline-none"
              {...register('currency')}
            >
              <option value="INR">INR (₹) Indian Rupee</option>
              <option value="USD">USD ($) United States Dollar</option>
              <option value="EUR">EUR (€) Euro</option>
              <option value="GBP">GBP (£) British Pound</option>
              <option value="AED">AED (د.إ) UAE Dirham</option>
              <option value="THB">THB (฿) Thai Baht</option>
              <option value="SGD">SGD ($) Singapore Dollar</option>
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
            label="Target Budget"
            type="number"
            placeholder="40000"
            leftIcon={<IndianRupee className="w-4 h-4" />}
            error={errors.budget?.message}
            {...register('budget')}
          />
        </div>

        {/* Cover Photo Selection */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 flex items-center justify-between">
            <span>Select Cover Inspiration</span>
            <span className="text-[10px] text-charcoal-400 font-normal">Click to preview</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {coverPresets.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => onSelectPresetCover(preset.url)}
                className={`relative h-16 rounded-xl overflow-hidden border-2 transition-all group ${
                  selectedCover === preset.url
                    ? 'border-forest-600 ring-2 ring-forest-200'
                    : 'border-ivory-300 opacity-75 hover:opacity-100 hover:border-forest-500'
                }`}
              >
                <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                <span className="absolute bottom-1 left-1.5 right-1.5 text-[10px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm truncate block text-left">
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <Input
          label="Custom Cover Image URL (Optional)"
          placeholder="https://images.unsplash.com/..."
          leftIcon={<ImageIcon className="w-4 h-4" />}
          error={errors.coverImage?.message}
          {...register('coverImage', {
            onChange: (e) => setSelectedCover(e.target.value),
          })}
        />

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700">
            Trip Notes & Objectives (Optional)
          </label>
          <textarea
            rows={2}
            placeholder="What kind of trip is this? (e.g. Backpacking, college reunion, family road trip...)"
            className="w-full bg-white text-charcoal-900 text-sm rounded-xl border border-ivory-300 hover:border-ivory-400 focus:border-forest-600 focus:ring-2 focus:ring-forest-100/80 p-3 transition-all outline-none resize-none"
            {...register('description')}
          />
        </div>

        {/* Modal Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-ivory-200">
          <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            Create Trip Board
          </Button>
        </div>

      </form>
    </Dialog>
  );
}

export default CreateTripModal;
