/**
 * TripTally Comprehensive SEO Configuration & Keyword Mapping
 * Tailored for Indian travellers looking for collaborative trip planners,
 * AI itinerary generators, travel budget calculators, and group expense splitters.
 */

export const SITE_CONFIG = {
  name: 'TripTally',
  legalName: 'TripTally Travel Technologies',
  tagline: 'AI Travel Planner & Group Trip Expense Manager',
  description:
    'Plan trips with friends, generate personalised AI travel itineraries, track group budgets in Indian Rupees, and split expenses effortlessly with UPI settlement.',
  siteUrl:
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://triptally.vercel.app',
  defaultOgImage: '/og-image.png',
  twitterHandle: '@TripTallyApp',
  themeColor: '#1B4332',
  locale: 'en_IN',
  currency: 'INR',
  foundingYear: 2024,
  contactEmail: 'support@triptally.com',
  officialKeywords: [
    'Travel planner',
    'Trip planner',
    'AI travel planner',
    'India travel planner',
    'Online trip planner',
    'Group travel planner',
    'Collaborative trip planner',
    'Travel itinerary planner',
    'Travel budget planner',
    'Expense splitting app for trips',
    'AI itinerary generator',
    'Trip planning app for friends',
    'Group expense tracker',
    'Travel expense splitter',
    'Travel budget calculator',
    'India trip itinerary generator',
    'Holiday planning website',
    'Travel planner for Indian travellers',
    'Shared travel itinerary',
    'Trip cost calculator',
    'UPI trip expense settlement',
  ],
};

/**
 * Page-Specific SEO Metadata & Search Intent Mapping
 */
export const PAGE_SEO = {
  home: {
    title: 'TripTally – AI Travel Planner & Group Trip Expense Manager',
    description:
      'Plan trips with friends, generate personalised AI itineraries, track budgets in INR, and split expenses easily with TripTally, India’s modern collaborative travel planner.',
    canonical: '/',
    keywords: [
      'travel planner',
      'trip planner',
      'AI travel planner',
      'India travel planner',
      'group travel planner',
      'collaborative trip planner',
      'expense splitting app for trips',
      'travel budget planner',
    ],
    searchIntent: 'Commercial & Navigational',
  },
  features: {
    title: 'Features – AI Itinerary, Group Split & Budget Tools | TripTally',
    description:
      'Explore TripTally features: Google Gemini AI itinerary generation, fair debt-minimizing rupee expense splits, real-time budget alerts, interactive maps, and smart packing lists.',
    canonical: '/features',
    keywords: [
      'travel planner features',
      'collaborative trip planner tools',
      'group travel features',
      'AI itinerary features',
      'expense splitting tools',
    ],
    searchIntent: 'Commercial & Informational',
  },
  aiItineraryGenerator: {
    title: 'AI Itinerary Generator – Plan Your India Trip with TripTally',
    description:
      'Generate day-by-day travel itineraries in seconds using AI. Customise by budget in INR, group size, and travel style for destinations across India and worldwide.',
    canonical: '/ai-itinerary-generator',
    keywords: [
      'AI itinerary generator',
      'AI travel planner',
      'India trip itinerary generator',
      'free AI itinerary maker',
      'automatic trip planner',
      'custom travel itinerary generator',
    ],
    searchIntent: 'Transactional & Informational',
  },
  groupTripPlanner: {
    title: 'Collaborative Group Trip Planner – Plan Trips with Friends | TripTally',
    description:
      'Organise group trips without chaotic WhatsApp chats. Invite friends via 1-click link, assign organizer/editor roles, coordinate daily schedules, and vote on activities.',
    canonical: '/group-trip-planner',
    keywords: [
      'group travel planner',
      'collaborative trip planner',
      'trip planning app for friends',
      'shared travel itinerary',
      'group vacation organizer',
    ],
    searchIntent: 'Commercial & Informational',
  },
  travelExpenseSplitter: {
    title: 'Travel Expense Splitter – Split Trip Costs & UPI Settlement | TripTally',
    description:
      'Split group trip bills fairly in Indian Rupees (₹). Our debt simplification algorithm minimizes transactions so friends can settle balances directly via UPI apps.',
    canonical: '/travel-expense-splitter',
    keywords: [
      'travel expense splitter',
      'expense splitting app for trips',
      'group expense tracker',
      'split trip costs with friends',
      'UPI expense settlement',
      'vacation bill splitter',
    ],
    searchIntent: 'Transactional & Commercial',
  },
  travelBudgetPlanner: {
    title: 'Travel Budget Planner & Trip Cost Calculator | TripTally',
    description:
      'Estimate and track trip costs in Indian Rupees. Set category spending limits for hotels, food, and cabs, and receive real-time budget alerts before overspending.',
    canonical: '/travel-budget-planner',
    keywords: [
      'travel budget planner',
      'travel budget calculator',
      'trip cost calculator',
      'vacation budget tracker',
      'India travel expense estimator',
    ],
    searchIntent: 'Informational & Commercial',
  },
  destinations: {
    title: 'India Travel Guides & Itineraries – Curated Trip Circuits | TripTally',
    description:
      'Discover detailed travel itineraries and budget breakdowns for top Indian circuits: Manali, Goa, Kerala, Kashmir, Jaipur, Rishikesh, and more.',
    canonical: '/destinations',
    keywords: [
      'India travel planner',
      'India travel itineraries',
      'holiday planning website',
      'India holiday packages DIY',
      'top Indian travel destinations',
    ],
    searchIntent: 'Informational',
  },
  about: {
    title: 'About TripTally – Smarter Collaborative Travel Planning for India',
    description:
      'Learn how TripTally empowers friends, families, and solo travellers to plan adventures seamlessly with AI itineraries, shared workspaces, and fair rupee expense tallying.',
    canonical: '/about',
    keywords: [
      'about TripTally',
      'collaborative travel startup',
      'travel tech India',
      'trip planner mission',
    ],
    searchIntent: 'Navigational & Informational',
  },
  contact: {
    title: 'Contact TripTally – Support, Feedback & Travel Partnerships',
    description:
      'Have questions or feedback? Contact the TripTally team for product support, feature requests, or travel creator partnerships.',
    canonical: '/contact',
    keywords: [
      'contact TripTally',
      'travel planner support',
      'TripTally feedback',
    ],
    searchIntent: 'Navigational',
  },
};

/**
 * Standard Organization Schema (Schema.org)
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    url: SITE_CONFIG.siteUrl,
    logo: `${SITE_CONFIG.siteUrl}/og-image.png`,
    description: SITE_CONFIG.description,
    foundingDate: '2024',
    sameAs: [
      'https://twitter.com/TripTallyApp',
      'https://github.com/learnervivek/TripTally',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        email: SITE_CONFIG.contactEmail,
        contactType: 'customer support',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi'],
      },
    ],
  };
}

/**
 * WebSite Schema with PotentialAction (Schema.org)
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.siteUrl,
    description: SITE_CONFIG.description,
    inLanguage: 'en-IN',
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.siteUrl}/og-image.png`,
      },
    },
  };
}

/**
 * SoftwareApplication Schema (Schema.org)
 */
export function getSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_CONFIG.name,
    applicationCategory: 'TravelApplication',
    operatingSystem: 'All modern web browsers (Chrome, Safari, Firefox, Edge)',
    browserRequirements: 'Requires JavaScript and HTML5 support',
    url: SITE_CONFIG.siteUrl,
    description: SITE_CONFIG.description,
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    featureList: [
      'Google Gemini AI Itinerary Generation',
      'Collaborative Group Travel Workspaces',
      'Debt-Minimizing Rupee Expense Splitting',
      'UPI Settlement Verification (GPay, PhonePe, Paytm)',
      'Real-Time Category Budget Tracking & Alerts',
      'Collaborative Packing Checklist by Category',
      'Interactive OpenStreetMap Route Visualization',
    ],
  };
}

/**
 * BreadcrumbList Schema generator
 */
export function getBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http')
        ? item.url
        : `${SITE_CONFIG.siteUrl}${item.url}`,
    })),
  };
}

/**
 * FAQPage Schema generator
 */
export function getFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

