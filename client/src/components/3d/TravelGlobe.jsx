import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  MapPin,
  Sparkles,
  ArrowRight,
  Compass,
  X,
  Star,
  DollarSign,
  Calendar,
  RotateCw
} from 'lucide-react';
import { DESTINATIONS } from './worldData';
import GlobeScene from './GlobeScene';

/**
 * Checks whether the client browser supports WebGL.
 */
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

/**
 * Fallback component when WebGL is unsupported or disabled.
 */
function WebGLFallback({ onSelectDestination, selectedDest }) {
  return (
    <div className="relative w-full h-[420px] rounded-3xl bg-forest-900 border border-forest-800 p-6 flex flex-col items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(82,183,136,0.15)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="w-24 h-24 rounded-full bg-forest-800/80 border border-forest-700/60 flex items-center justify-center text-forest-300 mb-4 shadow-soft">
        <Compass className="w-12 h-12 text-forest-400 animate-spin-slow" />
      </div>

      <h3 className="font-serif text-xl font-medium text-ivory-100 mb-2">
        Global Travel Visualization
      </h3>
      <p className="text-xs text-forest-200/80 max-w-sm mb-6 leading-relaxed">
        Explore premier travel destinations planned by TripTally groups worldwide.
      </p>

      {/* Destination Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-md">
        {DESTINATIONS.map((d) => (
          <button
            key={d.id}
            onClick={() => onSelectDestination(d)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedDest?.id === d.id
                ? 'bg-terracotta-500 text-white shadow-soft'
                : 'bg-forest-800/60 hover:bg-forest-750 text-forest-100 border border-forest-700/50'
            }`}
          >
            {d.name}, {d.country}
          </button>
        ))}
      </div>
    </div>
  );
}

export function TravelGlobe({ onPlanTripClick }) {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [selectedDest, setSelectedDest] = useState(DESTINATIONS[0]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setHasWebGL(isWebGLAvailable());

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className="relative w-full h-[460px] sm:h-[540px] lg:h-[600px] flex items-center justify-center select-none">
      
      {/* 3D WebGL Canvas */}
      {hasWebGL ? (
        <div className="w-full h-full cursor-grab active:cursor-grabbing" style={{ touchAction: 'pan-y' }}>
          <Canvas
            camera={{ position: [0, 0, 5.2], fov: 42 }}
            dpr={[1, 2]}
            onCreated={() => setIsLoaded(true)}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              alpha: true,
            }}
          >
            <Suspense fallback={null}>
              <GlobeScene
                selectedDestId={selectedDest?.id}
                onSelectDestination={setSelectedDest}
                prefersReducedMotion={prefersReducedMotion}
              />
            </Suspense>
          </Canvas>
        </div>
      ) : (
        <WebGLFallback
          onSelectDestination={setSelectedDest}
          selectedDest={selectedDest}
        />
      )}

      {/* Floating Interactive Destination Card */}
      {selectedDest && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:left-6 sm:bottom-6 max-w-sm w-auto z-10 animate-fade-in">
          <div className="glass-card bg-ivory-50/95 backdrop-blur-xl border border-ivory-200/90 rounded-2xl p-4 shadow-soft-xl transition-all">
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-terracotta-500 animate-pulse" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-forest-700">
                  {selectedDest.tag}
                </span>
              </div>
              <button
                onClick={() => setSelectedDest(null)}
                aria-label="Close preview card"
                className="text-charcoal-400 hover:text-charcoal-700 p-1 rounded-lg hover:bg-ivory-200/50 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex gap-3 mb-3">
              <img
                src={selectedDest.image}
                alt={selectedDest.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 shadow-soft"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80';
                }}
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-serif text-base font-semibold text-charcoal-900 truncate">
                  {selectedDest.name}
                </h4>
                <p className="text-xs text-charcoal-500 mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-terracotta-500 shrink-0" />
                  {selectedDest.country}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-charcoal-600">
                  <span className="flex items-center gap-0.5 text-forest-700 font-semibold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {selectedDest.rating}
                  </span>
                  <span>{selectedDest.avgBudget}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-charcoal-600 line-clamp-2 mb-3 leading-relaxed">
              {selectedDest.description}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-ivory-200">
              <span className="text-[11px] text-charcoal-500">
                Season: <strong className="text-charcoal-800">{selectedDest.bestSeason}</strong>
              </span>
              <button
                onClick={() => {
                  if (onPlanTripClick) onPlanTripClick(selectedDest);
                }}
                className="inline-flex items-center gap-1 text-xs font-semibold text-forest-700 hover:text-forest-900 hover:underline"
              >
                Plan this trip <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Helper Hint Badge */}
      <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-950/60 backdrop-blur-md border border-forest-800/60 text-xs text-ivory-200 shadow-soft pointer-events-none">
        <RotateCw className="w-3.5 h-3.5 text-forest-400 animate-spin-slow" />
        <span>Drag globe to rotate • Click pin to explore</span>
      </div>

    </div>
  );
}

export default TravelGlobe;
