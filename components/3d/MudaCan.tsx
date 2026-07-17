"use client";
import { useRef, useMemo, useEffect } from "react"; // Added useEffect here
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface MudaCanProps {
  activeFlavor: number;
}

const FLAVOR_PROFILES = [
  { name: "Black Cola", color: "#ffffff", metalness: 0.1, roughness: 0.5, rimColor: "#D4AF37", texturePath: "/muda-black.png" },  
  { name: "Citrus Surge", color: "#ffffff", metalness: 0.1, roughness: 0.5, rimColor: "#a3e635", texturePath: "/muda-citrus.png" }, 
  { name: "Deep Berry", color: "#ffffff", metalness: 0.1, roughness: 0.5, rimColor: "#c084fc", texturePath: "/muda-berry.png" },  
  { name: "Blueberry Blast", color: "#ffffff", metalness: 0.1, roughness: 0.5, rimColor: "#2563eb", texturePath: "/muda-blue.png" }           
];

export default function MudaCan({ activeFlavor }: MudaCanProps) {
  const groupRef = useRef<THREE.Group>(null);
  const scrollPercent = useRef(0);

  // Pre-load all textures
  const textureFiles = useTexture(FLAVOR_PROFILES.map(p => p.texturePath));
  
  const activeProfile = FLAVOR_PROFILES[activeFlavor];
  const activeTexture = textureFiles[activeFlavor];

  useMemo(() => {
    textureFiles.forEach((tex) => {
      tex.anisotropy = 16;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
    });
  }, [textureFiles]);

  useEffect(() => {
    const handleScrollMetrics = () => {
      const top = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollPercent.current = docHeight > 0 ? top / docHeight : 0;
    };
    window.addEventListener("scroll", handleScrollMetrics, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollMetrics);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const s = scrollPercent.current;

    const targetX = s < 0.25 ? 0 : s < 0.55 ? -1.8 : s < 0.8 ? 1.5 : 0;
    const targetY = s < 0.25 ? 0 : s < 0.55 ? -0.2 : s < 0.8 ? 0.3 : -0.5;
    const targetZ = s < 0.25 ? 0 : s < 0.55 ? 0.8 : s < 0.8 ? -0.5 : 0.5;
    const targetRotX = s < 0.25 ? 0 : s < 0.55 ? 0.2 : s < 0.8 ? -0.4 : 0.1;
    const targetRotZ = s < 0.25 ? 0 : s < 0.55 ? -0.3 : s < 0.8 ? 0.4 : -0.15;

    groupRef.current.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.08);
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.08;
    groupRef.current.rotation.z += (targetRotZ - groupRef.current.rotation.z) * 0.08;
    groupRef.current.rotation.y += 0.005 + (Math.sin(t * 0.2) * 0.002);
  });

  return (
    <group ref={groupRef}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.65, 0.65, 2.2, 64]} />
        <meshStandardMaterial 
          map={activeTexture} 
          metalness={0.2} 
          roughness={0.4} 
          envMapIntensity={1.8}
        />
      </mesh>
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.63, 0.65, 0.05, 64]} />
        <meshStandardMaterial color={activeProfile.rimColor} metalness={0.95} roughness={0.05} />
      </mesh>
      <mesh position={[0, -1.1, 0]}>
        <cylinderGeometry args={[0.65, 0.6, 0.05, 64]} />
        <meshStandardMaterial color={activeProfile.rimColor} metalness={0.95} roughness={0.05} />
      </mesh>
    </group>
  );
}