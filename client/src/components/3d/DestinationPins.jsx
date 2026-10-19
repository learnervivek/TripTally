import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { MapPin, Sparkles, ArrowRight, IndianRupee } from 'lucide-react';
import { DESTINATIONS, latLonToVector3 } from './worldData';

/**
 * Interactive 3D Destination Pin with dynamic hover popup displaying place name,
 * state/country, and estimated trip budget in Indian Rupees.
 */
function DestinationMarker({ dest, radius, isSelected, onSelect, onHoverChange }) {
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef();
  const beaconRef = useRef();

  // Position on surface (R = radius)
  const pos = useMemo(() => latLonToVector3(dest.lat, dest.lon, radius), [dest.lat, dest.lon, radius]);

  // Surface normal pointing directly outwards from sphere center
  const normal = useMemo(() => new THREE.Vector3(...pos).normalize(), [pos]);

  // Flat ring quaternion (tangent to surface normal)
  const ringQuaternion = useMemo(() => {
    return new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
  }, [normal]);

  // Cylinder stem quaternion
  const stemQuaternion = useMemo(() => {
    return new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
  }, [normal]);

  // Floating HTML tag position slightly elevated above the pin
  const htmlPos = useMemo(() => [
    pos[0] + normal.x * 0.22,
    pos[1] + normal.y * 0.22,
    pos[2] + normal.z * 0.22,
  ], [pos, normal]);

  // Animated pulse & radar ripple loop
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 2.2 + (dest.lat % 3);
    
    // Animate surface radar ripple
    if (ringRef.current) {
      const scale = 1 + (Math.sin(t) + 1) * 0.55;
      ringRef.current.scale.set(scale, scale, 1);
      if (ringRef.current.material) {
        ringRef.current.material.opacity = Math.max(0.1, 0.85 - (scale - 1) * 0.65);
      }
    }

    // Animate glowing light beacon height
    if (beaconRef.current) {
      const pulseHeight = 1 + Math.sin(t * 1.5) * 0.25;
      beaconRef.current.scale.set(1, pulseHeight, 1);
    }
  });

  const handlePointerEnter = (e) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
    if (onHoverChange) onHoverChange(dest, true);
  };

  const handlePointerLeave = (e) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = 'auto';
    if (onHoverChange) onHoverChange(dest, false);
  };

  const pinColor = isSelected ? '#FFFFFF' : hovered ? '#F4A261' : '#E07A5F';
  const beaconColor = isSelected ? '#52B788' : hovered ? '#E07A5F' : '#52B788';

  return (
    <group position={pos}>
      
      {/* 1. Invisible Enlarged Hit Sphere for Effortless Mouse Hovering */}
      <mesh
        onPointerOver={handlePointerEnter}
        onPointerOut={handlePointerLeave}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(dest);
        }}
        position={[normal.x * 0.08, normal.y * 0.08, normal.z * 0.08]}
      >
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      {/* 2. Shimmering Surface Ripple Ring */}
      <mesh
        ref={ringRef}
        quaternion={ringQuaternion}
        position={[normal.x * 0.005, normal.y * 0.005, normal.z * 0.005]}
      >
        <ringGeometry args={[0.035, 0.055, 32]} />
        <meshBasicMaterial
          color={isSelected ? '#52B788' : '#E07A5F'}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 3. Glowing Vertical Light Beacon Cylinder */}
      <mesh
        ref={beaconRef}
        position={[normal.x * 0.06, normal.y * 0.06, normal.z * 0.06]}
        quaternion={stemQuaternion}
      >
        <cylinderGeometry args={[0.005, 0.008, 0.12, 12]} />
        <meshStandardMaterial
          color={beaconColor}
          emissive={beaconColor}
          emissiveIntensity={hovered || isSelected ? 1.5 : 0.8}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* 4. Glowing Head Orb */}
      <mesh position={[normal.x * 0.12, normal.y * 0.12, normal.z * 0.12]}>
        <sphereGeometry args={[hovered || isSelected ? 0.048 : 0.036, 16, 16]} />
        <meshStandardMaterial
          color={pinColor}
          emissive={pinColor}
          emissiveIntensity={isSelected ? 1.8 : hovered ? 1.4 : 0.9}
          roughness={0.15}
          metalness={0.2}
        />
      </mesh>

      {/* 5. Dynamic Interactive 3D HTML Place Name Tooltip Overlay */}
      <Html
        position={[normal.x * 0.18, normal.y * 0.18, normal.z * 0.18]}
        center
        distanceFactor={7.5}
        zIndexRange={[100, 0]}
        style={{
          pointerEvents: hovered || isSelected ? 'auto' : 'none',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {hovered || isSelected ? (
          /* Expanded Hover Badge: Place Name + State + Budget */
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelect(dest);
            }}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-forest-950/95 text-white backdrop-blur-xl border border-emerald-400/50 shadow-[0_12px_30px_rgba(0,0,0,0.6)] cursor-pointer hover:border-terracotta-400 hover:scale-105 transition-all select-none animate-in fade-in zoom-in-95 duration-200"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0 shadow-[0_0_8px_#34d399]" />
            <div className="flex flex-col text-left">
              <span className="font-serif text-xs font-bold leading-tight whitespace-nowrap text-ivory-50">
                {dest.name}
              </span>
              <span className="text-[10px] text-emerald-300 font-medium whitespace-nowrap">
                {dest.region || dest.country}
              </span>
            </div>
            <div className="bg-forest-900/90 border border-emerald-500/30 px-2 py-0.5 rounded-lg text-[11px] font-mono font-bold text-terracotta-300 whitespace-nowrap">
              {dest.avgBudget?.split(' ')[0] || dest.avgBudget}
            </div>
          </div>
        ) : (
          /* Subtle Mini Label for Instant Recognition */
          <div
            className="px-2 py-0.5 rounded-full bg-forest-950/70 text-ivory-200 backdrop-blur-sm border border-forest-700/60 text-[10px] font-semibold whitespace-nowrap tracking-wide opacity-80 hover:opacity-100 transition-opacity cursor-pointer shadow-soft-sm"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(dest);
            }}
          >
            {dest.name.split(' ')[0]}
          </div>
        )}
      </Html>

    </group>
  );
}

export function DestinationPins({ radius = 2, selectedDestId, onSelectDestination, onHoverChange }) {
  return (
    <group>
      {DESTINATIONS.map((dest) => (
        <DestinationMarker
          key={dest.id}
          dest={dest}
          radius={radius}
          isSelected={selectedDestId === dest.id}
          onSelect={onSelectDestination}
          onHoverChange={onHoverChange}
        />
      ))}
    </group>
  );
}

export default DestinationPins;
