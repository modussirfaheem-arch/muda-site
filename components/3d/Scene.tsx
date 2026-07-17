"use client";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, Preload } from "@react-three/drei";
import { Suspense } from "react";
import MudaCan from "./MudaCan";
import Particles from "./Particles";

interface SceneProps {
  activeFlavor: number;
}

export default function Scene({ activeFlavor }: SceneProps) {
  return (
    <div className="fixed inset-0 w-screen h-screen pointer-events-none z-10">
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 4.2], fov: 45 }} 
        className="w-full h-full pointer-events-auto"
        // Performance optimization: prevent unnecessary rerenders
        dpr={[1, 2]} 
      >
        <ambientLight intensity={0.4} />
        <spotLight position={[5, 8, 5]} angle={0.25} penumbra={1} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-5, 3, -2]} intensity={1.5} color="#ffffff" />
        
        <Environment preset="studio" />

        {/* 
            CRITICAL FIX: 
            Suspense ensures the Canvas waits for textures to load 
            before attempting to paint the mesh. 
        */}
        <Suspense fallback={null}>
          <MudaCan activeFlavor={activeFlavor} />
          <Particles count={140} activeFlavor={activeFlavor} />
          
          {/* Preload ensures textures for all flavors are ready in cache */}
          <Preload all />
        </Suspense>
        
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={7} blur={2.4} far={3} />
      </Canvas>
    </div>
  );
}