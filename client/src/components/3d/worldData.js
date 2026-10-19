/**
 * Curated destination data and flight connections for TripTally's 3D Travel Globe.
 */

export const DESTINATIONS = [
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    tag: 'Cultural Romance',
    lat: 48.8566,
    lon: 2.3522,
    rating: '4.9',
    avgBudget: '$1,400 / trip',
    bestSeason: 'Spring & Autumn',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    description: 'Stroll cobblestone boulevards, world-class art at the Louvre, and cafe-lined avenues.',
    highlights: ['Eiffel Tower at Twilight', 'Montmartre Food Tour', 'Louvre Museum Pass'],
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    tag: 'Futuristic Heritage',
    lat: 35.6762,
    lon: 139.6503,
    rating: '4.95',
    avgBudget: '$1,850 / trip',
    bestSeason: 'Cherry Blossom Season',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
    description: 'Neon skylines, ancient Meiji shrines, bullet trains, and unforgettable ramen alleyways.',
    highlights: ['Shinjuku Izakaya Night Walk', 'TeamLab Borderless', 'Tsukiji Outer Market'],
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    tag: 'Island Sanctuary',
    lat: -8.4095,
    lon: 115.1889,
    rating: '4.88',
    avgBudget: '$950 / trip',
    bestSeason: 'Dry Season (May-Oct)',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
    description: 'Emerald rice terraces, cliffside Uluwatu sunsets, surfing breaks, and lush yoga villas.',
    highlights: ['Tegallalang Rice Terraces', 'Uluwatu Sunset Temple', 'Mount Batur Sunrise Trek'],
  },
  {
    id: 'new-york',
    name: 'New York',
    country: 'United States',
    tag: 'Metropolitan Pulse',
    lat: 40.7128,
    lon: -74.0060,
    rating: '4.92',
    avgBudget: '$1,700 / trip',
    bestSeason: 'Autumn in Central Park',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80',
    description: 'Broadway theater, skyline views from High Line, world-famous food halls, and brownstone parks.',
    highlights: ['Brooklyn Bridge Walk', 'Broadway Evening', 'SoHo & West Village Dining'],
  },
  {
    id: 'amalfi',
    name: 'Amalfi Coast',
    country: 'Italy',
    tag: 'Coastal Luxury',
    lat: 40.6340,
    lon: 14.6027,
    rating: '4.96',
    avgBudget: '$1,550 / trip',
    bestSeason: 'May to September',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
    description: 'Pastel cliffside villages, private Capri boat charters, and cliffside limoncello groves.',
    highlights: ['Capri Sea Caves Charter', 'Path of the Gods Hike', 'Ravello Villa Gardens'],
  },
  {
    id: 'reykjavik',
    name: 'Reykjavík',
    country: 'Iceland',
    tag: 'Nordic Wonder',
    lat: 64.1466,
    lon: -21.9426,
    rating: '4.85',
    avgBudget: '$1,600 / trip',
    bestSeason: 'Aurora (Oct-Mar)',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
    description: 'Geothermal hot springs, dancing Northern Lights, massive glaciers, and volcanic black sand beaches.',
    highlights: ['Blue Lagoon Retreat', 'Golden Circle Waterfall Tour', 'Northern Lights Hunt'],
  },
];

export const FLIGHT_ARCS = [
  { from: 'new-york', to: 'paris', color: '#E07A5F' },
  { from: 'paris', to: 'tokyo', color: '#52B788' },
  { from: 'tokyo', to: 'bali', color: '#E07A5F' },
  { from: 'bali', to: 'amalfi', color: '#52B788' },
  { from: 'amalfi', to: 'reykjavik', color: '#E07A5F' },
  { from: 'reykjavik', to: 'new-york', color: '#52B788' },
];

/**
 * Converts Latitude & Longitude to 3D Cartesian coordinates (x, y, z) on a sphere of radius R.
 */
export function latLonToVector3(lat, lon, radius = 2) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return [x, y, z];
}
