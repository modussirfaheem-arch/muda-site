"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 }
    );
  });

  return (
    <header 
      ref={navRef} 
      className="fixed top-0 left-0 w-full z-50 bg-[#090909]/30 backdrop-blur-md border-b border-white/[0.05]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="font-heading text-2xl font-black tracking-widest text-white hover:text-muda-gold transition-colors duration-300">
          MUDA<span className="text-muda-gold">.</span>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest uppercase">
          <a href="#" className="text-white hover:text-muda-gold transition-colors duration-300">Collection</a>
          <a href="#" className="text-white/60 hover:text-muda-gold transition-colors duration-300">Our Story</a>
          <a href="#" className="text-white/60 hover:text-muda-gold transition-colors duration-300">Sustainability</a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <button className="px-6 py-2.5 border border-muda-gold text-muda-gold font-heading text-xs uppercase tracking-widest rounded-full hover:bg-muda-gold hover:text-muda-black transition-all duration-300 active:scale-95">
            Order Now
          </button>
        </div>
      </div>
    </header>
  );
}