"use client";
import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticlesProps {
  count?: number;
  activeFlavor: number;
}

// Particle color palette matching the brand flavor index matrix
const FLAVOR_COLORS = [
  new THREE.Color("#D4AF37"), // 0: Black Cola (Gold)
  new THREE.Color("#a3e635"), // 1: Citrus Surge (Neon Lime)
  new THREE.Color("#c084fc"), // 2: Deep Berry (Soft Purple)
  new THREE.Color("#2563eb")  // 3: Blueberry Blast (Electric Blue)
];

export default function Particles({ count = 140, activeFlavor }: ParticlesProps) {
  const points = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  // Core targets for smooth uniform color transitions
  const targetColor = FLAVOR_COLORS[activeFlavor] || FLAVOR_COLORS[0];

  // Initialize random spatial spread vectors across the 3D frame stage
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;     // X axis horizontal span
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8; // Y axis vertical span
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4; // Z axis depth range
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    
    const positionAttribute = points.current.geometry.attributes.position;
    const time = state.clock.getElapsedTime();

    // 1. Particle floating physics loop
    for (let i = 0; i < count; i++) {
      let y = positionAttribute.getY(i);
      // Gentle floating upward velocity mixed with tiny wave sine oscillations
      y += 0.006 + Math.sin(time * 0.5 + i) * 0.001; 
      
      // Infinite loop fallback reset when floating past top viewing bounds
      if (y > 4) y = -4; 
      positionAttribute.setY(i, y);
    }
    positionAttribute.needsUpdate = true;

    // 2. Linear color interpolation frame updates
    if (materialRef.current) {
      materialRef.current.color.lerp(targetColor, 0.05);
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particlesPosition, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.04}
        color={FLAVOR_COLORS[0]} // Base structural fallback color
        transparent
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}