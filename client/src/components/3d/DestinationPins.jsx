import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DESTINATIONS, latLonToVector3 } from './worldData';

function DestinationMarker({ dest, radius, isSelected, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef();

  // Position on surface
  const pos = latLonToVector3(dest.lat, dest.lon, radius);

  // Direction vector pointing outwards from globe center
  const normal = new THREE.Vector3(...pos).normalize();

  // Elevate pin slightly above surface
  const pinHeadPos = new THREE.Vector3(...pos).addScaledVector(normal, 0.08);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      const t = clock.getElapsedTime() * 2 + dest.lat;
      const scale = 1 + (Math.sin(t) + 1) * 0.45;
      ringRef.current.scale.set(scale, scale, scale);
      if (ringRef.current.material) {
        ringRef.current.material.opacity = Math.max(0.15, 0.8 - (scale - 1) * 0.7);
      }
    }
  });

  const pinColor = isSelected ? '#FFFFFF' : hovered ? '#F4A261' : '#E07A5F';

  return (
    <group
      position={pos}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(dest);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Expanding Ripple Ring on Globe Surface */}
      <mesh
        ref={ringRef}
        rotation={new THREE.Euler().setFromVector3(normal)}
      >
        <ringGeometry args={[0.035, 0.05, 24]} />
        <meshBasicMaterial
          color={isSelected ? '#52B788' : '#E07A5F'}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Pin Stem */}
      <mesh position={[normal.x * 0.04, normal.y * 0.04, normal.z * 0.04]}>
        <cylinderGeometry args={[0.006, 0.006, 0.08, 8]} />
        <meshBasicMaterial color="#FAF8F5" />
      </mesh>

      {/* Pin Head Glow Orb */}
      <mesh position={[normal.x * 0.08, normal.y * 0.08, normal.z * 0.08]}>
        <sphereGeometry args={[hovered || isSelected ? 0.042 : 0.032, 16, 16]} />
        <meshStandardMaterial
          color={pinColor}
          emissive={pinColor}
          emissiveIntensity={isSelected ? 1.2 : 0.6}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

export function DestinationPins({ radius = 2, selectedDestId, onSelectDestination }) {
  return (
    <group>
      {DESTINATIONS.map((dest) => (
        <DestinationMarker
          key={dest.id}
          dest={dest}
          radius={radius}
          isSelected={selectedDestId === dest.id}
          onSelect={onSelectDestination}
        />
      ))}
    </group>
  );
}

export default DestinationPins;
