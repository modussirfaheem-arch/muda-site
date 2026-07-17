"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
        },
      }
    );
  }, { scope: footerRef });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="w-full bg-transparent border-t border-white/[0.04] px-6 md:px-12 py-16 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div>
          <h2 
            className="text-xl font-black tracking-widest text-white cursor-pointer hover:text-[#D4AF37] transition-colors" 
            onClick={scrollToTop}
          >
            MUDA<span className="text-[#D4AF37]">.</span>
          </h2>
          <p className="text-[11px] text-[#CFCFCF]/40 mt-2 font-mono uppercase tracking-wider">
            © 2026 MUDA Systems Inc. <br />
            Engineered for direct elite lifestyle execution.
          </p>
        </div>

        <div className="flex gap-16 text-[11px] font-mono tracking-widest uppercase text-[#CFCFCF]/50">
          <div className="flex flex-col gap-3">
            <span className="text-white font-bold tracking-widest">INFO</span>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Map</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms Matrix</a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-white font-bold tracking-widest">CHANNELS</span>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">X Architecture</a>
          </div>
        </div>
        
        <button 
            onClick={scrollToTop}
            className="hidden md:flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase text-white/30 hover:text-[#D4AF37] transition-colors group"
        >
            [ RETURN TO APEX ]
            <span className="group-hover:-translate-y-1 transition-transform duration-300">↑</span>
        </button>
      </div>
    </footer>
  );
}