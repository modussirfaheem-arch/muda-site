"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Scene from "../3d/Scene";

interface HeroProps {
  activeFlavor: number;
  onOpenDrawer: () => void;
}

// Accent palette mapping synchronized with individual product variants
const ACCENT_COLORS = ["#D4AF37", "#a3e635", "#c084fc", "#2563eb"];

export default function Hero({ activeFlavor, onOpenDrawer }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".hero-title-line",
      { y: 120, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, ease: "power4.out", stagger: 0.15, delay: 0.3 }
    ).fromTo(
      ".hero-fade",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1 },
      "-=0.8"
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-between bg-transparent px-6 md:px-12 pt-24 md:pt-0 overflow-hidden">
      
      {/* Dynamic Reactive Atmospheric Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none z-0 transition-colors duration-1000 ease-in-out"
        style={{ backgroundColor: `${ACCENT_COLORS[activeFlavor]}15` }} 
      />

      {/* Brand Presentation Columns */}
      <div className="w-full md:w-1/2 flex flex-col justify-center z-20 order-2 md:order-1 pb-16 md:pb-0">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.95] text-white">
          <div className="overflow-hidden"><div className="hero-title-line">Refresh</div></div>
          <div className="overflow-hidden">
            <div 
              className="hero-title-line transition-colors duration-1000 ease-in-out"
              style={{ color: ACCENT_COLORS[activeFlavor] || "#D4AF37" }}
            >
              Your World
            </div>
          </div>
          <div className="overflow-hidden"><div className="hero-title-line">With MUDA</div></div>
        </h1>
        
        <p className="hero-fade mt-6 text-base md:text-lg text-[#CFCFCF] font-light max-w-sm leading-relaxed">
          Crafted for those who dream bigger. More than a drink. A premium luxury beverage lifestyle framework.
        </p>
        
        <div className="hero-fade mt-8 flex flex-wrap items-center gap-4">
          <button 
            onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-widest rounded-full hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            Explore Collection
          </button>
          <button 
            onClick={onOpenDrawer}
            className="px-6 py-4 border border-white/20 text-white font-semibold text-xs uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
          >
            Buy Premium Now
          </button>
        </div>
      </div>

      {/* Spatial spacer mapping */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen flex items-center justify-center z-10 order-1 md:order-2 cursor-grab active:cursor-grabbing touch-none">
        <Scene activeFlavor={activeFlavor} />
      </div>

      {/* Blueprint background layer */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] z-0" />
    </section>
  );
}