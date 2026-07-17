"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import WhyMuda from "@/components/sections/WhyMuda";
import Collection from "@/components/sections/Collection";
import Footer from "@/components/sections/Footer";
import Preloader from "@/components/ui/Preloader";
import CustomCursor from "@/components/ui/CustomCursor";

const FLAVORS = [
  { id: 0, name: "MUDA Black Cola", price: "₹2,400", details: "Case of 12 / 500ml Glass-Matrix Canisters", desc: "The foundational core luxury brew. Infused with natural kola nut extracts and pristine raw mountain elements.", tone: "text-[#D4AF37]" },
  { id: 1, name: "MUDA Citrus Surge", price: "₹2,600", details: "Case of 12 / 500ml Glass-Matrix Canisters", desc: "Ultra-crisp yuzu extract fused with organic cold-pressed lime skin distillation mechanics.", tone: "text-yellow-400" },
  { id: 2, name: "MUDA Deep Berry", price: "₹2,800", details: "Case of 12 / 500ml Glass-Matrix Canisters", desc: "Concentrated wild alpine blackberries mixed with direct antioxidants for recovery systems.", tone: "text-purple-400" },
  { id: 3, name: "MUDA Blueberry Blast", price: "₹2,800", details: "Case of 12 / 500ml Glass-Matrix Canisters", desc: "Burst into flavor with real berry goodness. Powered by rich natural blueberry pulp extracts and an instant hydrating vitamin C boost.", tone: "text-blue-500" }
];

const BG_COLORS = ["#090909", "#11120d", "#140b0d", "#0b1017"];

export default function Home() {
  const [activeFlavor, setActiveFlavor] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [isAllocating, setIsAllocating] = useState(false);
  const [allocationSuccess, setAllocationSuccess] = useState(false);

  // Audio Engine
  const playClickSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(580, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) { console.warn("Audio Context error."); }
  };

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDrawerOpen) toggleDrawer(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen]);

  const toggleDrawer = (open: boolean) => {
    playClickSound();
    setIsDrawerOpen(open);
    if (!open) {
      setTimeout(() => { setIsAllocating(false); setAllocationSuccess(false); setEmail(""); }, 500);
    }
  };

  const handleFlavorChange = (index: number) => {
    playClickSound();
    setActiveFlavor(index);
  };

  const handleAllocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    playClickSound();
    setIsAllocating(true);
    setTimeout(() => { setIsAllocating(false); setAllocationSuccess(true); playClickSound(); }, 1800);
  };

  return (
    <>
      <Preloader onComplete={() => setIsLoading(false)} />
      <CustomCursor />
      
      <main 
        className={`relative min-h-screen text-white overflow-hidden transition-opacity duration-1000 ${isLoading ? "opacity-0" : "opacity-100"}`}
        style={{ 
          backgroundColor: BG_COLORS[activeFlavor], 
          transition: "background-color 1000ms cubic-bezier(0.16, 1, 0.3, 1)" 
        }}
      >
        <Navbar onOpenDrawer={() => toggleDrawer(true)} />
        <Hero activeFlavor={activeFlavor} onOpenDrawer={() => toggleDrawer(true)} />
        <About />
        <WhyMuda />
        <Collection 
          flavors={FLAVORS} 
          activeFlavor={activeFlavor} 
          setActiveFlavor={handleFlavorChange} 
          onOpenDrawer={() => toggleDrawer(true)} 
        />
        <Footer />

        {/* --- FULLY FUNCTIONAL DRAWER --- */}
        <div 
          className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-md transition-opacity duration-500 ${isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} 
          onClick={() => toggleDrawer(false)}
        >
          <div 
            className={`absolute top-0 right-0 h-full w-full max-w-md bg-[#121212] border-l border-white/[0.05] p-8 md:p-12 flex flex-col justify-between transition-transform duration-500 ease-out-expo ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`} 
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex justify-between items-center mb-12">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#D4AF37]">SYSTEM ALLOCATION</span>
                <button onClick={() => toggleDrawer(false)} className="text-white/40 hover:text-white font-mono text-xs uppercase tracking-widest cursor-pointer">[ CLOSE ]</button>
              </div>

              <span className="text-xs font-mono text-white/40 block mb-2">SELECTED VARIANT</span>
              <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-1">{FLAVORS[activeFlavor].name}</h3>
              <p className="text-xs text-[#CFCFCF] font-light mb-8">{FLAVORS[activeFlavor].details}</p>

              <div className="border-t border-b border-white/[0.05] py-6 my-6 flex justify-between items-center">
                <span className="text-sm font-light text-white/70">Secure Vault Price</span>
                <span className="text-2xl font-mono font-bold text-[#D4AF37]">{FLAVORS[activeFlavor].price}</span>
              </div>

              {!allocationSuccess ? (
                <form onSubmit={handleAllocationSubmit} className="space-y-4 mt-8">
                  <input 
                    type="email" required disabled={isAllocating} value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER SECURE EMAIL REFERENCE" 
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-xs font-mono uppercase tracking-wider text-white focus:outline-none focus:border-[#D4AF37] transition-all disabled:opacity-50"
                  />
                  <button 
                    type="submit" disabled={isAllocating || !email}
                    className="w-full mt-4 py-5 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all cursor-pointer"
                  >
                    {isAllocating ? "TRANSMITTING SIGNATURE..." : "CONFIRM PREMIUM RESERVE"}
                  </button>
                </form>
              ) : (
                <div className="mt-12 text-center p-8 border border-[#D4AF37]/20 bg-[#D4AF37]/5 rounded-2xl animate-in fade-in zoom-in duration-500">
                  <div className="w-12 h-12 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mx-auto mb-4 font-mono text-xl">✓</div>
                  <h4 className="text-lg font-bold uppercase tracking-tight text-white mb-2">Allocation Transmitted</h4>
                  <p className="text-xs text-[#CFCFCF] font-light leading-relaxed">Cryptographic reservation issued to <span className="text-white font-mono break-all">{email}</span>.</p>
                </div>
              )}
            </div>
            <div className="text-[9px] font-mono text-white/10 text-center tracking-widest uppercase mt-8">MUDA SYSTEMS SECURE ENDPOINT // THANE CORE</div>
          </div>
        </div>
      </main>
    </>
  );
}