/**
 * Curated Indian Destination Guides & Itineraries
 * Rich, authentic travel guides targeting long-tail Indian destination search queries.
 */

export const DESTINATIONS = [
  {
    slug: 'manali',
    name: 'Manali & Solang Valley',
    state: 'Himachal Pradesh',
    badge: 'Snow & Adventure',
    metaTitle: 'Manali 5-Day Trip Planner & Budget Itinerary | TripTally',
    metaDescription:
      'Plan your Manali trip with friends: complete 5-day itinerary covering Solang Valley, Atal Tunnel, Old Manali cafes, and honest budget breakdown in INR.',
    keywords: [
      'Manali trip planner',
      'Manali 5 day itinerary',
      'Manali trip budget for 4 friends',
      'Himachal Pradesh trip planner',
      'Solang valley snow trip planner',
      'Delhi to Manali road trip itinerary',
    ],
    heroImage:
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    heroAlt:
      'Snow-capped Himalayan peaks and pine forests in Solang Valley near Manali Himachal Pradesh',
    idealDuration: '5 Days / 4 Nights',
    recommendedTravelers: '4 Friends / Group',
    estBudget: 40000,
    perPersonCost: 10000,
    bestTimeToVisit: 'October to June (Snow: Dec-Feb, Pleasant: Mar-Jun)',
    route: 'Delhi • Chandigarh • Kullu • Manali • Solang • Sissu',
    overview:
      'Nestled in the Beas River valley at an altitude of 2,050 meters, Manali is India’s premier mountain getaway for friend circles and adventure seekers. Whether navigating the iconic Atal Tunnel to Sissu, ziplining across Solang Valley, or soaking in the tranquil bohemian vibe of Old Manali cafes, this 5-day circuit balances high thrills with cozy Himalayan charm.',
    budgetBreakdown: [
      { category: 'Stay (4 nights, 2 rooms/homestay)', amount: 16000, percentage: 40 },
      { category: 'Transport (Volvo bus + local 4x4 cab)', amount: 12000, percentage: 30 },
      { category: 'Food & Cafes (Old Manali cafes & dhabas)', amount: 8000, percentage: 20 },
      { category: 'Activities (Snow gear, Solang paragliding)', amount: 4000, percentage: 10 },
    ],
    itineraryDays: [
      {
        day: 1,
        title: 'Arrival in Manali & Old Manali Cafe Stroll',
        schedule: [
          { time: '08:30 AM', activity: 'Arrive via overnight Volvo bus at Private Bus Stand, check into hotel/homestay' },
          { time: '12:00 PM', activity: 'Walk through cedar forests to ancient wooden Hadimba Devi Temple' },
          { time: '03:30 PM', activity: 'Explore vibrant Old Manali alleys, trout eateries, and live acoustic music cafes' },
          { time: '08:00 PM', activity: 'Group wood-fired pizza and hot apple cider dinner at riverside cafe' },
        ],
      },
      {
        day: 2,
        title: 'Solang Valley Adventure & Zorbing',
        schedule: [
          { time: '09:00 AM', activity: 'Drive up to Solang Valley with warm jacket rentals' },
          { time: '11:00 AM', activity: 'Paragliding ride overlooking pine valleys and ropeway cable car ascent' },
          { time: '02:00 PM', activity: 'Local maggi, momos, and hot tea at mountain stalls' },
          { time: '05:00 PM', activity: 'Visit Vashisht Village for natural hot sulphur spring baths' },
        ],
      },
      {
        day: 3,
        title: 'Atal Tunnel Drive to Sissu (Lahaul Valley)',
        schedule: [
          { time: '08:00 AM', activity: 'Scenic morning drive through the engineering marvel of Atal Tunnel (9.02 km)' },
          { time: '10:30 AM', activity: 'Witness the dramatic change into Lahaul’s arid mountain landscape at Sissu waterfall' },
          { time: '01:00 PM', activity: 'Streamside picnic lunch and photography by Sissu Lake' },
          { time: '05:00 PM', activity: 'Return to Manali, evening souvenir shopping at Mall Road' },
        ],
      },
      {
        day: 4,
        title: 'Naggar Castle & Heritage Art Gallery',
        schedule: [
          { time: '10:00 AM', activity: 'Scenic drive to medieval Naggar Castle overlooking Kullu valley' },
          { time: '01:00 PM', activity: 'Traditional Himachali lunch (Siddu with ghee and dal) at local dhaba' },
          { time: '03:00 PM', activity: 'Nicholas Roerich Art Gallery and quiet forest trails' },
          { time: '07:30 PM', activity: 'Cozy group bonfire and expense tallying session on TripTally' },
        ],
      },
      {
        day: 5,
        title: 'Jogini Waterfall Trek & Departure',
        schedule: [
          { time: '08:30 AM', activity: 'Gentle 3 km morning hike from Vashisht to roaring Jogini Waterfall' },
          { time: '01:00 PM', activity: 'Last lunch in Old Manali, souvenir and woollen shawl pickups' },
          { time: '05:30 PM', activity: 'Board return Volvo bus to Delhi/Chandigarh' },
        ],
      },
    ],
    packingEssentials: [
      'Layered fleece and windproof thermal jackets',
      'Waterproof trekking boots with deep grip',
      'High-SPF sunscreen and polarized sunglasses for snow glare',
      'Personal medicine kit (altitude, motion sickness, cold)',
      'High-capacity power bank for cold-induced battery drain',
    ],
    faqs: [
      {
        question: 'How much does a 5-day Manali trip cost for 4 friends?',
        answer:
          'A comfortable 5-day group trip to Manali costs roughly ₹40,000 in total (approximately ₹10,000 per person) including Volvo bus fares, cozy homestays, local 4x4 cab hires, meals, and Solang activities.',
      },
      {
        question: 'Is Atal Tunnel open throughout the year?',
        answer:
          'Atal Tunnel is generally open year-round, connecting Manali to Sissu. However, during heavy snowfall in January and February, local administration might temporarily limit travel to 4x4 vehicles only.',
      },
    ],
  },
  {
    slug: 'goa',
    name: 'Goa Coastal Getaway',
    state: 'Goa',
    badge: 'Beaches & Shacks',
    metaTitle: 'Goa 4-Day Trip Planner & Group Itinerary | TripTally',
    metaDescription:
      'Plan your Goa trip with friends: 4-day North and South Goa itinerary, scooty rental tips, sunset beach shacks, and group expense budget in INR.',
    keywords: [
      'Goa trip planner',
      'Goa 4 day itinerary for friends',
      'Goa group travel budget',
      'North Goa vs South Goa itinerary',
      'Goa holiday expense calculator',
    ],
    heroImage:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    heroAlt:
      'Palm-fringed golden sandy beach and Arabian Sea sunset in Goa India',
    idealDuration: '4 Days / 3 Nights',
    recommendedTravelers: '4 to 6 Friends',
    estBudget: 36000,
    perPersonCost: 9000,
    bestTimeToVisit: 'November to March for beach weather and water sports',
    route: 'Panaji • Anjuna • Vagator • Fontainhas • Palolem',
    overview:
      'Sun-drenched beaches, breezy coastal shacks, Portuguese heritage lanes, and vibrant nightlife make Goa the ultimate group escape for Indian travellers. This 4-day plan balances the buzz of North Goa (Anjuna, Vagator) with the colorful colonial architecture of Fontainhas and tranquil sunsets.',
    budgetBreakdown: [
      { category: 'Stay (3 nights, private villa/resort)', amount: 15000, percentage: 42 },
      { category: 'Local Transport (Scooter/Thar rentals + fuel)', amount: 7000, percentage: 19 },
      { category: 'Food & Shacks (Seafood, Goan curries, drinks)', amount: 10000, percentage: 28 },
      { category: 'Water Sports & Fort Entry Fees', amount: 4000, percentage: 11 },
    ],
    itineraryDays: [
      {
        day: 1,
        title: 'Arrival in North Goa & Vagator Sunset',
        schedule: [
          { time: '11:00 AM', activity: 'Land at Dabolim or Mopa airport, pickup rental scooters/Thar' },
          { time: '01:30 PM', activity: 'Check into North Goa stay, feast on authentic Goan fish curry thali' },
          { time: '05:00 PM', activity: 'Hike up Chapora Fort ramparts for iconic Arabian Sea sunset view' },
          { time: '08:30 PM', activity: 'Dinner with live music at an Anjuna cliffside restaurant' },
        ],
      },
      {
        day: 2,
        title: 'Water Sports & Beach Shack Vibe',
        schedule: [
          { time: '09:00 AM', activity: 'Parasailing and jet ski sessions at Calangute/Baga' },
          { time: '01:00 PM', activity: 'Chilled afternoon at Morjim or Ashwem quiet beach shacks' },
          { time: '05:30 PM', activity: 'Sunset catamaran cruise or coastal walk along Mandrem' },
          { time: '09:00 PM', activity: 'Group beach barbecue and seafood platters' },
        ],
      },
      {
        day: 3,
        title: 'Fontainhas Latin Quarter & Spice Plantation',
        schedule: [
          { time: '09:30 AM', activity: 'Heritage photography walk through pastel Portuguese houses in Fontainhas, Panaji' },
          { time: '01:00 PM', activity: 'Traditional Goan lunch at historic Panaji tavern' },
          { time: '03:30 PM', activity: 'Tour an organic Ponda spice plantation with fresh vanilla and pepper tastings' },
          { time: '07:30 PM', activity: 'Mandovi river twilight boat ride' },
        ],
      },
      {
        day: 4,
        title: 'Old Goa Churches & Return Flight',
        schedule: [
          { time: '09:30 AM', activity: 'Visit UNESCO Basilica of Bom Jesus and Se Cathedral' },
          { time: '01:00 PM', activity: 'Pickup authentic Goan bebinca and cashew sweets' },
          { time: '04:00 PM', activity: 'Return vehicles and head to airport for departure' },
        ],
      },
    ],
    packingEssentials: [
      'Breathable linen shirts, swimwear, and beach wear',
      'Waterproof phone pouches for water sports',
      'Valid driving licenses for scooter and Thar rentals',
      'Eco-friendly reef-safe sunscreen and aloe vera gel',
    ],
    faqs: [
      {
        question: 'What is the best way to travel locally in Goa with friends?',
        answer:
          'Renting scooters (₹400-600/day) or a 6-seater vehicle/Thar (₹2,500-4,000/day) gives your group total freedom to explore secluded coves and hill viewpoints without paying inflated one-way taxi fares.',
      },
    ],
  },
  {
    slug: 'kerala',
    name: 'Kerala Backwaters & Munnar',
    state: 'Kerala',
    badge: "God's Own Country",
    metaTitle: 'Kerala 6-Day Itinerary & Backwater Travel Guide | TripTally',
    metaDescription:
      'Plan an authentic 6-day Kerala trip: Munnar misty tea estates, Alleppey private houseboat cruise, and complete group budget planner in INR.',
    keywords: [
      'Kerala trip planner',
      'Kerala 6 day itinerary',
      'Alleppey houseboat budget for group',
      'Munnar tour planner',
      'Kerala travel budget calculator',
    ],
    heroImage:
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    heroAlt:
      'Traditional wooden houseboat navigating emerald palm-lined backwaters of Alleppey Kerala',
    idealDuration: '6 Days / 5 Nights',
    recommendedTravelers: '4 Travellers / Family',
    estBudget: 55000,
    perPersonCost: 13750,
    bestTimeToVisit: 'September to March (Monsoon Ayurvedic season: Jun-Aug)',
    route: 'Kochi • Munnar • Thekkady • Alleppey • Marari',
    overview:
      'From the emerald green rolling tea gardens of Munnar to the tranquil, palm-fringed canals of Alleppey, Kerala offers an unparalleled blend of wellness, nature, and slow travel. Experience private wooden kettuvallam houseboats, fresh karimeen fry, and fragrant spice valleys.',
    budgetBreakdown: [
      { category: 'Alleppey Houseboat (Overnight full-board)', amount: 16000, percentage: 29 },
      { category: 'Resorts & Tea Stays in Munnar (4 nights)', amount: 18000, percentage: 33 },
      { category: 'Chauffeur Cab (Kochi-Munnar-Alleppey circuit)', amount: 13000, percentage: 24 },
      { category: 'Food, Spice plantation, & Kathakali show', amount: 8000, percentage: 14 },
    ],
    itineraryDays: [
      {
        day: 1,
        title: 'Arrival in Kochi & Fort Kochi Heritage',
        schedule: [
          { time: '10:00 AM', activity: 'Land at Kochi Airport, meet private Innova driver' },
          { time: '02:00 PM', activity: 'Stroll past historic Chinese Fishing Nets and Jewish Synagogue in Mattancherry' },
          { time: '06:00 PM', activity: 'Watch traditional Kathakali makeup and dance drama performance' },
        ],
      },
      {
        day: 2,
        title: 'Scenic Drive to Munnar Tea Gardens',
        schedule: [
          { time: '09:00 AM', activity: 'Drive up Western Ghats via Cheeyappara and Valara waterfalls' },
          { time: '02:00 PM', activity: 'Check into mist-covered tea estate cottage in Munnar' },
          { time: '04:30 PM', activity: 'Visit Tea Museum and observe traditional orthodox tea processing' },
        ],
      },
      {
        day: 3,
        title: 'Eravikulam National Park & Top Station',
        schedule: [
          { time: '08:00 AM', activity: 'Spot endangered Nilgiri Tahr at Eravikulam National Park' },
          { time: '01:00 PM', activity: 'Picnic lunch overlooking Mattupetty dam reservoir' },
          { time: '03:30 PM', activity: 'Panoramic viewpoint at Top Station on the Kerala-Tamil Nadu border' },
        ],
      },
      {
        day: 4,
        title: 'Thekkady Periyar Wildlife & Spices',
        schedule: [
          { time: '08:30 AM', activity: 'Drive to Thekkady through fragrant cardamom plantations' },
          { time: '02:30 PM', activity: 'Boat safari in Periyar Lake sanctuary spotting wild elephants' },
          { time: '06:00 PM', activity: 'Watch Kalaripayattu ancient martial arts demonstration' },
        ],
      },
      {
        day: 5,
        title: 'Overnight Houseboat in Alleppey Backwaters',
        schedule: [
          { time: '12:00 PM', activity: 'Board private 2-bedroom deluxe houseboat at Alleppey jetty' },
          { time: '01:30 PM', activity: 'Traditional Kerala sadhya feast served on banana leaf by onboard chef' },
          { time: '04:30 PM', activity: 'Cruise through narrow village canals, paddy fields, and duck farms' },
          { time: '08:00 PM', activity: 'Freshly prepared Karimeen Pollichathu fish dinner anchored on the lake' },
        ],
      },
      {
        day: 6,
        title: 'Marari Beach & Departure via Kochi',
        schedule: [
          { time: '09:00 AM', activity: 'Disembark houseboat after breakfast, morning breeze at pristine Marari Beach' },
          { time: '01:00 PM', activity: 'Return drive to Kochi Airport for evening flight home' },
        ],
      },
    ],
    packingEssentials: [
      'Light breathable cotton garments and umbrella',
      'Mosquito repellent lotion for backwater evenings',
      'Comfortable walking shoes for tea garden slopes',
    ],
    faqs: [
      {
        question: 'Is an overnight houseboat stay in Alleppey worth it for groups?',
        answer:
          'Yes, booking a private 2 or 3-bedroom houseboat provides an exclusive, tranquil experience with your personal captain and chef preparing fresh local dishes as you glide across the backwaters.',
      },
    ],
  },
  {
    slug: 'kashmir',
    name: 'Srinagar & Gulmarg',
    state: 'Jammu & Kashmir',
    badge: 'Himalayan Heaven',
    metaTitle: 'Kashmir 6-Day Itinerary & Gulmarg Trip Planner | TripTally',
    metaDescription:
      'Plan your Kashmir dream trip: Shikara rides on Dal Lake, Gulmarg Gondola Phase 2 snow tips, Pahalgam valleys, and group cost calculator in INR.',
    keywords: [
      'Kashmir itinerary planner',
      'Kashmir trip budget for 4',
      'Gulmarg Gondola booking tips',
      'Srinagar Gulmarg Pahalgam itinerary',
      'Kashmir group travel budget',
    ],
    heroImage:
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
    heroAlt:
      'Traditional wooden Shikara boat floating on the serene waters of Dal Lake Srinagar',
    idealDuration: '6 Days / 5 Nights',
    recommendedTravelers: '4 Travellers / Friends',
    estBudget: 65000,
    perPersonCost: 16250,
    bestTimeToVisit: 'March to October (Snow & Skiing: Dec-Feb, Tulips: April)',
    route: 'Srinagar • Gulmarg • Pahalgam • Sonmarg',
    overview:
      'Often heralded as heaven on earth, Kashmir captivates with ornate cedar-wood houseboats floating on Dal Lake, the alpine snow peaks of Gulmarg accessible via the world’s highest cable car, and the rushing turquoise Lidder River in Pahalgam. Experience saffron kehwah, royal wazwan, and warm Kashmiri hospitality.',
    budgetBreakdown: [
      { category: 'Stay (Houseboat + boutique hotels)', amount: 24000, percentage: 37 },
      { category: 'Private Chauffeur Cab (Innova for 6 days)', amount: 18000, percentage: 28 },
      { category: 'Gulmarg Gondola Phase 1 & 2 Tickets', amount: 8000, percentage: 12 },
      { category: 'Food (Wazwan, trout, Kehwah, dry fruits)', amount: 11000, percentage: 17 },
      { category: 'Shikara rides & pony charges', amount: 4000, percentage: 6 },
    ],
    itineraryDays: [
      {
        day: 1,
        title: 'Arrival in Srinagar & Dal Lake Sunset Shikara',
        schedule: [
          { time: '11:00 AM', activity: 'Land at Srinagar Airport, transfer to traditional cedar-wood houseboat' },
          { time: '02:00 PM', activity: 'Warm saffron Kehwah with crushed almonds and Kashmiri bread' },
          { time: '05:00 PM', activity: 'Gentle 2-hour sunset Shikara ride across floating gardens and Char Chinar' },
        ],
      },
      {
        day: 2,
        title: 'Mughal Gardens & Old Srinagar Bazaar',
        schedule: [
          { time: '09:30 AM', activity: 'Walk through terraced water fountains of Shalimar and Nishat Bagh' },
          { time: '01:30 PM', activity: 'Savor traditional Rogan Josh and Gushtaba wazwan lunch' },
          { time: '04:00 PM', activity: 'Explore 600-year-old Jamia Masjid and authentic Pashmina artisan workshops' },
        ],
      },
      {
        day: 3,
        title: 'Gulmarg Gondola Phase 2 Snow Heights',
        schedule: [
          { time: '07:30 AM', activity: 'Early morning drive to Gulmarg passing willow and apple orchards' },
          { time: '09:30 AM', activity: 'Ride Gulmarg Gondola Phase 1 to Kongdoori and Phase 2 to Apharwat Peak (13,780 ft)' },
          { time: '01:30 PM', activity: 'Snow sledging and photography amidst towering Himalayan ridges' },
          { time: '05:30 PM', activity: 'Return to Srinagar for warm dinner' },
        ],
      },
      {
        day: 4,
        title: 'Scenic Journey to Pahalgam (Valley of Shepherds)',
        schedule: [
          { time: '08:30 AM', activity: 'Drive to Pahalgam with stops at Pampore saffron fields and Awantipora ruins' },
          { time: '01:00 PM', activity: 'Check into riverside hotel along the crystal-clear Lidder River' },
          { time: '03:30 PM', activity: 'Visit picturesque Betaab Valley where Bollywood classics were filmed' },
        ],
      },
      {
        day: 5,
        title: 'Aru Valley & Baisaran Pine Meadow Trek',
        schedule: [
          { time: '09:00 AM', activity: 'Excursion to serene Aru Valley and hiking through pine meadows' },
          { time: '01:00 PM', activity: 'Riverside trout fish fry lunch' },
          { time: '04:00 PM', activity: 'Walk through Baisaran (dubbed Mini Switzerland) pine forests' },
        ],
      },
      {
        day: 6,
        title: 'Return to Srinagar & Airport Transfer',
        schedule: [
          { time: '08:30 AM', activity: 'Drive back to Srinagar, quick stop for Kashmiri walnuts and saffron' },
          { time: '01:00 PM', activity: 'Check-in at Srinagar Airport for return flight' },
        ],
      },
    ],
    packingEssentials: [
      'Heavy woollens, thermals, and insulated gloves (especially for Gulmarg Phase 2)',
      'Waterproof snow boots with traction',
      'Postpaid mobile SIM (prepaid SIMs from other Indian states do not work in J&K)',
    ],
    faqs: [
      {
        question: 'Do prepaid mobile SIM cards work in Kashmir?',
        answer:
          'No, due to telecom regulations in Jammu & Kashmir, only postpaid mobile connections (Jio, Airtel, BSNL) work. Make sure at least one group member has a postpaid connection.',
      },
      {
        question: 'How far in advance should we book Gulmarg Gondola tickets?',
        answer:
          'Gulmarg Gondola Phase 2 tickets often sell out weeks in advance. Always book your tickets online on the official J&K cable car portal as soon as your dates are confirmed.',
      },
    ],
  },
  {
    slug: 'jaipur',
    name: 'Jaipur & Udaipur',
    state: 'Rajasthan',
    badge: 'Royal Heritage',
    metaTitle: 'Jaipur & Udaipur 4-Day Rajasthan Travel Planner | TripTally',
    metaDescription:
      'Plan your 4-day Rajasthan royal circuit: Amer Fort, Lake Pichola sunset boat cruise, authentic Rajasthani thali, and group expense planner in INR.',
    keywords: [
      'Jaipur travel planner',
      'Jaipur Udaipur 4 day itinerary',
      'Rajasthan group trip budget',
      'Amer fort itinerary',
      'Rajasthan holiday cost calculator',
    ],
    heroImage:
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    heroAlt:
      'Intricate pink sandstone facade of Hawa Mahal in Jaipur Rajasthan',
    idealDuration: '4 Days / 3 Nights',
    recommendedTravelers: '4 Travellers',
    estBudget: 32000,
    perPersonCost: 8000,
    bestTimeToVisit: 'October to March for cool desert breezes and palace festivals',
    route: 'Jaipur • Ajmer • Pushkar • Udaipur',
    overview:
      'Experience the grandeur of royal Rajputana across the Pink City of Jaipur and the romantic City of Lakes, Udaipur. Towering hill forts, mirror-work palaces, vibrant bazaars, and lavish Dal Baati Churma feasts make this one of India’s most colorful group road trips.',
    budgetBreakdown: [
      { category: 'Stay (3 nights heritage Haveli stays)', amount: 14000, percentage: 44 },
      { category: 'Transport (Vande Bharat train / private cab)', amount: 9000, percentage: 28 },
      { category: 'Food (Royal thalis, kachoris, street food)', amount: 6000, percentage: 19 },
      { category: 'Monument entry & Lake Pichola boat tickets', amount: 3000, percentage: 9 },
    ],
    itineraryDays: [
      {
        day: 1,
        title: 'Jaipur Pink City & Hawa Mahal',
        schedule: [
          { time: '09:00 AM', activity: 'Arrive in Jaipur via Vande Bharat express, check into heritage haveli' },
          { time: '11:00 AM', activity: 'Photograph the honeycomb facade of Hawa Mahal and Jantar Mantar observatory' },
          { time: '02:00 PM', activity: 'Feast on pyaz kachoris and lassi at legendary MI Road eateries' },
          { time: '05:00 PM', activity: 'Sunset over the pink city from Nahargarh Fort ramparts' },
        ],
      },
      {
        day: 2,
        title: 'Amer Fort & Johari Bazaar',
        schedule: [
          { time: '08:30 AM', activity: 'Explore the grand courtyards and Sheesh Mahal mirror palace of Amer Fort' },
          { time: '01:00 PM', activity: 'Authentic Dal Baati Churma thali lunch' },
          { time: '04:00 PM', activity: 'Group handicraft and block-print souvenir shopping at Johari Bazaar' },
          { time: '08:00 PM', activity: 'Evening sound and light show at Amer Fort' },
        ],
      },
      {
        day: 3,
        title: 'Transfer to Udaipur & Lake Pichola Cruise',
        schedule: [
          { time: '08:00 AM', activity: 'Scenic drive to Udaipur with a brief stopover at holy Pushkar lake' },
          { time: '02:30 PM', activity: 'Check into lakeside hotel overlooking Lake Pichola' },
          { time: '05:30 PM', activity: 'Sunset boat ride past the illuminated Jag Mandir palace' },
          { time: '08:30 PM', activity: 'Rooftop dinner with reflection of City Palace on the lake' },
        ],
      },
      {
        day: 4,
        title: 'Udaipur City Palace & Departure',
        schedule: [
          { time: '09:00 AM', activity: 'Tour the sprawling City Palace complex and vintage car museum' },
          { time: '01:00 PM', activity: 'Relaxing stroll through the fountains of Saheliyon-ki-Bari' },
          { time: '05:00 PM', activity: 'Depart from Udaipur airport/railway station' },
        ],
      },
    ],
    packingEssentials: [
      'Comfortable walking shoes for marble and cobblestone fort steps',
      'Cotton scarves or sunglasses to protect from afternoon sun',
      'Extra luggage space for hand-block printed fabrics and blue pottery',
    ],
    faqs: [
      {
        question: 'Is 4 days enough to visit both Jaipur and Udaipur?',
        answer:
          'Yes, dedicating 2 full days to Jaipur and 2 days to Udaipur provides an excellent balance for exploring the marquee forts, palaces, lake cruises, and culinary highlights.',
      },
    ],
  },
  {
    slug: 'rishikesh',
    name: 'Rishikesh & Haridwar',
    state: 'Uttarakhand',
    badge: 'Rafting & Serenity',
    metaTitle: 'Rishikesh 3-Day Weekend Itinerary & Rafting Guide | TripTally',
    metaDescription:
      'Plan a 3-day Rishikesh adventure with friends: 16km Ganga river rafting, cliff jumping, riverside campfire, Triveni Ghat aarti, and budget planner in INR.',
    keywords: [
      'Rishikesh trip planner',
      'Rishikesh 3 day itinerary',
      'Rishikesh river rafting budget',
      'Delhi to Rishikesh weekend getaway',
      'Rishikesh camping with friends',
    ],
    heroImage:
      'https://images.unsplash.com/photo-1718383538820-524dd564fd06?auto=format&fit=crop&w=1200&q=80',
    heroAlt:
      'Tera Manzil Temple overlooking the sacred turquoise Ganges river with rafting boats in Rishikesh Uttarakhand',
    idealDuration: '3 Days / 2 Nights',
    recommendedTravelers: '4 to 8 Friends',
    estBudget: 18000,
    perPersonCost: 4500,
    bestTimeToVisit: 'September to June (Peak rafting: Oct-Nov and Mar-May)',
    route: 'Delhi/NCR • Meerut Expressway • Haridwar • Rishikesh • Shivpuri',
    overview:
      'Located where the turquoise holy Ganges emerges from the Himalayan foothills, Rishikesh is the adventure capital of Northern India. From 16km grade-3 river rafting and cliff jumps to peaceful Ganga maha aartis at sunset and riverside camping, it is the quintessential high-energy weekend escape.',
    budgetBreakdown: [
      { category: 'Riverside Camp / Cottage stay (2 nights)', amount: 8000, percentage: 44 },
      { category: 'Transport (Car pool / shared Innova from Delhi)', amount: 4500, percentage: 25 },
      { category: 'Rafting package (16 km Shivpuri to NIM Beach)', amount: 3500, percentage: 20 },
      { category: 'Food, Cafe crawling, & Ghat offerings', amount: 2000, percentage: 11 },
    ],
    itineraryDays: [
      {
        day: 1,
        title: 'Arrival, Riverside Camping & Sunset Aarti',
        schedule: [
          { time: '06:00 AM', activity: 'Early departure from Delhi/NCR via Delhi-Meerut Expressway' },
          { time: '12:00 PM', activity: 'Check into riverside adventure camp in Shivpuri or Tapovan' },
          { time: '04:30 PM', activity: 'Walk across Ram Jhula to Parmarth Niketan for soul-stirring Ganga Aarti' },
          { time: '08:30 PM', activity: 'Riverside barbecue, campfire, and acoustic music under the stars' },
        ],
      },
      {
        day: 2,
        title: '16km White Water River Rafting & Cliff Jump',
        schedule: [
          { time: '09:00 AM', activity: 'Safety briefing and gear up for 16 km white-water rafting from Shivpuri' },
          { time: '11:00 AM', activity: 'Conquer exciting rapids: Roller Coaster, Golf Course, and Clubhouse' },
          { time: '01:00 PM', activity: 'Maggi and chai break with thrilling 20-foot cliff jump into the Ganga' },
          { time: '04:00 PM', activity: 'Visit the Beatles Ashram (Chaurasi Kutia) adorned with graffiti art' },
          { time: '08:00 PM', activity: 'Wood-fired pizzas and cafe hangout in Tapovan' },
        ],
      },
      {
        day: 3,
        title: 'Sunrise Viewpoint, Neer Garh Waterfall & Return',
        schedule: [
          { time: '06:30 AM', activity: 'Optional sunrise hike to Kunjapuri Temple for Himalayan views' },
          { time: '10:00 AM', activity: 'Hike up to crystal-clear natural pools of Neer Garh Waterfall' },
          { time: '01:30 PM', activity: 'Quick stop at Haridwar for piping hot Chache Di Hatti kachoris' },
          { time: '04:00 PM', activity: 'Drive back to Delhi/NCR arriving by 09:30 PM' },
        ],
      },
    ],
    packingEssentials: [
      'Quick-drying synthetic swimwear / t-shirts for rafting',
      'Water sandals with secure ankle straps (no loose slippers)',
      'Dry bag for phones and wallets during river runs',
    ],
    faqs: [
      {
        question: 'When is river rafting open in Rishikesh?',
        answer:
          'River rafting is open from mid-September to the end of June each year. It is officially closed during the monsoon months (July to August) for safety reasons.',
      },
    ],
  },
  {
    slug: 'ladakh',
    name: 'Ladakh & Pangong Tso',
    state: 'Ladakh',
    badge: 'High Altitude & Lakes',
    metaTitle: 'Ladakh 7-Day Road Trip Planner & Pangong Tso Itinerary | TripTally',
    metaDescription:
      'Plan your Ladakh road trip with friends: 7-day itinerary covering Leh, Nubra Valley, Khardung La, Pangong Tso lake, and complete group budget in INR.',
    keywords: [
      'Ladakh trip planner',
      'Ladakh 7 day itinerary',
      'Ladakh road trip budget for friends',
      'Pangong Tso itinerary',
      'Nubra valley travel planner',
      'Khardung La trip planner',
    ],
    heroImage:
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    heroAlt:
      'Stunning turquoise waters of Pangong Tso lake framed by rugged brown mountains in Ladakh India',
    idealDuration: '7 Days / 6 Nights',
    recommendedTravelers: '4 to 6 Friends',
    estBudget: 75000,
    perPersonCost: 18750,
    bestTimeToVisit: 'May to September for open mountain passes and pleasant weather',
    route: 'Leh • Sham Valley • Khardung La • Nubra Valley • Pangong Tso • Chang La • Leh',
    overview:
      'Known as the Land of High Passes, Ladakh is the holy grail of Indian road trips. Traverse Khardung La at 17,582 ft, ride Bactrian camels in the Hunder sand dunes, and witness the changing azure shades of Pangong Tso high-altitude lake.',
    budgetBreakdown: [
      { category: 'Private 4x4 Scorpio/Innova & Fuel', amount: 30000, percentage: 40 },
      { category: 'Hotels & Pangong Lake Camps (6 nights)', amount: 24000, percentage: 32 },
      { category: 'Food (Momos, Thukpa, Cafe meals)', amount: 13000, percentage: 17 },
      { category: 'Inner Line Permits & Monastery Entry Fees', amount: 8000, percentage: 11 },
    ],
    itineraryDays: [
      {
        day: 1,
        title: 'Arrival in Leh & Crucial Acclimatization',
        schedule: [
          { time: '09:00 AM', activity: 'Land at Kushok Bakula Rimpochee Airport Leh (11,562 ft)' },
          { time: '12:00 PM', activity: 'Strict mandatory complete rest in hotel to prevent Acute Mountain Sickness (AMS)' },
          { time: '05:30 PM', activity: 'Gentle sunset walk to Leh Main Bazaar and historic Shanti Stupa' },
        ],
      },
      {
        day: 2,
        title: 'Sham Valley Sightseeing & Sangam Confluence',
        schedule: [
          { time: '09:30 AM', activity: 'Drive to Sangam: confluence of turquoise Indus and muddy Zanskar rivers' },
          { time: '12:00 PM', activity: 'Defy gravity experience at Magnetic Hill' },
          { time: '02:00 PM', activity: 'Visit Gurudwara Pathar Sahib and Spituk Monastery' },
        ],
      },
      {
        day: 3,
        title: 'Cross Khardung La to Nubra Valley (Hunder)',
        schedule: [
          { time: '08:00 AM', activity: 'Ascend the legendary Khardung La pass at 17,582 ft for snowy summit photos' },
          { time: '01:30 PM', activity: 'Descend into lush Nubra Valley and check into luxury camp in Hunder' },
          { time: '05:00 PM', activity: 'Double-humped Bactrian camel safari amidst cold desert sand dunes' },
        ],
      },
      {
        day: 4,
        title: 'Diskit Monastery & Drive to Pangong Tso via Shyok',
        schedule: [
          { time: '08:30 AM', activity: 'Visit giant 106-foot statue of Maitreya Buddha at Diskit Monastery' },
          { time: '11:00 AM', activity: 'Scenic off-road drive along the rugged Shyok River route' },
          { time: '04:00 PM', activity: 'First breathtaking glimpse of Pangong Tso lake; evening lakeside tea' },
        ],
      },
      {
        day: 5,
        title: 'Pangong Sunrise & Return to Leh via Chang La',
        schedule: [
          { time: '06:00 AM', activity: 'Witness magical sunrise reflecting across Pangong Lake' },
          { time: '09:30 AM', activity: 'Drive back to Leh crossing snow-covered Chang La pass (17,688 ft)' },
          { time: '03:00 PM', activity: 'Visit Thiksey Monastery, reminiscent of Lhasa Potala Palace' },
        ],
      },
      {
        day: 6,
        title: 'Hemis Monastery & Local Souvenir Shopping',
        schedule: [
          { time: '10:00 AM', activity: 'Visit the 300-year-old Hemis Monastery and museum' },
          { time: '03:30 PM', activity: 'Shop for authentic pashmina shawls, prayer wheels, and dried apricots in Leh' },
          { time: '07:30 PM', activity: 'Farewell group dinner with Ladakhi thukpa and momos' },
        ],
      },
      {
        day: 7,
        title: 'Departure from Leh',
        schedule: [
          { time: '07:00 AM', activity: 'Transfer to Leh Airport with unforgettable Himalayan memories' },
        ],
      },
    ],
    packingEssentials: [
      'Acetazolamide (Diamox) for altitude acclimatization',
      'Heavy windproof down jackets and thermal inners',
      'Polarized sunglasses and UV SPF 50+ sun protection',
      'Postpaid mobile SIM (Airtel or Jio only in Ladakh)',
    ],
    faqs: [
      {
        question: 'Why is acclimatization necessary in Leh Ladakh?',
        answer:
          'Leh sits at 11,562 feet above sea level where oxygen pressure is roughly 35% lower than at sea level. Spending the first 24-48 hours resting with high water intake is essential to avoid altitude sickness.',
      },
    ],
  },
  {
    slug: 'meghalaya',
    name: 'Meghalaya & Cherrapunji',
    state: 'Meghalaya',
    badge: 'Living Roots & Waterfalls',
    metaTitle: 'Meghalaya 6-Day Travel Itinerary & Living Root Bridges | TripTally',
    metaDescription:
      'Plan an unforgettable 6-day Meghalaya trip with friends: Shillong cafes, Cherrapunji roaring waterfalls, Double Decker Living Root Bridge, and Dawki crystal river.',
    keywords: [
      'Meghalaya travel itinerary',
      'Meghalaya trip planner',
      'Cherrapunji living root bridge trek',
      'Dawki crystal river boat ride',
      'Shillong Meghalaya group budget',
    ],
    heroImage:
      'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1200&q=80',
    heroAlt:
      'Double decker living root bridge surrounded by lush green rainforest in Cherrapunji Meghalaya',
    idealDuration: '6 Days / 5 Nights',
    recommendedTravelers: '4 Travellers',
    estBudget: 48000,
    perPersonCost: 12000,
    bestTimeToVisit: 'October to April for crystal-clear Dawki river; May to September for waterfalls',
    route: 'Guwahati • Shillong • Cherrapunji • Nongriat • Dawki • Mawlynnong • Guwahati',
    overview:
      'Known as the Abode of Clouds, Meghalaya in Northeast India features emerald rainforests, thundering Nohkalikai waterfalls, centuries-old bio-engineered living root bridges in Nongriat, and the transparent glass-like waters of the Umngot River in Dawki.',
    budgetBreakdown: [
      { category: 'Private Chauffeur Cab (Guwahati circuit for 6 days)', amount: 18000, percentage: 38 },
      { category: 'Homestays & Boutique Stays in Shillong & Sohra', amount: 16000, percentage: 33 },
      { category: 'Food (Khasi meals, cafe dining in Shillong)', amount: 9000, percentage: 19 },
      { category: 'Guide charges, Dawki boats & root bridge fees', amount: 5000, percentage: 10 },
    ],
    itineraryDays: [
      {
        day: 1,
        title: 'Arrival in Guwahati & Drive to Shillong (Scotland of the East)',
        schedule: [
          { time: '10:00 AM', activity: 'Land at Guwahati Airport, meet driver and drive past Umiam Lake' },
          { time: '02:00 PM', activity: 'Check into hotel in Shillong, enjoy authentic Khasi pork or bamboo shoot lunch' },
          { time: '05:00 PM', activity: 'Evening cafe crawl and live rock music along Police Bazar' },
        ],
      },
      {
        day: 2,
        title: 'Shillong Peak, Elephant Falls & Drive to Cherrapunji (Sohra)',
        schedule: [
          { time: '09:00 AM', activity: 'Panoramic view from Shillong Peak and cascading Elephant Falls' },
          { time: '12:30 PM', activity: 'Scenic drive to Cherrapunji passing deep misty gorges' },
          { time: '03:30 PM', activity: 'Stand in awe before India’s tallest plunge waterfall: Nohkalikai Falls (1,115 ft)' },
          { time: '05:30 PM', activity: 'Explore Mawsmai limestone cave formations' },
        ],
      },
      {
        day: 3,
        title: 'Trek to Double Decker Living Root Bridge in Nongriat',
        schedule: [
          { time: '07:30 AM', activity: 'Descend 3,500 stone stairs from Tyrna village into dense subtropical forest' },
          { time: '11:00 AM', activity: 'Marvel at the ancient bio-engineered Double Decker Living Root Bridge' },
          { time: '01:00 PM', activity: 'Swim in the natural turquoise blue rock pools of Rainbow Falls' },
          { time: '04:30 PM', activity: 'Return ascent to Tyrna and evening bonfire in Cherrapunji' },
        ],
      },
      {
        day: 4,
        title: 'Dawki Crystal River & Indo-Bangladesh Border',
        schedule: [
          { time: '08:30 AM', activity: 'Drive to Dawki border town along the emerald Umngot River' },
          { time: '11:00 AM', activity: 'Wooden boat ride on water so transparent that boats appear to float on air' },
          { time: '02:00 PM', activity: 'Visit the friendly Tamabil Indo-Bangladesh international border post' },
          { time: '04:30 PM', activity: 'Drive to Mawlynnong, celebrated as Asia’s Cleanest Village' },
        ],
      },
      {
        day: 5,
        title: 'Mawlynnong Village & Return to Shillong',
        schedule: [
          { time: '09:00 AM', activity: 'Walk through floral garden lanes and single living root bridge in Riwai' },
          { time: '01:00 PM', activity: 'Traditional home-cooked organic lunch prepared by local Khasi families' },
          { time: '04:00 PM', activity: 'Scenic drive back to Shillong for souvenir bamboo craft shopping' },
        ],
      },
      {
        day: 6,
        title: 'Kamakhya Temple & Departure from Guwahati',
        schedule: [
          { time: '08:30 AM', activity: 'Morning drive to Guwahati, visit the sacred Nilachal Hill Kamakhya Temple' },
          { time: '02:00 PM', activity: 'Drop-off at Guwahati Airport for evening flight home' },
        ],
      },
    ],
    packingEssentials: [
      'Sturdy hiking shoes with strong rubber grip for Nongriat wet stairs',
      'Waterproof rain jacket and lightweight backpack rain cover',
      'Quick-drying athletic shorts or swimwear for natural rock pools',
    ],
    faqs: [
      {
        question: 'How difficult is the Double Decker Living Root Bridge trek in Nongriat?',
        answer:
          'The trek involves approximately 3,500 steep stone steps down and back up. Anyone with moderate fitness can complete it in 4-6 hours round trip. Wooden walking sticks are available for ₹20 at the base and are highly recommended.',
      },
    ],
  },
];


