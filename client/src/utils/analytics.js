/**
 * Privacy-Conscious Analytics Helper for TripTally
 * Tracks key user engagement and SEO conversion events without capturing PII.
 */

export const trackEvent = (eventName, params = {}) => {
  if (typeof window === 'undefined') return;

  // Sanitize params: never track sensitive values
  const safeParams = { ...params };
  delete safeParams.password;
  delete safeParams.token;
  delete safeParams.apiKey;
  delete safeParams.email;
  delete safeParams.phone;

  // Google Analytics 4 (gtag)
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, safeParams);
  }

  // Developer logging in non-production
  if (import.meta.env.DEV) {
    console.debug(`[Analytics Event] ${eventName}:`, safeParams);
  }
};

export const AnalyticsEvents = {
  LANDING_VIEW: 'landing_page_view',
  SIGNUP_CLICK: 'signup_click',
  REGISTRATION_SUCCESS: 'registration_success',
  LOGIN_CLICK: 'login_click',
  AI_PLANNER_CLICK: 'ai_itinerary_generate_click',
  TRIP_CREATE_CLICK: 'trip_create_click',
  FEATURE_EXPLORE: 'feature_explore',
  DESTINATION_VIEW: 'destination_view',
  CTA_CLICK: 'cta_click',
};

