import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { getProceduralEarthTexture } from './textureUtils';
import { FlightArcs } from './FlightArcs';
import { DestinationPins } from './DestinationPins';

const GLOBE_RADIUS = 2;

export function GlobeScene({
  selectedDestId,
  onSelectDestination,
  onHoverDestination,
  prefersReducedMotion = false,
}) {
  const globeGroupRef = useRef();
  const earthMeshRef = useRef();
  const atmosphereRef = useRef();
  const wireframeRef = useRef();
  const starsRef = useRef();
  const orbitControlsRef = useRef();

  const [isHoveredPin, setIsHoveredPin] = useState(false);
  const mouseParallax = useRef({ x: 0, y: 0 });

  const earthTexture = useMemo(() => getProceduralEarthTexture(), []);

  // Starfield constellation particles
  const starPositions = useMemo(() => {
    const count = 160;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 6.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  // Track mouse coordinates for dynamic 3D banking / tilt
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseParallax.current = { x: x * 0.15, y: y * 0.1 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth frame loop
  useFrame((state, delta) => {
    // Subtle star twinkle rotation
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0003;
    }

    // Gentle wireframe counter-rotation for rich depth
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y += 0.0008;
    }

    // Dynamic mouse parallax tilt on the entire group
    if (globeGroupRef.current && !prefersReducedMotion) {
      globeGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        globeGroupRef.current.rotation.x,
        0.28 + mouseParallax.current.y * 0.25,
        0.05
      );
    }
  });

  const handlePinHover = (dest, isHovering) => {
    setIsHoveredPin(isHovering);
    if (onHoverDestination) {
      onHoverDestination(isHovering ? dest : null);
    }
  };

  return (
    <>
      {/* Editorial High-Contrast Cinematic Lighting */}
      <ambientLight intensity={1.15} color="#FAF8F5" />
      <directionalLight position={[6, 4, 5]} intensity={2.0} color="#FFFFFF" />
      <directionalLight position={[-6, -3, -4]} intensity={0.8} color="#52B788" />
      <pointLight position={[0, 5, 4]} intensity={1.0} color="#FAF8F5" />
      <pointLight position={[0, -4, 3]} intensity={0.5} color="#E07A5F" />

      {/* OrbitControls for effortless, butter-smooth 3D spin */}
      <OrbitControls
        ref={orbitControlsRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.85}
        dampingFactor={0.06}
        enableDamping
        autoRotate={!isHoveredPin && !prefersReducedMotion}
        autoRotateSpeed={0.7}
        minPolarAngle={Math.PI * 0.28}
        maxPolarAngle={Math.PI * 0.72}
      />

      {/* Subtle Star Constellation Particles */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.038}
          color="#EAE3D6"
          transparent
          opacity={0.55}
          sizeAttenuation
        />
      </points>

      {/* Main Interactive Globe Group */}
      <group
        ref={globeGroupRef}
        rotation={[0.28, -2.85, 0]} // Initial orientation showcasing India directly
      >
        {/* Layer 1: Core Textured Earth Sphere */}
        <mesh ref={earthMeshRef}>
          <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
          <meshStandardMaterial
            map={earthTexture}
            roughness={0.45}
            metalness={0.2}
            emissive="#0A221B"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Layer 2: Shimmering Wireframe Matrix Shell */}
        <mesh ref={wireframeRef}>
          <sphereGeometry args={[GLOBE_RADIUS * 1.01, 36, 36]} />
          <meshBasicMaterial
            color="#52B788"
            wireframe
            transparent
            opacity={0.05}
          />
        </mesh>

        {/* Layer 3: Outer Atmospheric Glow Halo */}
        <mesh ref={atmosphereRef}>
          <sphereGeometry args={[GLOBE_RADIUS * 1.04, 48, 48]} />
          <meshBasicMaterial
            color="#52B788"
            transparent
            opacity={0.16}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Layer 4: Animated Flight Arcs with Moving Particle Comets */}
        <FlightArcs
          radius={GLOBE_RADIUS}
          selectedDestId={selectedDestId}
        />

        {/* Layer 5: Interactive Destination Pins with Hoverable 3D Place Name Tooltips */}
        <DestinationPins
          radius={GLOBE_RADIUS}
          selectedDestId={selectedDestId}
          onSelectDestination={onSelectDestination}
          onHoverChange={handlePinHover}
        />
      </group>
    </>
  );
}

export default GlobeScene;
