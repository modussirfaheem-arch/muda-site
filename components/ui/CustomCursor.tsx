"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const cursor = cursorRef.current;
    const label = labelRef.current;

    // Movement engine
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3.out" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    // Hover State Logic (Delegated)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest(".cursor-grab")) {
        gsap.to(cursor, { scale: 4, backgroundColor: "#D4AF37", mixBlendMode: "difference", duration: 0.3 });
        gsap.to(label, { opacity: 1, duration: 0.2 });
      } else if (target.closest("button, a, .cursor-pointer")) {
        gsap.to(cursor, { scale: 1.8, backgroundColor: "#D4AF37", mixBlendMode: "normal", duration: 0.3 });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.closest(".cursor-grab") || target.closest("button, a, .cursor-pointer")) {
        gsap.to(cursor, { scale: 1, backgroundColor: "#ffffff", mixBlendMode: "normal", duration: 0.3 });
        gsap.to(label, { opacity: 0, duration: 0.2 });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="hidden md:flex fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
    >
      <span 
        ref={labelRef}
        className="opacity-0 text-[3px] font-mono font-bold text-black tracking-[1px] uppercase pointer-events-none"
      >
        SPIN
      </span>
    </div>
  );
}