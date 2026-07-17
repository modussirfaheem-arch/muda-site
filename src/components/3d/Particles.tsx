"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Particles({ count = 150 }) {
  const points = useRef<THREE.Points>(null);

  // Generate random positions for the floating elements
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;  // X axis spread
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // Y axis spread
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;  // Z axis depth
    }
    return positions;
  }, [count]);

  // Animate particles moving upward to simulate carbonation
  useFrame((state) => {
    if (!points.current) return;
    
    const positionAttribute = points.current.geometry.attributes.position;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      let y = positionAttribute.getY(i);
      
      // Move up
      y += 0.01 + Math.sin(time + i) * 0.002;
      
      // Reset to bottom if it goes too high
      if (y > 5) y = -5;
      
      positionAttribute.setY(i, y);
    }
    
    positionAttribute.needsUpdate = true;
    points.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#D4AF37"
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}