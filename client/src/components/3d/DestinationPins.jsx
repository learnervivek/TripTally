import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DESTINATIONS, latLonToVector3 } from './worldData';

function DestinationMarker({ dest, radius, isSelected, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef();

  // Position on surface
  const pos = useMemo(() => latLonToVector3(dest.lat, dest.lon, radius), [dest.lat, dest.lon, radius]);

  // Surface normal pointing outwards
  const normal = useMemo(() => new THREE.Vector3(...pos).normalize(), [pos]);

  // Flat ring quaternion (oriented tangent to surface normal)
  const ringQuaternion = useMemo(() => {
    return new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
  }, [normal]);

  // Cylinder stem quaternion (Cylinder default height is along Y axis [0, 1, 0])
  const stemQuaternion = useMemo(() => {
    return new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
  }, [normal]);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      const t = clock.getElapsedTime() * 2 + dest.lat;
      const scale = 1 + (Math.sin(t) + 1) * 0.45;
      ringRef.current.scale.set(scale, scale, 1);
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
        quaternion={ringQuaternion}
        position={[normal.x * 0.005, normal.y * 0.005, normal.z * 0.005]}
      >
        <ringGeometry args={[0.035, 0.05, 24]} />
        <meshBasicMaterial
          color={isSelected ? '#52B788' : '#E07A5F'}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Pin Stem Oriented Along Normal */}
      <mesh
        position={[normal.x * 0.04, normal.y * 0.04, normal.z * 0.04]}
        quaternion={stemQuaternion}
      >
        <cylinderGeometry args={[0.006, 0.006, 0.08, 8]} />
        <meshBasicMaterial color="#FAF8F5" />
      </mesh>

      {/* Pin Head Glow Orb */}
      <mesh position={[normal.x * 0.08, normal.y * 0.08, normal.z * 0.08]}>
        <sphereGeometry args={[hovered || isSelected ? 0.044 : 0.034, 16, 16]} />
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
