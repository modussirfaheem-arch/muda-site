"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 1. Define the interface for a single flavor object
interface Flavor {
  id: number;
  name: string;
  price: string;
  details: string;
  desc: string;
  tone: string;
}

// 2. Update CollectionProps to include the 'flavors' array
interface CollectionProps {
  flavors: Flavor[];
  activeFlavor: number;
  setActiveFlavor: (index: number) => void;
  onOpenDrawer: () => void;
}

export default function Collection({ flavors, activeFlavor, setActiveFlavor, onOpenDrawer }: CollectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    gsap.fromTo(
      ".flavor-item",
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" }
      }
    );
    gsap.fromTo(
      ".detail-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="collection" className="w-full min-h-screen px-6 md:px-12 py-32 bg-transparent transition-all duration-500 scroll-mt-10 relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: The Matrix */}
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-mono block mb-4">03 // LAB OPTIONS</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-16">THE FLAVOR MATRIX</h2>
          <div className="flex flex-col gap-4">
            {flavors.map((item, i) => (
              <button 
                key={item.id} 
                onClick={() => setActiveFlavor(i)} 
                className="flavor-item text-left py-4 border-b border-white/[0.05] flex justify-between items-center group cursor-pointer pointer-events-auto"
              >
                <span className={`text-xl md:text-3xl font-bold uppercase tracking-tight transition-all duration-300 ${activeFlavor === i ? `${item.tone} translate-x-2` : "text-white/30 hover:text-white"}`}>
                  {item.name}
                </span>
                {activeFlavor === i && <span className={`text-xs font-mono tracking-widest ${item.tone}`}>[ ACTIVE ]</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Dynamic Info Card */}
        <div className="detail-card bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 md:p-12 min-h-[400px] flex flex-col justify-between backdrop-blur-md">
          <div>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center font-mono text-xs mb-8">0{activeFlavor + 1}</div>
            <h3 className="text-2xl font-black uppercase mb-4 text-white transition-all duration-500">{flavors[activeFlavor].name}</h3>
            <p className="text-[#CFCFCF] text-sm font-light leading-relaxed max-w-sm transition-all duration-500">{flavors[activeFlavor].desc}</p>
          </div>
          
          <div className="mt-8 flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-white/30">Formula System Allocation v4.0</span>
            <button 
              onClick={onOpenDrawer}
              className="px-6 py-3 bg-white text-black font-bold text-xs uppercase rounded-full tracking-wider hover:bg-[#D4AF37] hover:text-black transition-colors duration-300 cursor-pointer pointer-events-auto"
            >
              Pre-Order Allocation
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}