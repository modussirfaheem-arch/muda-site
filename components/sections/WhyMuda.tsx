"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DATA = [
  { num: "01", title: "Crystalline Extraction", desc: "Sourced from sub-aquifer crystalline matrix preserves natural electrolyte structures perfectly." },
  { num: "02", title: "Zero Carbon Architecture", desc: "Sourced with brushed aerospace aluminum shells completely canceling local distribution emissions." },
  { num: "03", title: "Zero Synthetic Traces", desc: "No synthetic chemical alterations. Raw biological optimization energy harvested purely from nature." }
];

export default function WhyMuda() {
  const blockRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".feat-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: { 
            trigger: blockRef.current, 
            start: "top 70%" 
        }
      }
    );
  }, { scope: blockRef });

  return (
    <section id="specs" className="w-full min-h-screen bg-transparent px-6 md:px-12 py-32 relative z-20 flex items-center scroll-mt-10">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-3 mb-8">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-mono block mb-4">02 // SPECIFICATIONS</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter max-w-sm">WHY MUDA STANDS ALONE</h2>
        </div>

        {/* Left Column */}
        <div className="md:col-span-1 space-y-6">
          {DATA.slice(0, 2).map((item, i) => (
            <div key={i} className="feat-card group relative bg-white/[0.01] backdrop-blur-md border border-white/[0.04] p-10 rounded-2xl transition-all duration-500 hover:border-[#D4AF37]/50 hover:bg-white/[0.02] hover:-translate-y-2 cursor-default">
              <div className="text-[#D4AF37] font-mono text-xs font-bold mb-8">{item.num}</div>
              <h3 className="text-xl font-bold uppercase text-white group-hover:text-[#D4AF37] transition-colors duration-300 mb-4">{item.title}</h3>
              <p className="text-sm text-[#CFCFCF]/80 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Center Spacer for 3D Product Visibility */}
        <div className="hidden md:block md:col-span-1" /> 

        {/* Right Column */}
        <div className="md:col-span-1 flex flex-col justify-end">
          <div className="feat-card group relative bg-white/[0.01] backdrop-blur-md border border-white/[0.04] p-10 rounded-2xl transition-all duration-500 hover:border-[#D4AF37]/50 hover:bg-white/[0.02] hover:-translate-y-2 cursor-default">
            <div className="text-[#D4AF37] font-mono text-xs font-bold mb-8">{DATA[2].num}</div>
            <h3 className="text-xl font-bold uppercase text-white group-hover:text-[#D4AF37] transition-colors duration-300 mb-4">{DATA[2].title}</h3>
            <p className="text-sm text-[#CFCFCF]/80 font-light leading-relaxed">{DATA[2].desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}