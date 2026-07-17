"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface NavbarProps {
  onOpenDrawer: () => void;
}

export default function Navbar({ onOpenDrawer }: NavbarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      barRef.current, 
      { y: -80, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
    );
  }, { scope: barRef });

  const handleScroll = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header 
      ref={barRef} 
      className="fixed top-0 left-0 w-full z-40 bg-[#090909]/60 backdrop-blur-xl border-b border-white/[0.05]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        
        {/* Brand Identity */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
          className="text-xl font-black tracking-widest text-white hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer"
        >
          MUDA<span className="text-[#D4AF37]">.</span>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-10 text-[10px] font-bold tracking-[0.2em] uppercase text-white/60">
          <button 
            onClick={() => handleScroll("manifesto")} 
            className="hover:text-[#D4AF37] transition-all duration-300 cursor-pointer hover:translate-y-[-2px]"
          >
            Manifesto
          </button>
          <button 
            onClick={() => handleScroll("specs")} 
            className="hover:text-[#D4AF37] transition-all duration-300 cursor-pointer hover:translate-y-[-2px]"
          >
            Specifications
          </button>
          <button 
            onClick={() => handleScroll("collection")} 
            className="hover:text-[#D4AF37] transition-all duration-300 cursor-pointer hover:translate-y-[-2px]"
          >
            Collection
          </button>
        </nav>

        {/* Primary CTA */}
        <button 
          onClick={onOpenDrawer} 
          className="px-6 py-2.5 border border-[#D4AF37]/30 text-[#D4AF37] font-bold text-[10px] uppercase tracking-widest rounded-full hover:bg-[#D4AF37] hover:text-black transition-all duration-300 cursor-pointer active:scale-95"
        >
          Secure Order
        </button>
      </div>
    </header>
  );
}