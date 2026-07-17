"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Scene from "../3d/Scene";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Cinematic Intro Reveal
    tl.fromTo(
      ".hero-text",
      { y: 100, opacity: 0, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" },
      { y: 0, opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.5, stagger: 0.2, ease: "power4.out", delay: 0.5 }
    );
    
    tl.fromTo(
      ".hero-btn",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.3)", stagger: 0.1 },
      "-=1"
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen flex items-center bg-luxury-gradient overflow-hidden">
      
      {/* Background 3D Scene Layer */}
      <div className="absolute inset-0 w-full h-full md:w-1/2 md:left-1/2 z-10 pointer-events-auto">
        <Scene />
      </div>

      {/* Foreground Text Layer */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center">
        <div ref={textRef} className="max-w-2xl">
          <h1 className="hero-text font-heading text-6xl md:text-8xl font-bold uppercase leading-[0.9] tracking-tighter text-muda-white">
            Refresh <br />
            <span className="text-muda-gold">Your World</span> <br />
            With MUDA
          </h1>
          
          <p className="hero-text mt-8 text-lg md:text-xl text-muda-gray font-body font-light max-w-md leading-relaxed">
            Crafted for those who dream bigger. More than a drink. A premium lifestyle.
          </p>

          <div className="mt-10 flex items-center gap-6">
            <button className="hero-btn group relative px-8 py-4 bg-muda-gold text-muda-black font-heading font-bold uppercase tracking-wider overflow-hidden rounded-full hover:scale-105 transition-transform duration-300">
              <span className="relative z-10">Explore Collection</span>
              <div className="absolute inset-0 bg-white transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out-expo z-0"></div>
            </button>
            <button className="hero-btn font-heading uppercase text-muda-white hover:text-muda-gold transition-colors duration-300 tracking-widest text-sm border-b border-muda-white hover:border-muda-gold pb-1">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      
      {/* CSS overlay for cinematic grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "url('/noise.png')" }}></div>
    </section>
  );
}