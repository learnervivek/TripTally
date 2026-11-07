/**
 * TripTally Build-Time Static Prerenderer (SSG for React + Vite)
 * Generates route-specific static HTML files in dist/ with pre-injected
 * page titles, meta descriptions, canonical URLs, Open Graph / Twitter tags,
 * Schema.org JSON-LD structured data, and semantic HTML snapshots.
 *
 * This guarantees 100% search engine indexability and instant social share previews
 * on WhatsApp, Twitter/X, LinkedIn, Facebook, Slack, and Discord.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

// Read the base built template
const templatePath = path.join(distDir, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error('[Prerender] Error: dist/index.html does not exist. Run vite build first.');
  process.exit(1);
}
const baseTemplate = fs.readFileSync(templatePath, 'utf8');

const SITE_URL = process.env.VITE_SITE_URL || 'https://triptally.vercel.app';

// Static Route Definitions for Prerendering
const routes = [
  {
    path: '/',
    title: 'TripTally – AI Travel Planner & Group Trip Expense Manager',
    description:
      'Plan trips with friends, generate personalised travel itineraries, track budgets, and split expenses easily with TripTally, your AI-powered travel planner.',
    keywords:
      'travel planner, trip planner, AI travel planner, India travel planner, group travel planner, collaborative trip planner, expense splitting app for trips, travel budget planner, UPI trip expense settlement',
    ogImage: `${SITE_URL}/og-image.png`,
    h1: 'Plan Better Trips with TripTally',
    h2: 'AI-Powered Collaborative Travel Planner for Indian Travellers',
    content:
      'TripTally is the modern collaborative workspace for friend circles and group adventurers across India. Generate day-by-day itineraries with Google Gemini AI, organize shared packing checklists, track category budgets in Indian Rupees (₹), and split bills equitably with optimized UPI settlement.',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'TripTally',
        legalName: 'TripTally Travel Technologies',
        url: SITE_URL,
        logo: `${SITE_URL}/og-image.png`,
        description: 'Collaborative travel planner with AI itineraries and group expense splitting.',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        url: SITE_URL,
        name: 'TripTally',
        description: 'AI Travel Planner & Group Trip Expense Manager',
        inLanguage: 'en-IN',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'TripTally',
        applicationCategory: 'TravelApplication',
        operatingSystem: 'All modern web browsers',
        url: SITE_URL,
        description: 'AI travel planner and group expense tracker for trips across India.',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
      },
    ],
  },
  {
    path: '/features',
    title: 'Features – AI Itinerary, Group Split & Budget Tools | TripTally',
    description:
      'Explore TripTally features: Google Gemini AI itinerary generation, fair debt-minimizing rupee expense splits, real-time budget alerts, interactive maps, and smart packing lists.',
    keywords:
      'travel planner features, collaborative trip planner tools, group travel features, AI itinerary features, expense splitting tools',
    ogImage: `${SITE_URL}/og-image.png`,
    h1: 'TripTally Features – Modern Tools for Collaborative Travel',
    h2: 'Everything Your Travel Group Needs Under One Roof',
    content:
      'From Google Gemini AI-generated day-by-day itineraries to fair rupee split ledgers, interactive maps, and smart packing checklists, TripTally brings your entire journey together. Designed specifically for Indian friend circles and road trippers with 100% INR support and instant UPI debt settlement.',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'TripTally Features',
        applicationCategory: 'TravelApplication',
        url: `${SITE_URL}/features`,
        description: 'Complete suite of collaborative trip planning and expense tallying tools.',
      },
    ],
  },
  {
    path: '/ai-itinerary-generator',
    title: 'AI Itinerary Generator – Plan Your India Trip with TripTally',
    description:
      'Generate day-by-day travel itineraries in seconds using AI. Customise by budget in INR, group size, and travel style for destinations across India and worldwide.',
    keywords:
      'AI itinerary generator, AI travel planner, India trip itinerary generator, free AI itinerary maker, custom travel itinerary generator',
    ogImage: `${SITE_URL}/og-image.png`,
    h1: 'AI Itinerary Generator – Free Personalised Travel Plans in Seconds',
    h2: 'Google Gemini 2.5 Flash Travel Intelligence',
    content:
      'Tell TripTally where you want to go and your budget in Indian Rupees (₹), and get a tailored day-by-day itinerary with timings, locations, estimated activity costs, and transit tips ready to share with friends. Easily customize and convert any AI plan into a collaborative group trip board.',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'TripTally AI Itinerary Generator',
        applicationCategory: 'TravelApplication',
        url: `${SITE_URL}/ai-itinerary-generator`,
        description: 'Generate custom day-by-day travel itineraries with Google Gemini AI.',
      },
    ],
  },
  {
    path: '/group-trip-planner',
    title: 'Collaborative Group Trip Planner – Plan Trips with Friends | TripTally',
    description:
      'Organise group trips without chaotic WhatsApp chats. Invite friends via 1-click link, assign organizer/editor roles, coordinate daily schedules, and vote on activities.',
    keywords:
      'group travel planner, collaborative trip planner, trip planning app for friends, shared travel itinerary, group vacation organizer',
    ogImage: `${SITE_URL}/og-image.png`,
    h1: 'Collaborative Group Trip Planner for Friends & Families',
    h2: 'Co-Plan Adventures in Real-Time',
    content:
      'End the chaos of 500+ unread WhatsApp messages and conflicting notes. TripTally gives your entire travel crew a single shared workspace to coordinate schedules, assign packing responsibilities, vote on attractions, and stay synchronized on the go.',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'TripTally Group Trip Planner',
        applicationCategory: 'TravelApplication',
        url: `${SITE_URL}/group-trip-planner`,
      },
    ],
  },
  {
    path: '/travel-expense-splitter',
    title: 'Travel Expense Splitter – Split Trip Costs & UPI Settlement | TripTally',
    description:
      'Split group trip bills fairly in Indian Rupees (₹). Our debt simplification algorithm minimizes transactions so friends can settle balances directly via UPI apps.',
    keywords:
      'travel expense splitter, expense splitting app for trips, group expense tracker, split trip costs with friends, UPI expense settlement, vacation bill splitter',
    ogImage: `${SITE_URL}/og-image.png`,
    h1: 'Travel Expense Splitter & UPI Settle Up for Group Trips',
    h2: '100% in Indian Rupees (₹) with Graph Debt Minimization',
    content:
      'Log trip bills in rupees, split equally or custom, and let TripTally calculate the exact minimum UPI transfers needed to square up. Collapse complex cross-debts into 1 or 2 direct transfers via Google Pay, PhonePe, Paytm, or BHIM.',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'TripTally Travel Expense Splitter',
        applicationCategory: 'FinanceApplication',
        url: `${SITE_URL}/travel-expense-splitter`,
      },
    ],
  },
  {
    path: '/travel-budget-planner',
    title: 'Travel Budget Planner & Trip Cost Calculator | TripTally',
    description:
      'Estimate and track trip costs in Indian Rupees. Set category spending limits for hotels, food, and cabs, and receive real-time budget alerts before overspending.',
    keywords:
      'travel budget planner, travel budget calculator, trip cost calculator, vacation budget tracker, India travel expense estimator',
    ogImage: `${SITE_URL}/og-image.png`,
    h1: 'Travel Budget Planner & Trip Cost Calculator for India',
    h2: 'Interactive Group Expense Estimator and Live Budget Alerts',
    content:
      'Calculate realistic group trip budgets across premier Indian circuits including Manali, Goa, Kerala, Kashmir, and Rajasthan. Set category-level targets for lodging, transit, food, and activities, and monitor spending against alerts.',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'TripTally Travel Budget Planner',
        applicationCategory: 'FinanceApplication',
        url: `${SITE_URL}/travel-budget-planner`,
      },
    ],
  },
  {
    path: '/destinations',
    title: 'India Travel Guides & Itineraries – Curated Trip Circuits | TripTally',
    description:
      'Discover detailed travel itineraries and budget breakdowns for top Indian circuits: Manali, Goa, Kerala, Kashmir, Jaipur, Rishikesh, and more.',
    keywords:
      'India travel planner, India travel itineraries, holiday planning website, India holiday packages DIY, top Indian travel destinations',
    ogImage: `${SITE_URL}/og-image.png`,
    h1: 'Curated India Travel Guides & Day-by-Day Itineraries',
    h2: 'Domestic Circuits with Realistic Rupee Budgets',
    content:
      'Explore battle-tested domestic travel itineraries created for friend circles, families, and road trippers. Realistic budgets in Indian Rupees, daily schedules, transit timing, packing checklists, and authentic tips for Manali, Goa, Kerala, Kashmir, Jaipur, and Rishikesh.',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'TripTally India Travel Guides',
        url: `${SITE_URL}/destinations`,
      },
    ],
  },
  {
    path: '/destinations/manali',
    title: 'Manali 5-Day Trip Planner & Budget Itinerary | TripTally',
    description:
      'Plan your Manali trip with friends: complete 5-day itinerary covering Solang Valley, Atal Tunnel, Old Manali cafes, and honest budget breakdown in INR.',
    keywords:
      'Manali trip planner, Manali 5 day itinerary, Manali trip budget for 4 friends, Himachal Pradesh trip planner, Solang valley snow trip planner',
    ogImage:
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    h1: 'Manali & Solang Valley 5-Day Trip Planner & Budget Guide',
    h2: 'Snow & Adventure in Himachal Pradesh',
    content:
      'Nestled in the Beas River valley at an altitude of 2,050 meters, Manali is India’s premier mountain getaway. Complete 5-day itinerary covering Old Manali cafes, Solang Valley paragliding, Atal Tunnel drive to Sissu waterfall, and Naggar Castle with estimated budget of ₹40,000 for 4 friends.',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'TouristDestination',
        name: 'Manali & Solang Valley',
        description: 'Complete 5-day Himachal adventure itinerary and budget guide.',
      },
    ],
  },
  {
    path: '/destinations/goa',
    title: 'Goa 4-Day Trip Planner & Group Itinerary | TripTally',
    description:
      'Plan your Goa trip with friends: 4-day North and South Goa itinerary, scooty rental tips, sunset beach shacks, and group expense budget in INR.',
    keywords:
      'Goa trip planner, Goa 4 day itinerary for friends, Goa group travel budget, North Goa vs South Goa itinerary',
    ogImage:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    h1: 'Goa Coastal Getaway 4-Day Trip Planner & Group Itinerary',
    h2: 'Beaches, Shacks & Fontainhas Heritage in Goa',
    content:
      'Sun-drenched beaches, breezy coastal shacks, Portuguese heritage lanes, and vibrant nightlife. 4-day itinerary covering Chapora Fort sunsets, Calangute water sports, Fontainhas Latin quarter, and Old Goa churches with estimated budget of ₹36,000 for 4-5 friends.',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'TouristDestination',
        name: 'Goa Coastal Circuit',
      },
    ],
  },
  {
    path: '/destinations/kerala',
    title: 'Kerala 6-Day Itinerary & Backwater Travel Guide | TripTally',
    description:
      'Plan an authentic 6-day Kerala trip: Munnar misty tea estates, Alleppey private houseboat cruise, and complete group budget planner in INR.',
    keywords:
      'Kerala trip planner, Kerala 6 day itinerary, Alleppey houseboat budget for group, Munnar tour planner',
    ogImage:
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    h1: 'Kerala Backwaters & Munnar 6-Day Travel Guide',
    h2: "Misty Tea Estates and Private Houseboat in God's Own Country",
    content:
      'From the emerald green rolling tea gardens of Munnar to the tranquil canals of Alleppey. 6-day itinerary covering Fort Kochi, Eravikulam National Park, Thekkady spice plantations, and private overnight deluxe houseboat in Alleppey.',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'TouristDestination',
        name: 'Kerala Backwaters & Munnar',
      },
    ],
  },
  {
    path: '/destinations/kashmir',
    title: 'Kashmir 6-Day Itinerary & Gulmarg Trip Planner | TripTally',
    description:
      'Plan your Kashmir dream trip: Shikara rides on Dal Lake, Gulmarg Gondola Phase 2 snow tips, Pahalgam valleys, and group cost calculator in INR.',
    keywords:
      'Kashmir itinerary planner, Kashmir trip budget for 4, Gulmarg Gondola booking tips, Srinagar Gulmarg Pahalgam itinerary',
    ogImage:
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
    h1: 'Kashmir Paradise Adventure 6-Day Trip Planner & Budget Guide',
    h2: 'Srinagar, Gulmarg Gondola & Pahalgam Valleys',
    content:
      'Ornate cedar-wood houseboats floating on Dal Lake, alpine snow peaks of Gulmarg accessible via cable car, and rushing turquoise waters of Lidder River in Pahalgam. Complete 6-day Kashmir group itinerary with budget in INR.',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'TouristDestination',
        name: 'Srinagar & Gulmarg Valley',
      },
    ],
  },
  {
    path: '/destinations/jaipur',
    title: 'Jaipur & Udaipur 4-Day Rajasthan Travel Planner | TripTally',
    description:
      'Plan your 4-day Rajasthan royal circuit: Amer Fort, Lake Pichola sunset boat cruise, authentic Rajasthani thali, and group expense planner in INR.',
    keywords:
      'Jaipur travel planner, Jaipur Udaipur 4 day itinerary, Rajasthan group trip budget, Amer fort itinerary',
    ogImage:
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    h1: 'Jaipur & Udaipur 4-Day Royal Rajasthan Travel Planner',
    h2: 'Grand Forts, Palaces & Lake Pichola in Rajasthan',
    content:
      'Experience the grandeur of royal Rajputana across the Pink City of Jaipur and romantic Udaipur. 4-day itinerary covering Hawa Mahal, Amer Fort, Johari Bazaar, Lake Pichola boat cruise, and City Palace.',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'TouristDestination',
        name: 'Jaipur & Udaipur Heritage Circuit',
      },
    ],
  },
  {
    path: '/destinations/rishikesh',
    title: 'Rishikesh 3-Day Weekend Itinerary & Rafting Guide | TripTally',
    description:
      'Plan a 3-day Rishikesh adventure with friends: 16km Ganga river rafting, cliff jumping, riverside campfire, Triveni Ghat aarti, and budget planner in INR.',
    keywords:
      'Rishikesh trip planner, Rishikesh 3 day itinerary, Rishikesh river rafting budget, Delhi to Rishikesh weekend getaway',
    ogImage:
      'https://images.unsplash.com/photo-1718383538820-524dd564fd06?auto=format&fit=crop&w=1200&q=80',
    h1: 'Rishikesh 3-Day Weekend Adventure Itinerary & Rafting Guide',
    h2: 'Grade-3 White Water Ganga Rafting & Riverside Camping',
    content:
      'Where the turquoise Ganges emerges from Himalayan foothills. 3-day itinerary covering 16km river rafting from Shivpuri, cliff jumping, Parmarth Niketan Ganga aarti, Beatles Ashram, and riverside campfires.',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'TouristDestination',
        name: 'Rishikesh & Haridwar',
      },
    ],
  },
  {
    path: '/destinations/ladakh',
    title: 'Ladakh 7-Day Road Trip Planner & Pangong Tso Itinerary | TripTally',
    description:
      'Plan your Ladakh road trip with friends: 7-day itinerary covering Leh, Nubra Valley, Khardung La, Pangong Tso lake, and complete group budget in INR.',
    keywords:
      'Ladakh trip planner, Ladakh 7 day itinerary, Ladakh road trip budget for friends, Pangong Tso itinerary, Nubra valley travel planner',
    ogImage:
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    h1: 'Ladakh 7-Day Road Trip Planner & Pangong Tso Itinerary',
    h2: 'High Altitude Mountain Passes & Desert Lakes in Ladakh',
    content:
      'Known as the Land of High Passes, Ladakh is the holy grail of Indian road trips. Complete 7-day itinerary covering Leh acclimatization, Khardung La pass at 17,582 ft, Nubra Valley sand dunes, and turquoise waters of Pangong Tso.',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'TouristDestination',
        name: 'Ladakh & Pangong Tso',
      },
    ],
  },
  {
    path: '/destinations/meghalaya',
    title: 'Meghalaya 6-Day Travel Itinerary & Living Root Bridges | TripTally',
    description:
      'Plan an unforgettable 6-day Meghalaya trip with friends: Shillong cafes, Cherrapunji roaring waterfalls, Double Decker Living Root Bridge, and Dawki crystal river.',
    keywords:
      'Meghalaya travel itinerary, Meghalaya trip planner, Cherrapunji living root bridge trek, Dawki crystal river boat ride',
    ogImage:
      'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1200&q=80',
    h1: 'Meghalaya 6-Day Travel Itinerary & Living Root Bridges',
    h2: 'Abode of Clouds, Thundering Waterfalls & Crystal Rivers',
    content:
      'Known as the Abode of Clouds, Meghalaya in Northeast India features emerald rainforests, thundering Nohkalikai waterfalls, bio-engineered Double Decker Living Root Bridges in Nongriat, and transparent glass-like waters of the Umngot River in Dawki.',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'TouristDestination',
        name: 'Meghalaya & Cherrapunji',
      },
    ],
  },
  {
    path: '/about',
    title: 'About TripTally – Smarter Collaborative Travel Planning for India',
    description:
      'Learn how TripTally empowers friends, families, and solo travellers to plan adventures seamlessly with AI itineraries, shared workspaces, and fair rupee expense tallying.',
    keywords: 'about TripTally, collaborative travel startup, travel tech India, trip planner mission',
    ogImage: `${SITE_URL}/og-image.png`,
    h1: 'About TripTally – Smarter Group Travel Planning for India',
    h2: 'Our Mission & Architecture',
    content:
      'TripTally was created to solve the real frustrations of group travel in India. We believe planning an adventure with friends should be as thrilling as the journey itself. 100% free with native rupee support, UPI settlements, and Gemini AI itinerary generation.',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'TripTally',
        url: `${SITE_URL}/about`,
      },
    ],
  },
  {
    path: '/contact',
    title: 'Contact TripTally – Support, Feedback & Travel Partnerships',
    description:
      'Have questions or feedback? Contact the TripTally team for product support, feature requests, or travel creator partnerships.',
    keywords: 'contact TripTally, travel planner support, TripTally feedback',
    ogImage: `${SITE_URL}/og-image.png`,
    h1: 'Get in Touch with the TripTally Team',
    h2: 'Support, Feedback & Creator Partnerships',
    content:
      'Reach out directly to the TripTally engineering and support team at support@triptally.com for technical help, feature suggestions, or travel creator collaborations.',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact TripTally',
        url: `${SITE_URL}/contact`,
      },
    ],
  },
];

console.log(`[Prerender] Starting static HTML generation for ${routes.length} public routes...`);

routes.forEach((route) => {
  const canonicalUrl = `${SITE_URL}${route.path === '/' ? '' : route.path}`;

  let html = baseTemplate;

  // Replace Title
  html = html.replace(
    /<title>.*?<\/title>/i,
    `<title>${route.title}</title>`
  );

  // Replace Description
  html = html.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${route.description}" />`
  );

  // Replace Canonical Link
  html = html.replace(
    /<link rel="canonical" href=".*?" \/>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );

  // Replace Open Graph Tags
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/i,
    `<meta property="og:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/i,
    `<meta property="og:description" content="${route.description}" />`
  );
  html = html.replace(
    /<meta property="og:url" content=".*?" \/>/i,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta property="og:image" content=".*?" \/>/i,
    `<meta property="og:image" content="${route.ogImage}" />`
  );

  // Replace Twitter Card Tags
  html = html.replace(
    /<meta name="twitter:title" content=".*?" \/>/i,
    `<meta name="twitter:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content=".*?" \/>/i,
    `<meta name="twitter:description" content="${route.description}" />`
  );
  html = html.replace(
    /<meta name="twitter:image" content=".*?" \/>/i,
    `<meta name="twitter:image" content="${route.ogImage}" />`
  );

  // Inject Schemas
  if (route.schemas && route.schemas.length > 0) {
    const schemaScript = `\n    <script type="application/ld+json" data-prerendered="true">\n    ${JSON.stringify(
      route.schemas,
      null,
      2
    )}\n    </script>\n  </head>`;
    html = html.replace('</head>', schemaScript);
  }

  // Inject Crawlable Semantic Static Snapshot into #root
  // When a crawler without JS crawls, it reads full semantic HTML!
  // When a browser loads, React mounts and hydrates into #root.
  const prerenderBody = `
    <div id="root">
      <header style="padding: 1rem; border-bottom: 1px solid #e5e5e5; display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto;">
        <a href="/" style="font-weight: bold; font-size: 1.25rem; color: #1B4332; text-decoration: none;">TripTally</a>
        <nav style="display: flex; gap: 1rem;">
          <a href="/destinations" style="color: #444; text-decoration: none; font-size: 0.875rem;">Destinations</a>
          <a href="/features" style="color: #444; text-decoration: none; font-size: 0.875rem;">Features</a>
          <a href="/ai-itinerary-generator" style="color: #444; text-decoration: none; font-size: 0.875rem;">AI Planner</a>
          <a href="/about" style="color: #444; text-decoration: none; font-size: 0.875rem;">About</a>
          <a href="/contact" style="color: #444; text-decoration: none; font-size: 0.875rem;">Contact</a>
        </nav>
      </header>
      <main style="max-width: 1100px; margin: 2rem auto; padding: 0 1rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <h1 style="font-size: 2.25rem; font-weight: bold; color: #1B4332; margin-bottom: 0.5rem; line-height: 1.2;">${route.h1}</h1>
        <h2 style="font-size: 1.25rem; color: #E07A5F; font-weight: 600; margin-bottom: 1rem;">${route.h2}</h2>
        <p style="font-size: 1rem; line-height: 1.6; color: #444; margin-bottom: 1.5rem;">${route.content}</p>
        <div style="margin-top: 1.5rem;">
          <a href="/register" style="display: inline-block; background-color: #1B4332; color: #fff; padding: 0.75rem 1.5rem; border-radius: 0.75rem; text-decoration: none; font-weight: bold; font-size: 0.875rem;">Get Started Free on TripTally</a>
        </div>
      </main>
      <footer style="margin-top: 4rem; padding: 2rem 1rem; border-top: 1px solid #e5e5e5; text-align: center; font-size: 0.75rem; color: #666;">
        <p>© ${new Date().getFullYear()} TripTally Travel Technologies. AI-Powered Collaborative Travel Planner &amp; Group Expense Manager for Indian Travellers.</p>
        <p><a href="/sitemap.xml" style="color: #1B4332;">XML Sitemap</a> • <a href="/destinations" style="color: #1B4332;">All Destinations</a> • <a href="/features" style="color: #1B4332;">Features</a></p>
      </footer>
    </div>
  `;

  html = html.replace('<div id="root"></div>', prerenderBody);

  // Determine output path
  let targetPath;
  if (route.path === '/') {
    targetPath = path.join(distDir, 'index.html');
  } else {
    const routeFolder = path.join(distDir, route.path.replace(/^\//, ''));
    if (!fs.existsSync(routeFolder)) {
      fs.mkdirSync(routeFolder, { recursive: true });
    }
    targetPath = path.join(routeFolder, 'index.html');
  }

  fs.writeFileSync(targetPath, html, 'utf8');
  console.log(`[Prerender] Generated: ${path.relative(distDir, targetPath)}`);
});

console.log('[Prerender] All static HTML routes successfully generated for search crawlers!');

