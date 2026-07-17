"use client";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, PresentationControls, ContactShadows } from "@react-three/drei";
import MudaCan from "./MudaCan";
import Particles from "./Particles";

export default function Scene() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Luxury Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#D4AF37" />
        
        {/* Premium Studio Environment for Reflections */}
        <Environment preset="studio" />

        {/* Floating 3D Product */}
        <PresentationControls 
          global 
          config={{ mass: 2, tension: 500 }} 
          snap={{ mass: 4, tension: 1500 }} 
          rotation={[0, 0.3, 0]} 
          polar={[-Math.PI / 3, Math.PI / 3]} 
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
            <MudaCan />
          </Float>
        </PresentationControls>

        {/* Gold & Bubbles Particles */}
        <Particles />
        
        {/* Ground Shadow for Realism */}
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
      </Canvas>
    </div>
  );
}