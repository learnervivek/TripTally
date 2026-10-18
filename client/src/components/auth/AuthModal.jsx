import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, User, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import Dialog from '../ui/Dialog';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useToast } from '../../context/ToastContext';

const signinSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export function AuthModal({ isOpen, onClose, initialMode = 'signin', onAuthSuccess }) {
  const [mode, setMode] = useState(initialMode);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const isSignIn = mode === 'signin';
  const currentSchema = isSignIn ? signinSchema : signupSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const username = data.name || data.email.split('@')[0];
      toast.success(
        isSignIn ? 'Welcome Back!' : 'Account Created!',
        `Logged in successfully as ${username}. You're ready to plan trips.`
      );
      reset();
      onClose();
      if (onAuthSuccess) onAuthSuccess(data);
    }, 900);
  };

  const handleDemoLogin = () => {
    setValue('email', 'alex.traveler@example.com');
    setValue('password', 'adventure2026');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Signed in as Guest', 'Logged into demo traveler account. Ready to explore!');
      onClose();
      if (onAuthSuccess) onAuthSuccess({ email: 'alex.traveler@example.com', name: 'Alex Rivera' });
    }, 600);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={isSignIn ? 'Welcome back to TripTally' : 'Start your travel journey'}
      description={
        isSignIn
          ? 'Sign in to access your shared group itineraries and tallies.'
          : 'Create a free account to coordinate friend trips and split costs.'
      }
      size="md"
    >
      <div className="space-y-6">
        {/* Mode Toggle Tabs */}
        <div className="flex p-1 rounded-xl bg-ivory-200/70 border border-ivory-300">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              reset();
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              isSignIn
                ? 'bg-white text-forest-800 shadow-soft-sm'
                : 'text-charcoal-500 hover:text-charcoal-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              reset();
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              !isSignIn
                ? 'bg-white text-forest-800 shadow-soft-sm'
                : 'text-charcoal-500 hover:text-charcoal-800'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isSignIn && (
            <Input
              label="Full Name"
              placeholder="e.g. Alex Rivera"
              required
              leftIcon={<User className="w-4 h-4" />}
              error={errors.name?.message}
              {...register('name')}
            />
          )}

          <Input
            label="Email Address"
            type="email"
            placeholder="alex@example.com"
            required
            leftIcon={<Mail className="w-4 h-4" />}
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            required
            leftIcon={<Lock className="w-4 h-4" />}
            helperText={isSignIn ? undefined : 'Minimum 6 characters'}
            error={errors.password?.message}
            {...register('password')}
          />

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full justify-center"
              isLoading={loading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {isSignIn ? 'Sign In to TripTally' : 'Create Free Account'}
            </Button>
          </div>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-ivory-300 w-full" />
          <span className="bg-white px-3 text-[11px] uppercase tracking-wider text-charcoal-400 font-semibold absolute">
            Or Quick Access
          </span>
        </div>

        {/* Demo Traveler Button */}
        <div className="space-y-2">
          <Button
            type="button"
            variant="secondary"
            size="md"
            className="w-full justify-center"
            onClick={handleDemoLogin}
            leftIcon={<Sparkles className="w-4 h-4 text-terracotta-500" />}
          >
            Instant Demo Sign-In (Guest)
          </Button>
          <p className="text-[11px] text-center text-charcoal-400">
            No password required • Explores sample trips & real-time tallies
          </p>
        </div>
      </div>
    </Dialog>
  );
}

export default AuthModal;
