"use client";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obj = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        // Hard exit animation
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "power4.inOut",
          onComplete: onComplete
        });
      }
    });

    // Animate counter and the visual progress line simultaneously
    tl.to(obj, {
      value: 100,
      duration: 2.5,
      ease: "power1.inOut",
      onUpdate: () => {
        const val = Math.floor(obj.value);
        setCount(val);
        gsap.set(progressRef.current, { width: `${val}%` });
      }
    })
    .to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4
    }, "-=0.2");
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] bg-[#090909] flex flex-col justify-between p-8 md:p-12 font-sans select-none pointer-events-none">
      
      {/* Dynamic Progress Tracker */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-white/[0.05]">
        <div ref={progressRef} className="h-full bg-[#D4AF37] w-0" />
      </div>

      <div className="flex justify-between items-start w-full">
        <div className="flex flex-col gap-1">
            <span className="text-xs font-mono tracking-[0.3em] text-[#D4AF37]">SYSTEMS INITIALIZATION v4.0</span>
            <span className="text-[10px] font-mono tracking-widest text-white/20">READY STATE: STANDBY</span>
        </div>
        <span className="text-xs font-mono text-white/20">THANE NODE // CORE</span>
      </div>
      
      <div ref={textRef} className="flex flex-col items-start">
        <h1 className="text-[12vw] font-black uppercase tracking-tighter leading-none text-white">
          MUDA<span className="text-[#D4AF37]">.</span>
        </h1>
        <div className="text-5xl md:text-7xl font-mono font-light text-white/30 mt-4">
          {count.toString().padStart(3, "0")}%
        </div>
      </div>
      
      <div className="w-full flex justify-between items-end text-[10px] font-mono text-white/40">
        <span>LOADING TEXTURE BUFFER PIPELINES...</span>
        <span>©2026 INTERNAL LAUNCH</span>
      </div>
    </div>
  );
}