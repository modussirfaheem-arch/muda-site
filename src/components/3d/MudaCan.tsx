"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

export default function MudaCan() {
  const canRef = useRef<Mesh>(null);

  // Subtle continuous rotation
  useFrame((state) => {
    if (canRef.current) {
      canRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={canRef} castShadow receiveShadow>
      {/* Placeholder Cylinder for the Can */}
      <cylinderGeometry args={[0.7, 0.7, 2.5, 64]} />
      {/* Luxury Matte Black Material with Gold metallic properties */}
      <meshStandardMaterial 
        color="#090909" 
        metalness={0.8} 
        roughness={0.2} 
        envMapIntensity={1.5}
      />
    </mesh>
  );
}