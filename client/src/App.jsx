import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardLayout from './components/dashboard/DashboardLayout';
import ToastProvider from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';

// Public Marketing & SEO Pages (Lazy-loaded for optimal initial bundle & Core Web Vitals)
const HomePage = lazy(() => import('./pages/HomePage'));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage'));
const AiItineraryGeneratorPage = lazy(() => import('./pages/AiItineraryGeneratorPage'));
const GroupTripPlannerPage = lazy(() => import('./pages/GroupTripPlannerPage'));
const TravelExpenseSplitterPage = lazy(() => import('./pages/TravelExpenseSplitterPage'));
const TravelBudgetPlannerPage = lazy(() => import('./pages/TravelBudgetPlannerPage'));
const DestinationsPage = lazy(() => import('./pages/DestinationsPage'));
const DestinationDetailPage = lazy(() => import('./pages/DestinationDetailPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Auth Pages
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));

// Authenticated Application Workspace Pages
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const TripsListPage = lazy(() => import('./pages/TripsListPage'));
const TripDetailsPage = lazy(() => import('./pages/TripDetailsPage'));
const AiTripPlannerPage = lazy(() => import('./pages/AiTripPlannerPage'));
const InvitationsPage = lazy(() => import('./pages/InvitationsPage'));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

// Accessible, sleek fallback loader during route transitions
function PageLoadingFallback() {
  return (
    <div
      className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center"
      role="status"
      aria-label="Loading page content"
    >
      <div className="w-10 h-10 rounded-full border-2 border-forest-200 border-t-forest-700 animate-spin mb-3" />
      <span className="text-xs font-medium text-charcoal-500 font-mono">
        Loading TripTally...
      </span>
    </div>
  );
}

export function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
            {/* Public Website Shell */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="features" element={<FeaturesPage />} />
              <Route path="ai-itinerary-generator" element={<AiItineraryGeneratorPage />} />
              <Route path="group-trip-planner" element={<GroupTripPlannerPage />} />
              <Route path="travel-expense-splitter" element={<TravelExpenseSplitterPage />} />
              <Route path="travel-budget-planner" element={<TravelBudgetPlannerPage />} />
              <Route path="destinations" element={<DestinationsPage />} />
              <Route path="destinations/:slug" element={<DestinationDetailPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />

              {/* Authentication Routes */}
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              <Route path="reset-password/:token" element={<ResetPasswordPage />} />
            </Route>

            {/* Authenticated Dashboard Shell (Protected, Client-Side Only) */}
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="trips" element={<TripsListPage />} />
              <Route path="trips/:id" element={<TripDetailsPage />} />
              <Route path="ai-trip-planner" element={<AiTripPlannerPage />} />
              <Route path="invitations" element={<InvitationsPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
