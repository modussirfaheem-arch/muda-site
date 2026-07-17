"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      id="manifesto" 
      className="w-full min-h-screen flex items-center justify-start bg-transparent px-6 md:px-12 py-24 z-20 relative border-t border-white/[0.03] scroll-mt-10"
    >
      <div className="max-w-xl md:ml-12">
        <span className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-mono block mb-8">
          01 // THE MANIFESTO
        </span>
        <p 
          ref={textRef} 
          className="text-2xl md:text-5xl font-light tracking-tight leading-[1.2] text-white uppercase"
        >
          We didn’t rewrite the rules of hydration. We simply stopped compromising. 
          <span className="text-white/30 block mt-4"> 
            MUDA is engineered at the intersection of absolute structural purity and uncompromising industrial design.
          </span>
        </p>
      </div>
    </section>
  );
}