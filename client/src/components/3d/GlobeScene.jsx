import React, { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { getProceduralEarthTexture } from './textureUtils';
import { FlightArcs } from './FlightArcs';
import { DestinationPins } from './DestinationPins';

const GLOBE_RADIUS = 2;

export function GlobeScene({
  selectedDestId,
  onSelectDestination,
  prefersReducedMotion = false,
}) {
  const globeGroupRef = useRef();
  const earthMeshRef = useRef();
  const atmosphereRef = useRef();
  const starsRef = useRef();

  const [isDragging, setIsDragging] = useState(false);
  const previousPointerPosition = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  const earthTexture = useMemo(() => getProceduralEarthTexture(), []);

  // Subtle background star particles
  const starPositions = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 6 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  // Frame animation loop
  useFrame((state, delta) => {
    if (!globeGroupRef.current) return;

    // Apply inertia or auto-rotation
    if (!isDragging && !prefersReducedMotion) {
      // Gentle auto-rotation
      globeGroupRef.current.rotation.y += 0.0025;

      // Apply decaying drag velocity
      globeGroupRef.current.rotation.y += velocity.current.x;
      globeGroupRef.current.rotation.x += velocity.current.y;
      velocity.current.x *= 0.95;
      velocity.current.y *= 0.95;
    }

    // Limit X tilt to prevent upside-down disorientation
    globeGroupRef.current.rotation.x = THREE.MathUtils.clamp(
      globeGroupRef.current.rotation.x,
      -0.5,
      0.5
    );

    // Subtle star twinkle
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0003;
    }
  });

  // Pointer drag controls for intuitive globe rotation
  const handlePointerDown = (e) => {
    setIsDragging(true);
    previousPointerPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    if (!isDragging || !globeGroupRef.current) return;
    const deltaX = e.clientX - previousPointerPosition.current.x;
    const deltaY = e.clientY - previousPointerPosition.current.y;

    velocity.current = {
      x: deltaX * 0.004,
      y: deltaY * 0.004,
    };

    globeGroupRef.current.rotation.y += deltaX * 0.005;
    globeGroupRef.current.rotation.x += deltaY * 0.005;

    previousPointerPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <>
      {/* Editorial Lighting: Warm Sun + Soft Forest Ambient + Rim Highlight */}
      <ambientLight intensity={1.1} color="#FAF8F5" />
      <directionalLight position={[5, 3, 5]} intensity={1.8} color="#FFFFFF" />
      <directionalLight position={[-5, -2, -3]} intensity={0.6} color="#52B788" />
      <pointLight position={[0, 4, 3]} intensity={0.8} color="#FAF8F5" />

      {/* Subtle Star Particles Field */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#EAE3D6"
          transparent
          opacity={0.4}
          sizeAttenuation
        />
      </points>

      {/* Interactive Rotatable Globe Group */}
      <group
        ref={globeGroupRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        rotation={[0.2, 0.4, 0]}
      >
        {/* Main Earth Sphere */}
        <mesh ref={earthMeshRef}>
          <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
          <meshStandardMaterial
            map={earthTexture}
            roughness={0.6}
            metalness={0.15}
          />
        </mesh>

        {/* Outer Atmospheric Glow Shell */}
        <mesh ref={atmosphereRef}>
          <sphereGeometry args={[GLOBE_RADIUS * 1.035, 48, 48]} />
          <meshBasicMaterial
            color="#52B788"
            transparent
            opacity={0.12}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Flight Arcs Connecting Cities */}
        <FlightArcs
          radius={GLOBE_RADIUS}
          selectedDestId={selectedDestId}
        />

        {/* Interactive Destination Pins & Ripple Rings */}
        <DestinationPins
          radius={GLOBE_RADIUS}
          selectedDestId={selectedDestId}
          onSelectDestination={onSelectDestination}
        />
      </group>
    </>
  );
}

export default GlobeScene;
